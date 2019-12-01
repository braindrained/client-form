// @flow
import { Component, createElement, forwardRef, createRef, useState, memo } from 'react';
import { sumClasses } from '../../helpers/utils';
import FieldLabel from '../common/FieldLabel';
import FieldError from '../common/FieldError';

const el = createElement;

const TextareaWithTab = memo((props: Object) => {
	const { className, style, name, isValid, value, limitChar, errorMessage, label, isRequired, innerRef, onUpdate } = props;
	const [stateValue, setStateValue] = useState(value);
	const [selected, setSelected] = useState(0);

	const onChange = (event: Object) => {
		const formObject = [];
		stateValue.map(item => {
			if (item.name === event.target.name) {
				item.value = event.target.value.replace(/<(?:.|\n)*?>/gm, '').replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/, '').substring(0, limitChar);
			}
			formObject.push(item);
			return null;
		});
		setStateValue(formObject);
		onUpdate({
			target: {
				name,
				value: formObject,
			}
		});
	}

	const selectTab = (wich: number) => {
		setSelected(wich);
	}

	return el('div', { ref: innerRef, className: sumClasses(['container-field', className]), style },
		el(FieldLabel, { label, name, isRequired, isValid }),
		el('div', { className: 'container-field-tabs', id: name },
			stateValue.map((item, i) => (
				el('div', {
					key: item.name,
					style: {
						borderRadius: i === 0 ? '2px 0px 0px 0px' : i === 4 ? '0px 2px 0px 0px' : '0px',
						textAlign: 'left',
					},
					className: selected === i ? 'container-field-tabs-item container-field-tabs-item-selected' : 'container-field-tabs-item',
					onClick: () => selectTab(i),
					role: 'button'
				},
					el('label', { className: 'noselect', htmlFor: item.name },
						el('span', { className: 'tab-label' }, item.label),
						el('span', { className: 'tab-abbr' }, item.abbr)
					)
				)
			))
		),
		stateValue.map((item, i) => {
			let itemRef = item.name;
			itemRef = createRef();
			return el('div', {
				key: item.name, 
				style: { width: '100%', float: 'left', display: selected === i ? 'inline-block' : 'none', position: 'relative' } 
			},
				el('div', {},
					el('textarea', {
						placeholder: value[i].placeholder,
						className: sumClasses(['large-field', !isValid ? 'input-error' : 'textarea-tab']),
						name: item.name,
						id: item.name,
						onChange: e => onChange(e),
						value: item.value,
						style: {
							borderRadius: '0px 2px 2px',
							height: 200,
							resize: 'none',
						},
						rows: 2,
						cols: 20,
						ref: itemRef
					})
				),
				limitChar ? el('div', { className: 'limit-char noselect' }, `${item.value.length}/${limitChar}`) : null
			)
		}),
		el(FieldError, { isValid, errorMessage, style: limitChar ? { paddingRight: 60 } : {} })
	);
}, (prevProps, nextProps) => 
	prevProps.innerRef !== nextProps.innerRef ||
	prevProps.value !== nextProps.value ||
	prevProps.isValid !== nextProps.isValid ? false : true
);

export default forwardRef((props, ref) =>
	el(TextareaWithTab, { innerRef: ref, ...props })
);
