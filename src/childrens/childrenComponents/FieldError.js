// @flow
import React from 'react';

const el = React.createElement;

const FieldError = (props: Object) => {
	const { isValid, errorMessage, style } = props;
	return el('div', { className: 'validation-error noselect', style }, ` ${isValid === false ? errorMessage : ''}`);
};

export default FieldError;
