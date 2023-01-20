import { isArray } from './is-array';
import { isObject } from './is-object';
import { isDefined } from './is-defined';

const bannedObjectKeys = new Set<string>(['__proto__', 'constructor', 'prototype']);

export function mergeObjects(...objects: Record<string | number | symbol, unknown>[]) {
  return objects.reduce((target, source) => {
    if(!isDefined(source) || isArray(source)) {
      return target;
    }

    Object.keys(source).forEach((key) => {
      if (bannedObjectKeys.has(key)) {
        return;
      }

      if (isArray(target[key]) && isArray(source[key])) {
        target[key] = Array.from(new Set((target[key] as unknown[]).concat(source[key])));
      } else if (isObject(target[key]) && isObject(source[key])) {
        target[key] = mergeObjects(
          target[key] as Record<string | number | symbol, unknown>,
          source[key] as Record<string | number | symbol, unknown>
        );
      } else {
        target[key] = source[key];
      }
    });

    return target;
  }, {});
}
