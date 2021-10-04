import { Injectable } from '@angular/core';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Expander, ODataState } from './odata-state';
import { ODataResult } from './odata-result';
import { firstRecord, mapToExtDataResult } from './odata-rxjs-operators';
import { isaNumber } from 'imng-nrsrx-client-utils';
import { FetchOptions } from './fetch-options';
import { translateChildFilterExpression } from './translate-child-filter-expression';
import { processChildFilterDescriptors } from './transform-child-filters';

@Injectable({
  providedIn: 'root',
})
export class ODataService {

  constructor(private readonly http: HttpClient) { }

  public fetch<T>(
    odataEndpoint: string,
    state: ODataState,
    options: FetchOptions = {},
  ): Observable<ODataResult<T>> {
    let tempState = { ...state };
    options.boundChildTableProperties?.forEach(prop => tempState = translateChildFilterExpression(tempState, prop));
    const countClause = tempState.count === false ? '' : '&$count=true';
    const cacheBustClause = options.bustCache === true ? `&timestamp=${new Date().toISOString().replace(/[-:.TZ]/g, '')}` : '';
    const queryStr = `${this.getODataString(tempState)}${countClause}${cacheBustClause}`;
    return this.http
      .get(`${odataEndpoint}?${queryStr}`)
      .pipe(mapToExtDataResult<T>(options.utcNullableProps || [], options.dateNullableProps || []));
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
    queryString = processChildFilterDescriptors(state, queryString);
    queryString = this.processInFilter(state, queryString);
    queryString = this.processGuids(queryString);
    queryString = this.applyTransformations(state, queryString);
    return queryString;
  }
  private applyTransformations(state: ODataState, queryString): string {
    if (state.transformations) {
      queryString += `&$apply=${state.transformations}`;
    }
    return queryString;
  }
  private processGuids(queryString: string): string {
    const guidRegex = /'[\dA-F]{8}-?[\dA-F]{4}-?[\dA-F]{4}-?[\dA-F]{4}-?[\dA-F]{12}'/gi;
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
      state.expanders.forEach(element =>
        queryString += this.getExpansionString(element));
      //Removes trailing comma
      queryString = queryString.replace(/,$/, '');
    }
    return queryString;
  }
  public getExpansionString(element: string | Expander): string {
    let result = '';
    if (!element) {
      return result;
    }
    if (typeof element === 'string') {
      result += element;
    } else {
      result += `${element.tableName}(`;
      if (element.selectors && element.selectors.length > 0) {
        result += `$select=${element.selectors.join()};`;
      }
      if (element.expander) {
        result += `$expand=${element.expander};`;
      }
      if (element.filter) {
        result += `$filter=${element.filter};`;
      }
      result += ')';
      result = result.replace(/\(\)/, '').replace(/;\)/, ')');
      ;
    }
    return `${result},`;
  }

  private processInFilter(state: ODataState, queryString: string): string {
    if (!state.inFilters) {
      return queryString;
    }
    state.inFilters.forEach(inFilter => {
      const deDupedVals = Array.from(new Set(inFilter.values.filter(f => f)));
      const inVals = deDupedVals.map(m => isaNumber(m) ? `${m}` : `'${m}'`).join(',');
      const inFilterString = `(${inFilter.field} in (${inVals}))`;
      if (!queryString || queryString.trim().length === 0) {
        return `$filter=${inFilterString}`;
      }
      if (queryString.match(/\$filter=/)) {
        queryString = queryString.replace(/\$filter=/, `$filter=${inFilterString} ${inFilter.logic || 'and'} `);
      } else {
        queryString = `${queryString}&$filter=${inFilterString}`;
      }
    });
    return queryString;
  }
}
