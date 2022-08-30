import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ChildFilter,
  CompositeFilter,
  FetchOptions,
  Filter,
  isChildFilter,
  isCompositeFilter,
  ODataQuery,
  ODataResult,
} from '../models';
import { mapData } from '../operators/map-data';

@Injectable({
  providedIn: 'root',
})
export class ODataClientService {
  constructor(private readonly httpClient: HttpClient) {}

  public fetch<T>(
    odataEndpoint: string,
    query: ODataQuery,
    options: FetchOptions = {},
  ): Observable<ODataResult<T> | T[]> {
    const queryStr = this.getODataString(query, options);
    return this.httpClient
      .get<ODataResult<T> | T[]>(`${odataEndpoint}${queryStr}`)
      .pipe(mapData<T>(options));
  }

  public getODataString(query: ODataQuery, options: FetchOptions = {}): string {
    let queryString = '';
    queryString = this.processFilters(query, options, queryString);
    queryString = this.processSelectors(query, queryString);
    queryString = this.processSimpleParameters('top', query, queryString);
    queryString = this.processSimpleParameters('skip', query, queryString);
    queryString = this.processGuids(queryString);
    queryString = this.processDates(queryString);
    queryString = this.processCount(query, queryString);
    queryString = this.processCacheBusting(options, queryString);
    queryString = queryString.substring(1); // removing first &
    return queryString;
  }
  processFilters(
    query: ODataQuery,
    _options: FetchOptions,
    queryString: string,
  ): string {
    if (!query.filter) {
      return queryString;
    }
    const filterString = this.serializeCompositeFilter(query.filter);
    return `&filter=${filterString}`;
  }
  serializeCompositeFilter(filter: CompositeFilter): string {
    const filterLogicSeperator = ` ${filter.logic} `;
    return `(${filter.filters
      .map((m) =>
        isCompositeFilter(m)
          ? this.serializeCompositeFilter(m)
          : this.serializeFilter(m),
      )
      .join(filterLogicSeperator)})`;
  }

  serializeFilter(filter: Filter | ChildFilter): string {
    if (isChildFilter(filter)) {
      const childFieldName = `o/${filter.field}`;
      return `${filter.childTable}/${filter.linqOperation}(o:${filter.operator(
        childFieldName,
        filter.value as never,
      )} )`;
    } else {
      return filter.operator(filter.field, filter.value as never);
    }
  }
  processSimpleParameters(
    parameterName: 'skip' | 'top',
    query: ODataQuery,
    queryString: string,
  ): string {
    if (query[parameterName]) {
      return queryString + `&$${parameterName}=${query[parameterName]}`;
    }
    return queryString;
  }
  processCacheBusting(options: FetchOptions, queryString: string): string {
    if (options.bustCache) {
      const timeStamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
      return queryString + `&timestamp=${timeStamp}`;
    }
    return queryString;
  }

  public processCount(query: ODataQuery, queryString: string): string {
    if (query.count === false) {
      return queryString;
    }
    return queryString + '&$count=true';
  }

  public processDates(queryString: string): string {
    const dateRegex =
      /Date [e-t]{2} \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/g;
    let m: RegExpExecArray | null;
    const dateMatches: string[] = [];
    while ((m = dateRegex.exec(queryString)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === dateRegex.lastIndex) {
        dateRegex.lastIndex++;
      }
      m.forEach((match) => {
        dateMatches.push(match);
      });
    }
    dateMatches.forEach(
      (date) =>
        (queryString = queryString.replace(
          date,
          date.replace(/T\d{2}:\d{2}:\d{2}.\d{3}Z/g, ''),
        )),
    );
    return queryString;
  }

  public processGuids(queryString: string): string {
    const guidRegex =
      /'[\dA-F]{8}-?[\dA-F]{4}-?[\dA-F]{4}-?[\dA-F]{4}-?[\dA-F]{12}'/gi;
    let m: RegExpExecArray | null;
    const guidMatches: string[] = [];
    while ((m = guidRegex.exec(queryString)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === guidRegex.lastIndex) {
        guidRegex.lastIndex++;
      }
      m.forEach((match) => {
        guidMatches.push(match);
      });
    }
    guidMatches.forEach(
      (guid) =>
        (queryString = queryString.replace(guid, guid.replace(/'/g, ''))),
    );
    return queryString;
  }

  public processSelectors(state: ODataQuery, queryString: string): string {
    if (state.select && state.select.length > 0) {
      return queryString + `&$select=${state.select.join()}`;
    }
    return queryString;
  }
}
