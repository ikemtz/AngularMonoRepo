import { TestBed } from '@angular/core/testing';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ODataState } from './odata-state';
import { readFirst } from 'imng-ngrx-utils/testing';
import { createEmptyODataResult } from './odata-result';

describe('ODataService Exists Filter', () => {
  let service: ODataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: { get: jest.fn(() => of(createEmptyODataResult())) },
        },
      ],
    });
    service = TestBed.inject(ODataService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should support exists filter any', async () => {
    const gridState: ODataState = {
      count: false,
      childFilters: {
        logic: 'and',
        existsFilters: [
          {
            childTableNavigationProperty: 'childTable1',
          },
        ],
      },
    };
    await readFirst(service.fetch('//idunno.com', gridState));
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?&$filter=childTable1/any()`,
    );
  });

  it('should support multiple exists filters any', async () => {
    const gridState: ODataState = {
      count: false,
      childFilters: {
        logic: 'and',
        existsFilters: [
          {
            childTableNavigationProperty: 'childTable1',
          },
          {
            childTableNavigationProperty: 'childTable2',
          },
        ],
      },
    };
    await readFirst(service.fetch('//idunno.com', gridState));
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?&$filter=childTable2/any() and childTable1/any()`,
    );
  });

  it('should support multiple exists filters all', async () => {
    const gridState: ODataState = {
      count: false,
      childFilters: {
        logic: 'and',
        existsFilters: [
          {
            childTableNavigationProperty: 'childTable1',
            linqOperation: 'all',
            filter: 'ct1:ct1/Quantity gt 100',
          },
          {
            childTableNavigationProperty: 'childTable2',
            linqOperation: 'all',
            filter: 'ct2:ct2/Quantity lt 50',
          },
        ],
      },
    };
    await readFirst(service.fetch('//idunno.com', gridState));
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?&$filter=childTable2/all(ct2:ct2/Quantity lt 50) and childTable1/all(ct1:ct1/Quantity gt 100)`,
    );
  });
  it('should support multiple exists filters with regular filters', async () => {
    const gridState: ODataState = {
      count: false,
      filter: {
        logic: 'and',
        filters: [{ field: 'name', operator: 'contains', value: 'test' }],
      },
      childFilters: {
        logic: 'and',
        existsFilters: [
          {
            childTableNavigationProperty: 'childTable1',
            linqOperation: 'any',
            filter: 'ct1:ct1/Quantity gt 100',
          },
          {
            childTableNavigationProperty: 'childTable2',
            linqOperation: 'all',
            filter: 'ct2:ct2/Quantity lt 50',
          },
        ],
      },
    };
    await readFirst(service.fetch('//idunno.com', gridState));
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?$filter=childTable2/all(ct2:ct2/Quantity lt 50) and childTable1/any(ct1:ct1/Quantity gt 100) and contains(name,'test')`,
    );
  });
});
