"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

var _moment = _interopRequireDefault(require("moment"));

var _FieldLabel = _interopRequireDefault(require("./childrenComponents/FieldLabel"));

var _FieldError = _interopRequireDefault(require("./childrenComponents/FieldError"));

require("./DatePickerField.scss");

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

_moment.default.locale('it');

var DatePickerField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePickerField, _React$Component);

  function DatePickerField(props) {
    var _this;

    _classCallCheck(this, DatePickerField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePickerField).call(this, props));
    _this.state = {
      value: _this.props.value ? (0, _moment.default)(_this.props.value, 'DD/MM/YYYY') : (0, _moment.default)()
    };
    return _this;
  }

  _createClass(DatePickerField, [{
    key: "handleChange",
    value: function handleChange(date) {
      this.setState({
        value: date
      });

      if (this.props.updateOnChange === true) {
        this.props.onUpdate({
          target: {
            name: this.props.name,
            value: (0, _moment.default)(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
          }
        }, false);
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      if (event !== undefined) this.props.onUpdate(event, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          label = _this$props.label,
          name = _this$props.name,
          className = _this$props.className,
          isRequired = _this$props.isRequired,
          greaterThan = _this$props.greaterThan,
          errorMessage = _this$props.errorMessage,
          isValid = _this$props.isValid;
      return _react.default.createElement("div", {
        className: "container-field ".concat(className),
        style: this.props.style
      }, _react.default.createElement("input", {
        type: "text",
        id: name,
        style: {
          opacity: 0,
          height: 0
        }
      }), _react.default.createElement(_FieldLabel.default, {
        label: label,
        name: name,
        isRequired: isRequired,
        isValid: isValid
      }), _react.default.createElement("div", {
        className: "field-picker-container"
      }, _react.default.createElement(_reactDatepicker.default, {
        name: name,
        selected: this.state.value,
        onChange: function onChange(e) {
          _this2.handleChange(e);
        },
        onBlur: function onBlur(e) {
          _this2.onBlur(e);
        }
      })), _react.default.createElement(_FieldError.default, {
        isValid: isValid,
        errorMessage: errorMessage
      }));
    }
  }]);

  return DatePickerField;
}(_react.default.Component);

var _default = DatePickerField;
exports.default = _default;