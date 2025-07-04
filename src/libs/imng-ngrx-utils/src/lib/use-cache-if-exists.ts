import { concatLatestFrom } from '@ngrx/operators';
import { MemoizedSelector, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';

export function useCacheIfExists<T_COLLECTION_TYPE>(
  store: Store,
  selector: MemoizedSelector<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>,
    T_COLLECTION_TYPE[] | undefined,
    (featureState: never) => T_COLLECTION_TYPE[] | undefined
  >,
) {
  return function <T>(source: Observable<T>): Observable<T> {
    return source.pipe(
      concatLatestFrom(() => store.select(selector)),
      filter(([, cache]) => !cache || cache.length === 0),
      map(([action]) => action),
    );
  };
}
