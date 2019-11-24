// @flow
import { createElement, useState, useEffect } from 'react';

const el = createElement;

const Button = (props: Object) => {
    const {
        buttonId, 
        labelId,
        innerRef, 
        defaultProps, 
        disabled, 
        adjustHeight, 
        name, 
        onUpdate, 
        options, 
        currentSelection, 
        currentIndex,
        setSelected,
        setCurrentSelection,
        setCurrentIndex,
        setListClassName,
        scrollOnFocus,
        sumClasses,
        isValid,
        value,
        listClassName,
        addButtonProps
    } = props;
    const [stateAddButtonProps, setAddButtonProps] = useState(addButtonProps);

    useEffect(() => {
        adjustHeight();
    }, [stateAddButtonProps]);

	const handleButtonClick = (e, val) => {
        if (listClassName === '') val = 'hidden';
        setListClassName(val);
        setAddButtonProps(val === '' ? { 'aria-expanded': 'true' } : {});
	}

	const handleButtonKeyDown = e => {
		const keyCode = e.which || e.keyCode;
		let currentItem = null;
		const handledKeys = [13, 27, 32, 35, 36, 38, 40];

		if (handledKeys.indexOf(keyCode) !== -1) {
			e.preventDefault();

			if (listClassName === 'hidden') {
                setListClassName('');
                setAddButtonProps({ 'aria-expanded': 'true' });
                adjustHeight();
			}

			switch (keyCode) {
				case 32:
				case 13:
                    const selected = options[currentIndex];
                    setSelected(currentIndex);
                    setCurrentSelection(selected);
                    setListClassName(listClassName === '' ? 'hidden' : '');
                    setAddButtonProps(listClassName === '' ? { 'aria-expanded': 'true' } : {});
                    console.log('13')
					onUpdate({ target: { name: name, value: selected.value } });
					break;
				case 27:
					setSelected(options.findIndex(o => o.value === currentSelection.value));
                    setListClassName(listClassName === '' ? 'hidden' : '');
                    setAddButtonProps(listClassName === '' ? { 'aria-expanded': 'true' } : {});
					break;
				case 35:
					scrollOnFocus(options[options.length - 1], options.length - 1);
					setCurrentIndex(options.length - 1);
					break;
				case 36:
					scrollOnFocus(options[0], 0);
					setCurrentIndex({ currentIndex: 0 });
					break;
				case 38:
					if (currentIndex === 0) {
						currentItem = options[options.length - 1];
						scrollOnFocus(currentItem, options.length - 1);
						setCurrentIndex(options.length - 1);
						break;
					}

					currentItem = options[currentIndex - 1];
					scrollOnFocus(currentItem, currentIndex - 1);
					setCurrentIndex(currentIndex - 1);
					break;
				case 40:
					if (currentIndex === options.length - 1) {
						currentItem = options[0];
						scrollOnFocus(currentItem, 0);
						setCurrentIndex(0);
						break;
					}

					currentItem = options[currentIndex + 1];
					scrollOnFocus(currentItem, currentIndex + 1);
					setCurrentIndex(currentIndex + 1);
					break;
				default:
					break;
			}
		} else {
            setSelected(options.findIndex(o => o.value === currentSelection.value));
            setListClassName('hidden');
            setAddButtonProps({});
		}
	}

    return el('button', {
        name: buttonId,
        ref: innerRef,
        onClick: e => handleButtonClick(e, ''),
        onKeyDown: e => handleButtonKeyDown(e),
        'aria-haspopup': 'listbox',
        'aria-labelledby': sumClasses([buttonId, labelId]),
        id: buttonId,
        className: sumClasses([!isValid ? 'input-error' : '', value === defaultProps ? 'input-default' : '']),
        disabled,
        ...stateAddButtonProps,
        ...(disabled ? { 'aria-disabled': 'true' } : {})
    },
        currentSelection.label,
        el('svg', { width: '24', height: '24', viewBox: '0 0 24 24' },
            el('rect', { fill: 'transparent', width: 24, height: 24, x: 0, y: 0 }),
            el('polyline', { fill: 'none', points: '6,9 12,15 18,9', style: { fill: 'none', stroke: '#96a1b0', strokeWidth: 1 } })
        )
    );
};

export default Button;