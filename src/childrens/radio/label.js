// @flow
import { createElement } from 'react';

const el = createElement;

const Label = props => {
    const { name, item, hideRadio, i, onUpdate, value, getValue, currentIndex, options } = props;

	const handleKeyDown = (e: Object, item: Object) => {
		const keyCode = e.which || e.keyCode;

		if (keyCode !== 9 && (keyCode === 13 || keyCode === 32 || keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40)) {
			e.preventDefault();
			const { value } = item;
			let checkValue = getValue(value);
			let newIndex = 0;
			let newValue = value;
			let disabled = false;

			switch (keyCode) {
				case 13:
				case 32:
					onUpdate({ target: { name, value: checkValue } });
					break;
				case 37:
				case 38:
					newIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
					newValue = options[newIndex].value;
					disabled = options[newIndex].disabled;
					if (disabled) break;
					checkValue = getValue(newValue);
					onUpdate({ target: { name, value: checkValue } });
					break;
				case 39:
				case 40:
					newIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
					newValue = options[newIndex].value;
					disabled = options[newIndex].disabled;
					if (disabled) break;
					checkValue = getValue(newValue);
					onUpdate({ target: { name, value: checkValue } });
					break;
				default:
					break;
			}
		}
    }

    return el('label', {
        id: `label_${name}_${item.value}`,
        htmlFor: name + item.value,
        style: item.labelStyle ? item.labelStyle : {},
        onKeyDown: e => handleKeyDown(e, item),
        tabIndex: i === 0 ? 0 : -1,
    },
        hideRadio ?
            null
            :
            el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
                el('circle', { className: 'ext', cx: 12, cy: 12, r: 9, stroke: '#96a1b0', strokeWidth: 1 }),
                item.value === value ? el('circle', { className: 'int', cx: 12, cy: 12, r: 4 }) : null),
        el('div', null, item.label), item.customObject ? item.customObject : null
    );
}

export default Label;