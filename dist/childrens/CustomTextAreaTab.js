'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../helpers/utils');

var _FieldError = require('./childrenComponents/FieldError');

var _FieldError2 = _interopRequireDefault(_FieldError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomTextareaWithTab = function (_React$Component) {
	_inherits(CustomTextareaWithTab, _React$Component);

	function CustomTextareaWithTab(props) {
		_classCallCheck(this, CustomTextareaWithTab);

		var _this = _possibleConstructorReturn(this, (CustomTextareaWithTab.__proto__ || Object.getPrototypeOf(CustomTextareaWithTab)).call(this, props));

		_this.state = {
			tabs: _this.props.tabs,
			value: _this.props.value,
			selected: 0
		};
		return _this;
	}

	_createClass(CustomTextareaWithTab, [{
		key: 'filterTabs',
		value: function filterTabs(obj) {
			if (this === obj.name) {
				return true;
			}
			return false;
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			var _this2 = this;

			var formObject = [];
			this.state.value.map(function (item) {
				if (item.name === event.target.name) {
					item.value = event.target.value.replace(/<(?:.|\n)*?>/gm, '').replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/, '').substring(0, _this2.props.limitChar);
				}
				formObject.push(item);
				return null;
			});

			this.setState({
				value: formObject
			});

			var eventObject = {
				target: {
					name: this.props.name,
					value: formObject
				}
			};

			this.props.onUpdate(eventObject);
		}
	}, {
		key: 'selectTab',
		value: function selectTab(wich) {
			this.setState({
				selected: wich
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    className = _props.className,
			    style = _props.style,
			    name = _props.name,
			    isValid = _props.isValid,
			    tabs = _props.tabs,
			    value = _props.value,
			    limitChar = _props.limitChar,
			    errorMessage = _props.errorMessage;


			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)(['container-field', className]), style: style },
				_react2.default.createElement(
					'div',
					{ className: 'container-field-tabs', id: name },
					this.state.tabs.map(function (item, i) {
						return _react2.default.createElement(
							'div',
							{
								key: item.name,
								style: {
									borderRadius: i === 0 ? '4px 0px 0px 0px' : i === 4 ? '0px 4px 0px 0px' : '0px',
									textAlign: 'left'
								},
								className: _this3.state.selected === i ? 'container-field-tabs-item container-field-tabs-item-selected' : 'container-field-tabs-item',
								onClick: _this3.selectTab.bind(_this3, i),
								role: 'button'
							},
							_react2.default.createElement(
								'div',
								{ className: 'noselect' },
								_react2.default.createElement(
									'span',
									{ className: 'tab-label' },
									item.label
								),
								_react2.default.createElement(
									'span',
									{ className: 'tab-abbr' },
									item.abbr
								)
							)
						);
					})
				),
				value.map(function (item, i) {
					return _react2.default.createElement(
						'div',
						{
							key: item.name,
							style: {
								width: '100%',
								float: 'left',
								display: _this3.state.selected === i ? 'inline-block' : 'none',
								position: 'relative'
							}
						},
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('textarea', {
								placeholder: tabs[i].placeholder,
								className: 'large-field',
								name: item.name,
								id: item.name,
								onChange: function onChange(e) {
									_this3.onChange(e);
								},
								value: item.value,
								style: {
									borderRadius: '0px 4px 4px',
									height: 200,
									resize: 'none',
									border: !isValid ? '1px solid #e4002b' : '1px solid #949da2'
								},
								rows: 2,
								cols: 20
							})
						),
						_react2.default.createElement(
							'div',
							{ style: { textAlign: 'right',
									position: 'absolute',
									width: '100%'
								} },
							item.value.length,
							'/',
							limitChar
						)
					);
				}),
				_react2.default.createElement(_FieldError2.default, { isValid: isValid, errorMessage: errorMessage, style: { paddingRight: 60 } })
			);
		}
	}]);

	return CustomTextareaWithTab;
}(_react2.default.Component);

exports.default = CustomTextareaWithTab;