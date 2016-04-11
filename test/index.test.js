import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import svg from './svg';
import { IconClass, IconStateless } from '../src';

describe('<IconClass />', () => {
  let icon;

  beforeEach(() => icon = shallow(<IconClass name="checkmark" svg={ svg } />));

  it('renders a span with class .icon', () => assert.ok(icon.find('span').hasClass('icon')));

  it('span contains a SVG use element whos xlink:href is \'#icon_checkmark\'',
    () => assert.equal(icon.find('use').prop('xlinkHref'), '#icon_checkmark'));

  it('document contains a SVG element with id \'#svg-icon-container\'',
    () => assert.ok(document.querySelector('#svg-icon-container')));
});

describe('<IconStateless />', () => {
  let icon;

  beforeEach(() => icon = shallow(<IconStateless name="checkmark" svg={ svg } />));

  it('renders a span with class .icon', () => assert.ok(icon.find('span').hasClass('icon')));

  it('span contains a SVG use element whos xlink:href is \'#icon_checkmark\'',
    () => assert.equal(icon.find('use').prop('xlinkHref'), '#icon_checkmark'));

  it('document contains a SVG element with id \'#svg-icon-container\'',
    () => assert.ok(document.querySelector('#svg-icon-container')));
});
