// @flow
import { Component, createElement, forwardRef, createRef, memo } from 'react';
import { sumClasses, camelToTitle } from '../helpers/utils';

const el = createElement;
const areEqual = (prevProps, nextProps) => {
	if (prevProps.value !== nextProps.value ||
		prevProps.style !== nextProps.style ||
		(prevProps.label && prevProps.label.text !== nextProps.label.text)) {
		return false;
	}
	return true;
};

const CustomCheckBox = memo(props => {
	const { className, style, label, name, customSvg, innerRef, value, onUpdate } = props;
	const svgProps = customSvg ? customSvg.svgProps : { width: 24, height: 24, viewBox: '0 0 24 24' };
	const forTrue = customSvg ? customSvg.forTrue : el('path', {
		className: 'int',
		d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' });
	const forFalse = customSvg ? customSvg.forFalse : el('rect', {
		className: 'ext',
		style: { fill: '#fff', strokeWidth: 1, stroke: '#96a1b0', borderRadius: 2 },
		width: 16,
		height: 16,
		rx: 2,
		ry: 2,
		x: 4,
		y: 4 });
	const labelId = `ck_label_${name}`;


	const onChange = (event: Object) => {
		onUpdate({ target: { name, value: event.target.checked } });
		innerRef.current.labels[0].blur();
	}

	const handleKeyDown = (e: Object) => {
		switch (e.keyCode) {
			case 13:
			case 32:
			case 37:
			case 39:
				e.preventDefault();
				onUpdate({ target: { name, value: !value } });
				innerRef.current.labels[0].blur();
				break;
			default:
				break;
		}
	}

	return el('div', { className: sumClasses(['container-field', className !== undefined ? className : 'check']), style },
		el('input', {
				ref: innerRef,
				type: 'checkbox',
				name,
				id: name,
				checked: value,
				onChange: e => onChange(e),
				'aria-labelledby': labelId
			}
		),
		el('label', {
			tabIndex: 0,
			id: labelId,
			htmlFor: name,
			style: label && label.style,
			'aria-label': camelToTitle(label && label.text, name),
			onKeyDown: e => handleKeyDown(e),
		},
			el('svg', { ...svgProps, 'aria-labelledby': labelId }, value !== true ? forFalse : forTrue),
			el('div', {}, camelToTitle(label && label.text, name))
		)
	);
}, areEqual);

export default forwardRef((props, ref) =>
	el(CustomCheckBox, { innerRef: ref, ...props })
);
