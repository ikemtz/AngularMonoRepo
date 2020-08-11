import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleWarningComponent } from './idle-warning.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IdleFacade } from '../+state/idle.facade';
import { of } from 'rxjs';
import { readFirst } from '@nrwl/angular/testing';

describe('IdleWarningComponent', () => {
  let component: IdleWarningComponent;
  let fixture: ComponentFixture<IdleWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdleWarningComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: IdleFacade, useValue: { isTimingOut$: of(true) } }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', async done => {
    try {
      component.isSessionTimingOut$.next(true);
      component.close();
      expect(await readFirst(component.isSessionTimingOut$)).toBe(false);
      done();
    }
    catch (err) {
      done.fail(err);
    }
  });
});
