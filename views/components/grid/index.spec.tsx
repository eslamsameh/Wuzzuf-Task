import React from 'react';
import { shallow } from 'enzyme';
import { Grid } from '.';

describe('Test Grid Component', () => {
  it('should Grid component render column classess', () => {
    const wrapper = shallow(
      <Grid column sm={1} md={1} lg={1}>
        <p>lorem</p>
      </Grid>
    );
    const className = wrapper.props().className;
    expect(className).toMatch('column  sm-1 md-1 lg-1');
    expect(wrapper).toBeDefined();
  });

  it('should Grid component render row classess', () => {
    const wrapper = shallow(
      <Grid row expanded justify={'flex-start'} alignItems={'center'}>
        <p>lorem</p>
      </Grid>
    );
    const className = wrapper.props().className;
    expect(className).toMatch('row expanded justify align-center');
    expect(wrapper).toBeDefined();
  });
});
