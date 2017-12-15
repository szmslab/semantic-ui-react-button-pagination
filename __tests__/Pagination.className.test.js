'use strict';

import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from '../src/Pagination';

configure({adapter: new Adapter()});

describe('Class Name', () => {
  const wrapper = (commonProps, otherProps) => {
    const props = Object.assign({}, commonProps, otherProps);
    return mount(
      <div>
        <Pagination {...props}/>
      </div>
    ).find('.ui.buttons.semantic-ui-react-button-pagination');
  };

  // ********************************************************************************
  describe('append className', () => {
    const className = 'class-name-test';
    it(`className: ${className}`, () => {
      expect(wrapper({
        offset: 0,
        limit: 10,
        total: 10,
        className: className
      }).hasClass(className)).toBe(true)
    });
  });
});
