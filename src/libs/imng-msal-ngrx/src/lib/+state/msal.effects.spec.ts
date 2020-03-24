import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { MsalEffects } from './msal.effects';
import * as MsalActions from './msal.actions';

describe('MsalEffects', () => {
  let actions: Observable<any>;
  let effects: MsalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [MsalEffects, DataPersistence, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.get(MsalEffects);
  });

  describe('loadMsal$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MsalActions.loadMsal() });

      const expected = hot('-a-|', { a: MsalActions.loadMsalSuccess({ msal: [] }) });

      expect(effects.loadMsal$).toBeObservable(expected);
    });
  });
});
