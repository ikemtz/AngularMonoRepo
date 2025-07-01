import { waitForAsync, TestBed } from '@angular/core/testing';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';

describe('ODataService', () => {
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

  it('should handle Date', () => {
    const result = odataService.processDates(
      'http://www.someurl.com/odata/v1/students?$filter=transactionDate le 2021-12-07T14:13:18.438Z',
    );
    expect(result).toBe(
      'http://www.someurl.com/odata/v1/students?$filter=transactionDate le 2021-12-07',
    );
  });

  it('should not handle UTC Dates', () => {
    const result = odataService.processDates(
      'http://www.someurl.com/odata/v1/students?$filter=transactionDateUtc le 2021-12-07T14:13:18.438Z',
    );
    expect(result).toBe(
      'http://www.someurl.com/odata/v1/students?$filter=transactionDateUtc le 2021-12-07T14:13:18.438Z',
    );
  });
  it('should handle null query string', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = odataService.processDates(null as any); //NOSONAR
    expect(result).toBeNull();
  });
});
