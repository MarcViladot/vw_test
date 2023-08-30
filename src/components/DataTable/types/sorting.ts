import { SortingState } from '@/components/DataTable/context/DataTableContext';

export interface SortingStrategy<T> {
  compare: (a: T, b: T) => number;
}

export class StringSortingStrategy<T> implements SortingStrategy<T> {
  constructor(private readonly sorting: SortingState<T>) {}

  compare = (a: T, b: T): number => {
    const aValue = String(a[this.sorting.field]);
    const bValue = String(b[this.sorting.field]);
    return this.sorting.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  };
}

export class NumberSortingStrategy<T> implements SortingStrategy<T> {
  constructor(private readonly sorting: SortingState<T>) {}

  compare = (a: T, b: T): number => {
    const aValue = Number(a[this.sorting.field]);
    const bValue = Number(b[this.sorting.field]);
    return this.sorting.direction === 'asc' ? aValue - bValue : bValue - aValue;
  };
}

export class DateSortingStrategy<T> implements SortingStrategy<T> {
  constructor(private readonly sorting: SortingState<T>) {}

  compare = (a: T, b: T): number => {
    const aValue = a[this.sorting.field] as unknown as Date;
    const bValue = b[this.sorting.field] as unknown as Date;
    return this.sorting.direction === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
  };
}
