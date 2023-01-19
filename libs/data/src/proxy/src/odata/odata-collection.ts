import { isObject } from '@loriini/miscellaneous';

export type ODataCollection<T> = {
  "@odata.context": string;
  "@odata.count"?: number;
  value: T[];
}

export function isODataCollection<T>(value: unknown): value is ODataCollection<T> {
  if(!isObject(value)) {
    return false;
  }

  const nonOdataKeys = Object.keys(value).filter((key) => !key.startsWith("@odata"));

  return !!(nonOdataKeys.length === 1 && nonOdataKeys[0] === "value" && Array.isArray(value.value));
}
