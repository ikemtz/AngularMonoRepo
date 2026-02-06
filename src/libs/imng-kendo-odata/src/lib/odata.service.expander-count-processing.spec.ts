import { TestBed } from '@angular/core/testing';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';
import { ODataState } from './odata-state';
import { readFirst } from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';
import { emptyODataResult } from './odata-result';

describe('ODataService Expander Count Processing', () => {
  let service: ODataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ODataService, { provide: HttpClient, useValue: {} }],
    });
    service = TestBed.inject(ODataService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should support basic operations', async () => {
    httpClient.get = jest.fn(() => of(emptyODataResult)) as never;
    const gridState: ODataState = {
      expanders: [{ table: 'childTable1', count: true }],
      count: false,
    };
    await readFirst(service.fetch('//idunno.com', gridState));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?$expand=childTable1($count=true)`,
    );
  });

  it('should support selector operations', async () => {
    httpClient.get = jest.fn(() => of(emptyODataResult)) as never;
    const gridState: ODataState = {
      expanders: [{ table: 'childTable1', selectors: ['a'], count: true }],
      count: false,
    };
    await readFirst(service.fetch('//idunno.com', gridState));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?$expand=childTable1($select=a;$count=true)`,
    );
  });

  it('should support selector & filters operations', async () => {
    httpClient.get = jest.fn(() => of(emptyODataResult)) as never;
    const gridState: ODataState = {
      expanders: [
        {
          table: 'childTable1',
          selectors: ['a'],
          filter: {
            filters: [{ field: 'x', operator: 'eq', value: 0 }],
            logic: 'and',
          },
          count: true,
        },
      ],
      count: false,
    };
    await readFirst(service.fetch('//idunno.com', gridState));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?$expand=childTable1($select=a;$filter=(x eq 0);$count=true)`,
    );
  });

  it('should support subExpansion operations', async () => {
    httpClient.get = jest.fn(() => of(emptyODataResult)) as never;
    const gridState: ODataState = {
      expanders: [
        {
          table: 'childTable1',
          count: true,
          expanders: [
            {
              table: 'childTable2',
              selectors: ['b'],
              filter: {
                filters: [{ field: 'y', operator: 'eq', value: 0 }],
                logic: 'and',
              },
              count: true,
            },
          ],
        },
      ],
      count: true,
    };
    await readFirst(service.fetch('//idunno.com', gridState));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?$expand=childTable1($expand=childTable2($select=b;$filter=(y eq 0);$count=true);$count=true)&$count=true`,
    );
  });
});
