import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';
import { elementType } from 'react-prop-types';
import camelCase from 'lodash/string/camelCase';
import kebabCase from 'lodash/string/kebabCase';

class Icon extends PureComponent {
  constructor(props) {
    super(props);

    if (!document.querySelector(`svg#${ props.spriteId }`)) this.createSvgSprite();
  }

  createSvgSprite() {
    const attributes = [
      ['id', this.props.spriteId],
      ['style', 'display: none;'],
    ];

    const svgIconContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    attributes.forEach((attribute) => {
      svgIconContainer.setAttribute(attribute[0], attribute[1]);
    });

    document.body.appendChild(svgIconContainer);
  }

  appendIconSymbol(id, icon) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = icon;

    const symbol = svg.firstChild;
    symbol.setAttribute('id', id);
    symbol.removeAttribute('xmlns'); // TODO: This should probably be done in the loader

    document.querySelector('svg#svg-icon-container').appendChild(symbol);
  }

  constructId(attributes) {
    const attributesMap = ['fill', 'stroke', 'strokeWidth'];
    const invalidCharacters = /[|&;$%@#"<>()+,]/g;

    const id = attributesMap.reduce((string, attribute) => {
      const value = attributes[attribute];

      if (value) {
        return `${ string }_${ kebabCase(attribute) }-${ value.replace(invalidCharacters, '').replace(/\s/g, '-') }`;
      }

      return string;
    }, `icon_${ kebabCase(attributes.name) }`);

    return id.toLowerCase();
  }

  render() {
    const { name, svg, fill, stroke, strokeWidth, width, height, componentClass: ComponentClass } = this.props;
    const classes = classNames('icon', `icon--${ kebabCase(name) }`, this.props.className);
    const id = this.constructId(name, fill, stroke, strokeWidth);
    const icon = svg({ rootElement: 'symbol', fill, stroke, strokeWidth });

    if (!document.querySelector(`svg#svg-icon-container>symbol#${ id }`)) {
      this.appendIconSymbol(id, icon.data);
    }

    const styles = Object.assign({
      width: `${ (width || icon.info.width) / 10 }rem`,
      height: `${ (height || icon.info.height) / 10 }rem`,
    }, this.props.style);

    return (
      <ComponentClass
        style={ styles }
        className={ classes }
        dangerouslySetInnerHTML={{
          __html: `<svg><use xlink:href="#${ id }" /></svg>`,
        }}
      />
    );
  }
}

Icon.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  spriteId: React.PropTypes.string,
  fill: React.PropTypes.string,
  stroke: React.PropTypes.string,
  strokeWidth: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  style: React.PropTypes.object,
  componentClass: elementType,
  svg: React.PropTypes.function,
};

Icon.defaultProps = {
  componentClass: 'span',
  style: {},
  spriteId: 'svg-icon-container',
};

export default Icon;
