import { readFirst } from 'imng-ngrx-utils/testing';
import { Observable } from 'rxjs';

export async function testAddSetAndClearCurrentEntity
  <TFacade extends TestableFacade>(done: jest.DoneCallback, facade: TFacade): Promise<void> {
  try {
    const entity = { name: '🆕' };
    await validateInitialState(facade);

    facade.setCurrentEntity(entity, { name: 'parentEntity' });
    let status = await getEntityStatus(facade);
    expect(status.currentEntity).toStrictEqual(entity);
    expect(status.isEditActive).toBeFalsy();
    expect(status.isNewActive).toBeTruthy();

    facade.clearCurrentEntity();
    status = await getEntityStatus(facade);
    expect(status.currentEntity).toBeFalsy();
    expect(status.isEditActive).toBeFalsy();
    expect(status.isNewActive).toBeFalsy();

    done();
  } catch (err) {
    done.fail(err);
  }
}

export async function testEditSetAndClearCurrentEntity<TFacade extends TestableFacade>(
  done: jest.DoneCallback,
  facade: TFacade,
): Promise<void> {
  try {
    const entity = { id: '💃', name: '🧓👴👵' };
    await validateInitialState(facade);

    facade.setCurrentEntity(entity, { name: 'parentEntity' });
    let status = await getEntityStatus(facade);
    expect(status.currentEntity).toStrictEqual(entity);
    expect(status.isEditActive).toBeTruthy();
    expect(status.isNewActive).toBeFalsy();

    facade.clearCurrentEntity();
    status = await getEntityStatus(facade);
    expect(status.currentEntity).toBeFalsy();
    expect(status.isEditActive).toBeFalsy();
    expect(status.isNewActive).toBeFalsy();

    done();
  } catch (err) {
    done.fail(err);
  }
}
async function validateInitialState(facade: TestableFacade): Promise<void> {
  const status = await getEntityStatus(facade);
  expect(status.currentEntity).toBeFalsy();
  expect(status.isEditActive).toBeFalsy();
  expect(status.isNewActive).toBeFalsy();
}

async function getEntityStatus<TFacade extends TestableFacade>(facade: TFacade): Promise<{
  currentEntity: unknown,
  isEditActive: unknown,
  isNewActive: unknown;
}> {
  return {
    currentEntity: await readFirst(facade.currentEntity$),
    isEditActive: await readFirst(facade.isEditActive$),
    isNewActive: await readFirst(facade.isNewActive$),
  };
}

export interface TestableFacade {
  currentEntity$: Observable<unknown>;
  isEditActive$: Observable<boolean>;
  isNewActive$: Observable<boolean>;
  setCurrentEntity(entity: unknown, parentEntity?: unknown): void;
  clearCurrentEntity(): void;
}
