import { jest, expect } from '@jest/globals';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export async function testDeleteCurrentEntity<
  TFacade extends { deleteExistingEntity(entity: unknown): void },
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

  facade.deleteExistingEntity(entity);
  expect(httpClient.put).toHaveBeenCalledTimes(0);
  expect(httpClient.post).toHaveBeenCalledTimes(0);
  expect(httpClient.delete).toHaveBeenCalledTimes(1);
}
