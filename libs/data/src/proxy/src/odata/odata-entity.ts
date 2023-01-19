import { isObject } from '@loriini/miscellaneous';

export type ODataEntity<T> = T & {
  "@odata.context": string;
};

export function isODataEntity<T>(value: unknown): value is ODataEntity<T> {
  return isObject(value) && ("@odata.context" in value);
}
