export function isObject(obj: unknown): obj is Record<string | number | symbol, unknown> {
  return obj !== null && typeof obj === 'object'
}
