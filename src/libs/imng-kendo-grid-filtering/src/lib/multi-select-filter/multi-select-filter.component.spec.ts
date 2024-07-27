import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterService } from '@progress/kendo-angular-grid';

import { MultiSelectFilterComponent } from './multi-select-filter.component';

describe('CheckboxFilterComponent', () => {
  let component: MultiSelectFilterComponent;
  let fixture: ComponentFixture<MultiSelectFilterComponent>;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectFilterComponent],
      providers: [{ provide: FilterService, useValue: { filter: jest.fn() } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectFilterComponent);
    filterService = TestBed.inject(FilterService);
    component = fixture.componentInstance;
    component.isPrimitive = true;
    component.data = ['👌', '🎂', '💩'];
    component.field = '🩲';
    component.odataState = {
      filter: {
        logic: 'and',
        filters: [
          {
            logic: 'or',
            filters: [
              { field: component.field, operator: 'contains', value: '💩' },
            ],
          },
        ],
      },
    };
    component.ngAfterViewInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.value).toStrictEqual(['💩']);
  });

  it('should handle empty filter scenarios', () => {
    component.odataState = {};
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
    expect(component.value).toStrictEqual([]);
  });

  it('isItemSelected should work', () => {
    expect(component.isItemSelected('💩')).toBeTruthy();
  });
  it('onInput should work', () => {
    component.onInput({ target: { value: '💩' } });
    expect(component.currentData).toStrictEqual(['💩']);
  });
  it('onFocus should work', () => {
    const ul = {
      offsetTop: 3,
      offsetHeight: 1,
      parentNode: { scrollTop: 5, offsetHeight: 10 },
    };
    const spy = jest.spyOn(component.changeDetectorRef, 'markForCheck');
    component.onFocus(ul as never);
    expect(spy).toBeCalledTimes(1);
    expect(ul.parentNode.scrollTop).toBe(3);
  });
  it('onSelectionChange should work', () => {
    component.onSelectionChange('🎂', { parentNode: {} } as never);
    expect(component.value).toStrictEqual(['💩', '🎂']);
    expect(filterService.filter).toBeCalledTimes(1);
    expect(filterService.filter).toHaveBeenCalledWith({
      filters: [
        {
          filters: [
            { field: '🩲', operator: 'eq', value: '💩' },
            { field: '🩲', operator: 'eq', value: '🎂' },
          ],
          logic: 'or',
        },
      ],
      logic: 'and',
    });
  });
  it('onSelectionChange should clear filter', () => {
    component.onSelectionChange('💩', { parentNode: {} } as never);
    expect(component.value).toStrictEqual([]);
    expect(filterService.filter).toBeCalledTimes(1);
    expect(filterService.filter).toHaveBeenCalledWith({
      filters: [],
      logic: 'and',
    });
  });
});
