'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./DatePickerField.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// flow-disable-next-line


_moment2.default.locale('it');

var DatePickerField = function (_React$Component) {
	_inherits(DatePickerField, _React$Component);

	function DatePickerField(props) {
		_classCallCheck(this, DatePickerField);

		var _this = _possibleConstructorReturn(this, (DatePickerField.__proto__ || Object.getPrototypeOf(DatePickerField)).call(this, props));

		_this.state = {
			value: _this.props.value ? (0, _moment2.default)(_this.props.value, 'DD/MM/YYYY') : (0, _moment2.default)()
		};
		return _this;
	}

	_createClass(DatePickerField, [{
		key: 'handleChange',
		value: function handleChange(date) {
			this.setState({
				value: date
			});
			if (this.props.updateOnChange === true) {
				this.props.onUpdate({
					target: {
						name: this.props.name,
						value: (0, _moment2.default)(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
					}
				}, false);
			}
		}
	}, {
		key: 'onBlur',
		value: function onBlur(event) {
			if (event !== undefined) this.props.onUpdate(event, false);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    label = _props.label,
			    name = _props.name,
			    className = _props.className,
			    isRequired = _props.isRequired,
			    greaterThan = _props.greaterThan,
			    errorMessage = _props.errorMessage,
			    isValid = _props.isValid;


			return _react2.default.createElement(
				'div',
				{ className: 'container-field ' + className, style: this.props.style },
				_react2.default.createElement('input', { type: 'text', id: name, style: { opacity: 0, height: 0 } }),
				_react2.default.createElement(
					'div',
					{ className: 'field-label noselect', style: Object.assign({}, label.style, !isValid ? { color: '#e4002b' } : {}) },
					label.text
				),
				_react2.default.createElement(
					'div',
					{ className: 'field-picker-container' },
					_react2.default.createElement(_reactDatepicker2.default, {
						name: name,
						selected: this.state.value,
						onChange: function onChange(e) {
							_this2.handleChange(e);
						},
						onBlur: function onBlur(e) {
							_this2.onBlur(e);
						}
					})
				),
				_react2.default.createElement(
					'span',
					{ className: 'validation-error noselect' },
					(isRequired || greaterThan) && !isValid ? errorMessage : '',
					'\xA0'
				)
			);
		}
	}]);

	return DatePickerField;
}(_react2.default.Component);

exports.default = DatePickerField;