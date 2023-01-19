import { FilterCriteria, FilterExpression, isFilterCriteria, isFilterExpression } from '../../../../query';
import { normalizeField, normalizeValue } from './utils';

export const ComparisonOperators
  = new Set<string>(['eq', 'ne', 'gt', 'ge', 'lt', 'le']);

export const StringAndCollectionFunctions
  = new Set<string>(['concat', 'contains', 'endswith', 'indexof', 'startswith', 'substring']);

export function filterBuilder(filterExpression: FilterExpression) {
  return buildFilterExpression(filterExpression);
}

export function buildFilterExpression({ logic, items }: FilterExpression): string {
  return items.reduce<string[]>(
    (strings, filter) => [
      ...strings,
      (isFilterExpression(filter) ? buildFilterExpression(filter) : buildFilterCriteria(filter))
    ],
    []
  ).join(logic)
}
/**
 * eq  ->  Address/City eq 'Redmond'
 * ne  ->  Address/City ne 'London'
 * gt  ->  Price gt 20
 * ge  ->  Price ge 10
 * lt  ->  Price lt 20
 * le  ->  Price le 100
 *
 * has ->  Style has Sales.Color'Yellow'
 * in  ->  Address/City in ('Redmond', 'London')
 *
 *
 * concat     ->  concat(concat(City,', '), Country) eq 'Berlin, Germany'
 * contains   ->  contains(CompanyName,'freds')
 * endswith   ->  endswith(CompanyName,'Futterkiste')
 * indexof    ->  indexof(CompanyName,'lfreds') eq 1
 * startswith ->  startswith(CompanyName,’Alfr’)
 * substring  ->  substring(CompanyName,1) eq 'lfreds Futterkiste'
 *
 *
 * length     ->  length(CompanyName) eq 19
 *
 * */

// TODO: buildFilterCriteria

export function buildFilterCriteria({ field, op, value, caseSensitive }: FilterCriteria): string {
  value = normalizeValue(value, caseSensitive);
  field = isFilterCriteria(field)
    ? buildFilterCriteria(field)
    : normalizeField(field, caseSensitive);

  if(ComparisonOperators.has(op)){
    return `${field} ${op} ${value}`
  }

  if(StringAndCollectionFunctions.has(op)) {
    return `${op}(${field},${value})`
  }

  if('length' === op) {
    return `length(${field}) eq ${value}`;
  }


  return `${field} eq ${value}`
}

