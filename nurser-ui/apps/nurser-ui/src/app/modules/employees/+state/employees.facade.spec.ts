import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { EmployeesEffects } from './employees.effects';
import { EmployeesFacade } from './employees.facade';

import { employeesQuery } from './employees.selectors';
import { LoadEmployees, EmployeesLoaded } from './employees.actions';
import { EmployeesState, Entity, initialState, employeesReducer } from './employees.reducer';

interface TestSchema {
  employees: EmployeesState;
}

describe('EmployeesFacade', () => {
  let facade: EmployeesFacade;
  let store: Store<TestSchema>;
  let createEmployees;

  beforeEach(() => {
    createEmployees = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('employees', employeesReducer, { initialState }),
          EffectsModule.forFeature([EmployeesEffects])
        ],
        providers: [EmployeesFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(EmployeesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allEmployees$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allEmployees$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `EmployeesLoaded` to manually submit list for state management
     */
    it('allEmployees$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allEmployees$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(new EmployeesLoaded([createEmployees('AAA'), createEmployees('BBB')]));

        list = await readFirst(facade.allEmployees$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
