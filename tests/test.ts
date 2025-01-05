import { describe, it, expect } from '@jest/globals'
import mergeProps from '../src'

describe('merge props', () => {

  it('shallow merge styles with no conflicts', () => {
    expect(mergeProps(
      { style: { color: 'red' } },
      { style: { backgroundColor: 'black' } }
    )).toEqual({ style: { color: 'red', backgroundColor: 'black' } })
  })

  it('shallow merge styles with conflicts', () => {
    expect(mergeProps(
      { style: { color: 'red', backgroundColor: 'blue' } },
      { style: { backgroundColor: 'black' } }
    )).toEqual({ style: { color: 'red', backgroundColor: 'black' } })
  })

  it('concat class names', () => {
    expect(mergeProps(
      { className: 'name1' },
      { className: 'name2' }
    )).toEqual({ className: 'name1 name2' })
  })

  it('chain functions in order', () => {
    let count = 0
    const event1 = () => count += 3
    const event2 = () => count *= 5
    const newProps = mergeProps(
      { onClick: event1 },
      { onClick: event2 }
    )
    newProps.onClick()
    expect(count).toBe(15)
  })

  it('does not merge other objects', () => {
    expect(mergeProps(
      { styles: { color: 'red' } },
      { styles: { textAlign: 'center' } }
    )).toEqual({ styles: { textAlign: 'center' } })
  })

  it('does not merge other strings', () => {
    expect(mergeProps(
      { namedClass: 'name1' },
      { namedClass: 'name2' }
    )).toEqual({ namedClass: 'name2' })
  })

  it('returns empty object if no arguments', () => {
    expect(mergeProps()).toEqual({})
  })

  it('returns the only object if only one argument', () => {
    expect(mergeProps({ style: { color: 'red' } })).toEqual({ style: { color: 'red' } })
  })

  it('merges multiple objects', () => {
    expect(mergeProps(
      { style: { color: 'red' } },
      { style: { backgroundColor: 'black' } },
      { style: { textAlign: 'center' } }
    )).toEqual({ style: { color: 'red', backgroundColor: 'black', textAlign: 'center' } })
  })

  it('ignore undefined values', () => {
    expect(mergeProps(
      { style: { color: 'red' } },
      { style: undefined }
    )).toEqual({ style: { color: 'red' } })
  })
})
