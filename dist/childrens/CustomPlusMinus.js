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

var CustomPlusMinus = function (_React$Component) {
	_inherits(CustomPlusMinus, _React$Component);

	function CustomPlusMinus(props) {
		_classCallCheck(this, CustomPlusMinus);

		var _this = _possibleConstructorReturn(this, (CustomPlusMinus.__proto__ || Object.getPrototypeOf(CustomPlusMinus)).call(this, props));

		_this.state = {
			value: _this.props.value === '' ? 0 : parseFloat(_this.props.value),
			error: !_this.props.isValid
		};
		return _this;
	}

	_createClass(CustomPlusMinus, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props.value !== nextProps.value) return true;
			if (this.state.value !== nextState.value) return true;
			return false;
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			var value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
			this.setState({
				value: value,
				error: false
			});
		}
	}, {
		key: 'onBlur',
		value: function onBlur(event) {
			this.props.onUpdate(event, false);
		}
	}, {
		key: 'handleKeyPress',
		value: function handleKeyPress(event) {
			if (event.key === 'Enter') {
				event.preventDefault();
			} else {
				var value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
				this.setState({
					value: value,
					error: false
				});
			}
		}
	}, {
		key: 'plusMinus',
		value: function plusMinus(val) {
			var value = val === 'min' ? this.state.value === 0 ? 0 : parseFloat(this.state.value) - 1 : parseFloat(this.state.value) + 1;
			this.setState({
				value: parseFloat(value),
				error: false
			});

			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: parseFloat(value)
				}
			}, false);
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
			    type = _props.type,
			    disabled = _props.disabled,
			    isRequired = _props.isRequired,
			    errorMessage = _props.errorMessage,
			    textAfter = _props.textAfter,
			    isValid = _props.isValid;


			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)(['field-container cutom-plus-minus', className]), style: style },
				_react2.default.createElement(_FieldLabel2.default, { label: label, name: name, isRequired: isRequired, isValid: isValid }),
				_react2.default.createElement(
					'div',
					{ style: { float: 'left' } },
					_react2.default.createElement(
						'div',
						{
							onClick: function onClick() {
								_this2.plusMinus('min');
							},
							style: {
								float: 'left',
								width: 30,
								lineHeight: '30px',
								borderRadius: 15,
								backgroundColor: '#323f48',
								color: '#fff',
								fontWeight: 700,
								textAlign: 'center',
								fontSize: 16,
								marginRight: 30,
								cursor: 'pointer',
								opacity: this.state.value === 0 ? 0.3 : 1
							},
							className: 'box-shadow noselect'
						},
						'-'
					),
					_react2.default.createElement(
						'div',
						{ style: { float: 'left' } },
						_react2.default.createElement('input', {
							type: type,
							name: name,
							id: name,
							value: this.state.value,
							disabled: disabled,
							onKeyPress: function onKeyPress(e) {
								_this2.handleKeyPress(e);
							},
							onChange: this.onChange.bind(this),
							onBlur: this.onBlur.bind(this),
							style: { border: 'none', background: 'none', width: 40, textAlign: 'center' }
						})
					),
					_react2.default.createElement(
						'div',
						{
							onClick: function onClick() {
								_this2.plusMinus('plus');
							},
							style: { float: 'left', width: 30, lineHeight: '30px', borderRadius: 15, backgroundColor: '#323f48', color: '#fff', fontWeight: 700, textAlign: 'center', fontSize: 16, marginLeft: 25, cursor: 'pointer' },
							className: 'box-shadow noselect'
						},
						'+'
					)
				),
				_react2.default.createElement(_FieldError2.default, { isValid: isValid, errorMessage: errorMessage }),
				textAfter ? _react2.default.createElement(
					'div',
					{ style: textAfter.style },
					textAfter.text
				) : null
			);
		}
	}]);

	return CustomPlusMinus;
}(_react2.default.Component);

CustomPlusMinus.propTypes = {
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
	isValid: _propTypes2.default.bool,
	value: _propTypes2.default.number
};

CustomPlusMinus.defaultProps = {
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
	isValid: true,
	value: null
};

exports.default = CustomPlusMinus;