import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { readFirst } from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';
import { FilterOperators, ODataResult } from '../models';

import { ODataClientService } from './odata-client.service';

const testODataResult = (): ODataResult<{
  id: string;
  dt?: Date;
  dtDate?: Date;
  dtUtc?: Date;
}> => ({
  count: 2,
  value: [
    { id: 'x', dt: new Date(), dtDate: new Date(), dtUtc: new Date() },
    { id: 'y' },
  ],
});

describe('ODataClientService', () => {
  let service: ODataClientService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: {} }],
    });
    service = TestBed.inject(ODataClientService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should serialize ODataQueries with ODataResults', () => {
    let queryString = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (httpClient as any).get = jest.fn((x) => {
      queryString = x;
      return of(testODataResult());
    });
    readFirst(
      service.fetch(
        'imng.com',
        {
          select: ['A', 'b', '890'],
          top: 123,
          skip: 456,
        },
        {
          dateNullableProps: ['dtDate', 'dt'],
          utcNullableProps: ['dtUtc', 'dt'],
        },
      ),
    );
    expect(queryString).not.toContain('?&');
    expect(queryString).not.toContain('timestamp');
    expect(queryString).toMatchSnapshot();
  });

  it('should serialize ODataQueries with array results', () => {
    let queryString = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (httpClient as any).get = jest.fn((x) => {
      queryString = x;
      return of(testODataResult().value);
    });
    readFirst(
      service.fetch('imng.com', {
        select: ['A', 'b', '890'],
        top: 123,
        skip: 456,
      }),
    );
    expect(queryString).not.toContain('?&');
    expect(queryString).not.toContain('timestamp');
    expect(queryString).toMatchSnapshot();
  });

  it('should serialize ODataQueries with null results', () => {
    let queryString = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (httpClient as any).get = jest.fn((x) => {
      queryString = x;
      return of(null);
    });
    readFirst(
      service.fetch('imng.com', {
        select: ['A', 'b', '890'],
        top: 123,
        skip: 456,
        count: false,
      }),
    );
    expect(queryString).not.toContain('?&');
    expect(queryString).not.toContain('timestamp');
    expect(queryString).toMatchSnapshot();
  });

  it('should serialize ODataQueries with string Filters', () => {
    const queryString = service.getODataString({
      select: ['A', 'b', '890'],
      filter: {
        logic: 'and',
        filters: [
          { field: 'A', operator: FilterOperators.EqualTo, value: 1 },
          { field: 'b', operator: FilterOperators.GreaterThan, value: '2' },
          {
            field: 'b',
            operator: FilterOperators.GreaterThanOrEqual,
            value: '2',
          },
          { field: 'b', operator: FilterOperators.In, value: ['2', 3] },
          { field: 'b', operator: FilterOperators.LessThan, value: '2' },
          {
            field: 'b',
            operator: FilterOperators.LessThanOrEqual,
            value: '2',
          },
          {
            logic: 'or',
            filters: [
              {
                field: 'subX',
                operator: FilterOperators.StartsWith,
                value: 'b',
              },
              { field: 'subY', operator: FilterOperators.IsNull },
              {
                logic: 'or',
                filters: [
                  {
                    childTable: 'sub-z',
                    linqOperation: 'all',
                    field: 'sub-sub-Z',
                    operator: FilterOperators.IsNull,
                  },
                ],
              },
            ],
          },
        ],
      },
      top: 123,
      skip: 456,
      expand: [{ table: 'xyz', select: ['id', 'abc'] }],
    });
    expect(queryString).not.toContain('?&');
    expect(queryString).not.toContain('timestamp');
    expect(queryString).toMatchSnapshot();
  });

  it('should serialize ODataQueries with cacheBusting', () => {
    const queryString = service.getODataString(
      {
        select: ['A', 'b', '890'],
      },
      { bustCache: true },
    );
    expect(queryString).not.toContain('?&');
    expect(queryString).toContain('timestamp');
    expect(queryString).toHaveLength(55);
  });
});
