import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from './enzyme';

import Form from '../src';
import { defaultProps } from './defaultProps';

const BaseForm = (props) => <Form {...defaultProps} {...props} />

describe('Form tests', () => {

	/*it('render correctly BaseForm component', () => {
	    const BaseFormComponent = renderer.create(<BaseForm />).toJSON();
	    expect(BaseFormComponent).toMatchSnapshot();
	});*/

	it('count the controls to be 2', () => {
	    const BaseFormComponent = mount(<BaseForm {...defaultProps} />);
      expect(BaseFormComponent.props().controls.length).toBe(2);
	});

	it('count the controls in props to be equal the controls count in the state', () => {
		const BaseFormComponent = mount(shallow(<BaseForm {...defaultProps} />).get(0));
		expect(BaseFormComponent.state().controls.length).toBe(BaseFormComponent.props().controls.length);
	});

	it('check that isSent is null in the state', () => {
		const BaseFormComponent = mount(shallow(<BaseForm {...defaultProps} />).get(0));
		expect(BaseFormComponent.state().isSent).toBe(null);
	});

	it('check that succeed is null in the state', () => {
		const BaseFormComponent = mount(shallow(<BaseForm {...defaultProps} />).get(0));
		expect(BaseFormComponent.state().succeed).toBe(null);
	});

	it('check that sendButton has text', () => {
		const BaseFormComponent = mount(shallow(<BaseForm {...defaultProps} />).get(0));
		expect(BaseFormComponent.props().sendButton.text).toBe('Save');
	});

});
