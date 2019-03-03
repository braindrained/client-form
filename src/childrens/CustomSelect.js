// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

const e = React.createElement;

class CustomSelect extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			options: this.props.options,
			isValid: this.props.isValid
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		if (nextProps.options.length !== this.state.options.length) {
			this.setState({
				options: nextProps.options
			});

			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: ''
				}
			});
		}
	}

	render() {
		const { className, style, label, isRequired, value, errorMessage, name } = this.props;
		const { isValid } = this.state;
		/* no jsx experiment, cool!!! */
		return e('div', { className: sumClasses(['container-field', className]), style },
			e(FieldLabel, { label, name, isRequired, isValid }),
			e('div', { className: 'select-style', style: isValid === false ? { borderColor: '#e4002b' } : {} },
				e('select', { name, id: name, value, onChange: (e) => { this.props.onUpdate(e); } },
					this.state.options.map((item, i) => {
						switch (item.value) {
						case '0':
							return e('option', { key: `cs_${i}`, value: '0', className: 'disabled-option' }, item.label);
						default:
							return e('option', { key: `cs_${i}`, value: item.value, disabled: item.disabled }, item.label);
						}
					})),
				e('svg', { width: '24', height: '24', viewBox: '0 0 24 24' },
					e('path', { fill: '#d8dbdf', d: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' }))),
			e(FieldError, { isValid, errorMessage }));
	}
}

export default CustomSelect;
