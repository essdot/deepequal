# deepEqual
Deep equality for JavaScript

Strict equality only. 😎

-------

`deepEqual(val1, val2) --> boolean`

deepEqual will compare the values, and if they are objects, will compare each of the objects' members to see if they're the same. 

There are some special cases:

- Dates: compare `date.getTime()`
- Errors: compare `name` and `message`
- RegExps: converted to strings & compared
- Buffers: buffer contents compared

deepEqual works correctly for `NaN`.
