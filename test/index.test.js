import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
import IconComponent from '../src/index';
import IconStateless from '../src/statelessIcon';
import svg from './svg';


describe('Icon Component:', function() {
  before('render icon component', function() {
    const props = {
      name: 'checkmark',
      svg: svg,
    };

    // const icon = shallowRenderer.render(<IconStateless name={ props.name } svg= { props.svg } />);
    const icon = TestUtils.renderIntoDocument(<IconComponent name={ props.name } svg= { props.svg } />);

    this.iconComponent = ReactDOM.findDOMNode(icon);
  });

  it('should be a span', function() {
    assert.equal(this.iconComponent.tagName, 'SPAN');
  });

  it('should contain an SVG element containing a use element that points to #icon_checkmark', function() {
    const svgTag = this.iconComponent.querySelector('svg');

    assert.ok(svgTag);
    assert.equal(svgTag.querySelector('use').getAttribute('xlink:href'), '#icon_checkmark');
  });
});
