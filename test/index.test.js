import React from 'react';
import { describeWithDOM, shallow } from 'enzyme';
import { assert } from 'chai';
import svg from './svg';
import IconComponent from '../src/index';
import IconStateless from '../src/statelessIcon';

describeWithDOM('<IconComponent />', () => {
  it('renders a span with class .icon', () => {
    const icon = shallow(<IconComponent name='checkmark' svg={ svg } />);
    assert.ok(icon.find('span').hasClass('icon'));
  });

  it('that contains a SVG use element whos xlink:href is \'#icon_checkmark\'', () => {
    const icon = shallow(<IconComponent name='checkmark' svg={ svg } />);
    assert.equal(icon.find('use').prop('xlinkHref'), '#icon_checkmark');
  });
});

describeWithDOM('<IconStateless />', () => {
  it('renders a span with class .icon', () => {
    const icon = shallow(<IconStateless name='checkmark' svg={ svg } />);
    assert.ok(icon.find('span').hasClass('icon'));
  });

  it('that contains a SVG use element whos xlink:href is \'#icon_checkmark\'', () => {
    const icon = shallow(<IconStateless name='checkmark' svg={ svg } />);
    assert.equal(icon.find('use').prop('xlinkHref'), '#icon_checkmark');
  });
});
