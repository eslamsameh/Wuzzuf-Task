import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from '.';

it('should Loader component to be fired', () => {
  const wrapper = shallow(<Loader />);
  expect(wrapper).toBeDefined();
});
