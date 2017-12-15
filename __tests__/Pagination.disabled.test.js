'use strict';

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mountToJson} from 'enzyme-to-json';
import Pagination from '../src/Pagination';

configure({adapter: new Adapter()});

describe('Disabled Pagination', () => {
  const wrapper = (commonProps, otherProps) => {
    const props = Object.assign({}, commonProps, otherProps);
    return mount(
      <div>
        <Pagination {...props}/>
      </div>
    ).find('.ui.buttons.semantic-ui-react-button-pagination');
  };

  const clickWrapper = (testFn) => {
    testFn('onClick', 'click');
  };

  // ********************************************************************************
  describe('disabled: true', () => {
    const props = {offset: 60, limit: 10, total: 1000, disabled: true};
    const labels = ['<', '1', '2', '...', '5', '6', '7', '8', '9', '...', '99', '100', '>'];
    const buttonCount = labels.length;

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          it(`buttons[${i}] not toBeCalled`, () => {
            ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
            expect(fnMock).not.toBeCalled();
          });
        }
      });
    };
    clickWrapper(clickFn);
  });
});
