import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export async function testDeleteCurrentEntity<TFacade extends { deleteExistingEntity(entity: unknown): void; }>(
  done: jest.DoneCallback,
  facade: TFacade,
  httpClient: HttpClient,
): Promise<void> {
  try {
    const entity: any = { id: '💃', name: '🧓👴👵' };

    httpClient.post = jest.fn();
    httpClient.put = jest.fn();
    httpClient.delete = jest.fn(() => of(entity));

    facade.deleteExistingEntity(entity);
    expect(httpClient.put).toBeCalledTimes(0);
    expect(httpClient.post).toBeCalledTimes(0);
    expect(httpClient.delete).toBeCalledTimes(1);
    done();
  } catch (err) {
    done.fail(err);
  }
}
