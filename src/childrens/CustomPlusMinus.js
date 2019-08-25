// @flow
import { Component, createElement, forwardRef } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

const el = createElement;

class CustomPlusMinus extends Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value === '' ? 0 : parseFloat(this.props.value)
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.innerRef !== nextProps.innerRef) return true;
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		return false;
	}

	onChange(event: Object) {
		const value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
		this.setState({
			value
		});
	}

	onBlur(event: Object) {
		this.props.onUpdate(event, false);
	}

	handleKeyPress(event: Object) {
		if (event.key === 'Enter') {
			event.preventDefault();
		} else {
			const value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
			this.setState({
				value
			});
		}
	}

	plusMinus(val: string) {
		const value = val === 'min' ?
			this.state.value === 0 ? 0
				: parseFloat(this.state.value) - 1
			: parseFloat(this.state.value) + 1;
		this.setState({
			value: parseFloat(value)
		});

		this.props.onUpdate({
			target: {
				name: this.props.name,
				value: parseFloat(value)
			}
		}, false);
	}

	render() {
		const { className, style, label, name, type,
			disabled, isRequired, errorMessage,
			isValid, innerRef
		} = this.props;

		return el('div', { className: sumClasses(['container-field plus-minus', className]), style },
			el(FieldLabel, { label, name, isRequired, isValid }),
			el('div', { style: { float: 'left' } },
				el('svg', { onClick: () => { this.plusMinus('min'); }, style: { opacity: this.state.value === 0 ? 0.3 : 1 }, className: 'noselect' },
					el('circle', { cx: 17, cy: 17, r: 17, fill: 'rgb(50, 63, 72)' }),
					el('rect', { width: 12, height: 1.5, x: 11, y: 16 })),
				el('div', { style: { float: 'left' } },
					el('input', {
						ref: innerRef,
						type,
						name,
						id: name,
						value: this.state.value,
						disabled,
						onKeyPress: (e) => { this.handleKeyPress(e); },
						onChange: (e) => { this.onChange(e); },
						onBlur: (e) => { this.onBlur(e); },
						style: { border: 'none', background: 'none', width: 40, textAlign: 'center' }
					})),
				el('svg', { onClick: () => { this.plusMinus('plus'); }, className: 'noselect' },
					el('circle', { cx: 17, cy: 17, r: 17, fill: 'rgb(50, 63, 72)' }),
					el('rect', { width: 12, height: 1.5, x: 11, y: 16 }),
					el('rect', { width: 1.5, height: 12, x: 16, y: 11 }))),
			el(FieldError, { isValid, errorMessage }));
	}
}

export default forwardRef((props, ref) =>
	el(CustomPlusMinus,
		Object.assign({}, props, { innerRef: ref })
	)
);
