import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';
import { elementType } from 'react-prop-types';
import camelCase from 'lodash/string/camelCase';
import kebabCase from 'lodash/string/kebabCase';

class Icon extends PureComponent {
  constructor(props) {
    super(props);

    if (!document.querySelector('svg#svg-icon-container')) this.createSvgIconContainer();
  }

  createSvgIconContainer() {
    const attributes = [
      ['id', 'svg-icon-container'],
      ['xmlns', 'http://www.w3.org/2000/svg'],
      ['style', 'display: none;'],
    ];

    const svgIconContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    attributes.forEach((attribute) => {
      svgIconContainer.setAttribute(attribute[0], attribute[1]);
    });

    document.body.appendChild(svgIconContainer);
  }

  appendIconSymbol(id, icon) {
    const attributes = [
      ['id', id],
      ['viewBox', icon.viewBox],
    ];

    const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
    symbol.innerHTML = icon.svg;

    attributes.forEach((attribute) => {
      symbol.setAttribute(attribute[0], attribute[1]);
    });

    document.querySelector('svg#svg-icon-container').appendChild(symbol);
  }

  constructUniqueId(type, fill, stroke, strokeWidth) {
    let id = `icon_${ kebabCase(type) }`;
    const invalidCharacters = /[|&;$%@#"<>()+,]/g;
    if (fill) id = id + `_fill-${ fill.replace(invalidCharacters, '').replace(/\s/g, '-') }`;
    if (stroke) id = id + `_stroke-${ stroke.replace(invalidCharacters, '').replace(/\s/g, '-') }`;
    if (strokeWidth) id = id + `_stroke-width-${ strokeWidth }`;

    return id.toLowerCase();
  }

  render() {
    const { type, fill, stroke, strokeWidth, width, height, componentClass: ComponentClass } = this.props;
    const classes = classNames('icon', `icon--${ kebabCase(type) }`, this.props.className);
    const uniqueId = this.constructUniqueId(type, fill, stroke, strokeWidth);

    if (!this.icons[camelCase(type)]) {
      console.log(`${ type } icon could not be found`);
      return null;
    }

    let icon = {};

    if (!document.querySelector(`svg#svg-icon-container>symbol#${uniqueId}`)) {
      icon = this.icons[camelCase(type)](fill, stroke, strokeWidth);
      this.appendIconSymbol(uniqueId, icon);
    } else {
      icon = this.icons[camelCase(type)]();
    }

    const styles = Object.assign({
      width: `${ (width || icon.width) / 10 }rem`,
      height: `${ (height || icon.height) / 10 }rem`,
    }, this.props.style);

    return (
      <ComponentClass
        style={ styles }
        className={ classes }
        dangerouslySetInnerHTML={{
          __html: `<svg><use xlink:href="#${ uniqueId }" /></svg>`,
        }}
      />
    );
  }
}

Icon.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  fill: React.PropTypes.string,
  stroke: React.PropTypes.string,
  strokeWidth: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  style: React.PropTypes.object,
  componentClass: elementType,
};

Icon.defaultProps = {
  componentClass: 'span',
  style: {},
};

export default Icon;
