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

var CustomTextarea =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomTextarea, _React$Component);

  function CustomTextarea(props) {
    var _this;

    _classCallCheck(this, CustomTextarea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomTextarea).call(this, props));
    _this.state = {
      value: _this.props.value,
      isValid: _this.props.isValid
    };
    return _this;
  }

  _createClass(CustomTextarea, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.value !== nextProps.value) return true;
      if (this.state.value !== nextState.value) return true;
      if (this.props.isValid !== nextProps.isValid) return true;
      return false;
    }
  }, {
    key: "onChange",
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
    key: "render",
    value: function render() {
      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          label = _this$props.label,
          className = _this$props.className,
          style = _this$props.style,
          isRequired = _this$props.isRequired,
          name = _this$props.name,
          value = _this$props.value,
          errorMessage = _this$props.errorMessage,
          limitChar = _this$props.limitChar;
      var isValid = this.state.isValid;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)(['container-field', className]),
        style: style
      }, _react.default.createElement(_FieldLabel.default, {
        label: label,
        name: name,
        isRequired: isRequired,
        isValid: isValid
      }), _react.default.createElement("textarea", {
        placeholder: (0, _utils.camelToTitle)(placeholder, name),
        className: 'large-field',
        name: name,
        id: name,
        onChange: this.onChange.bind(this),
        value: value
      }), limitChar ? _react.default.createElement("div", {
        style: {
          textAlign: 'right',
          position: 'absolute',
          width: '100%'
        }
      }, value.length, "/", limitChar) : null, _react.default.createElement(_FieldError.default, {
        isValid: isValid,
        errorMessage: errorMessage
      }));
    }
  }]);

  return CustomTextarea;
}(_react.default.Component);

var _default = CustomTextarea;
exports.default = _default;