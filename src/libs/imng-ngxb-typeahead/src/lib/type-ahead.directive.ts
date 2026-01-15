import {
  Directive,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import {
  TypeaheadDirective,
  TypeaheadConfig,
  TypeaheadMatch,
} from 'ngx-bootstrap/typeahead';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ImngTypeAheadFacade } from './type-ahead-facade';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { NgControl } from '@angular/forms';
import { ImngTypeaheadMatch } from './type-ahead-match';
import { ImngMatchSelectedEvent } from './match-selected-event';
import { of } from 'rxjs';

/*
 * ### Example markup
 * <input [imngTypeahead]="myTypeAheadFacade" formControlName="myFormControl" (typeaheadOnSelect)="typeaheadOnSelect($event)" />
 *
 * ### Note:
 * imngTypeahead must be set to a class that implements the ITypeAheadFacade interface
 *
 * typeaheadOnSelect return type is TypeaheadMatch
 */
@Directive({
  selector: '[imngTypeahead]',
  standalone: true,
})
export class IMNG_TYPE_AHEAD<T>
  extends TypeaheadDirective
  implements OnInit, OnDestroy, Subscribable
{
  private _typeAheadFacade?: ImngTypeAheadFacade<T>;
  public readonly allSubscriptions = new Subscriptions();

  constructor() {
    const cis = inject(ComponentLoaderFactory);
    const changeDetection = inject(ChangeDetectorRef);
    const element = inject(ElementRef);
    const ngControl = inject(NgControl);
    const renderer = inject(Renderer2);
    const viewContainerRef = inject(ViewContainerRef);

    super(
      cis,
      {
        isAnimated: true,
        hideResultsOnBlur: true,
        minLength: 1,
      } as TypeaheadConfig,
      changeDetection,
      element,
      ngControl,
      renderer,
      viewContainerRef,
    );
    this.typeaheadOnSelect = new EventEmitter<
      TypeaheadMatch | ImngMatchSelectedEvent<T>
    >(false);
    this.typeaheadAsync = true;

    //These are default values to avoid overtaxing the data endpoint
    this.typeaheadMinLength = 1;
    this.typeaheadWaitMs = 100;
  }

  @Input('imngTypeahead')
  set facade(typeAheadFacade: ImngTypeAheadFacade<T>) {
    this.typeahead = typeAheadFacade.matches$;
    this._typeAheadFacade = typeAheadFacade;
  }
  public override activeDescendant?: string;

  @Output()
  public override typeaheadOnSelect: EventEmitter<
    ImngMatchSelectedEvent<T> | TypeaheadMatch
  >;

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.allSubscriptions.unsubscribeAll();
  }

  protected override asyncActions(): void {
    this.allSubscriptions.push(
      this.keyUpEventEmitter
        .pipe(
          debounceTime(this.typeaheadWaitMs),
          filter(() => !!this._typeAheadFacade),
          tap((t) => this._typeAheadFacade?.loadMatches(t)),
          switchMap(
            () => (this._typeAheadFacade || { matches$: of() }).matches$,
          ),
        )
        .subscribe((matches: ImngTypeaheadMatch<T>[]) => {
          this.finalizeAsyncCall(matches);
        }),
    );
  }
}
