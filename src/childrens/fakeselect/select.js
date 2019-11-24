// @flow
import { createElement, Fragment } from 'react';

const el = createElement;

const Select = props => {
    const { rangesStyle, selectName, value, options, handleOnChange } = props;

    return el(Fragment, {},
        el('label', { className: 'min-max', htmlFor: selectName }, selectName),
        el('div', {
            className: 'select-style', 
            style: {
                ...rangesStyle, 
                marginBottom: 10, 
                float: 'right'
            }
        },
            el('select', {
                name: selectName, 
                id: selectName, 
                value, 
                onChange: e => handleOnChange(e)
            },
                options.map(item => 
                    el('option', { 
                        value: item.value, 
                        key: `f_${item.value}` 
                    }, item.text)
                )
            ),
            el('svg', {
                width: 24,
                height: 24,
                viewBox: '0 0 24 24'
            },
                el('polyline', {
                    fill: 'none',
                    points: '6,9 12,15 18,9',
                    style: { fill: 'none', stroke: '#d8d8df', strokeWidth: 1 }
                })
            )
        )
    );
}

export default Select;