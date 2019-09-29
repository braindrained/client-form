// @flow
import { Component, createElement, forwardRef, createRef, memo } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses, isInt, notEmpty } from '../helpers/utils';

const el = createElement;
const areEqual = (prevProps, nextProps) => {
	try {
		if (prevProps.value !== nextProps.value ||
			prevProps.options !== nextProps.options ||
			prevProps.isValid !== nextProps.isValid ||
			(prevProps.label && prevProps.label.text !== nextProps.label.text)) {
			return false;
		}
	} catch (e) {
		return true;
	}
	return true;
};

const CustomRadio = memo(props => {
	const { value, className, style, label, name, hideRadio, options, isRequired, isValid, errorMessage, innerRef, onUpdate } = props;
	const checkValue = notEmpty(value) ? (value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value) : props.default;
	const currentIndex = options.findIndex(o => o.value === value);
	const labelId = `radio_label_${name}`;

	const onChange = (event: Object) => {
		const { value } = event.target;
		const checkValue = getValue(value);
		onUpdate({ target: { name, value: checkValue } });
	}

	const handleKeyDown = (e: Object, item: Object) => {
		const keyCode = e.which || e.keyCode;

		if (keyCode !== 9 && (keyCode === 13 || keyCode === 32 || keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40)) {
			e.preventDefault();
			const { value } = item;
			let checkValue = getValue(value);
			let newIndex = 0;
			let newValue = value;
			let disabled = false;

			switch (keyCode) {
				case 13:
				case 32:
					onUpdate({ target: { name, value: checkValue } });
					break;
				case 37:
				case 38:
					newIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
					newValue = options[newIndex].value;
					disabled = options[newIndex].disabled;
					if (disabled) break;
					checkValue = getValue(newValue);
					onUpdate({ target: { name, value: checkValue } });
					break;
				case 39:
				case 40:
					newIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
					newValue = options[newIndex].value;
					disabled = options[newIndex].disabled;
					if (disabled) break;
					checkValue = getValue(newValue);
					onUpdate({ target: { name, value: checkValue } });
					break;
				default:
					break;
			}
		}
	}

	const getValue = (value) => {
		return notEmpty(value) ? (value.toString() === 'true' ? true : value.toString() === 'false' ? false : isInt(value) ? parseInt(value, 10) : value) : props.default;
	}

	return el('div', {
		ref: innerRef,
		className: sumClasses(['container-field', className]),
		style,
		role: 'radiogroup',
		'aria-labelledby': labelId
	},
		el(FieldLabel, { label, name, isRequired, isValid, labelId }),
		el('div', { className: 'float-container', id: name },
			options.map((item, i) => {
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
						type: 'radio',
						name,
						id: name + item.value,
						value: item.value,
						disabled: item.disabled === true,
						checked: item.value === value,
						onChange: e => onChange(e),
						tabIndex: -1,
						'aria-labelledby': `label_${name}_${item.value}`,
						...(item.value === value ? { 'aria-checked': true } : { 'aria-checked': false })
					}),
					el('label', {
						id: `label_${name}_${item.value}`,
						htmlFor: name + item.value,
						style: item.labelStyle ? item.labelStyle : {},
						onKeyDown: e => handleKeyDown(e, item),
						tabIndex: i === 0 ? 0 : -1,
					},
							hideRadio ?
								null
								:
								el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
									el('circle', { className: 'ext', cx: 12, cy: 12, r: 9, stroke: '#96a1b0', strokeWidth: 1 }),
									item.value === value ? el('circle', { className: 'int', cx: 12, cy: 12, r: 4 }) : null),
							el('div', null, item.label), item.customObject ? item.customObject : null
						)
				)}
			)
		),
		el(FieldError, { isValid, errorMessage })
	);
}, areEqual);

export default forwardRef((props, ref) =>
	el(CustomRadio, { innerRef: ref, ...props })
);
