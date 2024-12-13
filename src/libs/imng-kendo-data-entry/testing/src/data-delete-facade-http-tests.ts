import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export async function testDeleteCurrentEntity<
  TFacade extends { deleteExistingEntity(entity: unknown): void },
>(facade: TFacade, httpClient: HttpClient): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entity: any = { id: '💃', name: '🧓👴👵' };

  httpClient.post = jest.fn();
  httpClient.put = jest.fn();
  httpClient.delete = jest.fn(() => of(entity));

  facade.deleteExistingEntity(entity);
  expect(httpClient.put).toHaveBeenCalledTimes(0);
  expect(httpClient.post).toHaveBeenCalledTimes(0);
  expect(httpClient.delete).toHaveBeenCalledTimes(1);
}
