import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { EmployeesEffects } from './employees.effects';
import { LoadEmployees, EmployeesLoaded } from './employees.actions';

describe('EmployeesEffects', () => {
  let actions: Observable<any>;
  let effects: EmployeesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [EmployeesEffects, DataPersistence, provideMockActions(() => actions)]
    });

    effects = TestBed.get(EmployeesEffects);
  });

  describe('loadEmployees$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadEmployees() });
      expect(effects.loadEmployees$).toBeObservable(hot('-a-|', { a: new EmployeesLoaded([]) }));
    });
  });
});
