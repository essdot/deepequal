var test = require('tape')
var deepEqual = require('./')

test('primitives', function(t) {
  t.ok(deepEqual(1, 1))
  t.ok(deepEqual('a', 'a'))
  t.ok(deepEqual(undefined, undefined))
  t.ok(deepEqual(null, null))
  t.ok(deepEqual(true, true))

  t.notOk(deepEqual('5', 5))
  t.notOk(deepEqual('Infinity', Infinity))
  t.notOk(deepEqual([1, 2, 3], '1,2,3'))

  t.end()
})

test('arrays', function(t) {
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

test('objects', function(t) {
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

  t.ok(deepEqual(d, new Date(d.getTime())))

  t.notOk(deepEqual(d, new Date(d.getTime() + 1)))
  t.notOk(deepEqual(d, {}))

  t.end()
})

test('buffers', function(t) {
  t.ok(deepEqual(new Buffer('abc'), new Buffer('abc')))

  t.notOk(deepEqual(new Buffer('abc'), new Buffer('abcd')))
  t.notOk(deepEqual(new Buffer('abc'), 'abc'))
  t.notOk(deepEqual(new Buffer('abc'), ['abc']))
  t.notOk(deepEqual(new Buffer('abc'), ['a', 'b', 'c']))
  t.notOk(deepEqual(new Buffer('abc'), {}))

  t.end()
})
