var util = require('util')

module.exports = deepEqual

function deepEqual(a, b) {
  var aKeys
    , bKeys
    , i
    , key

  if(a === b) {
    return true
  }

  if(isNan(a) || isNan(b)) {
    return isNan(a) && isNan(b)
  }

  // If typeof is not 'object', then it's either a primitive
  // or a function. In each case, if they're not triple-equal
  // then they're not equal.
  if(typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // If one is an array and the other isn't, not equal
  if(util.isArray(a) || util.isArray(b)) {
    if(!util.isArray(a) || !util.isArray(b)) {
      return false
    }
  }

  // If both are Dates, compare time since epoch.
  // If one is a Date and the other isn't, not equal
  if(util.isDate(a) || util.isDate(b)) {
    if(util.isDate(a) && util.isDate(b)) {
      return a.getTime() === b.getTime()
    }

    return false
  }

  if(isArguments(a) || isArguments(b)) {
    if(!isArguments(a) || !isArguments(b)) {
      return false
    }
  }

  // If one is a RegExp and the other isn't, not equal.
  // If both are RegExps, compare them as patterns.
  if(util.isRegExp(a) || util.isRegExp(b)) {
    if(util.isRegExp(a) && util.isRegExp(b)) {
          return RegExp.prototype.toString.call(a) ===
                 RegExp.prototype.toString.call(b)
    }

    return false
  }

  if(isBuffer(a) || isBuffer(b)) {
    return buffersEqual(a, b)
  }

  // If one is an arguments object and the other isn't, not equal.
  // If both are arguments objects, compare them as arrays.
  if(util.isError(a) || util.isError(b)) {
    if(util.isError(a) && util.isError(b)) {
      return a.name === b.name &&
             a.message === b.message
    }

    return false
  }

  if(isBuffer(a) || isBuffer(b)) {
    return buffersEqual(a, b)
  }

  // Walk the keys of both objects and compare them recursively.
  // If we find a difference, they're not equal. If no differences
  // are found, equal.
  aKeys = Object.keys(a).sort()
  bKeys = Object.keys(b).sort()

  if(aKeys.length !== bKeys.length) {
    return false
  }

  for(i = 0; i < aKeys.length; i++) {
    if(aKeys[i] !== bKeys[i]) {
      return false
    }

    key = aKeys[i]

    if(!deepEqual(a[key], b[key])) {
      return false
    }
  }

  return true
}

// NaN is the only value not-equal to itself
function isNan(v) {
  return v !== v
}

function isArguments(o) {
  return Object.prototype.toString.call(o) === '[object Arguments]'
}

function isBuffer(x) {
  if(!x || typeof x !== 'object') {
    return false
  }

  if(typeof x.length !== 'number' ||
      typeof x.copy !== 'function' ||
      typeof x.slice !== 'function') {
        return false
  }

  if(x.length > 0 && typeof x[0] !== 'number') {
    return false
  }

  return true
}

// If one is a buffer and the other isn't, not equal.
// Otherwise, compare lengths, then compare values
// at each index.
function buffersEqual(a, b) {
  if(!isBuffer(a) || !isBuffer(b)) {
    return false
  }

  if(a.length !== b.length) {
    return false
  }

  for(var i = 0; i < a.length; i++) {
    if(a[i] !== b[i]) {
      return false
    }
  }

  return true
}
