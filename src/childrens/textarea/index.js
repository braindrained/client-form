// @flow
import { createElement, forwardRef, useState, memo } from 'react';
import FieldLabel from '../common/FieldLabel';
import FieldError from '../common/FieldError';
import { camelToTitle, sumClasses } from '../../helpers/utils';

const el = createElement;
const areEqual = (prevProps, nextProps) => 
	prevProps.innerRef !== nextProps.innerRef ||
	prevProps.value !== nextProps.value ||
	prevProps.isValid !== nextProps.isValid ? false : true;

const Textarea = memo((props: Object) => {
	const { placeholder, label, className, style, isRequired, name, errorMessage, limitChar, innerRef, isValid, value, updateOnChange, onUpdate, onlyNumber } = props;
	const [stateValue, setStateValue] = useState(`${value}`);

	const onChange = (event: Object) => {
		const value = limitChar ? event.target.value.substring(0, limitChar) : event.target.value;
		setStateValue(value);
		if (updateOnChange === true) {
			onUpdate({
				target: {
					name,
					value: onlyNumber ? value.replace(/\D/g, '') : value,
				}
			});
		}
	}

	const onBlur = (event: Object) => {
		onUpdate(event);
	}

	return el('div', { className: sumClasses(['container-field', className]), style },
		el(FieldLabel, { label, name, isRequired, isValid }),
		el('textarea', {
			placeholder: camelToTitle(placeholder, name),
			className: 'large-field',
			name,
			id: name,
			onBlur: e => onBlur(e),
			onChange: e => onChange(e),
			value: stateValue,
			className: isValid === false ? 'input-error' : '',
			ref: innerRef
		}),
		limitChar ? el('div', { className: 'limit-char noselect' }, `${stateValue.length}/${limitChar}`) : null,
		el(FieldError, { isValid, errorMessage, style: limitChar ? { paddingRight: 60 } : {} })
	);
}, areEqual);

export default forwardRef((props, ref) =>
	el(Textarea, { innerRef: ref, ...props })
);
