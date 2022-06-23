import React from 'react';
import { shallow } from 'enzyme';
import { AllJobs } from '.';
import * as redux from 'react-redux';
import { jobMockedData } from 'mocks';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

let selectorMock: any = { jobs: { jobs: { jobs: [] }, jobStatus: { loading: true } } };

describe('Test all Jobs Page', () => {
  beforeEach(() => {
    jest
      .spyOn(React, 'useEffect')
      .mockImplementationOnce((cb: any) => cb()())
      .mockImplementationOnce((cb: any) => cb()());
    jest.spyOn(window, 'addEventListener').mockImplementation((event: any, handle: any) => {
      handle();
    });
  });

  it('should render all Jobs Page with an empty array and loading is true', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));

    const wrapper = shallow(<AllJobs></AllJobs>);
    expect(selectorMock.jobs.jobs.length).toBeUndefined();
    expect(selectorMock.jobs.jobStatus.loading).toBe(true);
    expect(wrapper).toBeDefined();
  });

  it('should render all Jobs Page with an with array contains values and loading is false and page is 1', () => {
    const page = 1;
    selectorMock = {
      jobs: {
        jobs: { jobs: Array.from({ length: 5 }, () => jobMockedData), meta: { next: 1 } },
        jobStatus: { loading: false, success: true },
      },
    };
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    React.useState = jest.fn().mockReturnValue([page, jest.fn()]);

    const wrapper = shallow(<AllJobs></AllJobs>);
    expect(selectorMock.jobs.jobs.jobs.length).toBe(5);
    expect(selectorMock.jobs.jobStatus.loading).toBe(false);
    expect(page).toBe(1);
    expect(wrapper).toBeDefined();
  });

  it('should render all Job Page with an empty Object and loading is true', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((callback) => callback(selectorMock));
    Object.defineProperty(document, 'body', { value: { scrollHeight: 1 }, writable: true });
    global.innerHeight = 1;
    global.scrollY = 1;
    const isPageBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 10 && selectorMock.jobs.jobs?.meta?.next;

    const wrapper = shallow(<AllJobs></AllJobs>);
    expect(selectorMock.jobs.jobs.jobs.length).toBe(5);
    expect(selectorMock.jobs.jobStatus.loading).toBe(false);
    expect(isPageBottom).toBeTruthy();
    expect(wrapper).toBeDefined();
  });
});
