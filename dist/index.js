'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CustomTextField = require('./childrens/CustomTextField');

var _CustomTextField2 = _interopRequireDefault(_CustomTextField);

var _CustomTextarea = require('./childrens/CustomTextarea');

var _CustomTextarea2 = _interopRequireDefault(_CustomTextarea);

var _CustomCheckBox = require('./childrens/CustomCheckBox');

var _CustomCheckBox2 = _interopRequireDefault(_CustomCheckBox);

var _CustomSelect = require('./childrens/CustomSelect');

var _CustomSelect2 = _interopRequireDefault(_CustomSelect);

var _CustomRadio = require('./childrens/CustomRadio');

var _CustomRadio2 = _interopRequireDefault(_CustomRadio);

var _CustomLabel = require('./childrens/CustomLabel');

var _CustomLabel2 = _interopRequireDefault(_CustomLabel);

var _CustomTextAreaTab = require('./childrens/CustomTextAreaTab');

var _CustomTextAreaTab2 = _interopRequireDefault(_CustomTextAreaTab);

var _DatePickerField = require('./childrens/DatePickerField');

var _DatePickerField2 = _interopRequireDefault(_DatePickerField);

var _CustomPlusMinus = require('./childrens/CustomPlusMinus');

var _CustomPlusMinus2 = _interopRequireDefault(_CustomPlusMinus);

var _FakeSelect = require('./childrens/FakeSelect');

var _FakeSelect2 = _interopRequireDefault(_FakeSelect);

require('./Form.scss');

var _utils = require('./helpers/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
	_inherits(Form, _React$Component);

	function Form(props) {
		_classCallCheck(this, Form);

		var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

		_this.state = {
			controls: _this.props.controls
		};
		return _this;
	}

	_createClass(Form, [{
		key: 'onUpdate',
		value: function onUpdate(e, hasError) {
			var _this2 = this;

			var updatedControls = this.state.controls.map(function (item) {
				if (e.target.name === item.name) {
					item.isValid = !hasError;
					item.value = e.target.value;
				} else {
					if (_typeof(item.hideIf) === 'object') {
						var hide = false;
						item.hideIf.map(function (v) {
							var control = _this2.state.controls.filter(function (o) {
								return o.name === v.field;
							});
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
					if (item.label && _typeof(item.label.changeIf) === 'object') {
						item.label.changeIf.map(function (v) {
							var control = _this2.state.controls.filter(function (o) {
								return o.name === v.field;
							});
							if (control.length > 0) {
								item.label.text = control[0].value.toString().match(v.regEx) != null ? v.ifTrue : v.ifFalse;
							}
							return null;
						});
					}
					if (_typeof(item.optionIf) === 'object') {
						item.optionIf.map(function (v) {
							var control = _this2.state.controls.filter(function (o) {
								return o.name === v.field;
							});
							if (control.length > 0) {
								item.options = v.options.filter(function (o) {
									return o.type.indexOf(parseFloat(control[0].value)) !== -1;
								});
							}
							return null;
						});
					}
					if (_typeof(item.changeStyleIf) === 'object') {
						item.changeStyleIf.map(function (v) {
							var control = _this2.state.controls.filter(function (o) {
								return o.name === v.field;
							});
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

			if (this.props.updateFather) {
				this.props.updateFather(updatedControls);
			}
		}
	}, {
		key: 'formIsValid',
		value: function formIsValid() {
			var _this3 = this;

			var formIsValid = true;

			var updatedControls = this.state.controls.map(function (item) {
				if (item.isRequired && !item.hide) {
					if (item.control !== 'select' && (item.value === '' || !item.value)) {
						item.isValid = false;
						formIsValid = false;
					} else if (item.control === 'select' && item.value === '0' && item.value === 0) {
						item.isValid = false;
						formIsValid = false;
					}
				}

				if (_typeof(item.value) === 'object' && item.valueAsObject) {
					if (item.value && item.value.filter(function (o) {
						return o.isRequired === true;
					}).length > 0) {
						var updatedValues = item.value.map(function (itemS) {
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
					if (item.value !== '' && !item.regEx.test(item.value)) {
						item.isValid = false;
						formIsValid = false;
					}
				}
				if (item.equalTo !== undefined) {
					var valueToCompare = _this3.state.controls.filter(function (o) {
						return o.name === item.equalTo;
					})[0].value;
					if (!(item.value === valueToCompare) || item.value === '') {
						item.isValid = false;
						formIsValid = false;
					}
				}
				if (item.greaterThan !== undefined) {
					var _valueToCompare = _this3.state.controls.filter(function (o) {
						return o.name === item.greaterThan;
					})[0].value;
					if (parseFloat(item.value.toString().replace(/\./g, '')) < parseFloat(_valueToCompare.toString().replace(/\./g, ''))) {
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
				var formObject = {};
				updatedControls.map(function (item) {
					if (item.control !== 'label') {
						formObject[item.name] = item.value;
					}
					return null;
				});

				this.props.sendForm(formObject);
			} else {
				var firstRequired = updatedControls.filter(function (o) {
					return o.isRequired && !o.isValid || o.greaterThan && !o.isValid || o.regEx && !o.isValid || o.equalTo && !o.isValid;
				})[0];

				if (_typeof(firstRequired.value) === 'object') {
					var subFieldRequired = firstRequired.value.filter(function (o) {
						return o.isRequired && !o.isValid || o.greaterThan && !o.isValid || o.regEx && !o.isValid || o.equalTo && !o.isValid;
					})[0];
					document.getElementById(subFieldRequired.name).focus();
				} else {
					document.getElementById(firstRequired.name).focus();
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    className = _props.className,
			    style = _props.style,
			    viewport = _props.viewport,
			    succeed = _props.succeed,
			    isSent = _props.isSent,
			    sendButton = _props.sendButton,
			    textBeforeButton = _props.textBeforeButton,
			    buttonContainerStyle = _props.buttonContainerStyle,
			    textAfterButton = _props.textAfterButton;
			var controls = this.state.controls;

			var sendButtonClass = (0, _utils.sumClasses)([succeed !== null ? succeed ? 'btn btn-succeed' : 'btn btn-error' : 'btn', isSent ? 'spinner' : '', sendButton.disabled ? 'btn-disabled' : '']);
			var sendButtonValue = succeed === null ? sendButton.text : succeed === false ? sendButton.errorText : sendButton.succeedText;

			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)(['form-container', className !== null && className !== undefined ? className : '']), style: style },
				controls.map(function (item) {
					switch (item.control) {
						default:
							return null;
						case 'external':
							return _react2.default.createElement(
								'div',
								{ key: item.name },
								item.component
							);
						case 'text':
							if (item.hide) return null;
							return _react2.default.createElement(_CustomTextField2.default, {
								type: item.type,
								onlyNumber: item.onlyNumber,
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value ? item.value : '',
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								},
								isRequired: item.isRequired,
								isValid: item.isValid,
								disabled: item.disabled,
								errorMessage: item.errorMessage,
								className: item.className ? item.className : '',
								style: item.style,
								textAfter: item.textAfter,
								updateOnChange: item.updateOnChange,
								limitChar: item.limitChar,
								currency: item.currency
							});
						case 'plusMinus':
							if (item.hide) return null;
							return _react2.default.createElement(_CustomPlusMinus2.default, {
								type: item.type,
								onlyNumber: item.onlyNumber,
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: parseFloat(item.value),
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								},
								isRequired: item.isRequired,
								isValid: item.isValid,
								disabled: item.disabled,
								errorMessage: item.errorMessage,
								className: item.className ? item.className : '',
								style: item.style,
								textAfter: item.textAfter
							});
						case 'textArea':
							if (item.hide) return null;
							return _react2.default.createElement(_CustomTextarea2.default, {
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value ? item.value : '',
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								},
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								style: item.style,
								className: item.className ? item.className : ''
							});
						case 'select':
							if (item.hide) return null;
							return _react2.default.createElement(_CustomSelect2.default, {
								key: item.name,
								name: item.name,
								label: item.label,
								disabled: item.disabled,
								options: item.options,
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								},
								value: item.value,
								style: item.style,
								className: item.className ? item.className : '',
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								default: item.default
							});
						case 'check':
							if (item.hide) return null;
							return _react2.default.createElement(_CustomCheckBox2.default, {
								key: item.name,
								name: item.name,
								label: item.label,
								value: item.value,
								style: item.style,
								textBefore: item.textBefore,
								textAfter: item.textAfter,
								hideCheck: item.hideCheck,
								className: item.className ? item.className : '',
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								}
							});
						case 'radio':
							if (item.hide) return null;
							return _react2.default.createElement(_CustomRadio2.default, {
								key: item.name,
								name: item.name,
								label: item.label,
								options: item.options,
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								},
								value: (0, _utils.notEmpty)(item.value) ? item.value : item.default,
								hideRadio: item.hideRadio,
								uncheck: item.uncheck,
								className: item.className ? item.className : '',
								style: item.style,
								highlightSel: item.highlightSel
							});
						case 'label':
							if (item.hide) return null;
							return _react2.default.createElement(_CustomLabel2.default, {
								key: item.name,
								name: item.name,
								label: item.label,
								style: item.style,
								text: item.text,
								value: item.value,
								className: item.className ? item.className : ''
							});
						case 'tabTextArea':
							if (item.hide) return null;
							return _react2.default.createElement(_CustomTextAreaTab2.default, {
								key: item.name,
								name: item.name,
								value: item.value,
								tabs: item.tabs,
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								},
								style: item.style,
								className: item.className ? item.className : '',
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								valueAsObject: item.valueAsObject,
								limitChar: item.limitChar
							});
						case 'datepicker':
							if (item.hide) return null;
							return _react2.default.createElement(_DatePickerField2.default, {
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value,
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								},
								style: item.style,
								className: item.className ? item.className : '',
								updateOnChange: item.updateOnChange,
								errorMessage: item.errorMessage,
								isValid: item.isValid
							});
						case 'fakeselect':
							if (item.hide) return null;
							return _react2.default.createElement(_FakeSelect2.default, {
								key: item.name,
								name: item.name,
								label: item.label,
								value: item.value,
								text: item.text,
								onUpdate: function onUpdate(e) {
									_this4.onUpdate(e);
								},
								style: item.style,
								firstRange: item.firstRange,
								secondRange: item.secondRange,
								rangesStyle: item.rangesStyle,
								className: item.className ? item.className : '',
								overlayBg: item.overlayBg
							});
					}
				}),
				textBeforeButton,
				_react2.default.createElement(
					'div',
					{ className: 'button-container', style: buttonContainerStyle },
					_react2.default.createElement(
						'button',
						{
							className: sendButtonClass,
							style: sendButton.style,
							onClick: succeed === null && isSent === null && sendButton.disabled === undefined ? function () {
								_this4.formIsValid();
							} : function () {
								return null;
							},
							type: 'button'
						},
						sendButtonValue
					)
				),
				textAfterButton
			);
		}
	}]);

	return Form;
}(_react2.default.Component);

Form.propTypes = {
	textBeforeButton: _propTypes2.default.element,
	textAfterButton: _propTypes2.default.element,
	controls: _propTypes2.default.instanceOf(Object).isRequired,
	sendForm: _propTypes2.default.func,
	sendButton: _propTypes2.default.instanceOf(Object),
	style: _propTypes2.default.instanceOf(Object),
	onUpdate: _propTypes2.default.func,
	succeed: _propTypes2.default.bool,
	isSent: _propTypes2.default.bool
};

Form.defaultProps = {
	textBeforeButton: null,
	textAfterButton: null,
	sendButton: null,
	style: null,
	onUpdate: null,
	sendForm: null,
	succeed: null,
	isSent: null
};

exports.default = Form;