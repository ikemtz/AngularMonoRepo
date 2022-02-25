import { createODataGridMockFacade } from './kendo-odata-grid-mock-facade';

describe('Mock OData Facade Creator', () => {
  it('createODataGridMockFacade() should work with undefined', async () => {
    const result = createODataGridMockFacade();
    expect(result).toMatchSnapshot();
  });
  it('createODataGridMockFacade() should work', async () => {
    const result = createODataGridMockFacade({});
    expect(result).toMatchSnapshot();
  });
});
