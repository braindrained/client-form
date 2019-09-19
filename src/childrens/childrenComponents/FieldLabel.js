// @flow
import { createElement } from 'react';
import { camelToTitle, sumClasses } from '../../helpers/utils';

const el = createElement;

// flow-disable-next-line
const FieldLabel = ({ label, name, isRequired, isValid, labelId }) => el('label', {
	id: labelId,
	htmlFor: name,
	className: sumClasses(['noselect', label && label.className, isValid === false ? 'label-error' : '']),
	style: Object.assign({}, label && label.style ? label.style : {}),
	'aria-label': `${camelToTitle(label && label.text, name) + (isRequired ? ' *' : '')}`
},
`${camelToTitle(label && label.text, name) + (isRequired ? ' *' : '')}`,
label && label.object ? label.object : null);

export default FieldLabel;
