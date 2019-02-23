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

var CustomTextarea = function (_React$Component) {
	_inherits(CustomTextarea, _React$Component);

	function CustomTextarea(props) {
		_classCallCheck(this, CustomTextarea);

		var _this = _possibleConstructorReturn(this, (CustomTextarea.__proto__ || Object.getPrototypeOf(CustomTextarea)).call(this, props));

		_this.state = {
			value: _this.props.value,
			error: false
		};
		return _this;
	}

	_createClass(CustomTextarea, [{
		key: 'onChange',
		value: function onChange(event) {
			this.setState({ value: event.target.value });
			this.props.onUpdate(event);
		}
	}, {
		key: 'onBlur',
		value: function onBlur() {
			this.validation();
		}
	}, {
		key: 'validation',
		value: function validation() {
			if (this.props.isRequired) {
				var value = this.state.value;

				this.setState({ error: !value });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    placeholder = _props.placeholder,
			    label = _props.label,
			    className = _props.className,
			    style = _props.style,
			    isRequired = _props.isRequired,
			    name = _props.name,
			    value = _props.value,
			    isValid = _props.isValid,
			    errorMessage = _props.errorMessage;


			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)(['field-container', className]), style: style },
				_react2.default.createElement(_FieldLabel2.default, { label: label, name: name, isRequired: isRequired, isValid: isValid }),
				_react2.default.createElement('textarea', {
					placeholder: (0, _utils.camelToTitle)(placeholder, name),
					className: 'large-field',
					name: name,
					id: name,
					onChange: this.onChange.bind(this),
					onBlur: this.onBlur.bind(this),
					value: value
				}),
				_react2.default.createElement(_FieldError2.default, { isValid: isValid, errorMessage: errorMessage })
			);
		}
	}]);

	return CustomTextarea;
}(_react2.default.Component);

CustomTextarea.propTypes = {
	placeholder: _propTypes2.default.string,
	name: _propTypes2.default.string,
	label: _propTypes2.default.instanceOf(Object),
	onUpdate: _propTypes2.default.func,
	errorMessage: _propTypes2.default.string,
	className: _propTypes2.default.string,
	style: _propTypes2.default.instanceOf(Object),
	isRequired: _propTypes2.default.bool,
	isValid: _propTypes2.default.bool,
	value: _propTypes2.default.string
};

CustomTextarea.defaultProps = {
	placeholder: null,
	name: null,
	label: null,
	onUpdate: null,
	errorMessage: null,
	className: null,
	style: null,
	isRequired: false,
	isValid: true,
	value: null
};

exports.default = CustomTextarea;