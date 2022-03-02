import { KendoArrayBasedComponent } from './kendo-array-base-component';

class TestArrayComponent extends KendoArrayBasedComponent<unknown, unknown> {
  props = { HELP: '🙇‍♂️🙇‍♂️' };
}

describe('KendoArrayBasedComponent', () => {
  const arrayComponent = new TestArrayComponent({
    markForCheck: jest.fn(),
  } as never);

  it('should handle on Destroy()', () => {
    arrayComponent.ngOnDestroy();
    expect(arrayComponent.allSubscriptions.length).toBe(0);
  });

  it('should handle on dataStateChange()', () => {
    arrayComponent.detail = [{ id: 6, field: 'x' }];
    arrayComponent.dataStateChange({ take: 3, skip: 0, sort: [{ field: 'id', dir: 'desc' }] });
    expect(arrayComponent.state).toStrictEqual({ take: 3, skip: 0, sort: [{ field: 'id', dir: 'desc' }] });
    expect(arrayComponent.gridData).toStrictEqual({ total: 1, data: [{ id: 6, field: 'x' }] });
  });
});
