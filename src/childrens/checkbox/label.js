// @flow
import { createElement } from 'react';

const el = createElement;

const Label = props => {
    const { name, label, svgProps, forFalse, forTrue, value, camelToTitle, labelId, onUpdate } = props;

	const handleKeyDown = (e: Object) => {
		switch (e.keyCode) {
			case 13:
			case 32:
			case 37:
			case 39:
				e.preventDefault();
				onUpdate({ target: { name, value: !value } });
				break;
			default:
				break;
		}
	}

    return el('label', {
        tabIndex: 0,
        id: labelId,
        htmlFor: name,
        style: label && label.style,
        'aria-label': camelToTitle(label && label.text, name),
        onKeyDown: e => handleKeyDown(e)
    },
        el('svg', { ...svgProps, 'aria-labelledby': labelId }, value !== true ? forFalse : forTrue),
        el('div', {}, camelToTitle(label && label.text, name))
    )
}

export default Label;