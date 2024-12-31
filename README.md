react-merge-props
==============
[![NPM version][npm-image]][npm-url]
[![Build Status][github-ci-image]][github-ci-url]
[![Test Coverage][cov-image]][cov-url]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

Deep props merging functionality for React.

## Introduction

Merging react component props by the following rule:

1. Normal props replace the former
2. `className` are concatenated
3. `style` are shallow merged
4. functions are run in sequence from left to right

When creating extensible react components, this is what we need.

## Installation

Install this package with `npm`.

```bash
npm i react-merge-props -s
```

## Usage Pattern

This package is very useful when creating wrapping components. For example:

```jsx
import React from 'react';
import mergeProps from 'react-merge-props';

const HeadingOne = (props) => (
  <h1 {...mergeProps({ style: { 'color': 'red' }}, props)} />
);

export default HeadingOne;
```

## License

MIT © [Victor Teo][license-url]

[npm-image]: https://img.shields.io/npm/v/react-merge-props.svg?style=flat-square&color=ff69b4&logo=react
[npm-url]: https://npmjs.org/package/react-merge-props
[github-ci-image]: https://img.shields.io/github/actions/workflow/status/victorteokw/react-merge-props/CI.svg?style=flat-square&color=blue&logo=travis
[github-ci-url]: https://github.com/victorteokw/react-merge-props/actions/
[cov-image]: https://img.shields.io/codecov/c/github/victorteokw/react-merge-props/master.svg?style=flat-square&logo=codecov
[cov-url]: https://codecov.io/gh/victorteokw/react-merge-props
[license-image]: https://img.shields.io/github/license/victorteokw/react-merge-props.svg?style=flat-square
[license-url]: https://github.com/victorteokw/react-merge-props/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-url]: https://github.com/victorteokw/react-merge-props/blob/master/CONTRIBUTING.md
