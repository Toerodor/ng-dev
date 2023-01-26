import { map, OperatorFunction } from 'rxjs';

export function pluck<T, R>(properties: Array<string | number | symbol>): OperatorFunction<T, R> {
  const length = properties.length;
  if (length === 0) {
    throw new Error('list of properties cannot be empty.');
  }

  return map((x) => pluckSync(x, properties));
}

export function pluckSync<T, R>(target: T, properties: Array<string | number | symbol>): R {
  let currentProp: any = target;
  for (let i = 0; i < length; i++) {
    const p = currentProp?.[properties[i]];
    if (typeof p !== 'undefined') {
      currentProp = p;
    } else {
      return undefined;
    }
  }
  return currentProp;
}
