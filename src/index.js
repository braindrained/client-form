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
// flow-disable-next-line
import './Form.css';

import { sumClasses } from './helpers/utils';

const Form = class extends React.Component<any, any> {

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
							item.label.text = control[0].value.toString().match(v.regEx) != null ? v.ifTrue : v.ifFalse;
						}
						return null;
					});
				}
				if (typeof item.optionIf === 'object') {
					item.optionIf.map((v) => {
						const control = this.state.controls.filter(o => o.name === v.field);
						if (control.length > 0) {
							item.options = v.options.filter(o => o.type.indexOf(parseFloat(control[0].value))	!== -1);
						}
						return null;
					});
				}
				if (typeof item.changeStyleIf === 'object') {
					item.changeStyleIf.map((v) => {
						const control = this.state.controls.filter(o => o.name === v.field);
						if (control.length > 0) {
							if (control[0].value.toString().match(v.regEx) != null) {
								item.style = v.style;
							} else {
								item.style = v.altStyle;
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
			if (item.isRequired && !item.hide) {
				if (item.control !== 'select' && (item.value === '' || !item.value)) {
					item.isValid = false;
					formIsValid = false;
				} else if (item.control === 'select' && item.value === '0' && item.value === 0) {
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
				if (item.value !== '' &&	!item.regEx.test(item.value)) {
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
			updatedControls.filter(o => o.control !== 'label').map((item) => {
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
				if (currency && value !== undefined) {
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
					succeed: x.succeed
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
			formClassName, formStyle,
			sendButton, textBeforeButton, buttonContainerStyle,
			textAfterButton
		} = this.props;
		const { controls, succeed, isSent } = this.state;
		const sendButtonClass = sumClasses([
			succeed !== null ? (succeed ? 'btn btn-succeed' : 'btn btn-error') : 'btn',
			sendButton && sendButton.disabled ? 'btn-disabled' : ''
		]);
		const sendButtonValue = sendButton ? (succeed === null ? sendButton.text : succeed === false ? sendButton.errorText : sendButton.succeedText) : null;

		return (
			<div className={sumClasses(['client-form', formClassName !== null && formClassName !== undefined ? formClassName : ''])} style={formStyle}>
				{ controls.map((item) => {
					const {
						control, hide, name, component, type, onlyNumber, placeholder, label,
						value, isRequired, isValid, disabled, errorMessage, className, style,
						updateOnChange, limitChar, currency, disable, options, hideRadio,
						textBefore, hideCheck, tabs, valueAsObject, text, firstRange,
						secondRange, rangesStyle, overlayBg
					} = item;
					switch (control) {
					default:
						return null;
					case 'external':
						if (hide) return (null);
						return Object.assign({}, component,
							{
								key: name,
								props: Object.assign({}, item, {
									onUpdate: (e, h) => { this.onUpdate(e, h); }
								}),
							});
					case 'text':
						if (hide) return (null);
						return (
							<CustomTextField {...{
								type,
								onlyNumber,
								key: item.name,
								placeholder,
								name,
								label,
								value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired,
								isValid,
								disabled,
								errorMessage,
								className,
								style,
								updateOnChange,
								limitChar,
								currency,
							}} />
						);
					case 'plusMinus':
						if (item.hide) return (null);
						return (
							<CustomPlusMinus {...{
								type,
								onlyNumber,
								key: item.name,
								placeholder,
								name,
								label,
								value: parseFloat(item.value),
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired,
								isValid,
								disabled,
								errorMessage,
								className,
								style,
							}} />
						);
					case 'textArea':
						if (item.hide) return (null);
						return (
							<CustomTextarea {...{
								key: item.name,
								placeholder,
								name,
								label,
								value,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								isRequired,
								isValid,
								errorMessage,
								style,
								className,
								limitChar,
								updateOnChange,
							}} />
						);
					case 'select':
						if (item.hide) return (null);
						return (
							<CustomSelect {...{
								key: item.name,
								name,
								label,
								disable,
								options,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								value,
								style,
								className,
								isRequired,
								isValid,
								errorMessage,
								default: item.default,
							}} />
						);
					case 'check':
						if (item.hide) return (null);
						return (
							<CustomCheckBox {...{
								key: item.name,
								name,
								label,
								value,
								style,
								textBefore,
								hideCheck,
								className,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
							}} />
						);
					case 'radio':
						if (item.hide) return (null);
						return (
							<CustomRadio {...{
								key: item.name,
								name,
								label,
								options,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								value,
								hideRadio,
								className,
								style,
							}} />
						);
					case 'label':
						if (item.hide) return (null);
						return (
							<CustomLabel {...{
								key: item.name,
								name,
								label,
								style,
								text,
								value,
								className: item.className ? item.className : '',
							}} />
						);
					case 'tabTextArea':
						if (item.hide) return (null);
						return (
							<CustomTextAreaTab {...{
								key: item.name,
								name,
								value,
								tabs,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								style,
								className,
								isRequired,
								isValid,
								errorMessage,
								valueAsObject,
								limitChar,
							}} />
						);
					case 'fakeselect':
						if (item.hide) return (null);
						return (
							<FakeSelect {...{
								key: item.name,
								name,
								label,
								value,
								text,
								onUpdate: (e, h) => { this.onUpdate(e, h); },
								style,
								firstRange,
								secondRange,
								rangesStyle,
								className,
								overlayBg
							}} />
						);
					}
				})}
				{ textBeforeButton }
				{ sendButton ?
					<div className="button-container" style={buttonContainerStyle}>
						{/* eslint-disable-next-line */}
						<ClickOutHandler onClickOut={() => { this.resetButton(); }}>
							{/* eslint-disable-next-line */}
							<button {...{
								className: sendButtonClass,
								style: sendButton.style,
								onClick: succeed === null && isSent === null && sendButton.disabled === undefined ? () => { this.formIsValid(); } : () => null,
								type: 'button'
							}}>
								<svg width="24px" height="24px" viewBox={isSent ? '0 0 100 100' : '0 0 24 24'}>
									{ isSent ?
										<circle cx="50" cy="50" fill="none" stroke="#fff" strokeWidth="10" r="44" strokeDasharray="164.93361431346415 56.97787143782138" transform="rotate(245.789 50 50)">
											<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
										</circle>
										:
										succeed !== null ?
											<path fill="#fff" d={succeed ? 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' : 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'} />
											:
											null
									}
								</svg>
								{sendButtonValue}
							</button>
						</ClickOutHandler>
					</div>
					: null }
				{ textAfterButton }
			</div>
		);
	}
};

export default Form;
