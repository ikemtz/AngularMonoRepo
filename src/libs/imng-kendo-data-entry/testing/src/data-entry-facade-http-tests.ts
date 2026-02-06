import { jest, expect } from '@jest/globals';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export async function testSaveCurrentEntity<
  TFacade extends { saveNewEntity(entity: unknown): void },
>(facade: TFacade, httpClient: HttpClient): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entity: any = { name: '🆕' };
  (httpClient as unknown as { post: () => Observable<unknown> }).post = jest.fn(
    () => of(entity),
  );
  (httpClient as unknown as { put: () => Observable<unknown> }).put = jest.fn(
    () => of(entity),
  );
  (httpClient as unknown as { delete: () => Observable<unknown> }).delete =
    jest.fn(() => of(entity));

  facade.saveNewEntity(entity);
  expect(httpClient.post).toHaveBeenCalledTimes(1);
  expect(httpClient.put).toHaveBeenCalledTimes(0);
  expect(httpClient.delete).toHaveBeenCalledTimes(0);
}

export async function testUpdateCurrentEntity<
  TFacade extends { updateExistingEntity(entity: unknown): void },
>(facade: TFacade, httpClient: HttpClient): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entity: any = { id: '💃', name: '🧓👴👵' };

  (httpClient as unknown as { post: () => Observable<unknown> }).post = jest.fn(
    () => of(entity),
  );
  (httpClient as unknown as { put: () => Observable<unknown> }).put = jest.fn(
    () => of(entity),
  );
  (httpClient as unknown as { delete: () => Observable<unknown> }).delete =
    jest.fn(() => of(entity));

  facade.updateExistingEntity(entity);
  expect(httpClient.put).toHaveBeenCalledTimes(1);
  expect(httpClient.post).toHaveBeenCalledTimes(0);
  expect(httpClient.delete).toHaveBeenCalledTimes(0);
}
