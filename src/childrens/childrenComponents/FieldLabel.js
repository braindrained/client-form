// @flow
import React from 'react';
import { camelToTitle, sumClasses } from '../../helpers/utils';

const FieldLabel = (props: Object) => {
	const { label, name, isRequired, isValid } = props;

	return (
		<label htmlFor={name} className={sumClasses(['noselect', label && label.className])} style={Object.assign({}, label && label.style ? label.style : {}, isValid === false ? { color: '#e4002b' } : {})}>
			{camelToTitle(label && label.text, name)} { isRequired ? '*' : null }
			{label && label.object ? label.object : null}
		</label>
	);

};

export default FieldLabel;
