import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { HttpClient } from '@angular/common/http';

export async function testSaveCurrentEntity<TFacade extends { saveNewEntity(entity: unknown): void }>(
  done: jest.DoneCallback,
  facade: TFacade,
  httpClient: HttpClient,
) {
  try {
    const entity = { name: '🆕' };
    const postSpy = jest.spyOn(httpClient, 'post');
    const putSpy = jest.spyOn(httpClient, 'put');
    const deleteSpy = jest.spyOn(httpClient, 'delete');

    facade.saveNewEntity(entity);
    expect(postSpy).toBeCalledTimes(1);
    expect(putSpy).toBeCalledTimes(0);
    expect(deleteSpy).toBeCalledTimes(0);
    done();
  } catch (err) {
    done.fail(err);
  }
}

export async function testUpdateCurrentEntity<TFacade extends { updateExistingEntity(entity: unknown): void }>(
  done: jest.DoneCallback,
  facade: TFacade,
  httpClient: HttpClient,
) {
  try {
    const entity = { id: '💃', name: '🧓👴👵' };
    const postSpy = jest.spyOn(httpClient, 'post');
    const putSpy = jest.spyOn(httpClient, 'put');
    const deleteSpy = jest.spyOn(httpClient, 'delete');

    facade.updateExistingEntity(entity);
    expect(putSpy).toBeCalledTimes(1);
    expect(postSpy).toBeCalledTimes(0);
    expect(deleteSpy).toBeCalledTimes(0);
    done();
  } catch (err) {
    done.fail(err);
  }
}

export async function testDeleteCurrentEntity<TFacade extends IDataDeleteFacade<unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
  httpClient: HttpClient,
) {
  try {
    const entity = { id: '💃', name: '🧓👴👵' };
    const postSpy = jest.spyOn(httpClient, 'post');
    const putSpy = jest.spyOn(httpClient, 'put');
    const deleteSpy = jest.spyOn(httpClient, 'delete');

    facade.deleteExistingEntity(entity);
    expect(putSpy).toBeCalledTimes(0);
    expect(postSpy).toBeCalledTimes(0);
    expect(deleteSpy).toBeCalledTimes(1);
    done();
  } catch (err) {
    done.fail(err);
  }
}
