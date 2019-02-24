'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FieldLabel = require('./childrenComponents/FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

var _utils = require('../helpers/utils');

require('./CustomRadio.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// flow-disable-next-line


var CustomRadio = function (_React$Component) {
	_inherits(CustomRadio, _React$Component);

	function CustomRadio(props) {
		_classCallCheck(this, CustomRadio);

		var _this = _possibleConstructorReturn(this, (CustomRadio.__proto__ || Object.getPrototypeOf(CustomRadio)).call(this, props));

		_this.state = {
			value: _this.props.value !== null ? _this.props.value : ''
		};
		return _this;
	}

	_createClass(CustomRadio, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props.value !== nextProps.value) return true;
			if (this.state.value !== nextState.value) return true;
			return false;
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			this.setState({
				value: event.target.value
			});
			this.props.onUpdate(event);
		}
	}, {
		key: 'handleClick',
		value: function handleClick(event) {
			var _this2 = this;

			if (this.props.uncheck) {
				// eslint-disable-next-line
				if (this.state.value == event.target.value) {
					this.props.options.map(function (item) {
						/* eslint-disable-next-line */ /* flow-disable-next-line */
						document.getElementById(_this2.props.name + item.value).checked = false;
						return null;
					});
					this.setState({
						value: null
					});
					this.props.onUpdate({
						target: {
							name: this.props.name,
							value: null
						}
					});
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    className = _props.className,
			    style = _props.style,
			    label = _props.label,
			    name = _props.name,
			    hideRadio = _props.hideRadio,
			    textBefore = _props.textBefore,
			    options = _props.options,
			    css = _props.css,
			    isRequired = _props.isRequired,
			    isValid = _props.isValid;


			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)([hideRadio ? 'container-field toggle-format' : 'container-field regular-radio', className]), style: style },
				textBefore ? _react2.default.createElement(
					'div',
					{ style: textBefore.style },
					textBefore.text
				) : null,
				_react2.default.createElement(
					'div',
					{ className: css },
					_react2.default.createElement(_FieldLabel2.default, { label: label, name: name, isRequired: isRequired, isValid: isValid }),
					_react2.default.createElement(
						'div',
						{ className: 'float-container' },
						options.map(function (item) {
							return _react2.default.createElement(
								'div',
								{
									key: 'select_' + item.name + '_' + item.value,
									className: hideRadio && item.value === _this3.state.value ? 'floating ' + (item.value === options[0].value ? 'selected-radio' : 'selected-radio-red') + ' type type-selected ' + item.className + ' text-type' : hideRadio ? 'floating type ' + item.className + ' text-type' : item.className,
									style: item.style
								},
								_react2.default.createElement('input', {
									type: 'radio',
									name: name,
									id: name + item.value,
									value: item.value,
									disabled: item.disabled === true,
									checked: item.value === _this3.state.value,
									onClick: _this3.handleClick.bind(_this3),
									onChange: _this3.onChange.bind(_this3)
								}),
								_react2.default.createElement(
									'label',
									{ htmlFor: name + item.value, style: item.labelStyle ? item.labelStyle : {} },
									hideRadio ? _react2.default.createElement('span', { className: 'hide-radio' }) : _react2.default.createElement('div', { style: item.disabled === true ? { opacity: 0.5 } : {} }),
									_react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: item.label } }),
									item.customObject ? _react2.default.createElement(
										'div',
										{ className: item.value === _this3.state.value ? 'custom-radio-options-wrapper custom-radio-options-wrapper-sel' : 'custom-radio-options-wrapper' },
										item.customObject
									) : null
								)
							);
						})
					)
				)
			);
		}
	}]);

	return CustomRadio;
}(_react2.default.Component);

exports.default = CustomRadio;