import { waitForAsync, TestBed } from '@angular/core/testing';
import { ODataState } from './odata-state';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';

describe('compute operations', () => {
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
  it('should handle multiplication', () => {
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
      compute: [{ fieldA: 'x', fieldB: 1000, operator: 'mul', alias: 'z' }],
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const result = odataService.getODataString(gridState);

    expect(result).toStrictEqual(
      '$compute=x mul 1000 as z&$expand=childTable2,childTable1($select=id,name)&$select=id,name',
    );
  });
});
