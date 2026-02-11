import {
  CompositeFilterDescriptor,
  toODataString,
} from '@progress/kendo-data-query';
import { getODataString, ICompositeFilter } from 'imng-odata-client';

describe('Generated imng-odata-client toODataString should match Kendo ', () => {
  it('kendo ser', () => {
    const filters: ICompositeFilter = {
      logic: 'and',
      filters: [
        { field: 'a.b.c', operator: 'eq', value: 1 },
        { field: 'a.b.c', operator: 'eq', value: '1' },
      ],
    };
    const kendoResult = toODataString({
      filter: filters as CompositeFilterDescriptor,
    });
    const imngResult = getODataString({ filter: filters, count: false });
    expect(kendoResult).toEqual(imngResult);
  });
});
