import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductAddComponent } from './add.component';
import { ProductCrudFacade } from './crud.facade';
import { IProduct, ProductProperties } from '../../../models/webapi';
import { of } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

export function createMockProductFacade() {
  return {
    currentEntity$: of({}),
    productModels$: of([
      { id: 'abc', name: 'abc', description: 'abc', },
      { id: 'xyz', name: 'xyz', description: 'xyz', },]),
    loadProductModels: jest.fn(),
    productCategories$: of([
      { id: 'abc', name: 'abc', },
      { id: 'xyz', name: 'xyz', },]),
    loadProductCategories: jest.fn(),
  };
}
describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;
  let facade: ProductCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule, DropDownsModule],
      providers: [{
        provide: ProductCrudFacade, useValue: createDataEntryMockFacade(createMockProductFacade())
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(ProductCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should save', () => {
    component.initForm();
    component.addEditForm?.patchValue({
      [ProductProperties.ID]: 'ID',
      [ProductProperties.NAME]: 'NAME',
      [ProductProperties.NUM]: 'NUM',
      [ProductProperties.COLOR]: 'COLOR',
      [ProductProperties.STANDARD_COST]: 0,
      [ProductProperties.LIST_PRICE]: 0,
      [ProductProperties.SIZE]: 'SIZE',
      [ProductProperties.WEIGHT]: 0,
      [ProductProperties.PRODUCT_CATEGORY_ID]: 'PRODUCT_CATEGORY_ID',
      [ProductProperties.PRODUCT_MODEL_ID]: 'PRODUCT_MODEL_ID',
      [ProductProperties.SELL_START_DATE]: new Date(),
      [ProductProperties.SELL_END_DATE]: new Date(),
      [ProductProperties.DISCONTINUED_DATE]: new Date(),
      [ProductProperties.THUMB_NAIL_PHOTO]: 'THUMB_NAIL_PHOTO',
      [ProductProperties.PRODUCT_MODEL]: 'PRODUCT_MODEL',
      [ProductProperties.PRODUCT_CATEGORY]: 'PRODUCT_CATEGORY',
    });

    let item: IProduct | undefined;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot({
      sellStartDate: expect.any(Date),
      sellEndDate: expect.any(Date),
      discontinuedDate: expect.any(Date),
    });

  });

  test('should not save', () => {
    component.addEditForm = { valid: false } as never;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
  });

  test('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });

  test('should support ProductModel filters', async () => {
    component.handleProductModelFilter('xy');
    const result = await readFirst(component.productModels$);
    expect(result).toStrictEqual([{ id: 'xyz', name: 'xyz', description: 'xyz', }]);
  });

  test('should support ProductCategory filters', async () => {
    component.handleProductCategoryFilter('xy');
    const result = await readFirst(component.productCategories$);
    expect(result).toStrictEqual([{ id: 'xyz', name: 'xyz', }]);
  });
});
