import { of, Observable } from 'rxjs';
import { ImngTypeAheadFacade } from 'imng-ngxb-typeahead';

export class TypeAheadMockFacade implements ImngTypeAheadFacade<object> {
  matches$: Observable<[]> = of([]);
  loadMatches(filterCriteria: string): void {}
}

export function createTypeAheadMockFacade(mockFacade?: TypeAheadMockFacade): TypeAheadMockFacade {
  const localFacade = new TypeAheadMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.matches$ = mockFacade.matches$ || localFacade.matches$;
  mockFacade.loadMatches = mockFacade.loadMatches || jest.fn(() => {});
  return mockFacade;
}
