import { ImngTypeAheadFacade } from '..';
import { of, Observable } from 'rxjs';

export class ImngTypeAheadTestFacade implements ImngTypeAheadFacade<object> {
  matches$: Observable<[]> = of([]);

  public static create(mockFacade?: ImngTypeAheadTestFacade): ImngTypeAheadTestFacade {
    const localFacade = new ImngTypeAheadTestFacade();
    if (!mockFacade) {
      return localFacade;
    }
    return {
      ...mockFacade,
      matches$: mockFacade.matches$ || localFacade.matches$,
      loadMatches: mockFacade.loadMatches || localFacade.loadMatches,
    };
  }

  loadMatches(filterCriteria: string): void {}
}
