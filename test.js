var test = require('tape')
var deepEqual = require('./')

test('arrays equal', function(t) {
  t.ok(deepEqual([1, 2, 3], [1, 2, 3]))
  t.ok(deepEqual(['a'], ['a']))
  t.ok(deepEqual([NaN], [NaN]))
  t.ok(deepEqual([], []))
  t.ok(deepEqual([{}], [{}]))
  t.ok(deepEqual([{a: 1, b: 2}], [{a: 1, b: 2}]))

  t.notOk(deepEqual([1, 2, 3, 4], [1, 2, 3]))
  t.notOk(deepEqual([''], ['', '']))
  t.notOk(deepEqual([1], [1, 1]))

  t.end()
})

test('objects equal', function(t) {
  t.ok(deepEqual({}, {}))
  t.ok(deepEqual({a: NaN}, {a: NaN}))
  t.ok(deepEqual({a: 1, b: 2}, {a: 1, b: 2}))
  t.ok(deepEqual({a: [], b: [1, 2, 3]}, {a: [], b: [1, 2, 3]}))

  t.notOk(deepEqual({a: NaN}, {b: NaN}))
  t.notOk(deepEqual({a: 1, b: 2}, {a: 1, b: 2, c: 1}))

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