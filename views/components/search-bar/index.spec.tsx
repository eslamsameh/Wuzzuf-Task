import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar } from '.';

describe('Test Search Bar Component', () => {
  it('should Search Bar component to be fired', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper).toBeDefined();
  });

  it('should Search Bar component to change the values', () => {
    const wrapper = shallow(<SearchBar />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'value changed' } });
    expect(wrapper).toBeDefined();
  });
});
