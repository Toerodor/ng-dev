import { isString } from '@loriini/miscellaneous';

import { toLower } from './to-lower';

export function normalizeValue(value: unknown, caseSensitive: boolean) {
  const str = encodeURIComponent(isString(value) ? `'${value}` : `${value}`);
  return caseSensitive ? str : toLower(str);
}
