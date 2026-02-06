import { waitForAsync, TestBed } from '@angular/core/testing';
import { ODataState } from './odata-state';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';

describe('filter operation', () => {
  let odataService: ODataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: { get: jest.fn() },
        },
        ODataService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    odataService = TestBed.inject(ODataService);
  });
  it('should handle a mix of standard filters and string filters', () => {
    const gridState: ODataState = {
      compute: ['x mul 1000 as z'],
      selectors: ['id', 'name'],
      expanders: [
        { table: 'childTable1', selectors: ['id', 'name'] },
        { table: 'childTable2' },
      ],
      filter: {
        logic: 'and',
        filters: [{ field: 'name', operator: 'eq', value: 'test' }],
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const result = odataService.getODataString(gridState);

    expect(result).toStrictEqual(
      `$compute=x mul 1000 as z&$filter=(name eq 'test')&$expand=childTable1($select=id,name),childTable2&$select=id,name`,
    );
  });
});
