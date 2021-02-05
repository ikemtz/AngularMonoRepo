import { TestBed } from '@angular/core/testing';
import { Auth0OidcModule } from './auth0-oidc.module';

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
