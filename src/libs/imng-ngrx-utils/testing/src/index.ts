/// <reference types="jest" />
import { firstValueFrom, lastValueFrom, Observable, toArray } from 'rxjs';

export function readFirst<T>(o: Observable<T>): Promise<T> {
  return firstValueFrom(o); //NOSONAR
}

export function readAll<T>(o: Observable<T>): Promise<T[]> {
  return lastValueFrom(o.pipe(toArray())); //NOSONAR
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
