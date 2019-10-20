import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { NursesEffects } from './nurses.effects';
import * as NursesActions from './nurses.actions';
import { ODataService } from 'imng-kendo-odata';
import { createPayload } from 'imng-ngrx-utils';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NursesEffects', () => {
  let actions: Observable<any>;
  let effects: NursesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [NursesEffects, DataPersistence, ODataService, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.get(NursesEffects);
  });

  describe('loadNursesRequest$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NursesActions.loadNursesRequest(createPayload({})) });
      const response = cold('-a-|', { a: { data: [], total: 0 } });
      const client: ODataService = TestBed.get(ODataService);
      client.fetch = jest.fn(() => response);
      expect(effects.loadNursesEffect$).toBeObservable(
        hot('--a-|', { a: NursesActions.loadNursesSuccess(createPayload({ data: [], total: 0 })) }),
      );
    });
  });
});
