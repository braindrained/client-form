// @flow
import { createElement, forwardRef, useState, memo } from 'react';
import FieldLabel from '../common/FieldLabel';
import FieldError from '../common/FieldError';
import { camelToTitle, sumClasses } from '../../helpers/utils';
import PasswordIcon from './passwordIcon';

const el = createElement;

const Input = memo(props => {
	const { className, style, label, name, isRequired, errorMessage, placeholder, currency, disabled,
		unit, isValid, value, type, autoComplete, onlyNumber, limitChar, onUpdate, updateOnChange, innerRef } = props;
	const inputStyle = type === 'password' || unit !== undefined ? { paddingRight: 32 } : {};
	const [stateType, setType] = useState(type);
	let [startValue, setStartValue] = useState(value);
	startValue = startValue === undefined || startValue === null ? '' : startValue;
	startValue = onlyNumber === true && startValue !== undefined ? startValue.toString().replace(/\D/g, '') : startValue;
	startValue = limitChar ? startValue.toString().substring(0, limitChar) : startValue;

	const handleChange = (event: Object) => {
		let newValue = limitChar ? event.target.value.toString().substring(0, limitChar) : event.target.value;
		newValue = onlyNumber ? newValue.replace(/\D/g, '') : newValue;
		setStartValue(newValue);
	}

	const handleBlur = (event: Object) => {
		let newValue = limitChar ? event.target.value.toString().substring(0, limitChar) : event.target.value;
		newValue = onlyNumber ? newValue.replace(/\D/g, '') : newValue;
		onUpdate({ target: { name, value: newValue }});
	}

	return el('div', {
		className: sumClasses(['container-field', className]),
		style: Object.assign({}, style, type === 'hidden' ? { display: 'none' } : {}),
	},
		el(FieldLabel, { label, name, isRequired, isValid }),
		el('input', {
			type: stateType,
			placeholder: camelToTitle(placeholder, name),
			name,
			id: name,
			value: currency ? startValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : startValue,
			disabled,
			onChange: e => handleChange(e),
			onBlur: e => handleBlur(e),
			style: inputStyle,
			autoComplete,
			ref: innerRef,
			className: !isValid ? 'input-error' : ''
		}),
		type === 'password' ?
			el(PasswordIcon, { stateType, setType })
			:
			null,
		unit ? el('div', { className: 'unit noselect' }, unit) : null,
		el(FieldError, { isValid, errorMessage })
	);
}, (prevProps, nextProps) => 
		prevProps.isValid !== nextProps.isValid ||
		prevProps.value !== nextProps.value ||
		(prevProps.label && prevProps.innerRef.current.labels[0].innerText !== nextProps.label.text) ? false : true
);

export default forwardRef((props, ref) =>
	el(Input, { innerRef: ref, ...props })
);
