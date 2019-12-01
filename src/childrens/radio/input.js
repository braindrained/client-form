// @flow
import { createElement } from 'react';

const el = createElement;

const Input = props => {
    const { name, item, value, onUpdate, getValue } = props;

	const onChange = (event: Object) => {
		const { value } = event.target;
		const checkValue = getValue(value);
		onUpdate({ target: { name, value: checkValue } });
	}

    return el('input', {
        type: 'radio',
        name,
        id: name + item.value,
        value: item.value,
        disabled: item.disabled === true,
        checked: item.value === value,
        onChange: e => onChange(e),
        tabIndex: -1,
        'aria-labelledby': `label_${name}_${item.value}`,
        ...(item.value === value ? { 'aria-checked': true } : { 'aria-checked': false })
    })
}

export default Input;