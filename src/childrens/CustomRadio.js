// @flow
import { Component, createElement, forwardRef, createRef } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses, isInt, notEmpty } from '../helpers/utils';

const el = createElement;

class CustomRadio extends Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { value, label } = this.props;
		const checkValue = notEmpty(value) ? (value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value) : this.props.default;

		this.state = {
			value: checkValue,
			labelText: label && label.text
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.innerRef !== nextProps.innerRef) return true;
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.options !== nextProps.options) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		if (nextProps.label && this.state.labelText !== nextProps.label.text) return true;
		return false;
	}

	componentDidUpdate(prevProps) {
		const { options, value, name, onUpdate, label } = this.props;
		const checkValue =
		notEmpty(value) ?
		(value.toString() === 'true' ?
			true
			:
			value.toString() === 'false' ?
			false
			:
			isInt(value) ?
			parseInt(value, 10)
			:
			value
		)
		:
		this.props.default;

		if (prevProps.value !== value) {
			this.setState({ value: checkValue });
			onUpdate({ target: { name, value: checkValue }}, false);
		}
		if (prevProps.label && prevProps.label.text !== label.text) this.setState({ labelText: label && label.text });
	}

	/*UNSAFE_componentWillReceiveProps(nextProps: Object) {
		const { name, onUpdate } = this.props;
		const { value, label } = nextProps;
		const checkValue =
		notEmpty(value) ?
		(value.toString() === 'true' ?
			true
			:
			value.toString() === 'false' ?
			false
			:
			isInt(value) ?
			parseInt(value, 10)
			:
			value
		)
		:
		this.props.default;

		if (this.state.value !== checkValue || (label && this.state.labelText !== label.text)) {
			this.setState({
				value: checkValue,
				labelText: label && label.text
			});
			onUpdate({ target: { name, value: checkValue }}, false);
		}
	}*/

	onChange(event: Object) {
		const { name, onUpdate } = this.props;
		const { value } = event.target;
		const checkValue = value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value;

		this.setState({ value: checkValue });
		onUpdate({ target: { name, value: checkValue } });

		this[`r_elem_label_${name}_${value}`].current.blur();
	}

	handleKeyDown(e: Object, item: Object) {
		if (e.keyCode !== 9) {
			e.preventDefault();
			const { name, onUpdate } = this.props;
			const { value } = item;
			const checkValue = value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value;

			this.setState({ value: checkValue });
			onUpdate({ target: { name, value: checkValue } });
			this[`r_elem_label_${name}_${value}`].current.blur();
		}
	}

	render() {
		const { className, style, label, name, hideRadio, options, isRequired, isValid, errorMessage, innerRef } = this.props;
		const { value, labelText } = this.state;

		return el('div', { ref: innerRef, className: sumClasses(['container-field', className]), style },
			el(FieldLabel, { label, name, isRequired, isValid }),
			el('div', { className: 'float-container', id: name },
				options.map(item => {
					this[`r_elem_${name}_${item.value}`] = createRef();
					this[`r_elem_label_${name}_${item.value}`] = createRef();
					return el('div', {
						key: `select_${item.name}_${item.value}`,
						className: hideRadio && item.value === value ?
							`floating ${item.className} ${item.selectedClassName ? item.selectedClassName : 'selected-radio'}`
							:
							hideRadio ?
								`floating ${item.className}`
								:
								`${sumClasses([item.className, item.value === value ? item.selectedClassName : ''])}`,
						style: item.style
					},
						el('input', {
							ref: this[`r_elem_${name}_${item.value}`],
							type: 'radio',
							name,
							id: name + item.value,
							value: item.value,
							disabled: item.disabled === true,
							checked: item.value === value,
							onChange: e => this.onChange(e),
						}),
						el('label', {
							ref: this[`r_elem_label_${name}_${item.value}`],
							htmlFor: name + item.value,
							style: item.labelStyle ? item.labelStyle : {},
							onKeyDown: e => this.handleKeyDown(e, item),
							tabIndex: 0
						},
								hideRadio ?
									null
									:
									el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
										el('circle', { className: 'ext', cx: 12, cy: 12, r: 9, stroke: 'rgb(216, 216, 223)', strokeWidth: 2 }),
										item.value === value ? el('circle', { className: 'int', cx: 12, cy: 12, r: 4 }) : null),
								el('div', null, item.label), item.customObject ? item.customObject : null
							)
					)}
				)
			),
			el(FieldError, { isValid, errorMessage })
		);
	}
}

export default forwardRef((props, ref) =>
	el(CustomRadio,
		Object.assign({}, props, { innerRef: ref })
	)
);
