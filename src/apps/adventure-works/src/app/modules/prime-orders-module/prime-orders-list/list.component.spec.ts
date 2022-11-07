import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createODataTableMockFacade } from 'imng-prime-table-odata/testing';

import { PrimeOrderListComponent } from './prime-list.component';
import { PrimeOrderListFacade } from './prime-list.facade';

describe('OrderListComponent', () => {
  let component: PrimeOrderListComponent;
  let fixture: ComponentFixture<PrimeOrderListComponent>;
  let listFacade: PrimeOrderListFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeOrderListComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: PrimeOrderListFacade,
          useValue: createODataTableMockFacade(),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(PrimeOrderListFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle reload', () => {
    component.reloadEntities();
    expect(listFacade.reloadEntities).toBeCalledTimes(1);
  });
});
