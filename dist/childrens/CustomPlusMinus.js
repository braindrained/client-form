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

var CustomPlusMinus =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomPlusMinus, _React$Component);

  function CustomPlusMinus(props) {
    var _this;

    _classCallCheck(this, CustomPlusMinus);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomPlusMinus).call(this, props));
    _this.state = {
      value: _this.props.value === '' ? 0 : parseFloat(_this.props.value)
    };
    return _this;
  }

  _createClass(CustomPlusMinus, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.value !== nextProps.value) return true;
      if (this.state.value !== nextState.value) return true;
      return false;
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
      this.setState({
        value: value
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      this.props.onUpdate(event, false);
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      } else {
        var value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
        this.setState({
          value: value
        });
      }
    }
  }, {
    key: "plusMinus",
    value: function plusMinus(val) {
      var value = val === 'min' ? this.state.value === 0 ? 0 : parseFloat(this.state.value) - 1 : parseFloat(this.state.value) + 1;
      this.setState({
        value: parseFloat(value)
      });
      this.props.onUpdate({
        target: {
          name: this.props.name,
          value: parseFloat(value)
        }
      }, false);
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
          type = _this$props.type,
          disabled = _this$props.disabled,
          isRequired = _this$props.isRequired,
          errorMessage = _this$props.errorMessage,
          isValid = _this$props.isValid;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)(['container-field cutom-plus-minus', className]),
        style: style
      }, _react.default.createElement(_FieldLabel.default, {
        label: label,
        name: name,
        isRequired: isRequired,
        isValid: isValid
      }), _react.default.createElement("div", {
        style: {
          float: 'left'
        }
      }, _react.default.createElement("div", {
        onClick: function onClick() {
          _this2.plusMinus('min');
        },
        style: {
          opacity: this.state.value === 0 ? 0.3 : 1
        },
        className: 'box-shadow noselect cutom-plus-minus-min'
      }, "-"), _react.default.createElement("div", {
        style: {
          float: 'left'
        }
      }, _react.default.createElement("input", {
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
        style: {
          border: 'none',
          background: 'none',
          width: 40,
          textAlign: 'center'
        }
      })), _react.default.createElement("div", {
        onClick: function onClick() {
          _this2.plusMinus('plus');
        },
        style: {},
        className: 'box-shadow noselect cutom-plus-minus-plus'
      }, "+")), _react.default.createElement(_FieldError.default, {
        isValid: isValid,
        errorMessage: errorMessage
      }));
    }
  }]);

  return CustomPlusMinus;
}(_react.default.Component);

var _default = CustomPlusMinus;
exports.default = _default;