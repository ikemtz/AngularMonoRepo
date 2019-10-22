import { readFirst } from '@nrwl/angular/testing';
import { IDataEntryFacade } from 'imng-kendo-data-entry';

export async function testAddSetAndClearCurrentEntity<TFacade extends IDataEntryFacade<unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
) {
  try {
    const entity = { name: '🆕' };
    let currentEntity = await readFirst(facade.currentEntity$);
    let isEditActive = await readFirst(facade.isEditActive$);
    let isNewActive = await readFirst(facade.isNewActive$);
    expect(currentEntity).toBeFalsy();
    expect(isEditActive).toBeFalsy();
    expect(isNewActive).toBeFalsy();

    facade.setCurrentEntity(entity, { name: 'parentEntity' });
    currentEntity = await readFirst(facade.currentEntity$);
    isEditActive = await readFirst(facade.isEditActive$);
    isNewActive = await readFirst(facade.isNewActive$);
    expect(currentEntity).toStrictEqual(entity);
    expect(isEditActive).toBeFalsy();
    expect(isNewActive).toBeTruthy();

    facade.clearCurrentEntity();
    currentEntity = await readFirst(facade.currentEntity$);
    isEditActive = await readFirst(facade.isEditActive$);
    isNewActive = await readFirst(facade.isNewActive$);
    expect(currentEntity).toBeFalsy();
    expect(isEditActive).toBeFalsy();
    expect(isNewActive).toBeFalsy();

    done();
  } catch (err) {
    done.fail(err);
  }
}

export async function testEditSetAndClearCurrentEntity<TFacade extends IDataEntryFacade<unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
) {
  try {
    const entity = { id: '💃', name: '🧓👴👵' };
    let currentEntity = await readFirst(facade.currentEntity$);
    let isEditActive = await readFirst(facade.isEditActive$);
    let isNewActive = await readFirst(facade.isNewActive$);
    expect(currentEntity).toBeFalsy();
    expect(isEditActive).toBeFalsy();
    expect(isEditActive).toBeFalsy();

    facade.setCurrentEntity(entity, { name: 'parentEntity' });
    currentEntity = await readFirst(facade.currentEntity$);
    isEditActive = await readFirst(facade.isEditActive$);
    isNewActive = await readFirst(facade.isNewActive$);
    expect(currentEntity).toStrictEqual(entity);
    expect(isEditActive).toBeTruthy();
    expect(isNewActive).toBeFalsy();

    facade.clearCurrentEntity();
    currentEntity = await readFirst(facade.currentEntity$);
    isEditActive = await readFirst(facade.isEditActive$);
    isNewActive = await readFirst(facade.isNewActive$);
    expect(currentEntity).toBeFalsy();
    expect(isEditActive).toBeFalsy();
    expect(isEditActive).toBeFalsy();

    done();
  } catch (err) {
    done.fail(err);
  }
}
