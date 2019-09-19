import { Observable } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

export interface ITypeAheadFacade {
  matches$: Observable<TypeaheadMatch[]>;
  loadMatches(filterCriteria: string): void;
}
