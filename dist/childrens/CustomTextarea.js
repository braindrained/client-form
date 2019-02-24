'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
			isValid: _this.props.isValid
		};
		return _this;
	}

	_createClass(CustomTextarea, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props.value !== nextProps.value) return true;
			if (this.state.value !== nextState.value) return true;
			if (this.props.isValid !== nextProps.isValid) return true;
			return false;
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			var value = this.props.limitChar ? event.target.value.substring(0, this.props.limitChar) : event.target.value;
			this.setState({
				value: value,
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
			    errorMessage = _props.errorMessage,
			    limitChar = _props.limitChar;
			var isValid = this.state.isValid;


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
					value: value
				}),
				limitChar ? _react2.default.createElement(
					'div',
					{ style: { textAlign: 'right', position: 'absolute', width: '100%' } },
					value.length,
					'/',
					limitChar
				) : null,
				_react2.default.createElement(_FieldError2.default, { isValid: isValid, errorMessage: errorMessage })
			);
		}
	}]);

	return CustomTextarea;
}(_react2.default.Component);

exports.default = CustomTextarea;