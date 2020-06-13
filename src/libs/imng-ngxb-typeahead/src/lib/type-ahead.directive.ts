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
} from '@angular/core';
import { TypeaheadDirective, TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ImngTypeAheadFacade } from './type-ahead-facade';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { NgControl } from '@angular/forms';
import { ImngTypeaheadMatch, ImngMatchSelectedEvent } from './type-ahead-match';

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
})
export class ImngTypeaheadDirective<T> extends TypeaheadDirective implements OnInit, OnDestroy {
  private _typeAheadFacade: ImngTypeAheadFacade<T>;
  private readonly subscriptions: Subscription[];

  constructor(
    cis: ComponentLoaderFactory,
    changeDetection: ChangeDetectorRef,
    element: ElementRef,
    ngControl: NgControl,
    renderer: Renderer2,
    viewContainerRef: ViewContainerRef,
  ) {
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
    this.typeaheadAsync = true;
    this.subscriptions = [];

    //These are default values to avoid overtaxing the data endpoint
    this.typeaheadMinLength = 1;
    this.typeaheadWaitMs = 100;
  }

  @Input('imngTypeahead')
  set facade(typeAheadFacade: ImngTypeAheadFacade<T>) {
    this.typeahead = typeAheadFacade.matches$;
    this._typeAheadFacade = typeAheadFacade;
  }
  @Output()
  typeaheadOnSelect: EventEmitter<ImngMatchSelectedEvent<T>>;

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscriptions.forEach(t => {
      if (t) {
        t.unsubscribe();
      }
    });
  }

  protected asyncActions(): void {
    this.subscriptions.push(
      this.keyUpEventEmitter
        .pipe(
          debounceTime(this.typeaheadWaitMs),
          tap(t => this._typeAheadFacade.loadMatches(t)),
          switchMap(t => this._typeAheadFacade.matches$),
        )
        .subscribe((matches: ImngTypeaheadMatch<T>[]) => {
          this.finalizeAsyncCall(matches as any);
        }),
    );
  }
}
