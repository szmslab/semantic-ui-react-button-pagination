'use strict';

import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mountToJson} from 'enzyme-to-json';
import Pagination from '../src/Pagination';

configure({adapter: new Adapter()});

describe('Previous and Next Button', () => {
  const wrapper = (commonProps, otherProps) => {
    const props = Object.assign({}, commonProps, otherProps);
    return mount(
      <div>
        <Pagination {...props}/>
      </div>
    ).find('.ui.buttons.semantic-ui-react-button-pagination');
  };

  // ********************************************************************************
  describe('nextPageChildren', () => {
    describe('empty array', () => {
      const props = {offset: 0, limit: 10, total: 10, nextPageChildren: []};

      it('children: []', () => {
        expect(wrapper(props).find('button').last().text()).toBe('');
      });

      it('snapshot', () => {
        const target = mountToJson(wrapper(props));
        expect(target).toMatchSnapshot();
      });
    });

    describe('text', () => {
      const children = 'Next';
      const props = {offset: 0, limit: 10, total: 10, nextPageChildren: children};

      it(`children: ${children}`, () => {
        expect(wrapper(props).find('button').last().text()).toBe(children);
      });

      it('snapshot', () => {
        const target = mountToJson(wrapper(props));
        expect(target).toMatchSnapshot();
      });
    });
  });

  // ********************************************************************************
  describe('previousPageChildren', () => {
    describe('empty array', () => {
      const props = {offset: 0, limit: 10, total: 10, previousPageChildren: []};

      it('children: []', () => {
        expect(wrapper(props).find('button').first().text()).toBe('');
      });

      it('snapshot', () => {
        const target = mountToJson(wrapper(props));
        expect(target).toMatchSnapshot();
      });
    });

    describe('text', () => {
      const children = 'Prev';
      const props = {offset: 0, limit: 10, total: 10, previousPageChildren: children};

      it(`children: ${children}`, () => {
        expect(wrapper(props).find('button').first().text()).toBe(children);
      });

      it('snapshot', () => {
        const target = mountToJson(wrapper(props));
        expect(target).toMatchSnapshot();
      });
    });
  });

  // ********************************************************************************
  describe('nextPageIcon', () => {
    const props = {offset: 0, limit: 10, total: 10, nextPageIcon: 'chevron right'};

    it('icon name: chevron right', () => {
      expect(wrapper(props).find('button').last().find('i')).toHaveLength(1);
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });
  });

  // ********************************************************************************
  describe('previousPageIcon', () => {
    const props = {offset: 0, limit: 10, total: 10, previousPageIcon: 'chevron left'};

    it('icon name: chevron left', () => {
      expect(wrapper(props).find('button').first().find('i')).toHaveLength(1);
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });
  });

});
