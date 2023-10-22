import { createDataDeleteMockFacade } from './data-delete-mock.facade';

describe('Testing createDeleteEntryMockFacade', () => {
  it('should create', () => {
    const mockFacade = createDataDeleteMockFacade();
    expect(mockFacade).toBeTruthy();
    expect(mockFacade.deleteExistingEntity).toBeTruthy();
    expect(mockFacade).toMatchSnapshot();
  });
  it('should expand', () => {
    const mockFacade = createDataDeleteMockFacade({
      super: '🦸‍♀️',
    });
    expect(mockFacade).toBeTruthy();
    expect(mockFacade.super).toBe('🦸‍♀️');
    expect(mockFacade.deleteExistingEntity).toBeTruthy();
  });
});
