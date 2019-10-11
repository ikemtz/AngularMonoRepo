import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OidcFacade } from 'ng-oidc-client';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavBarComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: OidcFacade, useValue: { identity$: of({}) } }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
