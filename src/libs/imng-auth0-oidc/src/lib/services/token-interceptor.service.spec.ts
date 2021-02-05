import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { readFirst } from '@nrwl/angular/testing';
import { TokenInterceptorService } from './token-interceptor.service';
import { Store } from '@ngrx/store';
import { OIDC_CONFIG } from '../models/config.model';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';

describe('TokenInterceptorService', () => {
  let tokenInterceptorService: TokenInterceptorService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: { select: jest.fn(() => of('🐱‍👤')), dispatch: jest.fn() } },
        { provide: OIDC_CONFIG, useValue: {} },
        TokenInterceptorService]

    });
    tokenInterceptorService = TestBed.inject(TokenInterceptorService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(tokenInterceptorService).toBeTruthy();
  });

  it('should support canActivate', async done => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const req: any = {
        clone: jest.fn()
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next: any = {
        handle: jest.fn(() => of('😎'))
      };
      const result = await readFirst(tokenInterceptorService.intercept(req, next));
      expect(result).toBe('😎');
      expect(next.handle).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledTimes(0);
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should support exceptionHandling = true', async done => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const req: any = {
        clone: jest.fn()
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next: any = {
        handle: jest.fn(() => throwError(new HttpErrorResponse({ error: 'Validation' })))
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let result: HttpEvent<any>;
      try {
        result = await readFirst(tokenInterceptorService.intercept(req, next));
      } catch (err) {

        expect(result).toMatchSnapshot();
        expect(next.handle).toBeCalledTimes(1);
        expect(store.dispatch).toBeCalledTimes(1);
        return done();
      }
      done.fail('The anticipated exception was not thrown');
    } catch (err) {
      done.fail(err);
    }
  });

});
