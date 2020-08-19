import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { KendoArrayComponentBase } from './kendo-array-component-base';
import { GridModule } from '@progress/kendo-angular-grid';
import { ImngArrayGridDirective } from './kendo-array-grid.directive';

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
});

@Component({
  selector: 'imng-test-component',
  template: '<kendo-grid [imngArrayGrid]="this"></kendo-grid>',
})
export class KendoArrayGridTestComponent extends KendoArrayComponentBase<object, object> {
  state = {};
  props = {};
  constructor() {
    super();
  }
}
