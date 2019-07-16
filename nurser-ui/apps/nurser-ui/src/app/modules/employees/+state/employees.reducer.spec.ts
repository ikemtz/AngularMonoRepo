import { EmployeesLoaded } from './employees.actions';
import { EmployeesState, Entity, initialState, employeesReducer } from './employees.reducer';

describe('Employees Reducer', () => {
  const getEmployeesId = it => it['id'];
  let createEmployees;

  beforeEach(() => {
    createEmployees = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Employees actions ', () => {
    it('should return set the list of known Employees', () => {
      const employeess = [createEmployees('PRODUCT-AAA'), createEmployees('PRODUCT-zzz')];
      const action = new EmployeesLoaded(employeess);
      const result: EmployeesState = employeesReducer(initialState, action);
      const selId: string = getEmployeesId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = employeesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
