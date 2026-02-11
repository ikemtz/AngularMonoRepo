import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Expander,
  FetchOptions,
  isExpander,
  ODataQuery,
  ODataResult,
} from '../models';
import { mapData } from '../operators/map-data';
import { processFilters } from '../helpers/filter-processor';

export const uuidRegex = /T\d{2}:\d{2}:\d{2}.\d{3}Z/gi;
@Injectable({
  providedIn: 'root',
})
export class ODataClientService {
  private readonly httpClient = inject(HttpClient);

  public fetch<T extends object>(
    odataEndpoint: string,
    query: ODataQuery,
    options: FetchOptions = {},
  ): Observable<ODataResult<T>> {
    const queryStr = getODataString(query, options);
    return this.httpClient
      .get<ODataResult<T> | T[]>(`${odataEndpoint}?${queryStr}`)
      .pipe(mapData<T>(options));
  }
}

export function getODataString(
  query: ODataQuery,
  options: FetchOptions = {},
): string {
  let queryString = '';
  queryString = processFilters(query, queryString);
  queryString = processOrderBy(query, queryString);
  queryString = processSelectors(query, queryString);
  queryString = processExpanders(query, queryString);
  queryString = processSimpleParameters('top', query, queryString);
  queryString = processSimpleParameters('skip', query, queryString);
  queryString = processGuids(queryString);
  queryString = processDates(queryString);
  queryString = processCount(query, queryString);
  queryString = processCacheBusting(options, queryString);
  queryString = queryString.substring(1); // removing first &
  return queryString;
}

export function processExpanders(
  query: ODataQuery,
  queryString: string,
): string {
  if (query.expand && query.expand.length > 0) {
    const expansionStrings = query.expand.map((element) =>
      getExpansionString(element),
    );
    queryString += `&$expand=${expansionStrings.join(',')}`;
  }
  return queryString;
}

export function getExpansionString(element: Expander): string {
  let result = '';
  if (!element) {
    return result;
  }
  if (typeof element === 'string') {
    result += element;
  } else {
    result += `${element.table}(`;
    const query: ODataQuery = {
      ...element,
      count: element.count ?? false,
      expand: undefined,
    };
    result += `${getODataString(query).replaceAll('&', ';')};`;
    if (element.expand) {
      const expanders = element.expand.map((expander) => {
        if (isExpander(expander)) {
          return getExpansionString(expander);
        }
        return expander;
      });
      result += `$expand=${expanders.join(',')};`;
    }
    result += ')';
    result = result
      .replace(/\(;\$expand=/, '($expand=') //Replaces empty expand "(;$expand=" with "($expand="
      .replace(/\$expand=;?\)$/, ')') //Replaces empty expand ";$expand=;)" or ";$expand=)" with ")"
      .replace(/\(;\)$/, '') //Removes empty expansion clause "(;)"
      .replace(/;\)$/, ')'); //Replaces ";)" with ")"
  }
  return result;
}

export function processOrderBy(query: ODataQuery, queryString: string): string {
  if (!query.orderBy?.length) {
    return queryString;
  }
  const sortString = query.orderBy
    .map((m) => `${m.field}${m.dir === 'desc' ? ' desc' : ''}`)
    .join(',');
  return `${queryString}&$orderby=${sortString}`;
}

export function processSimpleParameters(
  parameterName: 'skip' | 'top',
  query: ODataQuery,
  queryString: string,
): string {
  if (
    query[parameterName] ||
    (parameterName === 'top' && query[parameterName] === 0)
  ) {
    return `${queryString}&$${parameterName}=${query[parameterName]}`;
  }
  return queryString;
}
export function processCacheBusting(
  options: FetchOptions,
  queryString: string,
): string {
  if (options.bustCache) {
    const timeStamp = new Date().toISOString().replaceAll(/[-:.TZ]/g, '');
    return `${queryString}&timestamp=${timeStamp}`;
  }
  return queryString;
}

export function processCount(query: ODataQuery, queryString: string): string {
  if (query.count === false) {
    return queryString;
  }
  return `${queryString}&$count=true`;
}

export function processDates(queryString: string): string {
  const dateRegex = /Date [e-t]{2} \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/g;
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
      (queryString = queryString.replace(date, date.replaceAll(uuidRegex, ''))),
  );
  return queryString;
}

export function processGuids(queryString: string): string {
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
      (queryString = queryString.replaceAll(guid, guid.replaceAll("'", ''))),
  );
  return queryString;
}

export function processSelectors(
  state: ODataQuery,
  queryString: string,
): string {
  if (state.select && state.select.length > 0) {
    return `${queryString}&$select=${state.select.join()}`;
  }
  return queryString;
}
