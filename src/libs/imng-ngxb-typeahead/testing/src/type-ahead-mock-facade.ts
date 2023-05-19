import { of, Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ImngTypeAheadFacade } from 'imng-ngxb-typeahead';

export class TypeAheadMockFacade implements ImngTypeAheadFacade<object> {
  matches$: Observable<[]> = of([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadMatches(filterCriteria: string): void {
    //This is intentional
  }
}

export function createTypeAheadMockFacade(
  mockFacade?: TypeAheadMockFacade,
): TypeAheadMockFacade {
  const localFacade = new TypeAheadMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.matches$ = mockFacade.matches$ || localFacade.matches$;
  mockFacade.loadMatches = mockFacade.loadMatches || jest.fn();
  return mockFacade;
}
