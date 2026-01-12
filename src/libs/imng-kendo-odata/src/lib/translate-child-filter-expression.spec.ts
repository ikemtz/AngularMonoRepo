import { TestBed, waitForAsync } from '@angular/core/testing';
import { ODataState } from './odata-state';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';
import { emptyODataResult } from './odata-result';
import { of } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';

describe('translateChildFilterExpression', () => {
  let odataService: ODataService;
  let httpClient: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: { get: jest.fn(() => of(emptyODataResult)) },
        },
        ODataService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    odataService = TestBed.inject(ODataService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should handle OR child filtering as well as regular filtering', async () => {
    const odataState: ODataState = {
      expanders: [{ table: 'a' }],
      childFilters: {
        logic: 'or',
        externalLogic: 'or',
        filters: [
          {
            field: 'a',
            linqOperation: 'any',
            childTableNavigationProperty: 'y',
            operator: 'eq',
            value: 5,
          },
          {
            field: 'b',
            linqOperation: 'any',
            childTableNavigationProperty: 'y',
            operator: 'eq',
            value: 5,
          },
        ],
      },
      filter: {
        logic: 'or',
        filters: [
          { field: 't', operator: 'eq', value: 10 },
          { field: 'u', operator: 'contains', value: '3' },
        ],
      },
    };
    await readFirst(odataService.fetch('url', odataState));
    expect(httpClient.get).toHaveBeenCalledWith(
      `url?$filter=(y/any(o: o/a eq 5) or y/any(o: o/b eq 5)) or (t eq 10 or contains(u,'3'))&$expand=a&$count=true`,
    );
  });

  it('should handle external logic undefined child filtering as well as regular filtering', async () => {
    const odataState: ODataState = {
      expanders: [{ table: 'a' }],
      childFilters: {
        logic: 'or',
        filters: [
          {
            field: 'a',
            linqOperation: 'any',
            childTableNavigationProperty: 'y',
            operator: 'eq',
            value: 5,
          },
          {
            field: 'b',
            linqOperation: 'any',
            childTableNavigationProperty: 'y',
            operator: 'eq',
            value: 5,
          },
        ],
      },
      filter: {
        logic: 'or',
        filters: [
          { field: 't', operator: 'eq', value: 10 },
          { field: 'u', operator: 'contains', value: '3' },
        ],
      },
    };
    await readFirst(odataService.fetch('url', odataState));
    expect(httpClient.get).toHaveBeenCalledWith(
      `url?$filter=(y/any(o: o/a eq 5) or y/any(o: o/b eq 5)) and (t eq 10 or contains(u,'3'))&$expand=a&$count=true`,
    );
  });
});
