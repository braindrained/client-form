// @flow
import { createElement, forwardRef, memo } from 'react';
import { sumClasses, camelToTitle } from '../../helpers/utils';
import Label from './label';
import Input from './input';

const el = createElement;
const areEqual = (prevProps, nextProps) => {
	try {
		if (prevProps.value !== nextProps.value ||
			prevProps.style !== nextProps.style ||
			(prevProps.label && prevProps.label.text !== nextProps.label.text)) {
			return false;
		}
	} catch (e) {
		return true;
	}
	return true;
};

const CheckBox = memo(props => {
	const { className, style, label, name, customSvg, innerRef, value, onUpdate } = props;
	const svgProps = customSvg ? customSvg.svgProps : { width: 24, height: 24, viewBox: '0 0 24 24' };
	const forTrue = customSvg ? customSvg.forTrue : el('path', {
		className: 'int',
		d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' });
	const forFalse = customSvg ? customSvg.forFalse : el('rect', {
		className: 'ext',
		strokeWidth: 0.8,
		stroke: '#96a1b0',
		style: { fill: '#fff' },
		width: 16,
		height: 16,
		rx: 2,
		ry: 2,
		x: 4,
		y: 4 });
	const labelId = `ck_label_${name}`;

	return el('div', { className: sumClasses(['container-field', className !== undefined ? className : 'check']), style },
		el(Input, {
			innerRef,
			name,
			value,
			labelId,
			onUpdate
		}),
		el(Label, {
			name,
			label,
			svgProps,
			forFalse,
			forTrue,
			value,
			camelToTitle,
			labelId,
			onUpdate
		})
	);
}, areEqual);

export default forwardRef((props, ref) =>
	el(CheckBox, { innerRef: ref, ...props })
);
