import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';
import { elementType } from 'react-prop-types';
import kebabCase from 'lodash.kebabcase';
import assign from 'lodash.assign';
import createSvgSprite from './createSvgSprite';
import appendIconSymbol from './appendIconSymbol';
import constructId from './constructId';

class IconClass extends PureComponent {
  constructor(props) {
    super(props);
    const { name, svg, fill, stroke, strokeWidth } = props;

    this.state = {
      id: constructId({ name, fill, stroke, strokeWidth }),
      className: `icon--${ kebabCase(name) }`,
      icon: svg({ rootElement: 'symbol', fill, stroke, strokeWidth }),
      isBrowser: !(typeof window === 'undefined'),
    };

    if (this.state.isBrowser && !document.querySelector(`svg#${ props.spriteId }`)) {
      createSvgSprite(props.spriteId);
    }

    if (this.state.isBrowser && !document.querySelector(`svg#${ props.spriteId }>symbol#${ this.state.id }`)) {
      appendIconSymbol(this.state.id, this.state.icon.data, props.spriteId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { name, fill, stroke, strokeWidth } = this.props;
    const {
      name: nextName,
      svg: nextSvg,
      fill: nextFill,
      stroke: nextStroke,
      strokeWidth: nextStrokeWidth,
    } = nextProps;
    let state = {};

    if (nextName !== name) {
      state = assign(state, {
        id: constructId({ name, fill, stroke, strokeWidth }),
        className: `icon--${ kebabCase(name) }`,
      });
    }

    if (nextFill !== fill || nextStroke !== stroke || nextStrokeWidth !== strokeWidth) {
      state = assign(state, {
        icon: nextSvg({ rootElement: 'symbol', fill, stroke, strokeWidth }),
      });

      if (this.state.isBrowser) {
        appendIconSymbol(state.id, state.icon.data, this.props.spriteId);
      }
    }

    this.setState(state);
  }

  render() {
    const { width, height, componentClass: ComponentClass } = this.props;
    const classes = classNames('icon', this.state.className, this.props.className);

    const styles = assign({
      display: 'inline-block',
      width: `${ (width || this.state.icon.info.width) / 10 }rem`,
      height: `${ (height || this.state.icon.info.height) / 10 }rem`,
    }, this.props.style);

    return (
      <ComponentClass className={ classes } style={ styles }>
        <svg style={{ display: 'block', width: '100%', height: '100%' }}>
          <use xlinkHref={ `#${ this.state.id }` } />
        </svg>
      </ComponentClass>
    );
  }
}

IconClass.propTypes = {
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

IconClass.defaultProps = {
  componentClass: 'span',
  style: {},
  spriteId: 'svg-icon-container',
};

export default IconClass;
