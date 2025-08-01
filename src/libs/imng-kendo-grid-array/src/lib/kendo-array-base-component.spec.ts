import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { KendoArrayBasedComponent } from './kendo-array-base-component';
import { ImngArrayGridDirective } from './kendo-array-grid.directive';
import { of } from 'rxjs';
import { Subscribable } from 'imng-ngrx-utils';
import { GridComponent } from '@progress/kendo-angular-grid';
import { MockGridComponent } from 'imng-kendo-grid/testing';

describe('KendoArrayBaseComponent', () => {
  let component: KendoArrayGridTestComponent;
  let fixture: ComponentFixture<KendoArrayGridTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KendoArrayGridTestComponent, ImngArrayGridDirective],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: GridComponent,
          useClass: MockGridComponent,
        },
      ],
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
    component.dataStateChange({
      take: 3,
      skip: 7,
      sort: [{ field: 'id', dir: 'desc' }],
    });
    expect(component.state).toStrictEqual({
      take: 3,
      skip: 7,
      sort: [{ field: 'id', dir: 'desc' }],
    });
    expect(
      (component as unknown as { _gridData: [] })._gridData,
    ).toMatchSnapshot();
    expect(dataStateChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle pageChange', () => {
    const pageChangeSpy = jest.spyOn(component, 'pageChange');
    const dataStateChangeSpy = jest.spyOn(component, 'dataStateChange');

    component.pageChange({ take: 2, skip: 4 });
    expect(component.state).toStrictEqual({});
    expect(
      (component as unknown as { _gridData: [] })._gridData,
    ).toMatchSnapshot();
    expect(pageChangeSpy).toHaveBeenCalledTimes(1);
    expect(dataStateChangeSpy).toHaveBeenCalledTimes(0);
  });

  it('should handle filterChange', () => {
    component.filterChange({
      logic: 'and',
      filters: [{ field: 'id', operator: 'eq', value: '😒😒' }],
    });
    expect(component.state).toStrictEqual({});
  });

  it('should handle sortChange', () => {
    component.pageChange({ take: 3, skip: 1 });
    component.sortChange([{ field: 'id', dir: 'asc' }]);
    expect(component.state).toStrictEqual({});
    expect(
      (component as unknown as { _gridData: never })._gridData,
    ).toMatchSnapshot();
  });

  it('should destroy', () => {
    fixture.destroy();
    component.allSubscriptions.forEach((t) => expect(t.closed).toBeTruthy());
  });
});

@Component({
    selector: 'imng-test-component',
    template: ` <kendo-grid [imngArrayGrid]="this">
      <kendo-grid-column field="id" />
    </kendo-grid>
    {{ hasHiddenColumns$ | async }}`,
    standalone: false
})
export class KendoArrayGridTestComponent
  extends KendoArrayBasedComponent<object, object>
  implements Subscribable
{
  override state = {};
  props = {};
  constructor() {
    super();
    this.detail = [
      { id: 6 },
      { id: 9 },
      { id: 10 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 7 },
      { id: 8 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
    ];
    this.allSubscriptions.push(of(123).subscribe());
  }
}
