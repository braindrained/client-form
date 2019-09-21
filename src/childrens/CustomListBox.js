import { Component, createElement, forwardRef, createRef } from 'react';
import ReactDOM from "react-dom";
import ClickOutHandler from 'react-onclickout';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

const el = createElement;

class CustomListBox extends Component<any, any> {

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

	handleButtonClick(e, val) {
		if (this.state.listClassName === '') val = 'hidden';
		this.setState({ listClassName: val, addButtonProps: val === '' ? { 'aria-expanded': 'true' } : {} }, () => {
			try {
				this.adjustHeight();
			} catch (e) {
				console.log('error', e);
			}
		});
	}

	adjustHeight() {
		const { innerRef: { current: { offsetParent } }, minEl, options, name } = this.props;
		const { top, height } = offsetParent.getBoundingClientRect();

		const listbox = this.listbox.current;
		const firstChildHeight = listbox.firstChild.offsetHeight;
		const maxHeight = ((minEl ? minEl : options.length) * firstChildHeight) + 16;

		if (maxHeight > (window.innerHeight - (top + height))) {
			this.setState({ listboxStyle: { style: { maxHeight, top: `${-maxHeight + 22}px` } } })
		} else {
			this.setState({ listboxStyle: { style: { maxHeight } } })
		}
	}

  handleClickOut(val) {
    if (this.state.listClassName === '') val = 'hidden';
		this.setState({ listClassName: val, addButtonProps: val === '' ? { 'aria-expanded': 'true' } : {} });
  }

	handleButtonKeyDown(e) {
		const keyCode = e.which || e.keyCode;
    let currentItem = null;
    const { name, onUpdate } = this.props;
    const { options, currentSelection, currentIndex, listClassName } = this.state;

		if (keyCode !== 9) {
			e.preventDefault();

			if (listClassName === 'hidden') {
				this.setState({ listClassName: '', addButtonProps: { 'aria-expanded': 'true' } }, () => {
					this.adjustHeight();
				});
			}

			switch (keyCode) {
				case 32:
				case 13:
					const selected = options[currentIndex];
					this.setSelected(currentIndex);
					this.setState({
						currentSelection: selected,
						listClassName: listClassName === '' ? 'hidden' : '',
						addButtonProps: {}
					});
					onUpdate({ target: { name: name, value: selected.value } });
					break;
				case 27:
					this.setSelected(options.findIndex(o => o.value === currentSelection.value));
					this.setState({
						listClassName: listClassName === '' ? 'hidden' : '',
						addButtonProps: {}
					});
					break;
				case 35:
					this.scrollOnFocus(options[options.length - 1], options.length - 1);
					this.setState({ currentIndex: options.length - 1 });
					break;
				case 36:
					this.scrollOnFocus(options[0], 0);
					this.setState({ currentIndex: 0 });
					break;
				case 38:
					if (currentIndex === 0) break;

					currentItem = options[currentIndex - 1];
					this.scrollOnFocus(currentItem, currentIndex - 1);
					this.setState({ currentIndex: currentIndex - 1 });
					break;
				case 40:
					if (currentIndex === options.length - 1) break;

					currentItem = options[currentIndex + 1];
					this.scrollOnFocus(currentItem, currentIndex + 1);
					this.setState({ currentIndex: currentIndex + 1 });
					break;
				default:
					break;
			}
		} else {
      this.setSelected(options.findIndex(o => o.value === currentSelection.value));
      this.setState({
        listClassName: 'hidden',
        addButtonProps: {}
      });
    }
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
		this.setState({ currentSelection: item, listClassName: 'hidden', addButtonProps: {}, currentIndex: options.findIndex(o => o.value === item.value) });
		onUpdate({ target: { name: name, value: item.value } });
	}

	render() {
		const { className, style, isRequired, errorMessage, name, value, isValid, disabled, innerRef } = this.props;
		const { listClassName, options, addButtonProps, label, currentSelection, currentIndex, listboxStyle } = this.state;
		const ariaDisabled = { 'aria-disabled': 'true' };
    const labelId = `lb_label_${name}`;
    const buttonId = `lb_button_${name}`;
    const listId = `lb_list_${name}`;
		this['listbox'] = createRef();

		return el('div', { className: sumClasses(['container-field listbox', className]), style },
			el(ClickOutHandler, { onClickOut: () => this.handleClickOut('hidden') },
				el(FieldLabel, { label, name: buttonId, isRequired, isValid, labelId }),
				el('div', { className: 'exp_wrapper' },
					el('button', {
            name: buttonId,
						ref: innerRef,
						onClick: (e) => this.handleButtonClick(e, ''),
						onKeyDown: (e) => this.handleButtonKeyDown(e),
						'aria-haspopup': 'listbox',
						'aria-labelledby': sumClasses([buttonId, labelId]),
						id: buttonId,
						className: !isValid ? 'input-error' : '',
						disabled,
						...addButtonProps,
						...(disabled ? ariaDisabled : {})
					},
						currentSelection.label,
						el('svg', { width: '24', height: '24', viewBox: '0 0 24 24' },
							el('rect', { fill: 'transparent', width: 24, height: 24, x: 0, y: 0 }),
							el('polyline', { fill: 'none', points: '6,9 12,15 18,9', style: { fill: 'none', stroke: '#d8d8df', strokeWidth: 1 } }))
					),
					el('ul', {
						ref: this['listbox'],
						id: listId,
						tabIndex: '-1',
						role: 'listbox',
						'aria-labelledby': labelId,
						className: sumClasses(['box-shadow', listClassName]),
            ...(options.length > 0 ? { 'aria-activedescendant': `exp_elem_${name}_${options[currentIndex].value}` } : {}),
						...listboxStyle
					},
						options.map((item, i) => {
							this[`exp_elem_${name}_${item.value}`] = createRef();
							return el('li', {
								ref: this[`exp_elem_${name}_${item.value}`],
								key: `exp_elem_${name}_${item.value}`,
								id: `exp_elem_${name}_${item.value}`,
								role: 'option',
								onClick: (e) => this.handleItemClick(item, e),
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
				),
				el(FieldError, { isValid, errorMessage })
			)
		)
	}

}

export default forwardRef((props, ref) =>
	el(CustomListBox, { innerRef: ref, ...props })
);
