import { ModalStates } from 'imng-kendo-data-entry';
import { readFirst } from 'imng-ngrx-utils/testing';
import { Observable } from 'rxjs';

export async function testModalStateAddAndClearCurrentEntity<
  TFacade extends ModalStateTestableFacade,
>(facade: TFacade): Promise<void> {
  const entity = { name: '🆕' };
  await validateInitialModalState(facade);

  facade.setCurrentEntity(entity, ModalStates.ADD);
  let status = await getEntityStatus(facade);
  expect(status.currentEntity).toStrictEqual(entity);
  expect(status.currentModalState).toBe(ModalStates.ADD);

  facade.clearCurrentEntity();
  status = await getEntityStatus(facade);
  expect(status.currentEntity).toBeFalsy();
  expect(status.currentModalState).toBeUndefined();
}

export async function testModalStateEditAndClearCurrentEntity<
  TFacade extends ModalStateTestableFacade,
>(facade: TFacade): Promise<void> {
  const entity = { id: '💃', name: '🧓👴👵' };
  await validateInitialModalState(facade);

  facade.setCurrentEntity(entity, ModalStates.EDIT);
  let status = await getEntityStatus(facade);
  expect(status.currentEntity).toStrictEqual(entity);
  expect(status.currentModalState).toBe(ModalStates.EDIT);

  facade.clearCurrentEntity();
  status = await getEntityStatus(facade);
  expect(status.currentEntity).toBeFalsy();
  expect(status.currentModalState).toBeFalsy();
}
async function validateInitialModalState(
  facade: ModalStateTestableFacade,
): Promise<void> {
  const status = await getEntityStatus(facade);
  expect(status.currentEntity).toBeFalsy();
  expect(status.currentModalState).toBeFalsy();
}

async function getEntityStatus<TFacade extends ModalStateTestableFacade>(
  facade: TFacade,
): Promise<{
  currentEntity: unknown;
  currentModalState: unknown;
}> {
  return {
    currentEntity: await readFirst(facade.currentEntity$),
    currentModalState: await readFirst(facade.currentModalState$),
  };
}

export interface ModalStateTestableFacade {
  currentEntity$: Observable<unknown>;
  currentModalState$: Observable<string | undefined>;
  setCurrentEntity(entity: unknown, parentEntity?: unknown): void;
  clearCurrentEntity(): void;
}
