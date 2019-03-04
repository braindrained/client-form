// @flow
import React from 'react';

const e = React.createElement;

const CustomLabel = (props: Object) => {
	const { style, content, className } = props;

	return e('div', { className, style }, content);
};

export default CustomLabel;
