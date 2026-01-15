import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMNG_KENDO_IDLE_WARNING } from './idle-warning.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IdleFacade } from '../+state/idle.facade';
import { of } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';

describe('IMNG_KENDO_IDLE_WARNING', () => {
  let component: IMNG_KENDO_IDLE_WARNING;
  let fixture: ComponentFixture<IMNG_KENDO_IDLE_WARNING>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IMNG_KENDO_IDLE_WARNING],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: IdleFacade,
          useValue: { isTimingOut$: of(true), timeOutSpanInMs$: of(20) },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IMNG_KENDO_IDLE_WARNING);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', async () => {
    component.isSessionTimingOut$.next(true);
    component.close();
    expect(await readFirst(component.isSessionTimingOut$)).toBe(false);
  });
});
