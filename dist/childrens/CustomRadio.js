"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FieldLabel = _interopRequireDefault(require("./childrenComponents/FieldLabel"));

var _utils = require("../helpers/utils");

require("./CustomRadio.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CustomRadio =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomRadio, _React$Component);

  function CustomRadio(props) {
    var _this;

    _classCallCheck(this, CustomRadio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomRadio).call(this, props));
    _this.state = {
      value: _this.props.value !== null ? _this.props.value : ''
    };
    return _this;
  }

  _createClass(CustomRadio, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.value !== nextProps.value) return true;
      if (this.state.value !== nextState.value) return true;
      return false;
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.setState({
        value: event.target.value
      });
      this.props.onUpdate(event);
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var _this2 = this;

      if (this.props.uncheck) {
        // eslint-disable-next-line
        if (this.state.value == event.target.value) {
          this.props.options.map(function (item) {
            /* eslint-disable-next-line */

            /* flow-disable-next-line */
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
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label,
          name = _this$props.name,
          hideRadio = _this$props.hideRadio,
          textBefore = _this$props.textBefore,
          options = _this$props.options,
          css = _this$props.css,
          isRequired = _this$props.isRequired,
          isValid = _this$props.isValid;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)([hideRadio ? 'container-field toggle-format' : 'container-field regular-radio', className]),
        style: style
      }, textBefore ? _react.default.createElement("div", {
        style: textBefore.style
      }, textBefore.text) : null, _react.default.createElement("div", {
        className: css
      }, _react.default.createElement(_FieldLabel.default, {
        label: label,
        name: name,
        isRequired: isRequired,
        isValid: isValid
      }), _react.default.createElement("div", {
        className: "float-container"
      }, options.map(function (item) {
        return _react.default.createElement("div", {
          key: "select_".concat(item.name, "_").concat(item.value),
          className: hideRadio && item.value === _this3.state.value ? "floating ".concat(item.value === options[0].value ? 'selected-radio' : 'selected-radio-red', " type type-selected ").concat(item.className, " text-type") : hideRadio ? "floating type ".concat(item.className, " text-type") : item.className,
          style: item.style
        }, _react.default.createElement("input", {
          type: 'radio',
          name: name,
          id: name + item.value,
          value: item.value,
          disabled: item.disabled === true,
          checked: item.value === _this3.state.value,
          onClick: _this3.handleClick.bind(_this3),
          onChange: _this3.onChange.bind(_this3)
        }), _react.default.createElement("label", {
          htmlFor: name + item.value,
          style: item.labelStyle ? item.labelStyle : {}
        }, hideRadio ? _react.default.createElement("span", {
          className: "hide-radio"
        }) : _react.default.createElement("div", {
          style: item.disabled === true ? {
            opacity: 0.5
          } : {}
        }), _react.default.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: item.label
          }
        }), item.customObject ? _react.default.createElement("div", {
          className: item.value === _this3.state.value ? 'custom-radio-options-wrapper custom-radio-options-wrapper-sel' : 'custom-radio-options-wrapper'
        }, item.customObject) : null));
      }))));
    }
  }]);

  return CustomRadio;
}(_react.default.Component);

var _default = CustomRadio;
exports.default = _default;