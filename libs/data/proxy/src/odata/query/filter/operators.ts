import { isArray, isGuid, isPrimitive, isString } from '@loriini/miscellaneous';

import { filterOperatorFactory } from '../../../server/query';

export const oDataBinaryFilterOperatorFactory
  = (operator: string) => filterOperatorFactory(
  ({ value, field }) => `${oDataNormalizeField(field as string)} ${operator} ${oDataNormalizeValue(value)}`
  );

export const oDataStringFunctionFilterOperatorFactory
  = (operator: string) => filterOperatorFactory(
  ({ value, field }) => `${operator}(${oDataNormalizeField(field as string)},${oDataNormalizeValue(value)})`
  );

export const oDataJoinFilterOperator
  = (logic: 'or' | 'and') => ` ${logic === 'or' ? 'or' : 'and'} `;


export const eq = oDataBinaryFilterOperatorFactory('eq');
export const ne = oDataBinaryFilterOperatorFactory('ne');
export const lt = oDataBinaryFilterOperatorFactory('lt');
export const lte = oDataBinaryFilterOperatorFactory('lte');
export const gt = oDataBinaryFilterOperatorFactory('gt');
export const gte = oDataBinaryFilterOperatorFactory('gte');

export const eqEmpty = filterOperatorFactory(({ field }) => `${field} eq ''`);
export const neEmpty = filterOperatorFactory(({ field }) => `${field} ne ''`);

export const eqNull = filterOperatorFactory(({ field }) => `${field} eq null`);
export const neNull = filterOperatorFactory(({ field }) => `${field} ne null`);

export const contains = oDataStringFunctionFilterOperatorFactory('contains');
export const endswith = oDataStringFunctionFilterOperatorFactory('endswith');
export const startswith = oDataStringFunctionFilterOperatorFactory('startswith');
export const doesnotcontain = filterOperatorFactory(({ field }) => `length(${oDataNormalizeField(field as string)}) eq 0`);

export const oDataNormalizeValue = (value: unknown) => {
  switch (true) {
    case isGuid(value):
      return value as string;
    case isString(value):
      return `'${value}'`;
    case isPrimitive(value):
      return value.toString();
    case value instanceof Date:
      return (value as Date).toISOString();
    case isArray(value):
      return `[${(value as unknown[]).map(d => oDataNormalizeValue(d)).join(',')}]`;
    case value === null :
      return 'null';
  }

  return JSON.stringify(value);
};

export const oDataNormalizeField = (value: string) => value.replace(/\./g, '/');

