import { DebugElement } from '@angular/core';
import { IdType } from 'imng-nrsrx-client-utils';
import { GridDataEntryHelper } from '../../src/lib/grid-data-entry.helper';

export async function validateGridAddHandler<entity extends { id?: IdType }>(
  gridEntryHelper: GridDataEntryHelper<entity>,
  gridDebugElement: DebugElement,
): Promise<void> {
  expect(gridDebugElement).toBeTruthy();
  expect(gridDebugElement.componentInstance).toBeTruthy();
  const spy = jest.spyOn(gridEntryHelper, 'addHandler');
  gridDebugElement.triggerEventHandler('add', { sender: gridDebugElement.componentInstance });
  expect(spy).toBeCalledTimes(1);
}

export async function validateGridEditHandler<entity extends { id?: IdType }>(
  gridEntryHelper: GridDataEntryHelper<entity>,
  gridDebugElement: DebugElement,
): Promise<void> {
  expect(gridDebugElement).toBeTruthy();
  expect(gridDebugElement.componentInstance).toBeTruthy();
  const spy = jest.spyOn(gridEntryHelper, 'editHandler');
  gridDebugElement.triggerEventHandler('edit', { sender: gridDebugElement.componentInstance });
  expect(spy).toBeCalledTimes(1);
}
