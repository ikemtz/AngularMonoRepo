import { ImngTypeAheadFacade } from '..';
import { of } from 'rxjs';

export class ImngTypeAheadTestFacade implements ImngTypeAheadFacade<object> {
  matches$ = of([]);
  loadMatches(filterCriteria: string): void {}
}
