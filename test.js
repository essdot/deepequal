var test = require('tape')
var deepEqual = require('./')

test('primitives', function(t) {
  t.ok(deepEqual(1, 1))
  t.ok(deepEqual('a', 'a'))
  t.ok(deepEqual(undefined, undefined))
  t.ok(deepEqual(null, null))
  t.ok(deepEqual(true, true))
  t.ok(deepEqual(NaN, NaN))

  t.notOk(deepEqual('5', 5))
  t.notOk(deepEqual('Infinity', Infinity))
  t.notOk(deepEqual([1, 2, 3], '1,2,3'))

  t.end()
})

test('arrays', function(t) {
  t.ok(deepEqual([1, 2, 3], [1, 2, 3]))
  t.ok(deepEqual(['a'], ['a']))
  t.ok(deepEqual([NaN], [NaN]))
  t.ok(deepEqual([Math], [Math]))
  t.ok(deepEqual([5, NaN, 9], [5, NaN, 9]))
  t.ok(deepEqual([], []))
  t.ok(deepEqual([{}], [{}]))
  t.ok(deepEqual([[]], [[]]))
  t.ok(deepEqual([[], []], [[], []]))
  t.ok(deepEqual([{a: 1, b: 2}], [{a: 1, b: 2}]))

  t.notOk(deepEqual([1, 2, 3, undefined], [1, 2, 3]))
  t.notOk(deepEqual([1, 2, 3, 4], [1, 2, 3]))
  t.notOk(deepEqual([''], ['', '']))
  t.notOk(deepEqual([1], [1, 1]))
  t.notOk(deepEqual([1], {'0': 1}))

  t.end()
})

test('arrays with holes', function(t) {
  var arr1 = [1, 2, 3]
  var arr2 = [1, 2, 3]

  arr1[7] = 5
  arr2[7] = 5

  t.ok(deepEqual(arr1, arr2))

  t.end()
})

test('objects', function(t) {
  t.ok(deepEqual({}, {}))
  t.ok(deepEqual({a: NaN}, {a: NaN}))
  t.ok(deepEqual({a: 1, b: 2}, {a: 1, b: 2}))
  t.ok(deepEqual({a: [], b: [1, 2, 3]}, {a: [], b: [1, 2, 3]}))

  t.ok(deepEqual(
      {
          '1': {
              '2': {
                  '3': 4
                , '5': [{}, {'hi': true, 'bye': {}}]
              }
          }
      }
    , {
          '1': {
              '2': {
                  '3': 4
                , '5': [{}, {'hi': true, 'bye': {}}]
              }
          }
      }
    )
  )

  t.notOk(deepEqual({a: NaN}, {b: NaN}))
  t.notOk(deepEqual({a: 1, b: 2}, {a: 1, b: 2, c: 1}))

  t.notOk(deepEqual(
      {
          '1': {
              '2': {
                  '3': 4
                , '5': [{}, {'hi': true, 'bye': {}}]
              }
          }
      }
    , {
          '1': {
              '2': {
                  '3': 4
                , '5': [{}, {'hi': true, 'bye': []}]
              }
          }
      }
    )
  )

  t.end()
})

test('arguments', function(t) {
  function makeArguments() {
    return arguments
  }

  t.ok(deepEqual(makeArguments(1, 2, 3), makeArguments(1, 2, 3)))
  t.ok(deepEqual(makeArguments('a'), makeArguments('a')))
  t.ok(deepEqual(makeArguments({}), makeArguments({})))

  t.notOk(deepEqual(makeArguments(1, 2, 3), [1, 2, 3]))
  t.notOk(deepEqual(makeArguments('a'), ['a']))

  t.end()
})

test('regexp', function(t) {
  t.ok(deepEqual(/abc/, /abc/))

  t.notOk(deepEqual(/abc/, /abcd/))
  t.notOk(deepEqual(/abc/, {}))
  t.notOk(deepEqual(/abc/, ['a', 'b', 'c']))
  t.notOk(deepEqual(/abc/, ['abc']))
  t.notOk(deepEqual(/abc/, 'abc'))

  t.end()
})

test('date', function(t) {
  var d = new Date
  var dTime = d.getTime()

  t.ok(deepEqual(new Date(1), new Date(1)))
  t.ok(deepEqual(d, new Date(dTime)))

  t.notOk(deepEqual(d, new Date(1)))
  t.notOk(deepEqual(d, new Date(dTime + 1)))
  t.notOk(deepEqual(d, { 
      getTime: function() {
        return dTime
      }
    })
  )

  t.end()
})

test('buffers', function(t) {
  t.ok(deepEqual(new Buffer('abc'), new Buffer('abc')))

  t.notOk(deepEqual(new Buffer('abc'), new Buffer('abcd')))
  t.notOk(deepEqual(new Buffer('a'), [97]))
  t.notOk(deepEqual(new Buffer('abc'), 'abc'))
  t.notOk(deepEqual(new Buffer('abc'), ['abc']))
  t.notOk(deepEqual(new Buffer('abc'), ['a', 'b', 'c']))
  t.notOk(deepEqual(new Buffer('abc'), {}))

  t.end()
})


test('handles deep equality of arrays', function(assert) {
  var arr1 = [1, 2, 3];
  var arr2 = [1, 2, 3];
  var arr3 = [1, 2, 3];
  var arr4 = [1, 2, 3];
  arr3[6] = 6;

  assert.ok(deepEqual(arr1, arr2))
  assert.ok(deepEqual(arr1.concat([9, 16]), [1, 2, 3, 9, 16]))
  assert.ok(deepEqual([], []))

  assert.notOk(deepEqual(arr1, [1, 2, 3, 4]))
  assert.notOk(deepEqual(arr1, [3, 2, 1]))

  assert.notOk(deepEqual(arr3, arr4))
  arr4[6] = 6;
  assert.ok(deepEqual(arr3, arr4))

  assert.end()
})

test('handles deep equality of objects', function(assert) {
  var obj1 = {
    boolProp: true,
    stringProp: 'abc',
    arrProp: [1, 2, 3],
    undefProp: undefined,
    nullProp: null
  };

  var obj2 = {
    undefProp: undefined,
    stringProp: 'abc',
    arrProp: [1, 2, 3],
    boolProp: true,
    nullProp: null
  }

  var objWithMore = {
    boolProp: true,
    boolProp2: true,
    stringProp: 'abc',
    arrProp: [1, 2, 3],
    undefProp: undefined,
    nullProp: null
  }

  var objWithLess = {
    stringProp: 'abc',
    arrProp: [1, 2, 3],
    undefProp: undefined,
    nullProp: null
  }

  assert.ok(deepEqual(obj1, obj2))
  assert.ok(deepEqual({}, {}))

  assert.notOk(deepEqual(obj1, objWithLess))
  assert.notOk(deepEqual(obj1, objWithMore))

  assert.end()
})