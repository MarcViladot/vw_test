import { SortingState } from './DataTableContext';
import {
  DateSortingStrategy,
  NumberSortingStrategy,
  SortingStrategy,
  StringSortingStrategy,
} from '@/components/DataTable/types/sorting';

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

  const sortingStrategyMap: Record<string, SortingStrategy<T>> = {
    number: new NumberSortingStrategy<T>(sorting),
    date: new DateSortingStrategy<T>(sorting),
  };

  const defaultSortingStrategy = new StringSortingStrategy<T>(sorting);
  const dataType = typeof data[0][sorting.field];
  const sortingStrategy = sortingStrategyMap[dataType] || defaultSortingStrategy;

  return [...data].sort(sortingStrategy.compare);
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
