import { createDataEntryMockFacade } from './data-entry-mock.facade';

describe('Testing createDataEntryMockFacade', () => {
  it('should create', () => {
    const mockFacade = createDataEntryMockFacade();
    expect(mockFacade).toBeTruthy();
    expect(mockFacade).toMatchSnapshot();
  });
  it('should expand', () => {
    const mockFacade = createDataEntryMockFacade({ super: '🦸‍♀️' });
    expect(mockFacade).toBeTruthy();
    expect((mockFacade as any).super).toBe('🦸‍♀️');
  });
});
