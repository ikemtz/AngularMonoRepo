import { ODataState } from 'imng-kendo-odata';
import { readFirst } from 'imng-ngrx-utils/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';

export async function testGridODataState<TFacade extends IKendoODataGridFacade<unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
): Promise<void> {
  const filteringState: ODataState = {
    filter: { logic: 'and', filters: [{ field: '💩', operator: 'eq', value: '🍑' }] },
  };
  let state = await readFirst(facade.gridODataState$);
  expect(state).toStrictEqual({});
  facade.loadEntities(filteringState);

  state = await readFirst(facade.gridODataState$);
  expect(state).toStrictEqual(filteringState);

  facade.loadEntities({});
  state = await readFirst(facade.gridODataState$);
  expect(state).toStrictEqual({});

}

export async function testGridPagerSettings<TFacade extends IKendoODataGridFacade<unknown>>(
  facade: TFacade,
): Promise<void> {
  const pagerSettings = await readFirst(facade.gridPagerSettings$);
  expect(pagerSettings).toEqual(false);

}
