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

var CustomSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomSelect, _React$Component);

  function CustomSelect(props) {
    var _this;

    _classCallCheck(this, CustomSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomSelect).call(this, props));
    _this.state = {
      options: _this.props.options,
      isValid: _this.props.isValid
    };
    return _this;
  }

  _createClass(CustomSelect, [{
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
      if (nextProps.options.length !== this.state.options.length) {
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
    key: "onChange",
    value: function onChange(event) {
      this.props.onUpdate(event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label,
          isRequired = _this$props.isRequired,
          value = _this$props.value,
          errorMessage = _this$props.errorMessage,
          name = _this$props.name;
      var isValid = this.state.isValid;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)(['container-field', className]),
        style: style
      }, _react.default.createElement(_FieldLabel.default, {
        label: label,
        name: name,
        isRequired: isRequired,
        isValid: isValid
      }), _react.default.createElement("div", {
        className: "select-style",
        style: isValid === false ? {
          borderColor: '#e4002b'
        } : {}
      }, _react.default.createElement("select", {
        name: name,
        id: name,
        value: value,
        onChange: this.onChange.bind(this)
      }, this.state.options.map(function (item, i) {
        switch (item.value) {
          case '0':
            return _react.default.createElement("option", {
              key: "cs_".concat(i),
              value: "0",
              className: "disabled-option"
            }, item.label);

          default:
            return _react.default.createElement("option", {
              key: "cs_".concat(i),
              value: item.value,
              disabled: item.disabled
            }, item.label);
        }
      }))), _react.default.createElement(_FieldError.default, {
        isValid: isValid,
        errorMessage: errorMessage
      }));
    }
  }]);

  return CustomSelect;
}(_react.default.Component);

var _default = CustomSelect;
exports.default = _default;