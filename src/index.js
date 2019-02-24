import React from 'react';
import PropTypes from 'prop-types';

import CustomTextField from './childrens/CustomTextField';
import CustomTextarea from './childrens/CustomTextarea';
import CustomCheckBox from './childrens/CustomCheckBox';
import CustomSelect from './childrens/CustomSelect';
import CustomRadio from './childrens/CustomRadio';
import CustomLabel from './childrens/CustomLabel';
import CustomTextAreaTab from './childrens/CustomTextAreaTab';
import DatePickerField from './childrens/DatePickerField';
import CustomPlusMinus from './childrens/CustomPlusMinus';
import FakeSelect from './childrens/FakeSelect';
import './Form.scss';

import { notEmpty, sumClasses } from './helpers/utils';

const Form = class extends React.Component<any, any> {

	constructor(props) {
		super(props);

		this.state = {
			controls: this.props.controls
		};
	}

	onUpdate(e: Object, hasError: boolean) {
		const updatedControls = this.state.controls.map((item) => {
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

		const updatedControls = this.state.controls.map((item) => {
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
			updatedControls.map((item) => {
				if (item.control !== 'label') {
					formObject[item.name] = item.value;
				}
				return null;
			});

			this.props.sendForm(formObject);
		} else {
			const firstRequired = updatedControls.filter(o => (o.isRequired && !o.isValid) || (o.greaterThan && !o.isValid) || (o.regEx && !o.isValid) || (o.equalTo && !o.isValid))[0];

			if (typeof firstRequired.value === 'object') {
				const subFieldRequired = firstRequired.value.filter(o => (o.isRequired && !o.isValid) || (o.greaterThan && !o.isValid) || (o.regEx && !o.isValid) || (o.equalTo && !o.isValid))[0];
				document.getElementById(subFieldRequired.name).focus();
			} else {
				document.getElementById(firstRequired.name).focus();
			}
		}
	}

	render() {
		const {
			className, style, viewport, succeed, isSent,
			sendButton, textBeforeButton, buttonContainerStyle,
			textAfterButton
		} = this.props;
		const { controls } = this.state;
		const sendButtonClass = sumClasses([
			succeed !== null ? (succeed ? 'btn btn-succeed' : 'btn btn-error') : 'btn',
			isSent ? 'spinner' : '',
			sendButton && sendButton.disabled ? 'btn-disabled' : ''
		]);
		const sendButtonValue = sendButton ? (succeed === null ? sendButton.text : succeed === false ? sendButton.errorText : sendButton.succeedText) : null;

		return (
			<div className={sumClasses(['form-container', className !== null && className !== undefined ? className : ''])} style={style}>
				{ controls.map((item) => {
					switch (item.control) {
					default:
						return null;
					case 'external':
						return (
							<div {...{ key: item.name }}>
								{item.component}
							</div>
						);
					case 'text':
						if (item.hide) return (null);
						return (
							<CustomTextField {...{
								type: item.type,
								onlyNumber: item.onlyNumber,
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value ? item.value : '',
								onUpdate: (e) => { this.onUpdate(e) },
								isRequired: item.isRequired,
								isValid: item.isValid,
								disabled: item.disabled,
								errorMessage: item.errorMessage,
								className: item.className ? item.className : '',
								style: item.style,
								textAfter: item.textAfter,
								updateOnChange: item.updateOnChange,
								limitChar: item.limitChar,
								currency: item.currency,
							}} />
						);
					case 'plusMinus':
						if (item.hide) return (null);
						return (
							<CustomPlusMinus {...{
								type: item.type,
								onlyNumber: item.onlyNumber,
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: parseFloat(item.value),
								onUpdate: (e) => { this.onUpdate(e) },
								isRequired: item.isRequired,
								isValid: item.isValid,
								disabled: item.disabled,
								errorMessage: item.errorMessage,
								className: item.className ? item.className : '',
								style: item.style,
								textAfter: item.textAfter,
							}} />
						);
					case 'textArea':
						if (item.hide) return (null);
						return (
							<CustomTextarea {...{
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value ? item.value : '',
								onUpdate: (e) => { this.onUpdate(e) },
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								style: item.style,
								className: item.className ? item.className : '',
							}} />
						);
					case 'select':
						if (item.hide) return (null);
						return (
							<CustomSelect {...{
								key: item.name,
								name: item.name,
								label: item.label,
								disabled: item.disabled,
								options: item.options,
								onUpdate: (e) => { this.onUpdate(e) },
								value: item.value,
								style: item.style,
								className: item.className ? item.className : '',
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								default: item.default,
							}} />
						);
					case 'check':
						if (item.hide) return (null);
						return (
							<CustomCheckBox {...{
								key: item.name,
								name: item.name,
								label: item.label,
								value: item.value,
								style: item.style,
								textBefore: item.textBefore,
								textAfter: item.textAfter,
								hideCheck: item.hideCheck,
								className: item.className ? item.className : '',
								onUpdate: (e) => { this.onUpdate(e) },
							}} />
						);
					case 'radio':
						if (item.hide) return (null);
						return (
							<CustomRadio {...{
								key: item.name,
								name: item.name,
								label: item.label,
								options: item.options,
								onUpdate: (e) => { this.onUpdate(e) },
								value: notEmpty(item.value) ? item.value : item.default,
								hideRadio: item.hideRadio,
								uncheck: item.uncheck,
								className: item.className ? item.className : '',
								style: item.style,
								highlightSel: item.highlightSel,
							}} />
						);
					case 'label':
						if (item.hide) return (null);
						return (
							<CustomLabel {...{
								key: item.name,
								name: item.name,
								label: item.label,
								style: item.style,
								text: item.text,
								value: item.value,
								className: item.className ? item.className : '',
							}} />
						);
					case 'tabTextArea':
						if (item.hide) return (null);
						return (
							<CustomTextAreaTab {...{
								key: item.name,
								name: item.name,
								value: item.value,
								tabs: item.tabs,
								onUpdate: (e) => { this.onUpdate(e) },
								style: item.style,
								className: item.className ? item.className : '',
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								valueAsObject: item.valueAsObject,
								limitChar: item.limitChar,
							}} />
						);
					case 'datepicker':
						if (item.hide) return (null);
						return (
							<DatePickerField {...{
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value,
								onUpdate: (e) => { this.onUpdate(e) },
								style: item.style,
								className: item.className ? item.className : '',
								updateOnChange: item.updateOnChange,
								errorMessage: item.errorMessage,
								isValid: item.isValid,
							}} />
						);
					case 'fakeselect':
						if (item.hide) return (null);
						return (
							<FakeSelect {...{
								key: item.name,
								name: item.name,
								label: item.label,
								value: item.value,
								text: item.text,
								onUpdate: (e) => { this.onUpdate(e) },
								style: item.style,
								firstRange: item.firstRange,
								secondRange: item.secondRange,
								rangesStyle: item.rangesStyle,
								className: item.className ? item.className : '',
								overlayBg: item.overlayBg
							}} />
						);
					}
				})}
				{ textBeforeButton }
				{ sendButton ?
					<div className="button-container" style={buttonContainerStyle}>
						<button {...{
							className: sendButtonClass,
							style: sendButton.style,
							onClick: succeed === null && isSent === null && sendButton.disabled === undefined ? () => { this.formIsValid() } : () => { return null; },
							type: 'button'
						}}>
							{sendButtonValue}
						</button>
					</div>
					: null }
				{ textAfterButton }
			</div>
		);
	}
}

Form.propTypes = {
	textBeforeButton: PropTypes.element,
	textAfterButton: PropTypes.element,
	controls: PropTypes.instanceOf(Object).isRequired,
	sendForm: PropTypes.func,
	sendButton: PropTypes.instanceOf(Object),
	style: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
	succeed: PropTypes.bool,
	isSent: PropTypes.bool,
};

Form.defaultProps = {
	textBeforeButton: null,
	textAfterButton: null,
	sendButton: null,
	style: null,
	onUpdate: null,
	sendForm: null,
	succeed: null,
	isSent: null,
};

export default Form;
