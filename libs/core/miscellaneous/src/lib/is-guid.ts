import { isString } from './is-string';

const GUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isGuid(value: unknown): boolean {
  return isString(value) && GUID_REGEXP.test(value);
}
