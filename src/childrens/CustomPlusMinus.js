// @flow
import { Component, createElement, forwardRef, useState, memo } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

const el = createElement;
const areEqual = (prevProps, nextProps) => {
	if (prevProps.innerRef !== nextProps.innerRef) return false;
	if (prevProps.value !== nextProps.value) return false;
	return true;
};

const CustomPlusMinus = memo(props => {
	const { className, style, label, name, type, disabled, isRequired, errorMessage, isValid, innerRef, value, onUpdate } = props;
	const [stateValue, setStateValue] = useState(value === '' ? 0 : parseFloat(value));

	const onChange = (event: Object) => {
		const newValue = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
		setStateValue(newValue);
	}

	const onBlur = (event: Object) => {
		onUpdate(event, false);
	}

	const handleKeyPress = (event: Object) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		} else {
			setStateValue(parseInt(event.target.value === '' ? 0 : event.target.value, 10));
		}
	}

	const plusMinus = (val: string) => {
		const newValue = val === 'min' ?
			stateValue === 0 ? 0
				: parseFloat(stateValue) - 1
			: parseFloat(stateValue) + 1;

		setStateValue(parseFloat(newValue));
		onUpdate({ target: { name, value: parseFloat(newValue) } });
	}


	return el('div', { className: sumClasses(['container-field plus-minus', className]), style },
		el(FieldLabel, { label, name, isRequired, isValid }),
		el('div', { style: { float: 'left' } },
			el('svg', { onClick: () => plusMinus('min'), style: { opacity: stateValue === 0 ? 0.3 : 1 }, className: 'noselect' },
				el('circle', { cx: 17, cy: 17, r: 17, fill: 'rgb(50, 63, 72)' }),
				el('rect', { width: 12, height: 1.5, x: 11, y: 16 })
			),
			el('div', { style: { float: 'left' } },
				el('input', {
					ref: innerRef,
					type,
					name,
					id: name,
					value: stateValue,
					disabled,
					onKeyPress: (e) => handleKeyPress(e),
					onChange: (e) => onChange(e),
					onBlur: (e) => onBlur(e),
					style: { border: 'none', background: 'none', width: 40, textAlign: 'center' }
				})
			),
			el('svg', { onClick: () => plusMinus('plus'), className: 'noselect' },
				el('circle', { cx: 17, cy: 17, r: 17, fill: 'rgb(50, 63, 72)' }),
				el('rect', { width: 12, height: 1.5, x: 11, y: 16 }),
				el('rect', { width: 1.5, height: 12, x: 16, y: 11 })
			)
		),
		el(FieldError, { isValid, errorMessage })
	);
}, areEqual);

export default forwardRef((props, ref) =>
	el(CustomPlusMinus, { innerRef: ref, ...props })
);
