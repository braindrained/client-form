// @flow
import React from 'react';
import PropTypes from 'prop-types';

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

CustomLabel.propTypes = {
	name: PropTypes.string,
	style: PropTypes.instanceOf(Object),
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Object),
	]),
	label: PropTypes.instanceOf(Object)
};

CustomLabel.defaultProps = {
	name: '',
	style: null,
	text: '',
	label: null
};

export default CustomLabel;
