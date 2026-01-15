import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMNG_USER_SUPPORT } from './support.component';
import { OidcFacade } from '../+state/oidc.facade';
import { OidcUserFacade } from '../+state/oidc-user.facade';
import { of } from 'rxjs';

describe('IMNG_USER_SUPPORT', () => {
  let component: IMNG_USER_SUPPORT;
  let fixture: ComponentFixture<IMNG_USER_SUPPORT>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IMNG_USER_SUPPORT],
      providers: [
        { provide: OidcFacade, useValue: {} },
        { provide: OidcUserFacade, useValue: { profile$: of() } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IMNG_USER_SUPPORT);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
