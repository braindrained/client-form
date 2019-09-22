// @flow
import { Component, createElement, forwardRef, memo, useState } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

const el = createElement;
const areEqual = (prevProps, nextProps) => {
	if (
		prevProps.isValid !== nextProps.isValid ||
		prevProps.value !== nextProps.value ||
		prevProps.addSelectProps !== nextProps.addSelectProps ||
		prevProps.options !== nextProps.options ||
		(prevProps.label && prevProps.label.text !== nextProps.label.text)
	) {
		return false;
	}
	return true;
};

const CustomSelect = memo(props => {
	const { className, style, label, isRequired, errorMessage, name, value, isValid, disabled, innerRef, onUpdate, addSelectProps, options } = props;
	const labelId = `lb_select_${name}`;
	const [selectProps, setSelectProps] = useState(null);

	const handleClick = (e: Object) => {
		const keyCode = e.which || e.keyCode;
		if (keyCode !== 9 && (keyCode === 13 || keyCode === 32 || keyCode === undefined)) {
			setSelectProps(selectProps ? null : { 'aria-expanded': 'true' });
		}
	}

	return el('div', { className: sumClasses(['container-field', className]), style },
		el(FieldLabel, { label, name, isRequired, isValid, labelId }),
		el('div', { className: sumClasses(['select-style', !isValid ? 'input-error' : '']) },
			el('select', {
				name,
				id: name,
				value,
				onChange: e => onUpdate(e),
				onClick: e => handleClick(e),
				onKeyDown: e => handleClick(e),
				disabled,
				ref: innerRef,
				'aria-labelledby': sumClasses([name, labelId]),
				...selectProps
			},
				options.map((item, i) => {
					switch (item.value) {
					case '0':
						return el('option', { key: `cs_${i}`, value: '0', className: 'disabled-option' }, item.label);
					default:
						return el('option', { key: `cs_${i}`, value: item.value, disabled: item.disabled }, item.label);
					}
				})),
			el('svg', { width: '24', height: '24', viewBox: '0 0 24 24' },
				el('rect', { fill: '#fff', width: 24, height: 24, x: 0, y: 0 }),
				el('polyline', { fill: 'none', points: '6,9 12,15 18,9', style: { fill: 'none', stroke: '#96a1b0', strokeWidth: 1 } }))),
		el(FieldError, { isValid, errorMessage }));
}, areEqual);

export default forwardRef((props, ref) =>
	el(CustomSelect, { innerRef: ref, ...props })
);
