import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { OidcFacade, OidcUserFacade } from 'imng-oidc-client';
import { appRoutes } from '../app.routing.module';
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [],
      imports: [RouterTestingModule, NavBarComponent],
      providers: [
        { provide: OidcFacade, useValue: {} },
        { provide: OidcUserFacade, useValue: {} },
        provideRouter(appRoutes),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
