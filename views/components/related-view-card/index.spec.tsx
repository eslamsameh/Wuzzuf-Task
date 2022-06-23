import React from 'react';
import { shallow } from 'enzyme';
import { RealedViewCard } from '.';

it('should RealedViewCard component to be fired', () => {
  const wrapper = shallow(
    <RealedViewCard title={'title'}>
      <p>TEST VALUE</p>
    </RealedViewCard>
  );
  expect(wrapper).toBeDefined();
});
