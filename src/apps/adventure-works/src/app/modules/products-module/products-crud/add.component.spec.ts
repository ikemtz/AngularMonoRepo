import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import {
  mockConsoleError,
  mockConsoleGroup,
  mockConsoleWarn,
  readFirst,
} from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';
import { IProduct } from '../../../models/webapi';
import {
  createTestProduct,
  createTestProductModel,
  createTestProductCategory,
} from '../../../models/odata';

import { ProductAddComponent } from './add.component';
import { ProductCrudFacade } from './crud.facade';

export function createMockProductFacade() {
  return {
    currentEntity$: of({}),
    productModels$: of([
      { id: 'abc', name: 'abc', description: 'abc' },
      { id: 'xyz', name: 'xyz', description: 'xyz' },
    ]),
    loadProductModels: jest.fn(),
    productCategories$: of([
      { id: 'abc', name: 'abc' },
      { id: 'xyz', name: 'xyz' },
    ]),
    loadProductCategories: jest.fn(),
  };
}

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;
  let facade: ProductCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [ProductAddComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        DatePickerModule,
        DropDownsModule,
      ],
      providers: [
        {
          provide: ProductCrudFacade,
          useValue: createDataEntryMockFacade(createMockProductFacade()),
        },
      ],
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
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should save', () => {
    component.initForm();

    component.addEditForm.patchValue(createTestProduct());
    component.addEditForm.controls.productModel?.patchValue(
      createTestProductModel(),
    );
    component.addEditForm.controls.productCategory?.patchValue(
      createTestProductCategory(),
    );

    let item: IProduct | undefined;
    facade.saveNewEntity = jest.fn((x) => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(1);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);

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
  test('should not save', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });

  test('should support ProductModel filters', async () => {
    component.handleProductModelFilter('xy');
    const result = await readFirst(component.productModels$);
    expect(result).toStrictEqual([
      { id: 'xyz', name: 'xyz', description: 'xyz' },
    ]);
  });

  test('should support ProductCategory filters', async () => {
    component.handleProductCategoryFilter('xy');
    const result = await readFirst(component.productCategories$);
    expect(result).toStrictEqual([{ id: 'xyz', name: 'xyz' }]);
  });
});
