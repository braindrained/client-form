import { Component, createElement, forwardRef, createRef } from 'react';
import ReactDOM from "react-dom";
import ClickOutHandler from 'react-onclickout';
import FieldLabel from '../common/FieldLabel';
import FieldError from '../common/FieldError';
import { sumClasses } from '../../helpers/utils';
import Button from './button';
import List from './list';

const el = createElement;

class ListBox extends Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { label, options, value } = this.props;
		if (label) label.className = sumClasses(['exp_elem', label.className]);

		this.state = {
			label: label,
			options: options,
			listClassName: 'hidden',
			currentSelection: options.length > 0 ? (value ? options.filter(o => o.value === value)[0] : options.filter(o => o.value === this.props.default)[0]) : {},
			currentIndex: options.length > 0 ? (value ? options.findIndex(o => o.value === value) : 0) : 0,
			listboxStyle: {}
		};
	}

	componentDidUpdate(prevProps) {
		const { options } = this.props;
		if (JSON.stringify(prevProps.options) !== JSON.stringify(options)) this.setState({ options, currentIndex: 0, currentSelection: options[0] });
	}

	adjustHeight() {
		const {
			innerRef: {
				current: { offsetParent }
			},
			minEl,
			options,
			innerRef
		} = this.props;
		const { top, height } = offsetParent.getBoundingClientRect();
		const firstChildHeight = this.listbox.current.firstChild.offsetHeight;
		const maxHeight = ((minEl ? minEl : options.length) * firstChildHeight) + 18;

		if (maxHeight > (window.innerHeight - (top + height))) {
			this.setState({
				listboxStyle: {
					style: {
						maxHeight,
						top: `${-maxHeight + 25}px`,
						boxShadow: '0px -1px 4px 0px #96a1b0',
						borderRadius: '3px 3px 0 0'
					}
				}
			})
		} else {
			this.setState({
				listboxStyle: {
					style: {
						maxHeight,
						top: `${innerRef.current.offsetHeight + 24}px`,
						borderRadius: '0 0 3px 3px'
					}
				}
			})
		}
	}

	handleClickOut(val) {
		if (this.state.listClassName === '') val = 'hidden';
		this.setState({ 
			listClassName: val, 
			addButtonProps: val === '' ? { 'aria-expanded': 'true' } : {} 
		});
	}

	scrollOnFocus(item, newIndex) {
    	const { name } = this.props;
		const { options } = this.state;
		const listbox = this.listbox.current;
		const element = this[`exp_elem_${name}_${item.value}`].current;

		if (listbox.scrollHeight > listbox.clientHeight) {
			var scrollBottom = listbox.clientHeight + listbox.scrollTop;
			var elementBottom = element.offsetTop + element.offsetHeight;
			if (elementBottom > scrollBottom) {
				listbox.scrollTop = elementBottom - listbox.clientHeight;
			} else if (element.offsetTop < listbox.scrollTop) {
				listbox.scrollTop = element.offsetTop;
			}
		}

		this.setSelected(newIndex);
	}

	setSelected(index) {
    	const { name } = this.props;
		const { options } = this.state;

		for (var i = 0; i < options.length; i++) {
			if (i === index) {
				this[`exp_elem_${name}_${options[i].value}`].current.setAttribute('aria-selected', 'true');
			} else {
				this[`exp_elem_${name}_${options[i].value}`].current.removeAttribute('aria-selected');
			}
		}
	}

	handleItemClick(item) {
		const { name, onUpdate } = this.props;
		const { options } = this.state;
		this.setState({ 
			currentSelection: item, 
			listClassName: 'hidden', 
			addButtonProps: {}, 
			currentIndex: options.findIndex(o => o.value === item.value) 
		});
		onUpdate({ target: { name: name, value: item.value } });
	}

	setCurrentSelection(currentSelection) {
		this.setState({ currentSelection });
	}

	setCurrentIndex(currentIndex) {
		this.setState({ currentIndex });
	}

	setListClassName(listClassName) {
		this.setState({ listClassName });
	}

	setButtonProps(val) {
		this.setState({
			addButtonProps: val
		});
	}

	render() {
		const { 
			className, 
			style, 
			isRequired, 
			errorMessage, 
			name, 
			value, 
			isValid, 
			disabled, 
			innerRef,
			default: defaultProps,
			onUpdate
		} = this.props;
		const { 
			listClassName, 
			options, 
			label, 
			currentSelection, 
			currentIndex, 
			listboxStyle,
			addButtonProps
		} = this.state;
		const labelId = `lb_label_${name}`;
		const buttonId = `lb_button_${name}`;
		const listId = `lb_list_${name}`;
		this['listbox'] = createRef();

		return el('div', { className: sumClasses(['container-field listbox', className]), style },
			el(ClickOutHandler, { onClickOut: () => this.handleClickOut('hidden') },
				el(FieldLabel, { label, name: buttonId, isRequired, isValid, labelId }),
				el('div', { className: 'exp_wrapper' },
					el(Button, {
						buttonId, 
						labelId,
						innerRef, 
						defaultProps, 
						disabled, 
						adjustHeight: () => this.adjustHeight(),
						name, 
						onUpdate, 
						options, 
						currentSelection, 
						currentIndex,
						setSelected: e => this.setSelected(e),
						setCurrentSelection: e => this.setCurrentSelection(e),
						setCurrentIndex: e => this.setCurrentIndex(e),
						setListClassName: e => this.setListClassName(e),
						scrollOnFocus: (a, b) => this.scrollOnFocus(a, b),
						setButtonProps: e => this.setButtonProps(e),
						sumClasses,
						isValid,
						value,
						listClassName,
						addButtonProps
					}),
					el(List, {
						listId, 
						labelId, 
						listClassName, 
						options,
						name, 
						currentIndex, 
						listboxStyle, 
						handleItemClick: e => this.handleItemClick(e),
						sumClasses, 
						currentSelection,
						listref: this['listbox'],
						that: this,
						
					}),
					
				),
				el(FieldError, { isValid, errorMessage })
			)
		)
	}

}

export default forwardRef((props, ref) =>
	el(ListBox, { innerRef: ref, ...props })
);
