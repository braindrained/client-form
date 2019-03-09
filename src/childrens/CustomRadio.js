// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import { sumClasses, isInt } from '../helpers/utils';

const el = React.createElement;

class CustomRadio extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { value } = this.props;
		const checkValue = value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value;

		this.state = {
			value: checkValue
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		return false;
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
		const { className, style, label, name, hideRadio, options, isRequired, isValid } = this.props;
		const { value } = this.state;

		return el('div', { className: sumClasses(['container-field', className]), style },
			el(FieldLabel, { label, name, isRequired, isValid }),
			el('div', { className: 'float-container' },
				options.map(item => el('div', { key: `select_${item.name}_${item.value}`, className: hideRadio && item.value === value ? `floating selected-radio ${item.className}` : hideRadio ? `floating ${item.className}` : item.className, style: item.style },
					el('input', { type: 'radio', name, id: name + item.value, value: item.value, disabled: item.disabled === true, checked: item.value === value, onChange: this.onChange.bind(this) }),
					el('label', { htmlFor: name + item.value, style: item.labelStyle ? item.labelStyle : {} },
						hideRadio ?
							null
							:
							el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
								el('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' }),
								el('circle', { className: 'ext', cx: 12, cy: 12, r: 9 }),
								item.value === value ? el('circle', { className: 'int', cx: 12, cy: 12, r: 4 }) : null),
						el('div', null, item.label), item.customObject ? item.customObject : null)))));
	}
}

export default CustomRadio;
