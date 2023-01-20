import { toLower } from './to-lower';

export function normalizeField(field: string, caseSensitive: boolean) {
  field = field.replace(/\./g, "/");
  return caseSensitive ? field : toLower(field);
}
