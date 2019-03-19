// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

const el = React.createElement;

class CustomSelect extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			options: this.props.options,
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		if (this.state.options !== nextProps.options) return true;
		return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		if (nextProps.options !== this.state.options) {
			this.setState({
				options: nextProps.options,
			});

			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: nextProps.value
				}
			});
		}
	}

	render() {
		const { className, style, label, isRequired, errorMessage, name, value, isValid } = this.props;

		return el('div', { className: sumClasses(['container-field', className]), style },
			el(FieldLabel, { label, name, isRequired, isValid }),
			el('div', { className: 'select-style', style: isValid === false ? { borderColor: '#e4002b' } : {} },
				el('select', { name, id: name, value, onChange: (e) => { this.props.onUpdate(e); } },
					this.state.options.map((item, i) => {
						switch (item.value) {
						case '0':
							return el('option', { key: `cs_${i}`, value: '0', className: 'disabled-option' }, item.label);
						default:
							return el('option', { key: `cs_${i}`, value: item.value, disabled: item.disabled }, item.label);
						}
					})),
				el('svg', { width: '24', height: '24', viewBox: '0 0 24 24' },
					el('rect', { fill: '#fff', width: 24, height: 24, x: 0, y: 0 }),
					el('polyline', { fill: 'none', points: '6,9 12,15 18,9', style: { fill: 'none', stroke: '#d8d8df', strokeWidth: 1 } }))),
			el(FieldError, { isValid, errorMessage }));
	}
}

export default CustomSelect;
