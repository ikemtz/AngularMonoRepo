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
  constructor(private readonly http: HttpClient) { }

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
    const request: ODataState = {
      expanders: state.expanders,
      selectors: state.selectors,
      filter: {
        logic: 'and',
        filters: [{ operator: 'eq', field: 'id', value: id }],
      },
    };

    const queryStr = this.getODataString(request);
    return this.http.get(`${odataEndpoint}?${queryStr}`).pipe(mapToExtDataResult<T>(), firstRecord<T>());
  }

  private getODataString(state: ODataState): string {
    let queryString = toODataString(state);
    queryString = this.processExpanders(state, queryString);
    queryString = this.processSelectors(state, queryString);
    queryString = this.processChildFilterDescriptor(state, queryString);
    queryString = this.processInFilter(state, queryString);
    queryString = this.processGuids(queryString);
    queryString = this.applyTransformations(state, queryString);
    return queryString;
  }
  private applyTransformations(state: ODataState, queryString): string {
    if (state.transformations) {
      return queryString += `&$apply=${state.transformations}`;
    }
    return queryString;
  }
  private processGuids(queryString: string): string {
    const guidRegex = /\'[0-9A-F]{8}-?[0-9A-F]{4}-?[0-9A-F]{4}-?[0-9A-F]{4}-?[0-9A-F]{12}\'/gi;
    let m: RegExpExecArray;
    const guidMatches: string[] = [];
    while ((m = guidRegex.exec(queryString)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === guidRegex.lastIndex) {
        guidRegex.lastIndex++;
      }
      m.forEach(match => {
        guidMatches.push(match);
      });
    }
    guidMatches.forEach(guid => queryString = queryString.replace(guid, guid.replace(/'/g, '')));
    return queryString;
  }

  private processSelectors(state: ODataState, queryString: string): string {
    if (state.selectors && state.selectors.length > 0) {
      queryString += `&$select=${state.selectors.join()}`;
    }
    return queryString;
  }
  private processExpanders(state: ODataState, queryString: string): string {
    if (state.expanders && state.expanders.length > 0) {
      queryString += `&$expand=`;
      state.expanders.forEach(element => {
        if (typeof element === 'string' || !element.selectors || element.selectors.length === 0) {
          queryString += `${element},`;
        } else {
          queryString += `${element.tableName}($select=${element.selectors.join()}),`;
        }
      });
      //Removes trailing comma
      queryString = queryString.replace(/,$/, '');
    }
    return queryString;
  }
  private processChildFilterDescriptor(state: ODataState, queryString: string): string {
    if (!state.childFilter) {
      return queryString;
    }
    const childFilterString = `(${state.childFilter.childTableNavigationProperty}/${state.childFilter.linqOperation}` +
      `(o: o/${state.childFilter.field} ${state.childFilter.operator} ${state.childFilter.value}))`;
    if (queryString.match(/\$Filter=/gi)) {
      //Todo: handle additional filters
      return queryString;
    } else {
      return `${queryString}&$filter=${childFilterString}`;
    }
  }

  private processInFilter(state: ODataState, queryString: string): string {
    if (!state.inFilter) {
      return queryString;
    }
    const deDupedVals = Array.from(new Set(state.inFilter.values.filter(f => f)));
    const inVals = deDupedVals.map(m => `'${m}'`).join(',');
    const inFilterString = `(${state.inFilter.field} in (${inVals}))`;
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
