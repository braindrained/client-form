// @flow
import { createElement, forwardRef, memo } from 'react';
import FieldLabel from '../common/FieldLabel';
import FieldError from '../common/FieldError';
import { sumClasses, isInt, notEmpty } from '../../helpers/utils';
import Options from './options';

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

const Radio = memo(props => {
	const { value, className, style, label, name, hideRadio, options, isRequired, isValid, errorMessage, innerRef, onUpdate } = props;
	const currentIndex = options.findIndex(o => o.value === value);
	const labelId = `radio_label_${name}`;

	const getValue = value => {
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
		el(Options, { name, options, value, hideRadio, onUpdate, getValue, currentIndex, sumClasses }),
		el(FieldError, { isValid, errorMessage })
	);
}, areEqual);

export default forwardRef((props, ref) =>
	el(Radio, { innerRef: ref, ...props })
);
