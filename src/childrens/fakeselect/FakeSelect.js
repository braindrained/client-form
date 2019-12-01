// @flow
import { Component, createElement, forwardRef } from 'react';
import ClickOutHandler from 'react-onclickout';
import FieldLabel from '../common/FieldLabel';
import FieldError from '../common/FieldError';
import { sumClasses } from '../../helpers/utils';

const el = createElement;

class FakeSelect extends Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value,
			displaySelect: true
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.innerRef !== nextProps.innerRef) return true;
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.state.displaySelect !== nextState.displaySelect) return true;
		return false;
	}

	onClick(val: boolean) {
		if (val !== this.state.displaySelect) {
			this.setState({
				displaySelect: val
			});
		}
	}

	onChange(event: Object) {
		const val = {
			min: event.target.name === 'min' ? event.target.value : this.props.value.min,
			max: event.target.name === 'max' ? event.target.value : this.props.value.max
		};
		this.setState({
			value: val
		});
		this.props.onUpdate({
			target: {
				name: this.props.name,
				value: val
			}
		});
	}

	render() {
		const { className, style, label, text, firstRange, secondRange, rangesStyle, isRequired, name, errorMessage, overlayBg, innerRef } = this.props;
		const { displaySelect, value } = this.state;
		const maxRange = this.props.value.min === '' ? secondRange : secondRange.filter(o => o.value > this.props.value.min || o.value === '');
		const { isValid } = this.state;

		return el('div', { className: sumClasses(['container-field', className]), style },
			el(FieldLabel, { label, name, isRequired, isValid }),
			el(ClickOutHandler, { onClickOut: () => { this.onClick(true); }, style: { maxHeight: 57 } },
				el('div', {
					className: 'select-style noselect',
					onClick: () => { this.onClick(false); },
					style: { zIndex: displaySelect ? 1 : 0, paddingLeft: 8 }
				},
				value.min !== '' && value.max !== '' ?
					`${value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')} -
					${value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
					:
					value.min !== '' && value.max === '' ?
						`da ${value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
						:
						value.min === '' && value.max !== '' ?
							`fino a ${value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
							:
							text,
				el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
					el('polyline', { fill: 'none', points: '6,9 12,15 18,9', style: { fill: 'none', stroke: '#d8d8df', strokeWidth: 1 } }))),
				el(FieldError, { isValid, errorMessage }),
				el('div', { className: 'fake-cont box-shadow', style: { width: style.maxWidth, opacity: displaySelect ? '0' : '1', zIndex: displaySelect ? -1 : 1, background: overlayBg } },
					el('label', { className: 'min-max', htmlFor: 'min' }, 'Min'),
					el('div', { 
						className: 'select-style', 
						style: { ...rangesStyle, marginBottom: 10, float: 'right' } },
						el('select', {
							ref: innerRef, 
							name: 'min', 
							id: 'min', 
							value: this.props.value.min, 
							onChange: o => this.onChange(o)
						},
							firstRange.map(item => 
								el('option', { 
									value: item.value, 
									key: `f_${item.value}`
								}, item.text)
							)
						),
						el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
							el('polyline', { fill: 'none', points: '6,9 12,15 18,9', style: { fill: 'none', stroke: '#d8d8df', strokeWidth: 1 } })
						)
					),
					el('div', { className: 'clear' }),
					el('label', { className: 'min-max', htmlFor: 'max' }, 'Max'),
					el('div', { className: 'select-style', style: { ...rangesStyle, marginBottom: 10, float: 'right' } },
						el('select', { 
							name: 'max', 
							id: 'max', 
							value: this.props.value.max, 
							onChange: o => this.onChange(o)
						},
							maxRange.map(item => 
								el('option', { 
									value: item.value, 
									key: `f_${item.value}` 
								}, item.text)
							)
						),
						el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
							el('polyline', { fill: 'none', points: '6,9 12,15 18,9', style: { fill: 'none', stroke: '#d8d8df', strokeWidth: 1 } })
						)
					)
				)
			)
		);
	}
}

export default forwardRef((props, ref) =>
	el(FakeSelect, { innerRef: ref, ...props })
);
