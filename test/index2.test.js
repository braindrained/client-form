import React from 'react';
import { shallow, mount } from './enzyme';

import Form from '../src';
import CustomTextField from '../src/childrens/CustomTextField';
import { defaultProps } from './defaultProps';

describe('<Form /> rendering', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Form {...defaultProps} />);
	});

	it('should contain class client-form', () => {
		expect(wrapper.find('.client-form')).toHaveLength(1);
	});

	it('should render 2 CustomTextFields', () => {
		expect(wrapper.find(CustomTextField)).toHaveLength(3);
	});

	it('have the first CustomTextField with props value 4', () => {
		expect(wrapper.find(CustomTextField).get(0).props.value).toBe(4);
	});

	it('have the second CustomTextField with props value with a empty string', () => {
		expect(wrapper.find(CustomTextField).get(1).props.value).toBe('');
	});

	it('have the second CustomTextField with props value equal to new value', () => {
		wrapper.find(CustomTextField).get(1).props.onUpdate({ target: { name: 'name', value: 'new value' }});
		expect(wrapper.find(CustomTextField).get(1).props.value).toBe('new value');
	});

	it('have the first CustomTextField with state value empty if I put a string instead that a number', () => {
		const textField = mount(wrapper.find(CustomTextField).get(0));
		const event = { target: { name: 'age', value: 'xxxx' }};
		textField.find('input').simulate('focus');
		textField.find('input').simulate('change', event);
		textField.find('input').simulate('blur', { target: { name: 'age', value: textField.props().value }});
		expect(wrapper.find(CustomTextField).get(0).props.value).toBe(4);
	});

	it('have the first CustomTextField with props value equal to 88', () => {
		const textField = mount(wrapper.find(CustomTextField).get(0));
		const event = { target: { name: 'age', value: 88 }};
		textField.find('input').simulate('focus');
		textField.find('input').simulate('change', event);
		textField.find('input').simulate('blur', event);
		expect(wrapper.find(CustomTextField).get(0).props.value).toBe(88);
	});

	it('have the second CustomTextField with state value equal to zzz', () => {
		const textField = mount(wrapper.find(CustomTextField).get(1));
		textField.setState({ editing: true });
		textField.find('input').simulate('change', { target: { name: 'name', value: 'zzz' }});
		expect(textField.state().value).toBe('zzz');
	});

	it('should have the editing value in the state to be true on focus', () => {
		const textField = mount(wrapper.find(CustomTextField).get(0));
		textField.find('input').simulate('focus');
		expect(textField.state().editing).toBe(true);
	});

	it('should have the editing value in the state to be false on blur', () => {
		const textField = mount(wrapper.find(CustomTextField).get(0));
		textField.find('input').simulate('focus');
		textField.find('input').simulate('blur');
		expect(textField.state().editing).toBe(false);
	});

	it('should change field type if toggle password is clicked', () => {
		const textField = mount(wrapper.find(CustomTextField).get(2));
		textField.find('svg').simulate('click');
		expect(textField.state().type).toBe('text');
	});

	it('should change field type if toggle password is clicked', () => {
		const textField = mount(wrapper.find(CustomTextField).get(2));
		textField.find('svg').simulate('click');
		textField.find('svg').simulate('click');
		expect(textField.state().type).toBe('password');
	});

});
