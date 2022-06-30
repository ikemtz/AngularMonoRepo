import { of } from 'rxjs';
import { KendoGridBaseComponent } from './kendo-grid-base-component';

describe('KendoGridBaseComponent', () => {

  test('should handle subscribables', () => {
    const component = new MockGridComponent();
    component.allSubscriptions.push(of(123).subscribe());
    component.ngOnDestroy();
    expect(component.allSubscriptions).toEqual({ _subscriptions: [] });
  });
  test('should handle getExportFileName', () => {
    const component = new MockGridComponent();
    const result = component.getExportFileName('myExcel');
    expect(result.startsWith('myExcel-')).toBe(true);
  });

  describe('getRelatedValue', () => {
    it('should work', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedValue({ id: '1', parent: { child: 123 } }, 'parent', 'child');
      expect(result).toBe(123);
    });
    it('should handle null objects', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedValue(null as never, 'parent1', 'child');
      expect(result).toBeNull();
    });
    it('should handle parent nulls', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedValue({ id: null as never, parent: { child: 123 } }, 'parent1', 'child');
      expect(result).toBeUndefined();
    });
    it('should handle child nulls', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedValue({ id: 'test', parent: { child: 123 } }, 'parent', 'child1');
      expect(result).toBeUndefined();
    });
  });
  describe('getRelatedField', () => {
    it('should work', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedField('parent', 'child');
      expect(result).toBe(`parent.child`);

    }); it('should work with subChilds', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedField('parent', 'child', 'subChild');
      expect(result).toBe(`parent.child.subChild`);
    });
  });
});

interface TestModel {
  id: string,
  parent: {
    child: string | number;
  };
}

export class MockGridComponent extends KendoGridBaseComponent<TestModel> {

}
