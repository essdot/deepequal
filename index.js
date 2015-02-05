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

  if(typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  if(util.isArray(a) || util.isArray(b)) {
    if(!util.isArray(a) || !util.isArray(b)) {
      return false
    }
  }

  if(isArguments(a) || isArguments(b)) {
    if(!isArguments(a) || !isArguments(b)) {
      return false
    }
  }

  if(util.isDate(a) || util.isDate(b)) {
    if(util.isDate(a) && util.isDate(b)) {
      return a.getTime() === b.getTime()
    }

    return false
  }

  if(util.isRegExp(a) || util.isRegExp(b)) {
    if(util.isRegExp(a) && util.isRegExp(b)) {
          return RegExp.prototype.toString.call(a) ===
                 RegExp.prototype.toString.call(b)
    }

    return false
  }

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

function isNan(v) {
  return v !== v
}

function isArguments(o) {
  return Object.prototype.toString.call(o) === '[object Arguments]'
}

function isBuffer(x) {
  if(!x || typeof x !== 'object' || typeof x.length !== 'number' ||
      typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false
  }

  if(x.length > 0 && typeof x[0] !== 'number') {
    return false
  }

  return true
}

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