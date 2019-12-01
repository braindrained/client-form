// @flow
import { createElement, createRef } from 'react';

const el = createElement;

const List = (props: Object) => {
    const {
        listId, labelId, listClassName, options,
        name, currentIndex, listboxStyle, handleItemClick,
        sumClasses, currentSelection, listref, that
    } = props;

    return el('ul', {
        ref: listref,
        id: listId,
        tabIndex: -1,
        role: 'listbox',
        'aria-labelledby': labelId,
        className: sumClasses(['listbox-box-shadow', listClassName]),
        ...(options.length > 0 ? { 'aria-activedescendant': `exp_elem_${name}_${options[currentIndex].value}` } : {}),
        ...listboxStyle
    },
        options.map((item, i) => {
            that[`exp_elem_${name}_${item.value}`] = createRef();
            return el('li', {
                ref: that[`exp_elem_${name}_${item.value}`],
                key: `exp_elem_${name}_${item.value}`,
                id: `exp_elem_${name}_${item.value}`,
                role: 'option',
                onClick: () => handleItemClick(item),
                className: sumClasses([
                    i === currentIndex ? 'focused' : '',
                    currentSelection.value === item.value ? 'selected' : '',
                    item.addLabel ? 'whith-label' : '']
                ),
                ...(currentSelection.value === item.value ? { 'aria-selected': 'true' } : {})
            },
                el('span', {}, item.label),
                item.addLabel ? el('div', { className: 'add-label' }, item.addLabel) : null
            )
        })
    )
}

export default List;