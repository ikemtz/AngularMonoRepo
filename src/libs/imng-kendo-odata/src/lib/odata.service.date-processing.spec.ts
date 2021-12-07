import { ODataService } from './odata.service';

describe('ODataService', () => {
  const service: ODataService = new ODataService(null);

  it('should handle Date', () => {
    const result = service.processDates(
      'http://www.someurl.com/odata/v1/students?$filter=transactionDate le 2021-12-07T14:13:18.438Z',
    );
    expect(result).toBe('http://www.someurl.com/odata/v1/students?$filter=transactionDate le 2021-12-07');
  });

  it('should not handle UTC Dates', () => {
    const result = service.processDates(
      'http://www.someurl.com/odata/v1/students?$filter=transactionDateUtc le 2021-12-07T14:13:18.438Z',
    );
    expect(result).toBe(
      'http://www.someurl.com/odata/v1/students?$filter=transactionDateUtc le 2021-12-07T14:13:18.438Z',
    );
  });
  it('should handle null query string', () => {
    const result = service.processDates(null);
    expect(result).toBeNull();
  });
});
