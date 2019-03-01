// @flow
import React from 'react';

const CustomLabel = (props: Object) => {
	const { name, style, text, label } = props;

	return (
		<div {...{
			className: 'noselect',
			name,
			style
		}}>
			{label ? label.text : text}
		</div>
	);
};

export default CustomLabel;
