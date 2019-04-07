// @flow
import React from 'react';
import { sumClasses, camelToTitle } from '../helpers/utils';

const el = React.createElement;

export default class CustomCheckBox extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value === 'true' || this.props.value === true
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.style !== nextProps.style) return true;
		return false;
	}

	onChange(event: Object) {
		this.setState({
			value: event.target.checked
		});
		this.props.onUpdate({
			target: {
				name: this.props.name,
				value: event.target.checked
			}
		});
	}

	render() {
		const { className, style, label, name, customSvg } = this.props;
		const { value } = this.state;
		const svgProps = customSvg ? customSvg.svgProps : { width: 24, height: 24, viewBox: '0 0 24 24' };
		const forTrue = customSvg ? customSvg.forTrue : el('path', {
			className: 'int',
			d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' });
		const forFalse = customSvg ? customSvg.forFalse : el('rect', {
			className: 'ext',
			style: { fill: '#fff', strokeWidth: 2, stroke: '#d8d8df', borderRadius: 2 },
			width: 16,
			height: 16,
			rx: 2,
			ry: 2,
			x: 4,
			y: 4 });

		return el('div', { className: sumClasses(['container-field', className !== undefined ? className : 'check']), style },
			el('input', { type: 'checkbox', name, id: name, checked: value, onChange: (e) => { this.onChange(e); } }),
			el('label', { htmlFor: name, style: label.style },
				el('svg', svgProps, value !== true ? forFalse : forTrue),
				el('div', {}, camelToTitle(label.text, name))));
	}
}
