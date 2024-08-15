/* eslint-disable eqeqeq */
const debounce = (func, timeout: number) => {
  let timeoutId;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const isNumber = (value) => {
  return typeof value === 'number';
};

const isNil = (value) => {
  return value == null;
};

const checkIsObject = (value) => {
  const type = typeof value;
  return value !== null && type === 'object';
};

const keys = (object) => {
  if (!checkIsObject(object)) {
    return [];
  }
  return Object.keys(object);
};

const map = (array, iteratee) => {
  const compare = typeof iteratee === 'function' ? iteratee : (element) => element[iteratee];

  const result = [];

  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      const value = compare(array[i], i, array);
      result.push(value);
    }
  }

  if (typeof array === 'object' && !Array.isArray(array)) {
    for (const key in array) {
      const value = compare(array[key], key, array);
      result.push(value);
    }
  }

  return result;
};

const size = (collection) => {
  if (collection == null || collection == undefined) {
    return 0;
  }
  if (Array.isArray(collection) || typeof collection === 'string') {
    return collection.length;
  }
  if (typeof collection === 'object') {
    return Object.keys(collection).length;
  }
  return 0;
};

const flatten = (array) => {
  const newArray = [];
  for (const current of array) {
    if (Array.isArray(current)) {
      newArray.push(...current);
    } else {
      newArray.push(current);
    }
  }
  return newArray;
};

const maxBy = (array: any[], iteratee) => {
  if (!array || array.length === 0) {
    return undefined;
  }
  let result = array[0];
  let max = iteratee(result);
  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    const currentValue = iteratee(current);
    if (currentValue > max) {
      result = current;
      max = currentValue;
    }
  }
  return result;
};

function merge(object: object, source: object) {
  if (typeof object !== 'object' || typeof source !== 'object') {
    return source ?? object;
  }
  Object.keys(object).forEach((key) => {
    merge(object[key], source[key]);
  });
  Object.keys(source).forEach((key) => {
    if (!Object.hasOwn(object, key)) {
      object[key] = source[key];
    }
  });
  return object;
}

const cloneDeep = (value) => {
  if (value == null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(cloneDeep);
  }

  const result = {};

  Object.keys(value).forEach((key) => {
    result[key] = cloneDeep(value[key]);
  });

  return result;
};

const isString = (value) => {
  return value != null && typeof value === 'string';
};

const orderBy = (collection, iteratees, orders) => {
  const newCollection = collection?.map((item, index) => ({ item, index }));

  newCollection?.sort((a, b) => {
    for (let i = 0; i < iteratees?.length; i++) {
      const iteratee = iteratees[i];
      const order = orders[i] === 'desc' ? -1 : 1;

      const aValue = typeof iteratee === 'function' ? iteratee(a.item) : a.item[iteratee];
      const bValue = typeof iteratee === 'function' ? iteratee(b.item) : b.item[iteratee];

      if (aValue < bValue) {
        return -1 * order;
      } else if (aValue > bValue) {
        return 1 * order;
      }
    }

    return a.index - b.index;
  });

  return newCollection?.map(({ item }) => item);
};

const omit = (obj, omitKey) => {
  return Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

function some(collection: any[] | object, predicate) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) {
        return true;
      }
    }
  }

  if (typeof collection === 'object') {
    for (const key in collection) {
      if (predicate(collection[key], key, collection)) {
        return true;
      }
    }
  }

  return false;
}

const isEmpty = (value) => {
  if (value == null) {
    return true;
  }
  if (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function') {
    return !value.length;
  }
  return false;
};

const reduce = (array, iteratee, accumulator) => {
  if (array == null) {
    return accumulator;
  }
  let index = -1;
  let output = accumulator;
  // Là mảng
  if (typeof array !== 'function' && array?.length > -1) {
    const length = array == null ? 0 : array.length;
    while (++index < length) {
      output = iteratee(output, array[index], index, array);
    }
  } else {
    const iterable = Object(array);
    const props = Object.keys(iterable);
    let { length } = props;
    while (length--) {
      const key = props[++index];
      const temp = iteratee(output, iterable[key], key, iterable);
      if (temp === false) {
        break;
      } else {
        output = temp;
      }
    }
  }
  return output;
};

const lodash = {
  debounce,
  isNumber,
  keys,
  map,
  size,
  flatten,
  maxBy,
  merge,
  cloneDeep,
  isString,
  orderBy,
  isNil,
  omit,
  isEmpty,
  some,
  isNaN,
  reduce,
};

export default lodash;
