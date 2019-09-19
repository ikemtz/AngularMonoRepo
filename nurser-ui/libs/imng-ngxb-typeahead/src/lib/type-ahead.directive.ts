import { Directive, ChangeDetectorRef, ElementRef, Renderer2, ViewContainerRef, OnInit, OnDestroy, Input } from '@angular/core';
import { TypeaheadDirective, TypeaheadConfig, TypeaheadMatch } from 'ngx-bootstrap/typeahead'
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ITypeAheadFacade } from './itype-ahead-facade';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { MockNgControl } from './mock-control';

@Directive({
  selector: '[imngTypeahead]'
})
export class ImngTypeaheadDirective extends TypeaheadDirective implements OnInit, OnDestroy {
  private _typeAheadFacade: ITypeAheadFacade;
  private subscriptions: Subscription[];

  constructor(cis: ComponentLoaderFactory, changeDetection: ChangeDetectorRef, private readonly myElement: ElementRef, renderer: Renderer2, viewContainerRef: ViewContainerRef) {
    super(cis, {
      isAnimated: true,
      hideResultsOnBlur: true,
      minLength: 1,
    } as TypeaheadConfig, changeDetection, myElement, new MockNgControl(), renderer, viewContainerRef);
    this.typeaheadAsync = true;
    this.subscriptions = [];

    //These are default values to avoid overtaxing the data endpoint
    this.typeaheadMinLength = 1;
    this.typeaheadWaitMs = 100;
  }
  
  @Input('imngTypeahead')
  set facade(typeAheadFacade: ITypeAheadFacade) {
    this.typeahead = typeAheadFacade.matches$;
    this._typeAheadFacade = typeAheadFacade;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscriptions.forEach(t => {
      if (t) { t.unsubscribe(); }
    });
  }

  protected asyncActions(): void {
    this.subscriptions.push(
      this.keyUpEventEmitter
        .pipe(
          debounceTime(this.typeaheadWaitMs),
          tap(t => this._typeAheadFacade.loadMatches(t)),
          switchMap(t => this._typeAheadFacade.matches$)
        )
        .subscribe((matches: TypeaheadMatch[]) => {
          this.finalizeAsyncCall(matches);
        })
    );
  }
  changeModel(match: TypeaheadMatch): void {
    this.myElement.nativeElement.value = match.value;
    this.hide();
  }
}
