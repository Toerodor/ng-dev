
const SENTINEL = {};

const applyCache = (target: any, key: string | symbol, fn: () => any) => {
  if (target[key] === SENTINEL) {
    target[key] = fn.call(target);
  }

  return target[key];
}

export function memoize() {
  return (target: any, propertyKey: string | symbol, descriptor: any) => {
    const key = `_cache_${propertyKey.toString()}`;

    if (typeof descriptor.value === 'function' && descriptor.value.length > 0) {
      return {
        ...descriptor,
        value: function() {
          return applyCache(this, key, descriptor.value)
        }
      }
    }

    if (typeof descriptor.get === 'function') {
      return {
        ...descriptor,
        get: function() {
          return applyCache(this, key, descriptor.get)
        }
      };
    }

    return descriptor;
  }
}
