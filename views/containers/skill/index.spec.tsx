import React from 'react';
import { shallow } from 'enzyme';
import { Skills } from '.';
import * as redux from 'react-redux';
import { skillMockedData } from 'mocks';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

let selectorMock: any = { skill: { skill: { skill: {} }, skillStatus: { loading: true } } };

describe('Test skill Page', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((cb: any) => cb()());
  });
  it('should render skill Page with an empty Object and loading is true', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    const wrapper = shallow(<Skills></Skills>);
    expect(selectorMock.skill.skill.id).toBeUndefined();
    expect(selectorMock.skill.skillStatus.loading).toBe(true);
    expect(wrapper).toBeDefined();
  });

  it('should render skill Page with skill Object', () => {
    selectorMock = { skill: { skill: { skill: skillMockedData }, skillStatus: { loading: false } } };
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    const wrapper = shallow(<Skills></Skills>);
    expect(selectorMock.skill.skill).toBeDefined();
    expect(selectorMock.skill.skillStatus.loading).toBe(false);
    expect(wrapper).toBeDefined();
  });

  it('should render skill Page with an undefined skill value', () => {
    selectorMock = { skill: undefined };
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    const wrapper = shallow(<Skills></Skills>);
    expect(selectorMock.skill).toBeUndefined();
    expect(wrapper).toBeDefined();
  });
});
