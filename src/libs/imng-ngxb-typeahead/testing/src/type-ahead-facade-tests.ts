import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ImngTypeAheadFacade } from 'imng-ngxb-typeahead';
import { ODataService } from 'imng-kendo-odata';
import { of } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';

export function testLoadMatches<TFacade extends ImngTypeAheadFacade<unknown>>(
  facade: TFacade,
  httpClient: HttpClient
): void {
  const getSpy = jest.spyOn(httpClient, 'get');
  facade.loadMatches('🎂 🍩 😡');
  expect(getSpy).toBeCalledTimes(1);
}

export async function testOdataMatches<
  TFacade extends ImngTypeAheadFacade<unknown>
>(facade: TFacade, oDataService: ODataService): Promise<void> {
  oDataService.fetch = jest.fn(() =>
    of({ data: [{ id: '👼', name: '👿🕺' }], total: 500 })
  ) as never;

  facade.loadMatches('🎂 🍩 😡');
  expect(oDataService.fetch).toBeCalledTimes(1);
  const matches = await readFirst(facade.matches$);
  expect(matches?.length).toEqual(1);
}
