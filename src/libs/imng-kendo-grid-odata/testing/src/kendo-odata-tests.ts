import { ODataState } from 'imng-kendo-odata';
import { readFirst } from '@nrwl/angular/testing';
import { KendoODataFacadeBase } from 'imng-kendo-grid-odata';

export async function testGridODataState<TFacade extends KendoODataFacadeBase<unknown, unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
) {
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

export async function testGridPagerSettings<TFacade extends KendoODataFacadeBase<unknown, unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
) {
  try {
    const pagerSettings = await readFirst(facade.gridPagerSettings$);
    expect(pagerSettings).toStrictEqual({
      buttonCount: NaN,
      info: true,
      pageSizes: true,
      previousNext: true,
      type: 'numeric',
    });
    done();
  } catch (err) {
    done.fail(err);
  }
}
