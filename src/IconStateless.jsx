import React from 'react';
import classNames from 'classnames';
import { elementType } from 'react-prop-types';
import kebabCase from 'lodash.kebabcase';
import createSvgSprite from './createSvgSprite';
import appendIconSymbol from './appendIconSymbol';
import constructId from './constructId';

function IconStateless(props) {
  const {
    name,
    svg,
    fill,
    stroke,
    strokeWidth,
    width,
    height,
    spriteId,
    componentClass: ComponentClass,
  } = props;
  const classes = classNames('icon', `icon--${ kebabCase(name) }`, props.className);
  const id = constructId({ name, fill, stroke, strokeWidth });
  const icon = svg({ rootElement: 'symbol', fill, stroke, strokeWidth });

  const styles = Object.assign({
    display: 'inline-block',
    width: `${ (width || icon.info.width) / 10 }rem`,
    height: `${ (height || icon.info.height) / 10 }rem`,
  }, props.style);

  if (window && !document.querySelector(`svg#${ spriteId }`)) {
    createSvgSprite(spriteId);
  }

  if (window && !document.querySelector(`svg#${ spriteId }>symbol#${ id }`)) {
    appendIconSymbol(id, icon.data, spriteId);
  }

  return (
    <ComponentClass className={ classes } style={ styles }>
      <svg style={{ display: 'block', width: '100%', height: '100%' }}>
        <use xlinkHref={ `#${ id }` } />
      </svg>
    </ComponentClass>
  );
}

IconStateless.propTypes = {
  name: React.PropTypes.string.isRequired,
  svg: React.PropTypes.func.isRequired,
  fill: React.PropTypes.string,
  stroke: React.PropTypes.string,
  strokeWidth: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  spriteId: React.PropTypes.string,
  componentClass: elementType,
};

IconStateless.defaultProps = {
  componentClass: 'span',
  style: {},
  spriteId: 'svg-icon-container',
};

export default IconStateless;
