// @flow
import React from 'react';

const FieldError = (props: Object) => {
	const { isValid, errorMessage, style } = props;

	return (
		<div className="validation-error noselect" style={style}>
			&nbsp;{isValid === false ? errorMessage : '' }
		</div>
	)

};

export default FieldError;
