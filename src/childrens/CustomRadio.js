// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses, isInt } from '../helpers/utils';

const el = React.createElement;

class CustomRadio extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { value } = this.props;
		const checkValue = value !== undefined && value !== null ? (value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value) : this.props.default;

		this.state = {
			value: checkValue
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.options !== nextState.options) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		const { value } = nextProps;
		const checkValue = value !== undefined && value !== null ? (value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value) : this.props.default;
		if (this.state.value !== checkValue) {
			this.setState({
				value: checkValue
			});
		}
	}

	onChange(event: Object) {
		const { value } = event.target;
		const checkValue = value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value;

		this.setState({
			value: checkValue
		});
		this.props.onUpdate(event);
	}

	render() {
		const { className, style, label, name, hideRadio, options, isRequired, isValid, errorMessage } = this.props;
		const { value } = this.state;

		return el('div', { className: sumClasses(['container-field', className]), style },
			el(FieldLabel, { label, name, isRequired, isValid }),
			el('div', { className: 'float-container' },
				options.map(item => el('div', {
					key: `select_${item.name}_${item.value}`,
					className: hideRadio && item.value === value ?
						`floating ${item.className} ${item.selectedClassName ? item.selectedClassName : 'selected-radio'}`
						:
						hideRadio ?
							`floating ${item.className}`
							:
							`${sumClasses([item.className, item.value === value ? item.selectedClassName : ''])}`,
					style: item.style },
				el('input', { type: 'radio', name, id: name + item.value, value: item.value, disabled: item.disabled === true, checked: item.value === value, onChange: (e) => { this.onChange(e); } }),
				el('label', { htmlFor: name + item.value, style: item.labelStyle ? item.labelStyle : {} },
					hideRadio ?
						null
						:
						el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
							el('circle', { className: 'ext', cx: 12, cy: 12, r: 9, stroke: 'rgb(216, 216, 223)', strokeWidth: 2 }),
							item.value === value ? el('circle', { className: 'int', cx: 12, cy: 12, r: 4 }) : null),
					el('div', null, item.label), item.customObject ? item.customObject : null)))),
			el(FieldError, { isValid, errorMessage }));
	}
}

export default CustomRadio;
