import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';
import { elementType } from 'react-prop-types';
import kebabCase from 'lodash/string/kebabCase';
import createSvgSprite from './createSvgSprite';
import appendIconSymbol from './appendIconSymbol';
import constructId from './constructId';

class Icon extends PureComponent {
  constructor(props) {
    super(props);
    const { name, svg, fill, stroke, strokeWidth } = props;

    this.state = {
      id: constructId(name, fill, stroke, strokeWidth),
      className: `icon--${ kebabCase(name) }`,
      icon: svg({ rootElement: 'symbol', fill, stroke, strokeWidth }),
    };

    createSvgSprite(props.spriteId);
    appendIconSymbol(this.state.id, this.state.icon.data);
  }

  render() {
    const { width, height, componentClass: ComponentClass } = this.props;
    const classes = classNames('icon', this.state.className, this.props.className);

    const styles = Object.assign({
      width: `${ (width || this.state.icon.info.width) / 10 }rem`,
      height: `${ (height || this.state.icon.info.height) / 10 }rem`,
    }, this.props.style);

    const html = { __html: `<svg><use xlink:href="#${ this.state.id }" /></svg>` };

    return <ComponentClass className={ classes } style={ styles } dangerouslySetInnerHTML={ html } />;
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
