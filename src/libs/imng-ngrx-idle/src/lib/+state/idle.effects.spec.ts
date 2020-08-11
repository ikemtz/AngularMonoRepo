import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { IdleEffects } from './idle.effects';
import { IDLE_CONFIG } from '../idle-config';
import { State } from '@ngrx/store';

describe('IdleEffects', () => {
  let actions$: Observable<any>;
  let effects: IdleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IdleEffects,
        provideMockActions(() => actions$),
        {
          provide: IDLE_CONFIG, useValue: {
            timeoutWarningInMs: 2,
            autoLogoutInMs: 4
          }
        },
        { provide: State, useValue: of({}) }
      ]
    });

    effects = TestBed.inject(IdleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
