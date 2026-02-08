import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ODataClientService } from './odata-client.service';

describe('ODataClientService should filter out empty array filters', () => {
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

  it('should serialize ODataQueries and filter out empty array filters', async () => {
    const result = service.getODataString({
      filter: {
        logic: 'and',
        filters: [
          {
            logic: 'or',
            filters: [
              {
                field: 'a',
                operator: 'in',
                value: ['1'],
              },
              {
                field: 'a',
                operator: 'notIn',
                value: ['1'],
              },
              {
                field: 'IGNORED',
                operator: 'in',
                value: [],
              },
              {
                field: 'IGNORED',
                operator: 'notIn',
                value: [],
              },
            ],
          },
        ],
      },
    });
    expect(result).toMatchSnapshot();
  });
});
