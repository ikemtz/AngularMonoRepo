import { Observable, of } from 'rxjs';
import { idType } from './id-type';
/**
 * This simple function will return the cachedData if it exists, otherwise will return the observable
 * @param cachedData
 * @param observable
 * @returns
 */
export function cachinator<ENTITY extends { id?: idType }>(
  cachedData: ENTITY | ENTITY[],
  observable: Observable<ENTITY | ENTITY[]>,
): Observable<ENTITY | ENTITY[]> {
  if (cachedData && (!Array.isArray(cachedData) || cachedData.length > 0)) {
    return of(cachedData);
  }
  return observable;
}
