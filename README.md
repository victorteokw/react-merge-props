react-merge-props
==============
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][cov-image]][cov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-image-dev]][daviddm-url-dev]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

Deep props merging functionality for React.

## Introduction

Merging react component props by the following rule:

1. Normal props replace the former
2. `children` are ignored
3. `className` are concatenated
4. `style` are shallow merged
5. functions that have initial `on` are run in sequence from left to right

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
  <h1 {...mergeProps({ style: { 'color': 'red' }}, props)}>{props.children}</h1>
);

export default HeadingOne;
```

## License

MIT © [Zhang Kai Yu][license-url]

[npm-image]: https://img.shields.io/npm/v/react-merge-props.svg?style=flat-square&color=ff69b4&logo=react
[npm-url]: https://npmjs.org/package/react-merge-props
[travis-image]: https://img.shields.io/travis/zhangkaiyulw/react-merge-props.svg?style=flat-square&color=blue&logo=travis
[travis-url]: https://travis-ci.org/zhangkaiyulw/react-merge-props
[cov-image]: https://img.shields.io/codecov/c/github/zhangkaiyulw/react-merge-props/master.svg?style=flat-square&logo=codecov
[cov-url]: https://codecov.io/gh/zhangkaiyulw/react-merge-props
[daviddm-image]: https://img.shields.io/david/zhangkaiyulw/react-merge-props.svg?style=flat-square
[daviddm-url]: https://david-dm.org/zhangkaiyulw/react-merge-props
[daviddm-image-dev]: https://img.shields.io/david/dev/zhangkaiyulw/react-merge-props.svg?style=flat-square
[daviddm-url-dev]: https://david-dm.org/zhangkaiyulw/react-merge-props?type=dev
[license-image]: https://img.shields.io/github/license/zhangkaiyulw/react-merge-props.svg?style=flat-square
[license-url]: https://github.com/zhangkaiyulw/react-merge-props/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-url]: https://github.com/zhangkaiyulw/react-merge-props/blob/master/CONTRIBUTING.md
