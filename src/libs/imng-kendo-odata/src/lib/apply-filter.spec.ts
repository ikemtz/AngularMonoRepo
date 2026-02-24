import { applyFilter } from './apply-filter';
import { ODataState } from './odata-state';
import { IFilter } from 'imng-odata-client';

describe('applyFilter', () => {
  const genFilter = (): IFilter => ({
    field: 'ABC',
    operator: 'eq',
    value: 2,
    isRelativeValue: false,
  });
  it('should should initialize', () => {
    const result = applyFilter({}, genFilter());
    expect(result).toMatchSnapshot();
  });

  it('should should override values', () => {
    const state: ODataState = {
      filter: {
        logic: 'and',
        filters: [
          {
            logic: 'and',
            filters: [{ field: 'ABC', operator: 'lte', value: 6 }],
          },
        ],
      },
    };

    const result = applyFilter(state, genFilter());
    expect(result).toMatchSnapshot();
  });
});
