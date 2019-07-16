import { Entity, EmployeesState } from './employees.reducer';
import { employeesQuery } from './employees.selectors';

describe('Employees Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEmployeesId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createEmployees = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      employees: {
        list: [createEmployees('PRODUCT-AAA'), createEmployees('PRODUCT-BBB'), createEmployees('PRODUCT-CCC')],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Employees Selectors', () => {
    it('getAllEmployees() should return the list of Employees', () => {
      const results = employeesQuery.getAllEmployees(storeState);
      const selId = getEmployeesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedEmployees() should return the selected Entity', () => {
      const result = employeesQuery.getSelectedEmployees(storeState);
      const selId = getEmployeesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = employeesQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = employeesQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
