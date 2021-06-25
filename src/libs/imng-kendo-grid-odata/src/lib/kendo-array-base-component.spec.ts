import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { KendoArrayBasedComponent } from './kendo-array-base-component';
import { GridModule, GridComponent } from '@progress/kendo-angular-grid';
import { ImngArrayGridDirective } from './kendo-array-grid.directive';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';

const template = '<kendo-grid [imngArrayGrid]="this"><kendo-grid-column field="id"></kendo-grid-column></kendo-grid>';
describe('KendoODataComponentBase', () => {
  let component: KendoArrayGridTestComponent;
  let fixture: ComponentFixture<KendoArrayGridTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KendoArrayGridTestComponent, ImngArrayGridDirective],
      imports: [GridModule],

      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoArrayGridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle dataStateChange', () => {
    const dataStateChangeSpy = jest.spyOn(component, 'dataStateChange');
    const grid = fixture.debugElement.query(By.directive(GridComponent)).injector.get(GridComponent);
    grid.dataStateChange.emit({ take: 3, skip: 7, sort: [{ field: 'id', dir: 'desc' }] });
    expect(component.state).toStrictEqual({ take: 3, skip: 7, sort: [{ field: 'id', dir: 'desc' }] });
    expect((component as unknown as { _gridData; })._gridData).toMatchSnapshot();
    expect(dataStateChangeSpy).toBeCalledTimes(1);
  });

  it('should handle pageChange', () => {
    const pageChangeSpy = jest.spyOn(component, 'pageChange');
    const dataStateChangeSpy = jest.spyOn(component, 'dataStateChange');
    const grid = fixture.debugElement.query(By.directive(GridComponent)).injector.get(GridComponent);
    grid.pageChange.emit({ take: 2, skip: 4 });
    expect(component.state).toStrictEqual({ take: 2, skip: 4, group: [], sort: [], filter: undefined });
    expect((component as unknown as { _gridData; })._gridData).toMatchSnapshot();
    expect(pageChangeSpy).toBeCalledTimes(1);
    expect(dataStateChangeSpy).toBeCalledTimes(1);
  });

  it('should handle filterChange', () => {
    const grid = fixture.debugElement.query(By.directive(GridComponent)).injector.get(GridComponent);
    grid.filterChange.emit({ logic: 'and', filters: [{ field: 'id', operator: 'eq', value: '😒😒' }] });
    expect(component.state).toStrictEqual({
      take: undefined, skip: 0, group: [], sort: [], filter:
        { logic: 'and', filters: [{ field: 'id', operator: 'eq', value: '😒😒' }] }
    });
  });

  it('should handle sortChange', () => {
    const dataStateChangeSpy = jest.spyOn(component, 'dataStateChange');
    const sortChangeSpy = jest.spyOn(component, 'sortChange');
    const grid = fixture.debugElement.query(By.directive(GridComponent)).injector.get(GridComponent);
    grid.pageChange.emit({ take: 3, skip: 1 });
    grid.sortChange.emit([{ field: 'id', dir: 'asc' }]);
    expect(component.state).toStrictEqual({ filter: undefined, take: 3, skip: 1, group: [], sort: [{ field: 'id', dir: 'asc' }] });
    expect((component as unknown as { _gridData: never; })._gridData).toMatchSnapshot();
    expect(dataStateChangeSpy).toBeCalledTimes(2);
    expect(sortChangeSpy).toBeCalledTimes(1);
  });

  it('should destroy', () => {
    const imngDirective = fixture.debugElement.query(By.directive(ImngArrayGridDirective)).injector.get(ImngArrayGridDirective);
    fixture.destroy();
    (imngDirective as unknown as { allSubscriptions: Subscriptions; }).allSubscriptions.forEach((t) => expect(t.closed).toBeTruthy());
  });
});

@Component({
  selector: 'imng-test-component',
  template: template,
})
export class KendoArrayGridTestComponent
  // eslint-disable-next-line @typescript-eslint/ban-types
  extends KendoArrayBasedComponent<object, object>
  implements Subscribable {
  state = {};
  props = {};
  constructor() {
    super();
    this.detail = [{ id: 6 }, { id: 9 }, { id: 10 }, { id: 1 },
    { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 7 }, { id: 8 },
    { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 },
    { id: 17 }, { id: 18 }, { id: 19 }];
    this.allSubscriptions.push(of(123).subscribe());
  }
}
