import { first, firstValueFrom, lastValueFrom, Observable, toArray } from 'rxjs';


export function readFirst<T>(o: Observable<T>): Promise<T> {
  return firstValueFrom(o.pipe(first()));
}

export function readAll<T>(o: Observable<T>): Promise<T[]> {
  return lastValueFrom(o.pipe(toArray()));
}