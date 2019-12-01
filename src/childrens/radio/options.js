// @flow
import { createElement } from 'react';
import Label from './label';
import Input from './input';

const el = createElement;

const Options = props => {
    const { name, options, value, hideRadio, onUpdate, getValue, currentIndex, sumClasses } = props;

    return el('div', { className: 'float-container', id: name },
        options.map((item, i) => {
            return el('div', {
                key: `select_${item.name}_${item.value}`,
                className: hideRadio && item.value === value ?
                    `floating ${item.className} ${item.selectedClassName ? item.selectedClassName : 'selected-radio'}`
                    :
                    hideRadio ?
                        `floating ${item.className}`
                        :
                        `${sumClasses([item.className, item.value === value ? item.selectedClassName : ''])}`,
                style: item.style
            },
                el(Input, { name, item, value, onUpdate, getValue }),
                el(Label, { name, item, hideRadio, i, onUpdate, value, getValue, currentIndex, options })
            )}
        )
    );
}

export default Options;