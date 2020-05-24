import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StateService } from './state.service';
import { AzFunc } from './transformers';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{
        provide: StateService, useValue: {
          setAzConfiguration: jest.fn(),
          setTransformer: jest.fn(),
        }
      }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Azure Configuration Converter');
  });

  it('should handle form changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app: AppComponent = fixture.debugElement.componentInstance;
    const service = TestBed.inject(StateService);
    app.azConfig.patchValue('sdf', { emitEvent: true });
    expect(service.setAzConfiguration).toBeCalledTimes(1);
    expect(service.setAzConfiguration).toBeCalledWith('sdf');
  });

  it('should handle setTransformer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app: AppComponent = fixture.debugElement.componentInstance;
    const service = TestBed.inject(StateService);
    app.setTransformer(AzFunc);
    expect(service.setTransformer).toBeCalledTimes(1);
    expect(service.setTransformer).toBeCalledWith(AzFunc);
  });
});
