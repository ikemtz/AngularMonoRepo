import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';
import { OidcFacade, OidcUserFacade } from 'imng-oidc-client';
import { appRoutes } from '../app.routing.module';
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      schemas: [],
      imports: [RouterModule],
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
