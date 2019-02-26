"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FieldLabel = _interopRequireDefault(require("./childrenComponents/FieldLabel"));

var _FieldError = _interopRequireDefault(require("./childrenComponents/FieldError"));

var _utils = require("../helpers/utils");

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

var CustomTextField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomTextField, _React$Component);

  function CustomTextField(props) {
    var _this;

    _classCallCheck(this, CustomTextField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomTextField).call(this, props));
    _this.state = {
      value: "".concat(_this.props.value),
      isValid: _this.props.isValid,
      editing: false
    };
    return _this;
  }

  _createClass(CustomTextField, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.value !== nextProps.value) return true;
      if (this.state.value !== nextState.value) return true;
      if (this.props.isValid !== nextProps.isValid) return true;
      return false;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.value !== nextProps.value) {
        this.setState({
          value: nextProps.value
        });
      }

      if (!nextProps.isValid) {
        this.setState({
          value: nextProps.value,
          isValid: nextProps.isValid
        });
      }
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var value = this.props.limitChar ? event.target.value.substring(0, this.props.limitChar) : event.target.value;
      this.setState({
        value: this.props.onlyNumber ? value.replace(/\D/g, '') : value,
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
    key: "onBlur",
    value: function onBlur(event) {
      if (this.state.editing && this.props.value !== this.state.value) {
        this.props.onUpdate(event, false);
      }

      this.setState({
        editing: false
      });
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        editing: true
      });
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(val) {
      if (val.key === 'Enter') {
        val.preventDefault();
      } else {
        this.setState({
          value: val.target.value,
          isValid: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label,
          name = _this$props.name,
          isRequired = _this$props.isRequired,
          errorMessage = _this$props.errorMessage,
          type = _this$props.type,
          placeholder = _this$props.placeholder,
          currency = _this$props.currency,
          disabled = _this$props.disabled,
          textAfter = _this$props.textAfter;
      var isValid = this.state.isValid;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)(['container-field', className]),
        style: style
      }, _react.default.createElement(_FieldLabel.default, {
        label: label,
        name: name,
        isRequired: isRequired,
        isValid: isValid
      }), _react.default.createElement("input", {
        type: type,
        placeholder: (0, _utils.camelToTitle)(placeholder, name),
        name: name,
        id: name,
        value: currency ? this.state.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : this.state.value,
        disabled: disabled,
        onKeyPress: function onKeyPress(e) {
          _this2.handleKeyPress(e);
        },
        onChange: function onChange(e) {
          _this2.onChange(e);
        },
        onBlur: function onBlur(e) {
          _this2.onBlur(e);
        },
        onFocus: function onFocus() {
          _this2.onFocus();
        },
        style: isValid === false ? {
          border: '1px solid #e4002b'
        } : {}
      }), _react.default.createElement(_FieldError.default, {
        isValid: isValid,
        errorMessage: errorMessage
      }), textAfter ? _react.default.createElement("div", {
        style: textAfter.style
      }, textAfter.text) : null);
    }
  }]);

  return CustomTextField;
}(_react.default.Component);

var _default = CustomTextField;
exports.default = _default;