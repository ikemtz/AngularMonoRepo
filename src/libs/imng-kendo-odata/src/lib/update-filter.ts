import {
  ICompositeFilter,
  IFilter,
  isCompositeFilter,
  isFilter,
} from 'imng-odata-client';

export function updateFilter(
  compositefilter: ICompositeFilter,
  newFilter: IFilter,
): ICompositeFilter {
  compositefilter.filters.forEach((subFilter) => {
    if (isCompositeFilter(subFilter)) {
      updateFilter(subFilter, newFilter);
    } else if (isFilter(subFilter) && subFilter.field === newFilter.field) {
      compositefilter = {
        ...compositefilter,
        filters: [
          ...compositefilter.filters.filter(
            (f) =>
              isCompositeFilter(f) ||
              (isFilter(f) && f.field !== newFilter.field),
          ),
          newFilter,
        ],
      };
    }
  });
  return compositefilter;
}
