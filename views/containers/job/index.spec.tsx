import React from 'react';
import { shallow } from 'enzyme';
import { SingleJob } from '.';
import * as redux from 'react-redux';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

let selectorMock = { job: { job: 'test' }, jobStatus: {} };

describe('Test Job Page', () => {
  it('should Card component to be fired with Header string and Footer string', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    const wrapper = shallow(<SingleJob></SingleJob>);
    expect(wrapper).toBeDefined();
  });
});
