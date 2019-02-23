'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FieldLabel = require('./childrenComponents/FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

var _FieldError = require('./childrenComponents/FieldError');

var _FieldError2 = _interopRequireDefault(_FieldError);

var _utils = require('../helpers/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomTextField = function (_React$Component) {
	_inherits(CustomTextField, _React$Component);

	function CustomTextField(props) {
		_classCallCheck(this, CustomTextField);

		var _this = _possibleConstructorReturn(this, (CustomTextField.__proto__ || Object.getPrototypeOf(CustomTextField)).call(this, props));

		_this.state = {
			value: '' + _this.props.value,
			isValid: _this.props.isValid,
			editing: false
		};
		return _this;
	}

	_createClass(CustomTextField, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props.value !== nextProps.value) return true;
			if (this.state.value !== nextState.value) return true;
			if (this.props.isValid !== nextProps.isValid) return true;
			return false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.state.value !== nextProps.value) {
				this.setState({
					value: nextProps.value
				});
			}

			if (!nextProps.isValid) {
				this.setState({
					value: nextProps.value,
					isValid: nextProps.isValid
				});
			}
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			var value = this.props.limitChar ? event.target.value.substring(0, this.props.limitChar) : event.target.value;
			this.setState({
				value: this.props.onlyNumber ? value.replace(/\D/g, '') : value,
				isValid: true
			});
			if (this.props.updateOnChange === true) {
				this.props.onUpdate({
					target: {
						name: this.props.name,
						value: this.props.onlyNumber ? value.replace(/\D/g, '') : value
					}
				}, false);
			}
		}
	}, {
		key: 'onBlur',
		value: function onBlur(event) {
			if (this.state.editing && this.props.value !== this.state.value) {
				this.props.onUpdate(event, false);
			}

			this.setState({
				editing: false
			});
		}
	}, {
		key: 'onFocus',
		value: function onFocus() {
			this.setState({
				editing: true
			});
		}
	}, {
		key: 'handleKeyPress',
		value: function handleKeyPress(val) {
			if (val.key === 'Enter') {
				val.preventDefault();
			} else {
				this.setState({
					value: val.target.value,
					isValid: true
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    style = _props.style,
			    label = _props.label,
			    name = _props.name,
			    isRequired = _props.isRequired,
			    errorMessage = _props.errorMessage,
			    type = _props.type,
			    placeholder = _props.placeholder,
			    currency = _props.currency,
			    disabled = _props.disabled,
			    textAfter = _props.textAfter;
			var isValid = this.state.isValid;


			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)(['field-container', className]), style: style },
				_react2.default.createElement(_FieldLabel2.default, { label: label, name: name, isRequired: isRequired, isValid: isValid }),
				_react2.default.createElement('input', {
					type: type,
					placeholder: (0, _utils.camelToTitle)(placeholder, name),
					name: name,
					id: name,
					value: currency ? this.state.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : this.state.value,
					disabled: disabled,
					onKeyPress: function onKeyPress(e) {
						_this2.handleKeyPress(e);
					},
					onChange: function onChange(e) {
						_this2.onChange(e);
					},
					onBlur: function onBlur(e) {
						_this2.onBlur(e);
					},
					onFocus: function onFocus() {
						_this2.onFocus();
					},
					style: isValid === false ? { border: '1px solid #e4002b' } : {}
				}),
				_react2.default.createElement(_FieldError2.default, { isValid: isValid, errorMessage: errorMessage }),
				textAfter ? _react2.default.createElement(
					'div',
					{ style: textAfter.style },
					textAfter.text
				) : null
			);
		}
	}]);

	return CustomTextField;
}(_react2.default.Component);

CustomTextField.propTypes = {
	placeholder: _propTypes2.default.string,
	name: _propTypes2.default.string,
	type: _propTypes2.default.string,
	disabled: _propTypes2.default.bool,
	label: _propTypes2.default.instanceOf(Object),
	textAfter: _propTypes2.default.instanceOf(Object),
	onUpdate: _propTypes2.default.func,
	errorMessage: _propTypes2.default.string,
	className: _propTypes2.default.string,
	style: _propTypes2.default.instanceOf(Object),
	isRequired: _propTypes2.default.bool,
	onlyNumber: _propTypes2.default.bool,
	isValid: _propTypes2.default.bool,
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CustomTextField.defaultProps = {
	placeholder: null,
	name: null,
	type: null,
	disabled: false,
	label: null,
	textAfter: null,
	onUpdate: null,
	errorMessage: null,
	className: null,
	style: null,
	isRequired: false,
	onlyNumber: false,
	isValid: true,
	value: null
};

exports.default = CustomTextField;