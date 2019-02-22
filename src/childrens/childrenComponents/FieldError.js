// @flow
import React from 'react';

const FieldError = (props: Object) => {
	const { isValid, errorMessage } = props;

	return (
		<div className="validation-error noselect">
			&nbsp;{isValid === false ? errorMessage : '' }
		</div>
	)

};

export default FieldError;
