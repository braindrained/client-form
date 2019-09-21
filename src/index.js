// @flow
import { Component, createElement, createRef } from 'react';
import ClickOutHandler from 'react-onclickout';

import CustomTextField from './childrens/CustomTextField';
import CustomTextarea from './childrens/CustomTextarea';
import CustomCheckBox from './childrens/CustomCheckBox';
import CustomSelect from './childrens/CustomSelect';
import CustomRadio from './childrens/CustomRadio';
import CustomLabel from './childrens/CustomLabel';
import CustomTextAreaTab from './childrens/CustomTextAreaTab';
import CustomPlusMinus from './childrens/CustomPlusMinus';
import FakeSelect from './childrens/FakeSelect';
import AutoSuggest from './childrens/AutoSuggest';
import CustomListBox from './childrens/CustomListBox';

import { sumClasses, hideField, optionsIf, output, findFirstRequired, valuesOf, merge } from './helpers/utils';
import './styles/index.scss';

const el = createElement;
const View = (props: Object) => el('div', props);

export default class Form extends Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { controls } = this.props;

		const updatedControls = controls.map(item => {
			item.isValid = true;
			if (typeof item.valueOf === 'object') item = valuesOf(item, controls);
			if (typeof item.optionIf === 'object') item.options = optionsIf(item, controls, { target: { name: item.name } });
			if (typeof item.hideIf === 'object' && !item.hide) item.hide = hideField(item, controls);
			if (typeof item.hideIf === 'object' && item.hide && item.control !== 'external') item.value = item.default;
			//item.ref = this[name] = createRef();
			this[item.name] = createRef();
			return item;
		});

		this.state = {
			controls: updatedControls,
			succeed: null,
			isSent: null,
			disableButton: false
		};
	}

	componentDidMount

	async onUpdate(e: Object) {
		const { controls } = this.state;

		let updatedControls = controls.map(item => {
			if (e.target.name === item.name) {
				item.isValid = true;
				item.value = e.target.value;
			} else {
				if (item.label && typeof item.label.changeIf === 'object') {
					item.label.changeIf.map(v => {
						const control = this.state.controls.filter(o => o.name === v.field);
						if (control.length > 0) {
							if (item.control !== 'label' && control[0].value) item.label.text = control[0].value.toString().match(v.regEx) != null ? v.ifTrue : v.ifFalse;
							if (item.control === 'label' && control[0].value) item.content = control[0].value.toString().match(v.regEx) != null ? v.ifTrue : v.ifFalse;
						}
						return null;
					});
				}
				if (typeof item.changeStyleIf === 'object') {
					item.changeStyleIf.map(v => {
						const control = this.state.controls.filter(o => o.name === v.field);
						if (control.length > 0 && control[0].value !== undefined) {
							if (control[0].value.toString().match(v.regEx) !== null) {
								item.style = v.altStyle;
							} else {
								item.style = v.style;
							}
						}
						return null;
					});
				}
				if (typeof item.optionIf === 'object') item.options = optionsIf(item, controls, { target: { name: item.name } });
			}
			return item;
		});

		updatedControls = updatedControls.map(item => {
			item.hide = typeof item.hideIf === 'object' ? hideField(item, updatedControls) : item.hide;
			if (typeof item.hideIf === 'object' && item.hide && item.control !== 'external') item.value = item.default;
			return item;
		});

		updatedControls = updatedControls.map(item => {
			if (typeof item.valueOf === 'object') item = valuesOf(item, updatedControls);
			return item;
		});

		if (this.props.updateOnChange) {
			if (this.props.updateOnChangeWithValidation) {
				this.formIsValid();
			} else {
				const { excludeHidden, updateOnChange } = this.props;
				const formObject = output(updatedControls, excludeHidden);
				const response = await updateOnChange(e, formObject, updatedControls);
				if (response) {
					updatedControls = response;
				}
			}
		}

		this.setState({
			controls: updatedControls
		});
	}

	formIsValid() {
		let formIsValid = true;
		const { controls } = this.state;

		const validatedControls = controls.map(item => {
			item.isValid = true;
			item.hide = item.hide ? item.hide : typeof item.hideIf === 'object' ? hideField(item, controls) : false;
			if (typeof item.optionIf === 'object') item.options = optionsIf(item, controls, { target: { name: item.name } });
			if (item.isRequired && !item.hide) {
				if (item.control !== 'select' && item.control !== 'listbox' && item.control !== 'autosuggest' && (item.value === '' || !item.value)) {
					item.isValid = false;
					formIsValid = false;
				} else if ((item.control === 'select' || item.control === 'listbox') && (item.value === '0' || item.value === 0 || item.value === '' || item.value === ' ')) {
					item.isValid = false;
					formIsValid = false;
				} else if (item.control === 'autosuggest' && (!item.value || (item.value && (item.value.displayValue === '' || !item.value.displayValue)))) {
					item.isValid = false;
					formIsValid = false;
				}
			}
			if (typeof item.value === 'object' && item.valueAsObject && !item.hide) {
				if (item.value && item.value.filter(o => o.isRequired === true).length > 0) {
					const updatedValues = item.value.map(itemS => {
						if (itemS.isRequired) {
							if (itemS.value === '' || !itemS.value) {
								itemS.isValid = false;
								item.isValid = false;
								formIsValid = false;
							}
						}
						return itemS;
					});
					item.value = updatedValues;
				}
			}
			if (typeof item.value === 'object' && item.requiredKey && !item.hide) {
				if (item.value[item.requiredKey] === '') {
					item.isValid = false;
					formIsValid = false;
				}
			}
			if (item.regEx !== undefined && !item.hide) {
				if (!item.regEx.test(item.value)) {
					item.isValid = false;
					formIsValid = false;
				}
			}
			if (item.equalTo !== undefined && !item.hide) {
				const valueToCompare = this.state.controls.filter(o => o.name === item.equalTo)[0].value;
				if (!(item.value === valueToCompare) || item.value === '') {
					item.isValid = false;
					formIsValid = false;
				}
			}
			if (item.greaterThan !== undefined && !item.hide) {
				const valueToCompare = this.state.controls.filter(o => o.name === item.greaterThan)[0].value;
				if (parseFloat(item.value.toString().replace(/\./g, '')) < parseFloat(valueToCompare.toString().replace(/\./g, ''))) {
					item.isValid = false;
					formIsValid = false;
				}
			}
			return item;
		});
		const updatedControls = merge(controls, validatedControls, 'isValid');

		this.setState({
			controls: updatedControls
		});

		if (formIsValid) {
			const { excludeHidden } = this.props;
			const formObject = output(updatedControls, excludeHidden);

			this.setState({ isSent: true });
			this.props.sendForm(formObject).then(x => {
				this.setState({ isSent: false, succeed: x.succeed, message: x.message });
			}).catch(x => {
				this.setState({ isSent: false, succeed: x.succeed, message: x.message });
			});
		} else {
			const toBeValidateFilter = o => !o.hide &&
				o.type !== 'hidden' &&
				(
					(o.isRequired && o.isValid === false) ||
					(o.greaterThan && o.isValid === false) ||
					(o.regEx && o.isValid === false) ||
					(o.equalTo && o.isValid === false) ||
					(
						typeof o.value === 'object' && o.isValid === false && o.control !== 'autosuggest' && !o.requiredKey &&
						(
							o.value.filter(e => e.isRequired && e.isValid === false)
						)
					)
					||
					(
						o.control === 'external' && o.isValid === false && !o.requiredKey &&
						(
							o.value.filter(e => e.isRequired && e.isValid === false)
						)
					)
				);
			const firstRequired = updatedControls.filter(o => toBeValidateFilter(o))[0];
			if (firstRequired && typeof firstRequired.value === 'object' && firstRequired.control !== 'autosuggest' && !firstRequired.requiredKey) {
				const firstRequiredChild = firstRequired.value.filter(o => toBeValidateFilter(o))[0];
				findFirstRequired(this[firstRequired.name].current, firstRequiredChild.name);
			} else {
				this[firstRequired.name].current.focus();
			}
		}
	}

	resetButton() {
		if (this.state.succeed !== null) {
			this.setState({
				succeed: null,
				isSent: null,
			});
		}
	}

	render() {
		const { formClassName, formStyle, sendButton, beforeButton, buttonContainerStyle, afterButton } = this.props;
		const { controls, succeed, isSent, message, disableButton } = this.state;
		const sendButtonClass = sumClasses([
			succeed !== null ? (succeed ? 'btn btn-succeed' : 'btn btn-red') : (isSent ? 'btn btn-sent' : 'btn'),
			sendButton && sendButton.disabled ? 'btn-grey' : ''
		]);
		const { hideIfSent } = sendButton !== undefined ? sendButton : {};
		const sendButtonValue = sendButton ? (succeed === null ? (hideIfSent && isSent ? null : sendButton.text) : message) : null;

		return el(View, { className: sumClasses(['client-form', formClassName]), style: formStyle },
			controls.map(item => {
				const {
					control, name, component, type, onlyNumber, placeholder, label,
					value, isRequired, isValid, disabled, errorMessage, className, style,
					updateOnChange, limitChar, currency, hideRadio,
					textBefore, tabs, valueAsObject, text, firstRange,
					secondRange, rangesStyle, overlayBg, content, unit, customSvg,
					autoComplete, autoSuggestFetch, getValue, cacheResults, timeOut, hide, options, minEl
				} = item;

				/* eslint-disable */
				switch (control) {
					default:
						return null;
					case 'external':
						if (hide) return (null);
						const itemProps = Object.assign({}, item, {
							onUpdate: (e, h) => this.onUpdate(e, h),
							ref: this[name]
						});
						return el(component, itemProps);
					case 'autosuggest':
						if (hide) return (null);
						return el(AutoSuggest, {
							key: item.name, name, label, value,
							type, onlyNumber, placeholder,
							onUpdate: (e, h) => { this.onUpdate(e, h); },
							isRequired, isValid, disabled,
							errorMessage, className, style,
							updateOnChange, limitChar, currency, unit,
							autoComplete, ref: this[name],
							autoSuggestFetch, getValue, cacheResults, timeOut
						});
					case 'text':
						if (hide) return (null);
						return el(CustomTextField, {
							key: item.name, name, label, value,
							type, onlyNumber, placeholder,
							onUpdate: (e, h) => { this.onUpdate(e, h); },
							isRequired, isValid, disabled,
							errorMessage, className, style,
							updateOnChange, limitChar, currency, unit,
							autoComplete, ref: this[name]
						});
					case 'plusMinus':
						if (hide) return (null);
						return el(CustomPlusMinus, {
								key: item.name, name, label, value: parseFloat(item.value),
								type, onlyNumber, placeholder,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired, isValid, disabled,
								errorMessage, className, style,
								updateOnChange, ref: this[name]
						});
					case 'textArea':
						if (hide) return (null);
						return el(CustomTextarea, {
								key: item.name, name, label, value,
								placeholder,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired, isValid, disabled,
								errorMessage, className, style,
								updateOnChange, limitChar, ref: this[name]
						});
					case 'select':
						if (hide) return (null);
						return el(CustomSelect, {
								key: item.name, name, label, value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired, isValid, disabled,
								errorMessage, className, style,
								options, default: item.default, ref: this[name]
						});
					case 'listbox':
						if (hide) return (null);
						return el(CustomListBox, {
								key: item.name, name, label, value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired, isValid, disabled,
								errorMessage, className, style,
								options, default: item.default, ref: this[name],
								minEl
						});
					case 'check':
						if (hide) return (null);
						return el(CustomCheckBox, {
								key: item.name, name, label, value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								className, style,
								textBefore, customSvg,
								default: item.default, ref: this[name]
						});
					case 'radio':
						if (hide) return (null);
						return el(CustomRadio, {
								key: item.name, name, label, value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								className, style,
								options, hideRadio, errorMessage, isRequired, isValid,
								default: item.default, ref: this[name]
						});
					case 'label':
						if (hide) return (null);
						return el(CustomLabel, {
								key: `${Math.random()}`, content, className, style
						});
					case 'tabTextArea':
						if (hide) return (null);
						return el(CustomTextAreaTab, {
								key: item.name, name, value, tabs,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired, isValid, disabled,
								errorMessage, className, style,
								valueAsObject, limitChar, label, ref: this[name]
						});
					case 'fakeselect':
						if (hide) return (null);
						return el(FakeSelect, {
								key: item.name, name, label, value, text,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								className, style,
								firstRange, secondRange,
								rangesStyle, overlayBg, ref: this[name]
						});
				}
				/* eslint-enable */
			}),
			beforeButton,
			sendButton ?
				el(View, { className: 'button-container', style: buttonContainerStyle },
					el(ClickOutHandler, { onClickOut: () => { this.resetButton(); } },
						el('button', {
							className: sendButtonClass,
							style: hideIfSent && isSent ? sendButton.sentStyle : sendButton.style,
							onClick: succeed === null && isSent === null && sendButton.disabled !== true ? () => { this.formIsValid(); } : () => null,
							type: 'button',
							disabled: disableButton
						},
						el('svg', { width: 24, height: 24, viewBox: '0 0 24 24', className: isSent !== false ? 'spin' : '' },
							isSent ?
								el('circle', { cx: 12, cy: 12, fill: 'none', stroke: '#fff', strokeWidth: 2, r: 11, strokeDasharray: '55,20' })
								:
								succeed === true ?
									el('polyline', { fill: 'none', points: '4,12 9,18 21,6', style: { fill: 'none', stroke: '#fff', strokeWidth: 2 } })
									:
									succeed === false ?
										el('path', { fill: '#fff', d: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' })
										:
										null),
						sendButtonValue)))
				: null,
			afterButton);
	}
}
