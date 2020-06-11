import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, readFirst } from '@nrwl/angular/testing';
import { OidcEffects } from './oidc.effect';
import * as OidcActions from './oidc.action';
import { OIDC_CONFIG } from '../models/config.model';

describe('Oidc Effects', () => {
  let actions: Observable<any>;
  let effects: OidcEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        OidcEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: OIDC_CONFIG, useValue: { oidc_config: {} } }
      ],

    });

    effects = TestBed.inject(OidcEffects);
  });

  describe('signInSilent$', () => {
    it('should fail because silent_redirect_uri is not configured', async done => {
      try {
        actions = of(OidcActions.signinSilent({}));

        const result = await readFirst(effects.signInSilent$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });
  });
});
