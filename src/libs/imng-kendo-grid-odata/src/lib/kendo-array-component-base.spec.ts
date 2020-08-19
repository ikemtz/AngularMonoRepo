import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { KendoArrayComponentBase } from './kendo-array-component-base';
import { GridModule, GridComponent } from '@progress/kendo-angular-grid';
import { ImngArrayGridDirective } from './kendo-array-grid.directive';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

describe('KendoODataComponentBase', () => {
  let component: KendoArrayGridTestComponent;
  let fixture: ComponentFixture<KendoArrayGridTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KendoArrayGridTestComponent, ImngArrayGridDirective],
      imports: [GridModule],

      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoArrayGridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should handle dataStateChange', () => {
    const grid = fixture.debugElement.query(By.directive(GridComponent)).injector.get(GridComponent);
    grid.dataStateChange.emit({ take: 99, skip: 1000 });
    expect(component.state).toStrictEqual({ take: 99, skip: 1000 });
  });

  it('should destroy', () => {
    const imngDirective = fixture.debugElement.query(By.directive(ImngArrayGridDirective)).injector.get(ImngArrayGridDirective);
    imngDirective.ngOnDestroy();
    (imngDirective as any).subscriptions.forEach((t: Subscription) => expect(t.closed).toBeTruthy());
  });
});

@Component({
  selector: 'imng-test-component',
  template: '<kendo-grid [imngArrayGrid]="this" name="testGrid"></kendo-grid>',
})
export class KendoArrayGridTestComponent extends KendoArrayComponentBase<object, object> {
  state = {};
  props = {};
  constructor() {
    super();
    this.detail = [];
  }
}
