import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { readFirst } from '@nrwl/angular/testing';
import { TokenInterceptorService } from './token-interceptor.service';
import { Store } from '@ngrx/store';

describe('TokenInterceptorService', () => {
  let tokenInterceptorService: TokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: { select: jest.fn(() => of('🐱‍👤')) } },
        TokenInterceptorService]

    });
    tokenInterceptorService = TestBed.inject(TokenInterceptorService);
  });

  it('should be created', () => {
    expect(tokenInterceptorService).toBeTruthy();
  });

  it('should support canActivate', async done => {
    try {
      const req: any = {
        clone: jest.fn()
      };
      const next: any = {
        handle: jest.fn(() => of('😎'))
      };
      const result = await readFirst(tokenInterceptorService.intercept(req, next));
      expect(result).toBe('😎');
      expect(next.handle).toBeCalledTimes(1);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
