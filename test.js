const mergeProps = require('./index');

describe('merges special properties', () => {

  it('merges styles', () => {
    expect(mergeProps({
      style: { color: 'white' }
    }, {
      style: { backgroundColor: 'black' }
    })).toEqual({
      style: {
        color: 'white',
        backgroundColor: 'black'
      }
    });
  });

  it('merges class names', () => {
    expect(mergeProps({
      className: 'name1'
    }, {
      className: 'name2'
    })).toEqual({
      className: 'name1 name2'
    });
  });

  it('merges functions with prefix "on"', () => {
    const event1 = jest.fn();
    const event2 = jest.fn();
    const newEvent = mergeProps({
      onClick: event1
    }, {
      onClick: event2
    }).onClick;
    newEvent();
    expect(event1.mock.calls.length).toBe(1);
    expect(event2.mock.calls.length).toBe(1);
  });
});

describe('does not merge normal properties', () => {

  it('does not merge normal objects', () => {
    expect(mergeProps({
      styles: { color: 'red' }
    }, {
      styles: { textAlign: 'center' }
    })).toEqual({
      styles: { textAlign: 'center' }
    });
  });

  it('does not merge normal strings', () => {
    expect(mergeProps({
      namedClass: 'name1'
    }, {
      namedClass: 'name2'
    })).toEqual({
      namedClass: 'name2'
    });
  });

  it('does not merge normal functions', () => {
    const event1 = jest.fn();
    const event2 = jest.fn();
    const newEvent = mergeProps({
      offClick: event1
    }, {
      offClick: event2
    }).offClick;
    newEvent();
    expect(event1.mock.calls.length).toBe(0);
    expect(event2.mock.calls.length).toBe(1);
  });
});

describe('ignores children', () => {
  it('removes children field for any args', () => {
    expect(mergeProps({ children: '' }, { children: [] })).toEqual({});
  });
});

describe('returns values', () => {
  it('returns empty object for zero arguments', () => {
    expect(mergeProps()).toEqual({});
  });

  it("returns the first argument when it's the first argument", () => {
    const props = { onlyProp: 'onlyValue' };
    expect(mergeProps(props)).toBe(props);
  });

  it('returns the merged object for two arguments', () => {
    const obj1 = { key1: 'val1' };
    const obj2 = { key2: 'val2' };
    expect(mergeProps(obj1, obj2)).toEqual({
      key1: 'val1',
      key2: 'val2'
    });
  });

  it('returns the merged object for three arguments', () => {
    const obj1 = { key1: 'val1' };
    const obj2 = { key2: 'val2' };
    const obj3 = { key3: 'val3' };
    expect(mergeProps(obj1, obj2, obj3)).toEqual({
      key1: 'val1',
      key2: 'val2',
      key3: 'val3'
    });
  });
});

describe('on conflict', () => {
  it('returns non undefined item', () => {
    expect(mergeProps({
      key1: 'name1 name2'
    }, {
      key1: undefined
    })).toEqual({
      key1: 'name1 name2'
    });
    expect(mergeProps({
      key1: undefined
    }, {
      key1: 'name3 name4'
    })).toEqual({
      key1: 'name3 name4'
    });
  });
  it('the latter takes precedence', () => {
    expect(mergeProps({
      key1: 'val1'
    }, {
      key1: 'val2'
    })).toEqual({
      key1: 'val2'
    });
  });
});
