import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportComponent } from './support.component';
import { OidcFacade } from '../+state/oidc.facade';
import { Auth0Facade } from '../+state/auth0.facade';
import { of } from 'rxjs';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportComponent],
      providers: [
        { provide: OidcFacade, useValue: {} },
        { provide: Auth0Facade, useValue: { profile$: of() } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
