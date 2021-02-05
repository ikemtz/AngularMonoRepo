import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Auth0OidcModule } from './auth0-oidc.module';
import { TokenInterceptorService } from './services/token-interceptor.service';

describe('ImngAppInsightsNgrxModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        Auth0OidcModule.forRoot({
          audience: '🐱‍👤',
          client_id: '🔒',
          authority: '🔑',
          getUserMetadata: true
        })]
    }).compileComponents();
  });

  it('should create', () => {
    expect(Auth0OidcModule).toBeDefined();
  });
});
