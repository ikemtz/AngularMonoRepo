import { Injectable } from '@angular/core';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ODataState } from './odata-state';
import { ODataResult } from './odata-result';
import { firstRecord, mapToExtDataResult } from './odata-rxjs-operators';

@Injectable({
  providedIn: 'root',
})
export class ODataService {
  constructor(private http: HttpClient) {}

  public fetch<T>(
    odataEndpoint: string,
    state: ODataState,
    utcNullableProps: string[] = [],
    dateNullableProps: string[] = [],
  ): Observable<ODataResult<T>> {
    const countClause = state.count === false ? '' : '&$count=true';
    const queryStr = `${this.getODataString(state)}${countClause}`;
    return this.http
      .get(`${odataEndpoint}?${queryStr}`)
      .pipe(mapToExtDataResult<T>(utcNullableProps, dateNullableProps));
  }

  public fetchByPrimaryKey<T>(odataEndpoint: string, id: string, state?: ODataState): Observable<T> {
    const request = <ODataState>{
      expanders: state.expanders,
      filter: {
        logic: 'and',
        filters: [{ operator: 'eq', field: 'id', value: id }],
      },
    };

    const queryStr = this.getODataString(request);
    return this.http.get(`${odataEndpoint}?${queryStr}`).pipe(
      mapToExtDataResult<T>(),
      firstRecord<T>(),
    );
  }

  private getODataString(state: ODataState): string {
    const guidRegex = /\'[0-9A-F]{8}-?[0-9A-F]{4}-?[0-9A-F]{4}-?[0-9A-F]{4}-?[0-9A-F]{12}\'?/gi;

    let queryString = toODataString(state);
    if (state.expanders && state.expanders.length > 0) {
      queryString += `&$expand=${state.expanders.join()}`;
    }
    if (state.selectors && state.selectors.length > 0) {
      queryString += `&$select=${state.selectors.join()}`;
    }
    let m: RegExpExecArray;
    while ((m = guidRegex.exec(queryString)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === guidRegex.lastIndex) {
        guidRegex.lastIndex++;
      }

      m.forEach(match => {
        queryString = queryString.replace(match, match.replace(/'/g, ''));
      });
    }
    queryString = this.processInFilter(state, queryString);
    return queryString;
  }

  private processInFilter(state: ODataState, queryString: string): string {
    if (!state.inFilter) {
      return queryString;
    }
    const deDupedVals = Array.from(new Set(state.inFilter.values.filter(f => f)));
    const inFilterString = `(${state.inFilter.field} in (${deDupedVals.map(m => `'${m}'`).join(',')}))`;
    if (!queryString || queryString.trim().length === 0) {
      return `$filter=${inFilterString}`;
    }
    if (queryString.match(/\$Filter=/gi)) {
      //Todo: handle additional filters
      return queryString;
    } else {
      return `${queryString}&$filter=${inFilterString}`;
    }
  }
}
