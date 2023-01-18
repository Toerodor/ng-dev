export function isUndefined(v: unknown): v is undefined | null {
  return v === undefined || v === null;
}
