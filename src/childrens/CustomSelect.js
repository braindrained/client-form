// @flow
import { Component, createElement, forwardRef } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

const el = createElement;

class CustomSelect extends Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			options: this.props.options,
			addSelectProps: null
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.innerRef !== nextProps.innerRef) return true;
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		if (JSON.stringify(this.state.options) !== JSON.stringify(nextProps.options)) return true;
		if (this.state.addSelectProps !== nextProps.addSelectProps) return true;
		return false;
	}

	componentDidUpdate(prevProps) {
		const { options, value, name, onUpdate } = this.props;

		if (JSON.stringify(prevProps.options) !== JSON.stringify(options)) {
			this.setState({ options });
			onUpdate({
				target: {
					name,
					value
				}
			});
		}
	}

	/*UNSAFE_componentWillReceiveProps(nextProps: Object) {
		if (JSON.stringify(nextProps.options) !== JSON.stringify(this.state.options)) {
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
	}*/

	handleClick(e) {
		const { addSelectProps } = this.state;
		this.setState({ addSelectProps: addSelectProps ? null : { 'aria-expanded': 'true' } });
	}

	render() {
		const { className, style, label, isRequired, errorMessage, name, value, isValid, disabled, innerRef, onUpdate } = this.props;
		const { addSelectProps } = this.state;
		const labelId = `lb_select_${name}`;

		return el('div', { className: sumClasses(['container-field', className]), style },
			el(FieldLabel, { label, name, isRequired, isValid, labelId }),
			el('div', { className: 'select-style', style: isValid === false ? { borderColor: '#e4002b' } : {} },
				el('select', {
					name,
					id: name,
					value,
					onChange: e => onUpdate(e),
					onClick: e => this.handleClick(e),
					disabled,
					ref: innerRef,
					'aria-labelledby': sumClasses([name, labelId]),
					...addSelectProps
				},
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

export default forwardRef((props, ref) =>
	el(CustomSelect,
		Object.assign({}, props, { innerRef: ref })
	)
);
