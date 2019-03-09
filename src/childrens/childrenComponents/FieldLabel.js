// @flow
import React from 'react';
import { camelToTitle, sumClasses } from '../../helpers/utils';

const el = React.createElement;

const FieldLabel = (props: Object) => {
	const { label, name, isRequired, isValid } = props;

	return el('label', {
		htmlFor: name,
		className: sumClasses(['noselect', label && label.className]),
		style: Object.assign({}, label && label.style ? label.style : {}, isValid === false ? { color: '#e4002b' } : {})
	},
	`${camelToTitle(label && label.text, name) + (isRequired ? '*' : '')}`,
	label && label.object ? label.object : null);
};

export default FieldLabel;
