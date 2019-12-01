// @flow
import { createElement } from 'react';

const el = createElement;

const Input = props => {
    const { name, innerRef, value, labelId, onUpdate } = props;

	const onChange = (event: Object) => {
		onUpdate({ target: { name, value: event.target.checked } });
		innerRef.current.labels[0].blur();
	}

    return el('input', {
        ref: innerRef,
        type: 'checkbox',
        name,
        id: name,
        checked: value,
        tabIndex: -1,
        onChange: e => onChange(e),
        'aria-labelledby': labelId
    });
}

export default Input;