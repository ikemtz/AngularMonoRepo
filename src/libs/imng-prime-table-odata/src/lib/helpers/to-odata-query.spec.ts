import { ODataClientService } from 'imng-odata-client';
import { toODataQuery } from './to-odata-query';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('toODataQuery', () => {
  it('should convert empty State', () => {
    const result = toODataQuery({});
    expect(result).toMatchSnapshot();
  });
  it('should convert typical State', () => {
    const result = toODataQuery({
      multiSortMeta: [
        { field: 'abc', order: 1 },
        { field: 'xyz', order: -1 },
      ],
      filters: {
        abc: [{ operator: 'all', matchMode: 'equals', value: 'xyz' }],
      },
    });
    expect(result).toMatchSnapshot();
  });
  it('should convert state with Child Filter', () => {
    const result = toODataQuery({
      multiSortMeta: [
        { field: 'abc', order: 1 },
        { field: 'xyz', order: -1 },
      ],
      filters: {
        ['abc.bdf/xyz']: [
          { operator: 'all', matchMode: 'equals', value: '123' },
        ],
      },
    });
    expect(result).toMatchSnapshot();
  });
  it('should convert state with parent Filters', () => {
    TestBed.configureTestingModule({
      providers: [
        ODataClientService,
        {
          provide: HttpClient,
          useValue: { get: jest.fn(() => of({})) },
        },
      ],
    }).compileComponents();
    const svc = TestBed.inject(ODataClientService);
    const query = toODataQuery({
      multiSortMeta: [
        { field: 'abc', order: 1 },
        { field: 'xyz', order: -1 },
      ],
      filters: {
        ['abc.bdf.xyz']: [
          { operator: 'all', matchMode: 'equals', value: '123' },
        ],
      },
    });
    const odataString = svc.getODataString(query);
    expect(odataString).toBe(
      `$filter=((abc/bdf/xyz+eq+'123'))&$orderby=abc,xyz+desc&$count=true`,
    );
  });
  it('should convert with no filters', () => {
    const result = toODataQuery({
      multiSortMeta: [
        { field: 'abc', order: 1 },
        { field: 'xyz', order: -1 },
      ],
    });
    expect(result).toMatchSnapshot();
  });
  it('should convert no sorting', () => {
    const result = toODataQuery({
      filters: {
        abc: [{ operator: 'all', matchMode: 'equals', value: 'xyz' }],
      },
    });
    expect(result).toMatchSnapshot();
  });
});
