// @flow
import React from 'react';
import { camelToTitle, sumClasses } from '../../helpers/utils';

const e = React.createElement;

const FieldLabel = (props: Object) => {
	const { label, name, isRequired, isValid } = props;

	return e('label',
		{
			htmlFor: name,
			className: sumClasses(['noselect', label && label.className]),
			style: Object.assign({}, label && label.style ? label.style : {}, isValid === false ? { color: '#e4002b' } : {}) },
		label && label.object ?
			label.object
			:
			`${camelToTitle(label && label.text, name) + (isRequired ? '*' : '')}`
	);
};

export default FieldLabel;
