import { TestBed } from '@angular/core/testing';
import { ImngOidcClientModule } from './imng-oidc-client.module';

describe('ImngOidcClientModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ImngOidcClientModule.forRoot({
          audience: '🐱‍👤',
          client_id: '🔒',
          authority: '🔑',
          getUserMetadata: true,
        }),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(ImngOidcClientModule).toBeDefined();
  });
});
