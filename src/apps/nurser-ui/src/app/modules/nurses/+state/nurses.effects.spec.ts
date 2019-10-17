import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { NursesEffects } from './nurses.effects';
import * as NursesActions from './nurses.actions';

describe('NursesEffects', () => {
  let actions: Observable<any>;
  let effects: NursesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [NursesEffects, DataPersistence, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.get(NursesEffects);
  });

  describe('loadNurses$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NursesActions.loadNurses() });

      const expected = hot('-a-|', { a: NursesActions.loadNursesSuccess({ nurses: [] }) });

      expect(effects.loadNurses$).toBeObservable(expected);
    });
  });
});
