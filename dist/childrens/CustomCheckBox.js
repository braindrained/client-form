'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../helpers/utils');

require('./CustomCheckBox.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomCheckBox = function (_React$Component) {
	_inherits(CustomCheckBox, _React$Component);

	function CustomCheckBox(props) {
		_classCallCheck(this, CustomCheckBox);

		var _this = _possibleConstructorReturn(this, (CustomCheckBox.__proto__ || Object.getPrototypeOf(CustomCheckBox)).call(this, props));

		_this.state = {
			value: _this.props.value === 'false' || _this.props.value === null ? false : true
		};
		return _this;
	}

	_createClass(CustomCheckBox, [{
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
				value: event.target.checked
			});
			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: event.target.checked
				}
			});
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
			    textAfter = _props.textAfter,
			    textBefore = _props.textBefore;
			var value = this.state.value;


			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)(['field-container', className !== undefined ? className : 'check']), style: style },
				textBefore !== null && textBefore !== undefined ? textBefore : '',
				_react2.default.createElement(
					'div',
					{ className: 'check-filters' },
					_react2.default.createElement('div', { className: 'separator' }),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement('input', {
							type: 'checkbox',
							name: name,
							id: name,
							checked: value,
							onChange: function onChange(e) {
								_this2.onChange(e);
							}
						}),
						_react2.default.createElement(
							'label',
							{ htmlFor: name, style: label.style },
							_react2.default.createElement('div', null),
							_react2.default.createElement(
								'div',
								null,
								label.text
							)
						)
					)
				),
				textAfter !== null && textAfter !== undefined ? textAfter : ''
			);
		}
	}]);

	return CustomCheckBox;
}(_react2.default.Component);

exports.default = CustomCheckBox;