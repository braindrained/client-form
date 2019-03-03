// @flow
import React from 'react';

const e = React.createElement;

const FieldError = (props: Object) => {
	const { isValid, errorMessage, style } = props;

	return e(
		'div',
		{
			className: 'validation-error noselect',
			style
		},
		` ${isValid === false ? errorMessage : ''}`
	);
};

export default FieldError;
