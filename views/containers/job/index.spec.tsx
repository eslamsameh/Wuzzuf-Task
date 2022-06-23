import React from 'react';
import { shallow } from 'enzyme';
import { SingleJob } from '.';
import * as redux from 'react-redux';
import { jobMockedData } from 'mocks';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

let selectorMock: any = { job: { job: { job: {} }, jobStatus: { loading: true } } };

describe('Test Job Page', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((cb: any) => cb()());
  });
  it('should render Job Page with an empty Object and loading is true', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    const wrapper = shallow(<SingleJob></SingleJob>);
    expect(selectorMock.job.job.id).toBeUndefined();
    expect(selectorMock.job.jobStatus.loading).toBe(true);
    expect(wrapper).toBeDefined();
  });

  it('should render Job Page with job Object', () => {
    selectorMock = { job: { job: { job: jobMockedData }, jobStatus: { loading: false } } };
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    const wrapper = shallow(<SingleJob></SingleJob>);
    expect(selectorMock.job.job).toBeDefined();
    expect(selectorMock.job.jobStatus.loading).toBe(false);
    expect(wrapper).toBeDefined();
  });

  it('should render Job Page with an undefined job value', () => {
    selectorMock = { job: undefined };
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    const wrapper = shallow(<SingleJob></SingleJob>);
    expect(selectorMock.job).toBeUndefined();
    expect(wrapper).toBeDefined();
  });
});
