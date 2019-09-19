import { Injectable } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { employeesQuery } from '../+state/employees.selectors';
import { EmployeeProperties } from '../../models/emp-odata';
import { ITypeAheadFacade } from '@nurser-ui/imng-ngxb-typeahead';
import { ODataGridState } from '@imko/kendo-grid-odata';
import { loadEntities } from '../+state/employees.actions';
import { createPayload } from '@nurser-ui/imng-ngrx-utils';
import { EmployeesPartialState } from '../+state/employees.reducer';

@Injectable({ providedIn: 'root' })
export class EmployeeTypeaheadFacade implements ITypeAheadFacade {
  matches$: Observable<TypeaheadMatch[]> = this.store.pipe(
    select(employeesQuery.getGridDataResult),
    filter(employees => !!employees),
    map(employees => employees.data.map(employee => new TypeaheadMatch(employee.id, `${employee.firstName} ${employee.lastName}`, false))));

  loadMatches(filterCrieria: string): void {
    const payload: ODataGridState = {
      //   selectors: [EmployeeProperties.ID, EmployeeProperties.NAME],
      filter: {
        logic: 'or',
        filters: [
          { field: EmployeeProperties.FIRST_NAME, operator: 'contains', value: filterCrieria },
          { field: EmployeeProperties.LAST_NAME, operator: 'contains', value: filterCrieria },
        ]
      },
      take: 10,
    };
    this.store.dispatch(loadEntities(createPayload(payload)));
  }

  constructor(private readonly store: Store<EmployeesPartialState>) { }
}
