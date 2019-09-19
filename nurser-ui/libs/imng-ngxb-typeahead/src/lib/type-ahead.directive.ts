import { Directive, ChangeDetectorRef, ElementRef, Renderer2, ViewContainerRef, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { TypeaheadDirective, TypeaheadConfig, TypeaheadMatch } from 'ngx-bootstrap/typeahead'
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { NgControl } from '@angular/forms';
import { ITypeAheadFacade } from './itype-ahead-facade';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
@Directive({
  selector: '[imngTypeahead]'
})
export class ImngTypeAheadDirective extends TypeaheadDirective implements OnInit, OnDestroy {
  private _typeAheadFacade: ITypeAheadFacade;
  private subscriptions: Subscription[];


  constructor(cis: ComponentLoaderFactory, config: TypeaheadConfig, changeDetection: ChangeDetectorRef, element: ElementRef, ngControl: NgControl, renderer: Renderer2, viewContainerRef: ViewContainerRef) {
    super(cis, config, changeDetection, element, ngControl, renderer, viewContainerRef);
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
}
