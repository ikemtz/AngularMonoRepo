import { ODataState } from 'imng-kendo-odata';
import { readFirst } from 'imng-ngrx-utils/testing';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';

export async function testGridODataState<TFacade extends IKendoODataGridFacade<unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
): Promise<void> {
  try {
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
    done();
  } catch (err) {
    done.fail(err);
  }
}

export async function testGridPagerSettings<TFacade extends IKendoODataGridFacade<unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
): Promise<void> {
  try {
    const pagerSettings = await readFirst(facade.gridPagerSettings$);
    expect(pagerSettings).toEqual(false);
    done();
  } catch (err) {
    done.fail(err);
  }
}
