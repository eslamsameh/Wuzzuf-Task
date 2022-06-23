import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '.';

describe('Test Header Component', () => {
  it('should Header with 3 navs and display the first nav with navigate to jobs page', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('NavLink')).toHaveLength(3);
    const lastNav = wrapper.find('NavLink').first();
    expect(lastNav.prop('to')).toEqual('/jobs');
  });

  it('should Header with 3 navs and display the first nav with navigate to single-job page ', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('NavLink')).toHaveLength(3);
    const lastNav = wrapper.find('NavLink').at(1);
    expect(lastNav.prop('to')).toEqual('/job');
  });

  it('should Header with 3 navs and display the first nav with navigate to history pages ', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('NavLink')).toHaveLength(3);
    const lastNav = wrapper.find('NavLink').last();
    expect(lastNav.prop('to')).toEqual('/history');
  });
});
