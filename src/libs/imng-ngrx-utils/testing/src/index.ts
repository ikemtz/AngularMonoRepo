import { first, Observable, toArray } from 'rxjs';

export function readFirst<T>(o: Observable<T>): Promise<T> {
  return o.pipe(first()).toPromise() as Promise<T>; //NOSONAR
}

export function readAll<T>(o: Observable<T>): Promise<T[]> {
  return o.pipe(toArray()).toPromise() as Promise<T[]>; //NOSONAR
}

export function mockConsoleError() {
  return jest.spyOn(console, 'error').mockImplementation();
}

export function mockConsoleWarn() {
  return jest.spyOn(console, 'warn').mockImplementation();
}

export function mockConsoleGroup() {
  return jest.spyOn(console, 'group').mockImplementation();
}
