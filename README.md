# React SVG Sprite Icon

> A React icon component that generates a SVG sprite on the fly

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

## Installation

`npm install --save react-svg-sprite-icon`

## Usage

React SVG Sprite Icon provides two components, one [ES6 Class](https://facebook.github.io/react/docs/reusable-components.html#es6-classes) and one [stateless function](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).

If you're unsure which one to use, use the class.

``` javascript
import { IconClass as Icon } from 'react-svg-sprite-icon';
import iconClose from 'svg-icon-template-loader!./close.svg';

const Foo = React.createClass({
  render() {
    return (
      <div>
        <h1>Icon</h1>
        <Icon name="close" svg={ iconClose } stroke="#ff0000" />
      </div>
    );
  }
});
```

## Options

All options are passed to the component via props.

### **name** (is required)
The name of the icon, the class and ID are based on this so keep it meaningful.

### **svg** (is required)
The function returned by [svg-icon-template-loader](https://github.com/nordnet/svg-icon-template-loader).

### **fill**
The fill override that is passed to the [svg-icon-template-loader](https://github.com/nordnet/svg-icon-template-loader) function.

### **stroke**
The stroke override that is passed to the [svg-icon-template-loader](https://github.com/nordnet/svg-icon-template-loader) function.

### **strokeWidth**
The stroke width override that is passed to the [svg-icon-template-loader](https://github.com/nordnet/svg-icon-template-loader) function.

### **width**
The width of the icon.

### **height**
The height of the icon.

### **style**
A style object that'll be applied to the root icon element.

### **className**
A class name that'll be applied to the root icon element.

### **spriteId**
The ID of the SVG sprite that is added to the root of the document, `svg-icon-container` by default.

### **componentClass**
The type of element of the root icon element, a `span` by default.

## License

This open source project released by Nordnet is licensed under the MIT license.

MIT (http://www.opensource.org/licenses/mit-license.php)


[npm-url]: https://npmjs.org/package/react-svg-sprite-icon
[npm-image]: https://img.shields.io/npm/v/react-svg-sprite-icon.svg

[travis-url]: https://travis-ci.org/nordnet/react-svg-sprite-icon
[travis-image]: https://travis-ci.org/nordnet/react-svg-sprite-icon.svg?branch=master

[depstat-url]: https://david-dm.org/nordnet/react-svg-sprite-icon
[depstat-image]: https://david-dm.org/nordnet/react-svg-sprite-icon.svg
