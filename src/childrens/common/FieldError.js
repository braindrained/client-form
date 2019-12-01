// @flow
import { createElement } from 'react';

const el = createElement;

// flow-disable-next-line
const FieldError = ({ isValid, errorMessage, style }) => el('div',
	{ className: 'validation-error noselect', style },
	` ${isValid === false ? errorMessage : ''}`);

export default FieldError;
