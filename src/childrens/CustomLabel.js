// @flow
import { createElement } from 'react';

const el = createElement;

const CustomLabel = (props: Object) => {
	const { style, content, className } = props;

	return el('div', { className, style }, content);
};

export default CustomLabel;
