import { BoundChildTableProperty } from './fetch-options';
import { ODataState } from './odata-state';
import { translateChildSortingExpression } from './translate-child-sorting-expression';

describe('translateChildSortingExpression', () => {
  it('should handle child sorting', async () => {
    const odataState: ODataState = { expanders: [{ table: 'a' }], sort: [{ field: 'a.b', dir: 'desc' }] };
    const childTableProperties: BoundChildTableProperty[] = [{ table: 'a', field: 'b' }];
    const result = translateChildSortingExpression(odataState, childTableProperties);
    expect(result).toMatchSnapshot();
  });
  it('should handle child sorting on previously sorted column', async () => {
    const odataState: ODataState = {
      expanders: [{ table: 'a', sort: [{ field: 'b', dir: 'desc' }] }],
      sort: [{ field: 'a.b', dir: 'desc' }],
    };
    const childTableProperties: BoundChildTableProperty[] = [{ table: 'a', field: 'b' }];
    const result = translateChildSortingExpression(odataState, childTableProperties);
    expect(result).toMatchSnapshot();
  });
});
