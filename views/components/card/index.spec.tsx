import React from 'react';
import { shallow } from 'enzyme';
import { Card, CardFooter, CardHeader } from '.';

describe('Test Card Component', () => {
  it('should Card component to be fired with Header string and Footer string', () => {
    const wrapper = shallow(
      <Card header="Header is String" footer="Footer is  string">
        <p>lorem</p>
      </Card>
    );
    expect(wrapper).toBeDefined();
    const cardHeader = wrapper.find('CardHeader').props().children;
    const cardFooter = wrapper.find('CardFooter').props().children;
    expect(cardHeader).toEqual('Header is String');
    expect(cardFooter).toEqual('Footer is  string');
  });

  it('should Card header to be fired with children type node element', () => {
    const wrapper = shallow(
      <CardHeader>
        <p>lorem</p>
      </CardHeader>
    );
    const cardHeader = wrapper.props().children;
    expect(cardHeader).toBeDefined();
    expect(wrapper).toBeDefined();
  });

  it('should Card header to be fired with children type string', () => {
    const wrapper = shallow(<CardHeader children={'lorem'}></CardHeader>);
    const cardHeader = wrapper.props().children;
    expect(cardHeader).toBeDefined();
    expect(wrapper).toBeDefined();
  });

  it('should Card footer to be fired with children type node element', () => {
    const wrapper = shallow(
      <CardFooter>
        <p>lorem</p>
      </CardFooter>
    );
    const cardFooter = wrapper.props().children;
    expect(cardFooter).toBeDefined();
    expect(wrapper).toBeDefined();
  });

  it('should Card footer to be fired with children type string', () => {
    const wrapper = shallow(<CardFooter children={'lorem'}></CardFooter>);
    const cardFooter = wrapper.props().children;
    expect(cardFooter).toBeDefined();
    expect(wrapper).toBeDefined();
  });
});
