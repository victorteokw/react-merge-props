const shouldMergeObject = (key) => key === 'style';

const shouldMergeString = (key) => key === 'className';

const shouldMergeFunc = (key) => key.slice(0, 2) === 'on';

const merge = (key, value1, value2) => {
  if (typeof value1 !== typeof value2) {
    return value2;
  }
  if (typeof value1 === 'string') {
    if (shouldMergeString(key)) {
      if (value1 === '') return value2;
      if (value2 === '') return value1;
      return value1 + ' ' + value2;
    } else {
      return value2;
    }
  }
  if (typeof value1 === 'object') {
    if (shouldMergeObject(key)) {
      return { ...value1, ...value2 };
    } else {
      return value2;
    }
  }
  if (typeof value1 === 'function') {
    if (shouldMergeFunc(key)) {
      return (...args) => {
        value1(...args);
        value2(...args);
      };
    } else {
      return value2;
    }
  }
  return value2;
};

// This method mutates the first argument
const mergeProps = (...list) => {
  const compacted = [];
  list.forEach((item) => {
    if (item === undefined) return;
    if (Object(item) === item) {
      compacted.push(item);
    } else {
      throw `Wrong argument passed to mergeProps ${item}`;
    }
  });
  if (compacted.length === 0) {
    return {};
  }
  if (compacted.length === 1) {
    return compacted[0];
  }
  const retval = compacted[0];
  compacted.forEach((props, index) => {
    if (index === 0) return;
    for (const key in props) {
      if (key === 'children') continue;
      const value = props[key];
      if (retval.hasOwnProperty(key) && (retval[key] !== undefined)) {
        retval[key] = merge(key, retval[key], value);
      } else {
        retval[key] = value;
      }
    }
  });
  return retval;
};

mergeProps.default = mergeProps;
module.exports = mergeProps;
