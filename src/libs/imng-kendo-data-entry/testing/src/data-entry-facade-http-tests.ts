import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export async function testSaveCurrentEntity<TFacade extends { saveNewEntity(entity: unknown): void; }>(
  facade: TFacade,
  httpClient: HttpClient,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entity: any = { name: '🆕' };
  httpClient.post = jest.fn(() => of(entity));
  httpClient.put = jest.fn(() => of(entity));
  httpClient.delete = jest.fn(() => of(entity));

  facade.saveNewEntity(entity);
  expect(httpClient.post).toBeCalledTimes(1);
  expect(httpClient.put).toBeCalledTimes(0);
  expect(httpClient.delete).toBeCalledTimes(0);
}

export async function testUpdateCurrentEntity<TFacade extends { updateExistingEntity(entity: unknown): void; }>(
  facade: TFacade,
  httpClient: HttpClient,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entity: any = { id: '💃', name: '🧓👴👵' };

  httpClient.post = jest.fn(() => of(entity));
  httpClient.put = jest.fn(() => of(entity));
  httpClient.delete = jest.fn(() => of(entity));

  facade.updateExistingEntity(entity);
  expect(httpClient.put).toBeCalledTimes(1);
  expect(httpClient.post).toBeCalledTimes(0);
  expect(httpClient.delete).toBeCalledTimes(0);

}
