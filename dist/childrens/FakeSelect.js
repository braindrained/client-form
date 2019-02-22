'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactOnclickout = require('react-onclickout');

var _reactOnclickout2 = _interopRequireDefault(_reactOnclickout);

var _FieldLabel = require('./childrenComponents/FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

var _FieldError = require('./childrenComponents/FieldError');

var _FieldError2 = _interopRequireDefault(_FieldError);

var _utils = require('../helpers/utils');

require('./FakeSelect.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// flow-disable-next-line


var FakeSelect = function (_React$Component) {
	_inherits(FakeSelect, _React$Component);

	function FakeSelect(props) {
		_classCallCheck(this, FakeSelect);

		var _this = _possibleConstructorReturn(this, (FakeSelect.__proto__ || Object.getPrototypeOf(FakeSelect)).call(this, props));

		_this.state = {
			value: _this.props.value,
			displaySelect: true
		};
		return _this;
	}

	_createClass(FakeSelect, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props.value !== nextProps.value) return true;
			if (this.state.value !== nextState.value) return true;
			if (this.state.displaySelect !== nextState.displaySelect) return true;
			return false;
		}
	}, {
		key: 'onClick',
		value: function onClick(val) {
			if (val !== this.state.displaySelect) {
				this.setState({
					displaySelect: val
				});
			}
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			var val = {
				min: event.target.name === 'min' ? event.target.value : this.props.value.min,
				max: event.target.name === 'max' ? event.target.value : this.props.value.max
			};
			this.setState({
				value: val
			});
			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: val
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
			    text = _props.text,
			    firstRange = _props.firstRange,
			    secondRange = _props.secondRange,
			    rangesStyle = _props.rangesStyle,
			    isRequired = _props.isRequired,
			    name = _props.name,
			    errorMessage = _props.errorMessage;
			var _state = this.state,
			    displaySelect = _state.displaySelect,
			    value = _state.value;

			var maxRange = this.props.value.min === '' ? secondRange : secondRange.filter(function (o) {
				return o.value > _this2.props.value.min || o.value === '';
			});
			var isValid = this.state.isValid;


			return _react2.default.createElement(
				'div',
				{ className: (0, _utils.sumClasses)(['field-container', className]), style: style },
				_react2.default.createElement(_FieldLabel2.default, { label: label, name: name, isRequired: isRequired, isValid: isValid }),
				_react2.default.createElement(
					'div',
					{
						className: 'select-style noselect',
						onClick: function onClick() {
							_this2.onClick(false);
						},
						style: { zIndex: displaySelect ? 1 : 0, paddingLeft: 8 }
					},
					value.min !== '' && value.max !== '' ? value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' -\n\t\t\t\t\t\t\t\t' + value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : value.min !== '' && value.max === '' ? 'da ' + value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : value.min === '' && value.max !== '' ? 'fino a ' + value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : text
				),
				_react2.default.createElement(_FieldError2.default, { isValid: isValid, errorMessage: errorMessage }),
				_react2.default.createElement(
					_reactOnclickout2.default,
					{ onClickOut: function onClickOut() {
							_this2.onClick(true);
						}, style: { maxHeight: 57 } },
					_react2.default.createElement(
						'div',
						{ className: 'fake-cont', style: { width: style.maxWidth, opacity: displaySelect ? '0' : '1', zIndex: displaySelect ? -1 : 1 } },
						_react2.default.createElement(
							'div',
							{ className: 'min-max' },
							'Min'
						),
						_react2.default.createElement(
							'div',
							{ className: 'select-style', style: Object.assign({}, rangesStyle, { marginBottom: 15, float: 'right' }) },
							_react2.default.createElement(
								'select',
								{ name: 'min', id: 'min', value: this.props.value.min, onChange: function onChange(o) {
										_this2.onChange(o);
									} },
								firstRange.map(function (item) {
									return _react2.default.createElement(
										'option',
										{ value: item.value, key: 'f_' + item.value },
										item.text
									);
								})
							)
						),
						_react2.default.createElement('div', { className: 'clear' }),
						_react2.default.createElement(
							'div',
							{ className: 'min-max' },
							'Max'
						),
						_react2.default.createElement(
							'div',
							{ className: 'select-style', style: Object.assign({}, rangesStyle, { marginBottom: 15, float: 'right' }) },
							_react2.default.createElement(
								'select',
								{ name: 'max', id: 'max', value: this.props.value.max, onChange: function onChange(o) {
										_this2.onChange(o);
									} },
								maxRange.map(function (item) {
									return _react2.default.createElement(
										'option',
										{ value: item.value, key: 'f_' + item.value },
										item.text
									);
								})
							)
						)
					)
				)
			);
		}
	}]);

	return FakeSelect;
}(_react2.default.Component);

FakeSelect.propTypes = {
	value: _propTypes2.default.instanceOf(Object),
	onUpdate: _propTypes2.default.func,
	name: _propTypes2.default.string,
	className: _propTypes2.default.string,
	style: _propTypes2.default.instanceOf(Object),
	label: _propTypes2.default.instanceOf(Object),
	text: _propTypes2.default.string,
	firstRange: _propTypes2.default.instanceOf(Object),
	secondRange: _propTypes2.default.instanceOf(Object),
	rangesStyle: _propTypes2.default.instanceOf(Object)
};

FakeSelect.defaultProps = {
	value: null,
	onUpdate: null,
	name: '',
	className: '',
	style: {},
	label: {},
	text: '',
	firstRange: null,
	secondRange: null,
	rangesStyle: null
};

exports.default = FakeSelect;