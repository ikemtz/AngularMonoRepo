import { TestBed } from '@angular/core/testing';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ODataState } from './odata-state';
import { readFirst } from 'imng-ngrx-utils/testing';
import { createODataPayload } from './odata-payload';

describe('ODataService Embedded Filter', () => {
  let service: ODataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: { get: jest.fn(() => of(createODataPayload([]))) },
        },
      ],
    });
    service = TestBed.inject(ODataService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should support embedded filters with relativeValue', async () => {
    const gridState: ODataState = {
      selectors: ['id', 'name'],

      expanders: [
        {
          table: 'childTable2',
          filter: {
            logic: 'and',
            filters: [
              {
                field: 'field1',
                operator: 'eq',
                value: 'abc',
                isRelativeValue: true,
              },
            ],
          },
        },
        {
          table: 'childTable1',
          selectors: ['id', 'name'],
          filter: {
            logic: 'and',
            filters: [
              {
                field: 'field1',
                operator: 'eq',
                value: 'abc',
                isRelativeValue: true,
              },
            ],
          },
        },
      ],
    };
    await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect((httpClient.get as jest.Mock).mock.calls).toMatchSnapshot();
  });
});
