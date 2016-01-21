import React from 'react';
import classNames from 'classnames';
import { elementType } from 'react-prop-types';
import kebabCase from 'lodash/string/kebabCase';
import createSvgSprite from './createSvgSprite';
import appendIconSymbol from './appendIconSymbol';
import constructId from './constructId';

function statelessIcon(props) {
  const { name, svg, fill, stroke, strokeWidth, width, height, spriteId, componentClass: ComponentClass } = props;
  const classes = classNames('icon', `icon--${ kebabCase(name) }`, props.className);
  const id = constructId(name, fill, stroke, strokeWidth);
  const icon = svg({ rootElement: 'symbol', fill, stroke, strokeWidth });

  const styles = Object.assign({
    width: `${ (width || icon.info.width) / 10 }rem`,
    height: `${ (height || icon.info.height) / 10 }rem`,
  }, props.style);

  const html = { __html: `<svg><use xlink:href="#${ id }" /></svg>` };

  if (!document.querySelector(`svg#${ spriteId }`)) {
    createSvgSprite(spriteId);
  }

  if (!document.querySelector(`svg#${ spriteId }>symbol#${ id }`)) {
    appendIconSymbol(id, icon.data, spriteId);
  }

  return <ComponentClass className={ classes } style={ styles } dangerouslySetInnerHTML={ html } />;
}

statelessIcon.propTypes = {
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

statelessIcon.defaultProps = {
  componentClass: 'span',
  style: {},
  spriteId: 'svg-icon-container',
};

export default statelessIcon;
