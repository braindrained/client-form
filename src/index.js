// @flow
import { Component, createElement } from 'react';
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

import { sumClasses, isInt, hideField, optionsIf } from './helpers/utils';
import './Form.css';

const el = createElement;
const View = (props: Object) => el('div', props);

export default class Form extends Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { controls } = this.props;

		this.state = {
			controls,
			succeed: null,
			isSent: null,
			init: true
		};
	}

	onUpdate(e: Object, hasError: boolean) {
		this.setState({ init: false });
		const { controls } = this.state;

		let updatedControls = controls.map((item) => {
			if (e.target.name === item.name) {
				item.isValid = !hasError;
				item.value = e.target.value;
			} else {
				if (item.label && typeof item.label.changeIf === 'object') {
					item.label.changeIf.map((v) => {
						const control = this.state.controls.filter(o => o.name === v.field);
						if (control.length > 0) {
							if (item.control !== 'label' && control[0].value) item.label.text = control[0].value.toString().match(v.regEx) != null ? v.ifTrue : v.ifFalse;
							if (item.control === 'label' && control[0].value) item.content = control[0].value.toString().match(v.regEx) != null ? v.ifTrue : v.ifFalse;
						}
						return null;
					});
				}
				if (typeof item.optionIf === 'object') item.options = optionsIf(item, controls, e);
				if (typeof item.changeStyleIf === 'object') {
					item.changeStyleIf.map((v) => {
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
			}
			return item;
		});

		updatedControls = updatedControls.map((item) => {
			item.hide = typeof item.hideIf === 'object' ? hideField(item, updatedControls) : false;
			if (typeof item.hideIf === 'object' && item.hide && item.control !== 'external') item.value = item.default;
			return item;
		});

		this.setState({
			controls: updatedControls
		});

		if (this.props.updateOnChange) {
			this.props.updateOnChange(updatedControls);
		}
	}

	formIsValid() {
		this.setState({ init: false });
		let formIsValid = true;
		const { controls } = this.state;

		const updatedControls = controls.map((item) => {
			item.isValid = true;
			item.hide = typeof item.hideIf === 'object' ? hideField(item, controls) : false;
			if (item.isRequired && !item.hide) {
				if (item.control !== 'select' && (item.value === '' || !item.value)) {
					item.isValid = false;
					formIsValid = false;
				} else if (item.control === 'select' && (item.value === '0' || item.value === 0 || item.value === '' || item.value === ' ')) {
					item.isValid = false;
					formIsValid = false;
				}
			}

			if (typeof item.value === 'object' && item.valueAsObject && !item.hide) {
				if (item.value && item.value.filter(o => o.isRequired === true).length > 0) {
					const updatedValues = item.value.map((itemS) => {
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

		this.setState({
			controls: updatedControls
		});

		if (formIsValid) {
			const formObject = {};
			const { excludeHidden } = this.props;
			updatedControls.filter(o => o.control !== 'label' && o.exclude !== true && (excludeHidden === true ? !o.hide : true)).map((item) => {
				let { value } = item;
				const { valueAsObject, currency, name } = item;
				if (typeof value === 'object' && valueAsObject) {
					const valueObject = {};
					value.map((itemx) => {
						valueObject[itemx.name] = itemx.value;
						return null;
					});
					value = valueObject;
				}
				if (currency && value !== undefined && value !== null && value !== '' && value !== 0 && !isInt(value)) {
					value = value.replace(/\./g, '');
				}
				value = value === undefined || value === null ? null : value.toString() === 'true' ? true : value.toString() === 'false' ? false : value;
				formObject[name] = value;
				return null;
			});

			this.setState({
				isSent: true,
			});
			this.props.sendForm(formObject).then((x) => {
				this.setState({
					isSent: false,
					succeed: x.succeed,
					message: x.message
				});
			}).catch((x) => {
				this.setState({
					isSent: false,
					succeed: x.succeed,
					message: x.message
				});
			});
		} else {
			const toBeValidateFilter = o => !o.hide && o.type !== 'hidden' && ((o.isRequired && o.isValid === false) || (o.greaterThan && o.isValid === false) || (o.regEx && o.isValid === false) || (o.equalTo && o.isValid === false));
			let firstRequired = updatedControls.filter(o => toBeValidateFilter(o))[0];
			if (firstRequired && typeof firstRequired.value === 'object') {
				/* eslint-disable-next-line */
				firstRequired = firstRequired.value.filter(o => toBeValidateFilter(o))[0];
			}
			/* eslint-disable-next-line */ /* flow-disable-next-line */
			if (firstRequired) this[firstRequired.name][firstRequired.name].focus();
			//document.getElementById(firstRequired.name).focus();
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
		const { controls, succeed, isSent, message, init } = this.state;
		const sendButtonClass = sumClasses([
			succeed !== null ? (succeed ? 'btn btn-succeed' : 'btn btn-red') : (isSent ? 'btn btn-sent' : 'btn'),
			sendButton && sendButton.disabled ? 'btn-grey' : ''
		]);
		const { hideIfSent } = sendButton !== undefined ? sendButton : {};
		const sendButtonValue = sendButton ? (succeed === null ? (hideIfSent && isSent ? null : sendButton.text) : message) : null;

		return el(View, { className: sumClasses(['client-form', formClassName]), style: formStyle },
			controls.map((item) => {
				const {
					control, name, component, type, onlyNumber, placeholder, label,
					value, isRequired, isValid, disabled, errorMessage, className, style,
					updateOnChange, limitChar, currency, hideRadio,
					textBefore, tabs, valueAsObject, text, firstRange,
					secondRange, rangesStyle, overlayBg, content, unit, customSvg,
					autoComplete
				} = item;
				const hide = typeof item.hideIf === 'object' ? hideField(item, controls) : false;
				const options = typeof item.optionIf === 'object' && init ? optionsIf(item, controls, { target: { name: item.name } }) : item.options;
				/* eslint-disable */
				switch (control) {
					default:
						return null;
					case 'external':
						if (hide) return (null);
						const itemProps = Object.assign({}, item, { onUpdate: (e, h) => { this.onUpdate(e, h) } });
						return el(component, itemProps);
					case 'text':
						if (hide) return (null);
						return el(CustomTextField, {
							key: item.name, name, label, value,
							type, onlyNumber, placeholder,
							onUpdate: (e, h) => { this.onUpdate(e, h); },
							isRequired, isValid, disabled,
							errorMessage, className, style,
							updateOnChange, limitChar, currency, unit,
							autoComplete,
							ref: (node) => { this[name] = node; }
						});
					case 'plusMinus':
						if (hide) return (null);
						return el(CustomPlusMinus, {
								key: item.name, name, label, value: parseFloat(item.value),
								type, onlyNumber, placeholder,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired, isValid, disabled,
								errorMessage, className, style,
								updateOnChange
						});
					case 'textArea':
						if (hide) return (null);
						return el(CustomTextarea, {
								key: item.name, name, label, value,
								placeholder,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired, isValid, disabled,
								errorMessage, className, style,
								updateOnChange, limitChar
						});
					case 'select':
						if (hide) return (null);
						return el(CustomSelect, {
								key: item.name, name, label, value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired, isValid, disabled,
								errorMessage, className, style,
								options, default: item.default
						});
					case 'check':
						if (hide) return (null);
						return el(CustomCheckBox, {
								key: item.name, name, label, value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								className, style,
								textBefore, customSvg,
								default: item.default
						});
					case 'radio':
						if (hide) return (null);
						return el(CustomRadio, {
								key: item.name, name, label, value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								className, style,
								options, hideRadio, errorMessage, isRequired, isValid,
								default: item.default
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
								valueAsObject, limitChar, label
						});
					case 'fakeselect':
						if (hide) return (null);
						return el(FakeSelect, {
								key: item.name, name, label, value, text,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								className, style,
								firstRange, secondRange,
								rangesStyle, overlayBg
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
							type: 'button'
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
