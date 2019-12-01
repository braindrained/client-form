// @flow
import { createElement, forwardRef } from 'react';

const el = createElement;

const Label = (props: Object) => {
	const { style, content, className, innerRef } = props;

	return el('div', { className, style, ref: innerRef }, content);
};

export default forwardRef((props, ref) =>
	el(Label, { innerRef: ref, ...props })
);