import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ODataClientService } from './odata-client.service';

describe('ODataClientService getODataString with Undefined filters', () => {
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

  it('should serialize ODataQueries with undefined field filters and sub filters', async () => {
    const result = service.getODataString({
      filter: {
        logic: 'and',
        filters: [
          {
            field: undefined as never,
            operator: 'eq',
            value: 'test',
          },
          {
            logic: 'or',
            filters: [
              {
                field: undefined as never,
                operator: 'eq',
                value: undefined,
              },
            ],
          },
          {
            logic: 'or',
            filters: [
              {
                field: 'a',
                operator: 'contains',
                value: '1',
              },
              {
                field: 'b',
                operator: 'notContains',
                value: '2',
              },
            ],
          },
        ],
      },
    });
    expect(result.includes('undefined')).toBe(false);
    expect(result).toMatchSnapshot();
  });
});
