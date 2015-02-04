module.exports = deepEqual

function deepEqual(a, b) {
  var aKeys
    , bKeys
    , i

  if(a === b) {
    return true
  }

  if(isNan(a) || isNan(b)) {
    return isNan(a) && isNan(b)
  }

  if(typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  if(a instanceof Date || b instanceof Date) {
    if(a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    }

    return false
  }

  if(a instanceof RegExp || b instanceof RegExp) {
    if(a instanceof RegExp && b instanceof RegExp) {
      return RegExp.prototype.toString.call(a) ===
        RegExp.prototype.toString.call(b)
    }

    return false
  }

  if(isBuffer(a) || isBuffer(b)) {
    return buffersEqual(a, b)
  }

  if(isArguments(a) || isArguments(b)) {
    if(!isArguments(a) || !isArguments(b)) {
      return false
    }

    return deepEqual([].slice.call(a), [].slice.call(b))
  }

  aKeys = Object.keys(a)
  bKeys = Object.keys(b)

  if(aKeys.length !== bKeys.length) {
    return false
  }

  for(i = 0; i < aKeys.length; i++) {
    var key = aKeys[i]

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