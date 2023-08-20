import { SortingState } from './DataTableContext';

export const getNewSortingState = <T>(field: keyof T) => {
  return (prevSorting: SortingState<T> | null) => {
    if (prevSorting?.field !== field) {
      return {
        field,
        direction: 'asc',
      } as SortingState<T>;
    }
    if (prevSorting?.direction === 'desc') return null;
    return {
      ...prevSorting,
      direction: 'desc',
    } as SortingState<T>;
  };
};

export const getSortedData = <T>(data: T[], sorting: SortingState<T> | null) => {
  if (!sorting) return data;
  return [...data].sort((a, b) => {
    const aValue = a[sorting.field];
    const bValue = b[sorting.field];
    if (aValue < bValue) return sorting.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sorting.direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const getFilterData = <T>(data: T[], searchText: string) => {
  if (!searchText) return data;
  return data.filter((item) => {
    const concatenatedValues = Object.values(item as object)
      .map((value) => value.toString())
      .join('')
      .toLowerCase();

    return concatenatedValues.includes(searchText.toLowerCase());
  });
};
