import { HttpClient } from '@angular/common/http';
import { ImngTypeAheadFacade } from 'imng-ngxb-typeahead';
import { ODataService } from 'imng-kendo-odata';
import { of } from 'rxjs';
import { readFirst } from '@nrwl/angular/testing';

export function testLoadMatches<TFacade extends ImngTypeAheadFacade<unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
  httpClient: HttpClient,
) {
  try {
    const getSpy = jest.spyOn(httpClient, 'get');
    facade.loadMatches('🎂 🍩 😡');
    expect(getSpy).toBeCalledTimes(1);
    done();
  } catch (err) {
    done.fail(err);
  }
}

export async function testOdataMatches<TFacade extends ImngTypeAheadFacade<unknown>>(
  done: jest.DoneCallback,
  facade: TFacade,
  oDataService: ODataService,
) {
  try {
    oDataService.fetch = jest.fn(() => of({ data: [{ id: '👼', name: '👿🕺' }], total: 500 })) as any;

    facade.loadMatches('🎂 🍩 😡');
    expect(oDataService.fetch).toBeCalledTimes(1);
    const matches = await readFirst(facade.matches$);
    expect(matches.length).toEqual(1);
    done();
  } catch (err) {
    done.fail(err);
  }
}
