import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ODataClientService } from './odata-client.service';

describe('ODataClientService should filter out invalid filters', () => {
  let service: ODataClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: {} }],
    });
    service = TestBed.inject(ODataClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should serialize ODataQueries without duplicate parentheses on filters', async () => {
    const result = service.getODataString({
      filter: {
        logic: 'and',
        filters: [
          {
            logic: 'or',
            filters: [
              {
                field: 'a',
                operator: 'eq',
                value: '1',
              },
              {
                field: undefined as never,
                operator: 'eq',
                value: 'should not be included',
              },
              {
                field: null as never,
                operator: 'eq',
                value: 'should not be included',
              },
              {
                field: '',
                operator: 'eq',
                value: 'should not be included',
              },
            ],
          },
        ],
      },
    });
    expect(result.includes('undefined')).toBe(false);
    expect(result.includes('null')).toBe(false);
    expect(result.includes("''")).toBe(false);
    expect(result.includes('((')).toBe(false);
    expect(result.includes('))')).toBe(false);
    expect(result).toMatchSnapshot();
  });

  it('should not include invalid filters', async () => {
    const result = service.getODataString({
      filter: {
        logic: 'and',
        filters: [
          {
            logic: 'or',
            filters: [
              {
                field: undefined as never,
                operator: 'eq',
                value: 'should not be included',
              },
              {
                field: null as never,
                operator: 'eq',
                value: 'should not be included',
              },
              {
                field: '',
                operator: 'eq',
                value: 'should not be included',
              },
            ],
          },
        ],
      },
    });
    expect(result.includes('$filter')).toBe(false);
    expect(result).toMatchSnapshot();
  });

  it('should not include invalid subfilters', async () => {
    const result = service.getODataString({
      filter: {
        logic: 'and',
        filters: [
          {
            logic: 'or',
            filters: [
              {
                logic: 'or',
                filters: [
                  {
                    field: undefined as never,
                    operator: 'eq',
                    value: 'should not be included',
                  },
                  {
                    field: null as never,
                    operator: 'eq',
                    value: 'should not be included',
                  },
                  {
                    field: '',
                    operator: 'eq',
                    value: 'should not be included',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    expect(result).toMatchSnapshot();
    expect(result.includes('$filter')).toBe(false);
  });
});
