// @flow
import { createElement, forwardRef, useState, memo } from 'react';
import ClickOutHandler from 'react-onclickout';
import FieldLabel from '../common/FieldLabel';
import FieldError from '../common/FieldError';
import { sumClasses } from '../../helpers/utils';
import Select from './select';

const el = createElement;

const FakeSelect = memo((props: Object) => {
	const { className, style, label, text, firstRange, secondRange, rangesStyle, isRequired, name, errorMessage, overlayBg, innerRef, onUpdate, value: propsValue, isValid } = props;
	const [value, setValue] = useState(propsValue);
	const [displaySelect, setDisplaySelect] = useState(true);
	const maxRange = value.min === '' ? 
		secondRange
		: 
		secondRange.filter(o => o.value > value.min || o.value === '');

	const handleOnClick = (val: boolean) => {
		if (val !== displaySelect) {
			setDisplaySelect(val);
		}
	}

	const handleOnChange = (event: Object) => {
		const val = {
			min: event.target.name === 'min' ? event.target.value : value.min,
			max: event.target.name === 'max' ? event.target.value : value.max
		};
		setValue(val);
		onUpdate({
			target: {
				name: name,
				value: val
			}
		});
	}

	return el('div', { className: sumClasses(['container-field', className]), style },
		el(FieldLabel, { label, name, isRequired, isValid }),
		el(ClickOutHandler, { onClickOut: () => handleOnClick(true), style: { maxHeight: 57 } },
			el('div', {
				ref: innerRef,
				className: 'select-style noselect',
				onClick: () => handleOnClick(false),
				style: { zIndex: displaySelect ? 1 : 0, paddingLeft: 8 },
				tabIndex: 0
			},
			value.min !== '' && value.max !== '' ?
				`${value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')} -
				${value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
				:
				value.min !== '' && value.max === '' ?
					`da ${value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
					:
					value.min === '' && value.max !== '' ?
						`fino a ${value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
						:
						text,
			el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
				el('polyline', { fill: 'none', points: '6,9 12,15 18,9', style: { fill: 'none', stroke: '#d8d8df', strokeWidth: 1 } }))),
			el(FieldError, { isValid, errorMessage }),
			el('div', { 
				className: 'fake-cont box-shadow', 
				style: { width: style.maxWidth, opacity: displaySelect ? '0' : '1', zIndex: displaySelect ? -1 : 1, background: overlayBg } 
			},
				el(Select, {
					rangesStyle,
					selectName: 'min', 
					value: value.min, 
					options: firstRange, 
					handleOnChange, 
				}),
				el('div', { className: 'clear' }),
				el(Select, {
					rangesStyle,
					selectName: 'max', 
					value: value.max, 
					options: maxRange, 
					handleOnChange, 
				})
			)
		)
	);
}, (prevProps, nextProps) => 
	prevProps.innerRef !== nextProps.innerRef || prevProps.value !== nextProps.value ? false : true
);

export default forwardRef((props, ref) =>
	el(FakeSelect, { innerRef: ref, ...props })
);
