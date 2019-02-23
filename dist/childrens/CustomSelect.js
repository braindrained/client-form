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

var CustomSelect = function (_React$Component) {
	_inherits(CustomSelect, _React$Component);

	function CustomSelect(props) {
		_classCallCheck(this, CustomSelect);

		var _this = _possibleConstructorReturn(this, (CustomSelect.__proto__ || Object.getPrototypeOf(CustomSelect)).call(this, props));

		_this.state = {
			options: _this.props.options
		};
		return _this;
	}

	_createClass(CustomSelect, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props.value !== nextProps.value) return true;
			if (this.state.value !== nextState.value) return true;
			return false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options.length !== this.state.options.length) {
				console.log('componentWillReceiveProps');
				this.setState({
					options: nextProps.options
				});

				this.props.onUpdate({
					target: {
						name: this.props.name,
						value: ''
					}
				});
			}
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			this.props.onUpdate(event);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    style = _props.style,
			    label = _props.label,
			    isValid = _props.isValid,
			    isRequired = _props.isRequired,
			    value = _props.value,
			    errorMessage = _props.errorMessage,
			    name = _props.name;


			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)(['field-container', className]), style: style },
				_react2.default.createElement(_FieldLabel2.default, { label: label, name: name, isRequired: isRequired, isValid: isValid }),
				_react2.default.createElement(
					'div',
					{ className: 'select-style', style: !isValid ? { borderColor: '#e4002b' } : {} },
					_react2.default.createElement(
						'select',
						{ name: name, id: name, value: value, onChange: this.onChange.bind(this) },
						this.state.options.map(function (item, i) {
							switch (item.value) {
								case '0':
									return _react2.default.createElement(
										'option',
										{ key: 'cs_' + i, value: '0', className: 'disabled-option' },
										item.label
									);
								default:
									return _react2.default.createElement(
										'option',
										{ key: 'cs_' + i, value: item.value, disabled: item.disabled },
										item.label
									);
							}
						})
					)
				),
				_react2.default.createElement(_FieldError2.default, { isValid: isValid, errorMessage: errorMessage })
			);
		}
	}]);

	return CustomSelect;
}(_react2.default.Component);

CustomSelect.propTypes = {
	options: _propTypes2.default.instanceOf(Object),
	onUpdate: _propTypes2.default.func,
	name: _propTypes2.default.string,
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	default: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	className: _propTypes2.default.string,
	style: _propTypes2.default.instanceOf(Object),
	label: _propTypes2.default.instanceOf(Object),
	isValid: _propTypes2.default.bool,
	isRequired: _propTypes2.default.bool,
	errorMessage: _propTypes2.default.string
};

CustomSelect.defaultProps = {
	options: null,
	onUpdate: null,
	name: '',
	value: '',
	default: null,
	className: '',
	style: null,
	label: null,
	isValid: true,
	isRequired: false,
	errorMessage: ''
};

exports.default = CustomSelect;