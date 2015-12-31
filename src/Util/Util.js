import React from 'react';

// Functions from lodash 4.0.0-pre

/**
 * Appends the elements of `items` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} items The items to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, items) {
  let index = -1,
    length = items.length,
    offset = array.length;

  while (++index < length) {
    array[offset + index] = items[index];
  }
  return array;
}

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, result) {
  result = result || [];

  let index = -1,
    length = array.length;

  while (++index < length) {
    let value = array[index];
    if (isObjectLike(value) && isArrayLike(value) &&
        (isStrict || value.isArray || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, isDeep, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property names.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);

  let index = -1,
    length = props.length,
    result = {};

  while (++index < length) {
    let key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  let index = -1,
    length = props.length,
    result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

/**
 * Excludes given properties from object
 *
 * @param  {Object} object
 * @param  {Array} props Array of properties to remove
 * @return {Object} New object without given props
 */
function exclude(object, props) {
  let newObject = {};

  Object.keys(object).forEach(function (prop) {
    if (props.indexOf(prop) === -1) {
      newObject[prop] = object[prop];
    }
  });

  return newObject;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @return {Boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && value.length &&
    !(
      typeof value === 'function' &&
      Object.prototype.toString.call(value) === '[object Function]'
    ) && typeof value === 'object';
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value === 'object';
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  return (typeof value === 'object' || typeof value === 'function') &&
    Object.prototype.toString.call(value) === '[object Function]';
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property names to pick, specified
 *  individually or in arrays.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.pick(object, 'user');
 * // => { 'user': 'fred' }
 */
function pick(object, props) {
  return object === null ? {} : basePick(object, baseFlatten(props));
}

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, Object.keys(object)) : [];
}

// Custom functions created for reactjs-components

function clone(object) {
  if (object === null || typeof object != 'object') {
    return object;
  }
  let copy = object.constructor();
  for (let attr in object) {
    if (object.hasOwnProperty(attr)) {
      copy[attr] = object[attr];
    }
  }
  return copy;
}

/**
 * @param {Function} func A callback function to be called
 * @param {Number} wait How long to wait
 * @param {Boolean} immediate If it should be called immediately
 * @returns {Function} A function, that, as long as it continues to be
 * invoked, will not be triggered. The function will be called
 * after it stops being called for N milliseconds.
 * If `immediate` is passed, trigger the function on the leading edge,
 * instead of the trailing.
 */
function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  let later = function () {
    let last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    let callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

function es6ify(mixin) {
  if (typeof mixin === 'function') {
    // mixin is already es6 style
    return mixin;
  }

  return function (Base) {
    // mixin is old-react style plain object
    // convert to ES6 class
    class MixinClass extends Base {}

    const clonedMixin = Util.extend({}, mixin);
    // These React properties are defined as ES7 class static properties
    let staticProps = [
      'childContextTypes', 'contextTypes',
      'defaultProps', 'propTypes'
    ];
    staticProps.forEach(function (staticProp) {
      MixinClass[staticProp] = clonedMixin[staticProp];
      delete clonedMixin[staticProp];
    });

    MixinClass.prototype = Util.extend(MixinClass.prototype, clonedMixin);
    return MixinClass;
  };
}

function extend(object, ...sources) {

  sources.forEach(function (source) {
    if (Object.prototype.toString.call(source) !== '[object Object]') {
      return;
    }

    Object.keys(source).forEach(function (key) {
      object[key] = source[key];
    });
  });

  return object;
}

function find(objects, predicate) {
  let result;
  objects.some((object) => {
    if (predicate(object)) {
      result = object;
    }
  });
  return result;
}

function noop() {
  return null;
}

function sortBy(collection, sortProp) {
  if (isFunction(sortProp)) {
    return collection.sort(sortProp);
  } else {
    return collection.sort((a, b) => {
      let keyA = a[sortProp],
        keyB = b[sortProp];
      if (keyA < keyB) {
        return -1;
      } else if (keyA > keyB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

function trueNoop() {
  return true;
}

const Util = {

  /*
   * https://raw.githubusercontent.com/angus-c/es6-react-mixins/master/src/mixin.js
  */
  mixin(...mixins) {
    // Creates base class
    class Base extends React.Component {}
    Base.prototype.shouldComponentUpdate = trueNoop;

    // No-ops so we need not check before calling super()
    let functions = [
      'componentWillMount', 'componentDidMount',
      'componentWillReceiveProps', 'componentWillUpdate', 'componentDidUpdate',
      'componentWillUnmount', 'render'
    ];
    functions.forEach(function (lifecycleFn) {
      Base.prototype[lifecycleFn] = noop;
    });

    mixins.reverse();

    mixins.forEach(function (mixin) {
      Base = es6ify(mixin)(Base);
    });

    return Base;
  },

  // Superficial array check
  arrayDiff(a, b) {
    if (!a || !b) {
      return true;
    }

    return a.length !== b.length;
  },

  throttle(func, wait) {
    let canCall = true;

    let resetCall = function () {
      console.log('%%$#%$');
      canCall = true;
    };

    return function () {
      if (canCall) {
        setTimeout(resetCall, wait);
        canCall = false;
        func.apply(this, arguments);
      }
    };
  },

  // Add external lodash functions
  noop: noop,
  trueNoop: trueNoop,
  exclude: exclude,
  debounce: debounce,
  extend: extend,
  isArrayLike: isArrayLike,
  isObjectLike: isObjectLike,
  isArguments: isArguments,
  clone: clone,
  find: find,
  isFunction: isFunction,
  pick: pick,
  sortBy: sortBy,
  values: values
};

export default Util;
