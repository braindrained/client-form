// @flow
import { createElement, Fragment, forwardRef, useState, memo } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

const el = createElement
const areEqual = (prevProps, nextProps) => {
	try {
		if (
			prevProps.isValid !== nextProps.isValid ||
			prevProps.value !== nextProps.value ||
			(prevProps.label && prevProps.innerRef.current.labels[0].innerText !== nextProps.label.text)) {
			return false;
		}
	} catch (e) {
		return true;
	}
	return true;
};

const CustomTextField = memo(props => {
	const { className, style, label, name, isRequired, errorMessage, placeholder, currency, disabled,
		unit, isValid, value, type, autoComplete, onlyNumber, limitChar, onUpdate, updateOnChange, innerRef } = props;
	let startValue = value === undefined || value === null ? '' : value;
	startValue = onlyNumber === true && startValue !== undefined ? startValue.toString().replace(/\D/g, '') : startValue;
	startValue = limitChar ? startValue.toString().substring(0, limitChar) : startValue;
	const inputStyle = type === 'password' || unit !== undefined ? { paddingRight: 32 } : {};
	const [stateType, setType] = useState(type);

	const onChange = (event: Object) => {
		let newValue = limitChar ? event.target.value.toString().substring(0, limitChar) : event.target.value;
		newValue = onlyNumber ? newValue.replace(/\D/g, '') : newValue;
		onUpdate({ target: { name, value: newValue }});
	}

	const togglePassword = () => {
		setType(stateType === 'password' ? 'text' : 'password');
	}

	return el('div', {
		className: sumClasses(['container-field', className]),
		style: Object.assign({}, style, type === 'hidden' ? { display: 'none' } : {}),
		onBlur: e => onBlur(e),
	},
		el(FieldLabel, { label, name, isRequired, isValid }),
		el('input', {
			type: stateType,
			placeholder: camelToTitle(placeholder, name),
			name,
			id: name,
			value: currency ? startValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : startValue,
			disabled,
			onChange: e => onChange(e),
			onFocus: () => onFocus(),
			style: inputStyle,
			autoComplete,
			ref: innerRef,
			className: !isValid ? 'input-error' : ''
		}),
		type === 'password' ?
			el('svg', { onClick: () => togglePassword(), className: 'eye', width: 24, height: 24, viewBox: '0 0 24 24' },
				stateType === 'password' ?
					el('path', { fill: '#d8d8df', d: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' })
					:
					el(Fragment, {},
						el('path', { d: 'M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z', className: 'show' }),
						el('path', { fill: '#d8d8df', d: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z' })))
			:
			null,
		unit ? el('div', { className: 'unit noselect' }, unit) : null,
		el(FieldError, { isValid, errorMessage })
	);
}, areEqual);

export default forwardRef((props, ref) =>
	el(CustomTextField, { innerRef: ref, ...props })
);
