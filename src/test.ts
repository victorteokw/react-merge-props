import mergeProps from '.'
import test from 'ava'

test('shallow merge styles with no conflicts', (t) => {
  t.deepEqual(
    mergeProps(
      { style: { color: 'red' } },
      { style: { backgroundColor: 'black' } }
    ),
    { style: { color: 'red', backgroundColor: 'black' } }
  )
})

test('shallow merge styles with conflicts', (t) => {
  t.deepEqual(
    mergeProps(
      { style: { color: 'red', backgroundColor: 'blue' } },
      { style: { backgroundColor: 'black' } }
    ),
    { style: { color: 'red', backgroundColor: 'black' } }
  )
})

test('concat class names', (t) => {
  t.deepEqual(
    mergeProps(
      { className: 'name1' },
      { className: 'name2' }
    ),
    { className: 'name1 name2' }
  )
})

test('chain functions in order', (t) => {
  let count = 0
  const event1 = () => count += 3
  const event2 = () => count *= 5
  const newProps = mergeProps(
    { onClick: event1 },
    { onClick: event2 }
  )
  newProps.onClick()
  t.is(count, 15)
})

test('does not merge other objects', (t) => {
  t.deepEqual(
    mergeProps(
      { styles: { color: 'red' } },
      { styles: { textAlign: 'center' } }
    ),
    { styles: { textAlign: 'center' } }
  )
})

test('does not merge other strings', (t) => {
  t.deepEqual(
    mergeProps(
      { namedClass: 'name1' },
      { namedClass: 'name2' }
    ),
    { namedClass: 'name2' }
  )
})

test('returns empty object if no arguments', (t) => {
  t.deepEqual(mergeProps(), {})
})

test('returns the only object if only one argument', (t) => {
  t.deepEqual(
    mergeProps({ style: { color: 'red' } }),
    { style: { color: 'red' } }
  )
})

test('merges multiple objects', (t) => {
  t.deepEqual(
    mergeProps(
      { style: { color: 'red' } },
      { style: { backgroundColor: 'black' } },
      { style: { textAlign: 'center' } }
    ),
    { style: { color: 'red', backgroundColor: 'black', textAlign: 'center' } }
  )
})

test('ignore undefined values', (t) => {
  t.deepEqual(
    mergeProps(
      { key: { color: 'red' } },
      { key: undefined }
    ),
    { key: { color: 'red' } }
  )
})
