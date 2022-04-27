import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { mockConsoleError, mockConsoleGroup, mockConsoleWarn, readFirst } from 'imng-ngrx-utils/testing';

import { createMockProductFacade } from './add.component.spec';
import { ProductEditComponent } from './edit.component';
import { ProductCrudFacade } from './crud.facade';
import { IProduct, ProductProperties } from '../../../models/webapi';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  let facade: ProductCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [ProductEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule, DropDownsModule,],
      providers: [{ provide: ProductCrudFacade, useValue: createDataEntryMockFacade(createMockProductFacade()) }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(ProductCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [ProductProperties.ID]: 'ID',
      [ProductProperties.NAME]: 'NAME',
      [ProductProperties.NUM]: 'NUM-num-10',
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
    facade.updateExistingEntity = jest.fn(x => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot({
      sellStartDate: expect.any(Date),
      sellEndDate: expect.any(Date),
      discontinuedDate: expect.any(Date),
    });

  });

  /**
   * Note: if this test fails, then you're missing validators in your forms.
   * Using form validators is typically a good idea.
   */
  test('should not update', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
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
