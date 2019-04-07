// @flow
import React from 'react';

const el = React.createElement;

const CustomLabel = (props: Object) => {
	const { style, content, className } = props;

	return el('div', { className, style }, content);
};

export default CustomLabel;
