import { ODataService } from './odata.service';

describe('ODataService', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const service: ODataService = new ODataService(null as any); //NOSONAR

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = service.processDates(null as any); //NOSONAR
    expect(result).toBeNull();
  });
});
