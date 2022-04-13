import { first, Observable, toArray } from 'rxjs';

export function readFirst<T>(o: Observable<T>): Promise<T | undefined> {
  return o.pipe(first()).toPromise(); //NOSONAR
}

export function readAll<T>(o: Observable<T>): Promise<T[] | undefined> {
  return o.pipe(toArray()).toPromise(); //NOSONAR
}
