import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';
import { TokenInterceptorService } from './token-interceptor.service';
import { Store } from '@ngrx/store';
import { OIDC_LIBRARY_CONFIG } from '../models/oidc-library-config';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';

describe('TokenInterceptorService', () => {
  let tokenInterceptorService: TokenInterceptorService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: { select: jest.fn(() => of('🐱‍👤')), dispatch: jest.fn() },
        },
        { provide: OIDC_LIBRARY_CONFIG, useValue: {} },
        TokenInterceptorService,
      ],
    });
    tokenInterceptorService = TestBed.inject(TokenInterceptorService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(tokenInterceptorService).toBeTruthy();
  });

  it('should support canActivate', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req: any = {
      clone: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const next: any = {
      handle: jest.fn(() => of('😎')),
    };
    const result = await readFirst(
      tokenInterceptorService.intercept(req, next),
    );
    expect(result).toBe('😎');
    expect(next.handle).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should support exceptionHandling = true', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req: any = {
      clone: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const next: any = {
      handle: jest.fn(() =>
        throwError(new HttpErrorResponse({ error: 'Validation' })),
      ),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: HttpEvent<any> = {} as HttpEvent<any>;
    try {
      result = await readFirst(tokenInterceptorService.intercept(req, next));
    } catch (err) {
      expect(result).toStrictEqual({});
      expect(err).toMatchSnapshot();
      expect(next.handle).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      return;
    }
    throwError('The anticipated exception was not thrown');
  });
});
