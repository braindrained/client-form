// @flow
import React from 'react';
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

import { sumClasses, isInt } from './helpers/utils';
import './Form.css';

export default class Form extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { controls } = this.props;

		this.state = {
			controls,
			succeed: null,
			isSent: null
		};
	}

	onUpdate(e: Object, hasError: boolean) {
		const { controls } = this.state;

		const updatedControls = controls.map((item) => {
			if (e.target.name === item.name) {
				item.isValid = !hasError;
				item.value = e.target.value;
			} else {
				if (typeof item.hideIf === 'object') {
					let hide = false;
					item.hideIf.map((v) => {
						const control = this.state.controls.filter(o => o.name === v.field);
						if (control.length > 0) {
							if (control[0].value.toString().match(v.regEx) != null) {
								hide = true;
							}
						}
						return null;
					});
					item.value = hide ? '' : item.value;
					item.hide = hide;
				}
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
				if (typeof item.optionIf === 'object') {
					item.optionIf.map((v) => {
						const control = this.state.controls.filter(o => o.name === v.field);
						if (control.length > 0) {
							if (e.target.name === v.field) {
								item.value = '';
							}
							item.options = v.options.filter(o => o.type.indexOf(parseFloat(control[0].value))	!== -1);
						}
						return null;
					});
				}
				if (typeof item.changeStyleIf === 'object') {
					item.changeStyleIf.map((v) => {
						const control = this.state.controls.filter(o => o.name === v.field);
						if (control.length > 0 && control[0].value !== undefined) {
							if (control[0].value.toString().match(v.regEx) != null) {
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

		this.setState({
			controls: updatedControls
		});

		if (this.props.updateOnChange) {
			this.props.updateOnChange(updatedControls);
		}
	}

	formIsValid() {
		let formIsValid = true;
		const { controls } = this.state;

		const updatedControls = controls.map((item) => {
			item.isValid = true;
			if (item.value === null || item.value === undefined) item.value = '';
			if (item.isRequired && !item.hide) {
				if (item.control !== 'select' && (item.value === '' || !item.value)) {
					item.isValid = false;
					formIsValid = false;
				} else if (item.control === 'select' && (item.value === '0' || item.value === 0 || item.value === '')) {
					item.isValid = false;
					formIsValid = false;
				}
			}

			if (typeof item.value === 'object' && item.valueAsObject) {
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
			if (item.equalTo !== undefined) {
				const valueToCompare = this.state.controls.filter(o => o.name === item.equalTo)[0].value;
				if (!(item.value === valueToCompare) || item.value === '') {
					item.isValid = false;
					formIsValid = false;
				}
			}
			if (item.greaterThan !== undefined) {
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
			updatedControls.filter(o => o.control !== 'label' && o.exclude !== true).map((item) => {
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
				value = value === undefined ? '' : value.toString() === 'true' ? true : value.toString() === 'false' ? false : value;
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
			const firstRequired = updatedControls.filter(o => (o.isRequired && !o.isValid) || (o.greaterThan && !o.isValid) || (o.regEx && !o.isValid) || (o.equalTo && !o.isValid))[0];

			if (typeof firstRequired.value === 'object') {
				const subFieldRequired = firstRequired.value.filter(o => (o.isRequired && !o.isValid) || (o.greaterThan && !o.isValid) || (o.regEx && !o.isValid) || (o.equalTo && !o.isValid))[0];
				/* eslint-disable-next-line */ /* flow-disable-next-line */
				document.getElementById(subFieldRequired.name).focus();
			} else {
				/* eslint-disable-next-line */ /* flow-disable-next-line */
				document.getElementById(firstRequired.name).focus();
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
		const {
			formClassName, formStyle, sendButton,
			beforeButton, buttonContainerStyle, afterButton
		} = this.props;
		const { controls, succeed, isSent, message } = this.state;
		const sendButtonClass = sumClasses([
			succeed !== null ? (succeed ? 'btn btn-succeed' : 'btn btn-red') : 'btn',
			sendButton && sendButton.disabled ? 'btn-grey' : ''
		]);
		const { hideIfSent } = sendButton;
		const sendButtonValue = sendButton ? (succeed === null ? (hideIfSent && isSent ? null : sendButton.text) : message) : null;
		const el = React.createElement;

		return (
			<div className={sumClasses(['client-form', formClassName])} style={formStyle}>
				{ controls.map((item) => {
					const {
						control, hide, name, component, type, onlyNumber, placeholder, label,
						value, isRequired, isValid, disabled, errorMessage, className, style,
						updateOnChange, limitChar, currency, options, hideRadio,
						textBefore, tabs, valueAsObject, text, firstRange,
						secondRange, rangesStyle, overlayBg, content, unit, customSvg
					} = item;
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
								updateOnChange, limitChar, currency, unit
							});
						case 'plusMinus':
							if (item.hide) return (null);
							return el(CustomPlusMinus, {
									key: item.name, name, label, value: parseFloat(item.value),
									type, onlyNumber, placeholder,
									onUpdate: (e, h) => { this.onUpdate(e, h); },
									isRequired, isValid, disabled,
									errorMessage, className, style,
									updateOnChange
							});
						case 'textArea':
							if (item.hide) return (null);
							return el(CustomTextarea, {
									key: item.name, name, label, value,
									placeholder,
									onUpdate: (e, h) => { this.onUpdate(e, h); },
									isRequired, isValid, disabled,
									errorMessage, className, style,
									updateOnChange, limitChar
							});
						case 'select':
							if (item.hide) return (null);
							return el(CustomSelect, {
									key: item.name, name, label, value,
									onUpdate: (e, h) => { this.onUpdate(e, h); },
									isRequired, isValid, disabled,
									errorMessage, className, style,
									options, default: item.default
							});
						case 'check':
							if (item.hide) return (null);
							return el(CustomCheckBox, {
									key: item.name, name, label, value,
									onUpdate: (e, h) => { this.onUpdate(e, h); },
									className, style,
									textBefore, customSvg
							});
						case 'radio':
							if (item.hide) return (null);
							return el(CustomRadio, {
									key: item.name, name, label, value,
									onUpdate: (e, h) => { this.onUpdate(e, h); },
									className, style,
									options, hideRadio, errorMessage, isRequired, isValid,
									default: item.default
							});
						case 'label':
							if (item.hide) return (null);
							return el(CustomLabel, {
									key: `${Math.random()}`, content, className, style
							});
						case 'tabTextArea':
							if (item.hide) return (null);
							return el(CustomTextAreaTab, {
									key: item.name, name, value, tabs,
									onUpdate: (e, h) => { this.onUpdate(e, h); },
									isRequired, isValid, disabled,
									errorMessage, className, style,
									valueAsObject, limitChar, label
							});
						case 'fakeselect':
							if (item.hide) return (null);
							return el(FakeSelect, {
									key: item.name, name, label, value, text,
									onUpdate: (e, h) => { this.onUpdate(e, h); },
									className, style,
									firstRange, secondRange,
									rangesStyle, overlayBg
							});
					}
					/* eslint-enable */
				})}
				{ beforeButton }
				{ sendButton ?
					<div className="button-container" style={buttonContainerStyle}>
						{/* eslint-disable */}
						<ClickOutHandler onClickOut={() => { this.resetButton(); }}>
							<button {...{
								className: sendButtonClass,
								style: hideIfSent && isSent ? sendButton.sentStyle : sendButton.style,
								onClick: succeed === null && isSent === null && sendButton.disabled !== true ? () => { this.formIsValid(); } : () => null,
								type: 'button'
							}}>
								<svg {...{ width: 24, height: 24, viewBox: '0 0 24 24', className: isSent !== false ? 'spin' : '' }}>
									{ isSent ?
										<circle {...{ cx: 12, cy: 12, fill: 'none', stroke: '#fff', strokeWidth: 2, r: 11, strokeDasharray: '55,20' }} />
										:
										succeed === true ?
											<polyline {...{ fill: 'none', points: '4,12 9,18 21,6', style: { fill: 'none', stroke: '#fff', strokeWidth: 2 } }} />
											:
											succeed === false ?
											<path {...{
												fill: '#fff',
												d: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'
											}} />
											:
											null
									}
								</svg>
								{sendButtonValue}
							</button>
						</ClickOutHandler>
						{/* eslint-enable */}
					</div>
					: null }
				{ afterButton }
			</div>
		);
	}
}
