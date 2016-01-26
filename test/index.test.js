import React from 'react';
import { describeWithDOM, shallow } from 'enzyme';
import { assert } from 'chai';
import svg from './svg';
import { IconComponent, IconStateless } from '../src/index';

describeWithDOM('<IconComponent />', () => {
  it('renders a span with class .icon', () => {
    const icon = shallow(<IconComponent name="checkmark" svg={ svg } />);
    assert.ok(icon.find('span').hasClass('icon'));
  });

  it('span contains a SVG use element whos xlink:href is \'#icon_checkmark\'', () => {
    const icon = shallow(<IconComponent name="checkmark" svg={ svg } />);
    assert.equal(icon.find('use').prop('xlinkHref'), '#icon_checkmark');
  });

  it('document contains a SVG element with id \'#svg-icon-container\'', () => {
    assert.ok(document.querySelector('#svg-icon-container'));
  });
});

describeWithDOM('<IconStateless />', () => {
  it('renders a span with class .icon', () => {
    const icon = shallow(<IconStateless name="checkmark" svg={ svg } />);
    assert.ok(icon.find('span').hasClass('icon'));
  });

  it('span contains a SVG use element whos xlink:href is \'#icon_checkmark\'', () => {
    const icon = shallow(<IconStateless name="checkmark" svg={ svg } />);
    assert.equal(icon.find('use').prop('xlinkHref'), '#icon_checkmark');
  });

  it('document contains a SVG element with id \'#svg-icon-container\'', () => {
    assert.ok(document.querySelector('#svg-icon-container'));
  });
});
