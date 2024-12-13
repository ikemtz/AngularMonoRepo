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
      const result = component.getRelatedValue(
        { id: '1', parent: { child: 123 } },
        'parent',
        'child',
      );
      expect(result).toBe(123);
    });
    it('should handle null objects', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedValue(
        null as never,
        'parent1',
        'child',
      );
      expect(result).toBeNull();
    });
    it('should handle parent nulls', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedValue(
        { id: null as never, parent: { child: 123 } },
        'parent1',
        'child',
      );
      expect(result).toBeUndefined();
    });
    it('should handle child nulls', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedValue(
        { id: 'test', parent: { child: 123 } },
        'parent',
        'child1',
      );
      expect(result).toBeUndefined();
    });
  });
  describe('getRelatedField', () => {
    it('should work', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedField('parent', 'child');
      expect(result).toBe(`parent.child`);
    });
    it('should work with subChilds', () => {
      const component = new MockGridComponent();
      const result = component.getRelatedField('parent', 'child', 'subChild');
      expect(result).toBe(`parent.child.subChild`);
    });
  });
  it('should getEnumText', () => {
    const component = new MockGridComponent();
    const result = component.getEnumText(
      [{ key: 5, name: 'subChild', displayText: 'Sub Child' }],
      'subChild',
    );
    expect(result).toBe(`Sub Child`);
  });
  it('should getEnumText - undefined', () => {
    const component = new MockGridComponent();
    const result = component.getEnumText(
      [{ key: 2, name: 'subChild', displayText: 'Sub Child' }],
      'badSubChild',
    );
    expect(result).toBeUndefined();
  });

  it('should handle getExportFileName', async () => {
    const component = new MockGridComponent();
    const result = component.getExportFileName('unit-test');
    expect(result).toHaveLength(28);
  });

  it('should handle getRelatedValue', () => {
    const component = new MockGridComponent();
    const result = component.getRelatedValue(
      { id: '1', parent: { child: 'unit-test' } },
      'parent',
      'child',
    );
    expect(result).toBe('unit-test');
  });

  it('should handle getRelatedField', () => {
    const component = new MockGridComponent();
    const result = component.getRelatedField('subItem', 'name');
    expect(result).toBe('subItem.name');
  });

  it('should handle getEnumText with matching result', () => {
    const component = new MockGridComponent();
    const data = [
      { key: 1, name: 'val1', displayText: 'value 1' },
      { key: 2, name: 'val2', displayText: 'value 2' },
    ];
    const result = component.getEnumText(data, 'val1');
    expect(result).toBe('value 1');
  });

  it('should handle getEnumText with no result', () => {
    const component = new MockGridComponent();
    const data = [
      { key: 1, name: 'val1', displayText: 'value 1' },
      { key: 2, name: 'val2', displayText: 'value 2' },
    ];
    const result = component.getEnumText(data, 'val3');
    expect(result).toBeUndefined();
  });
});

interface TestModel {
  id: string;
  parent: {
    child: string | number;
  };
}

export class MockGridComponent extends KendoGridBaseComponent<TestModel> {}
