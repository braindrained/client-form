"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../helpers/utils");

require("./CustomCheckBox.scss");

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

var CustomCheckBox =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomCheckBox, _React$Component);

  function CustomCheckBox(props) {
    var _this;

    _classCallCheck(this, CustomCheckBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomCheckBox).call(this, props));
    _this.state = {
      value: _this.props.value === 'true' || _this.props.value === true
    };
    return _this;
  }

  _createClass(CustomCheckBox, [{
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
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label,
          name = _this$props.name,
          textBefore = _this$props.textBefore;
      var value = this.state.value;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)(['container-field', className !== undefined ? className : 'check']),
        style: style
      }, textBefore !== null && textBefore !== undefined ? textBefore : '', _react.default.createElement("div", {
        className: "check-filters"
      }, _react.default.createElement("div", {
        className: "separator"
      }), _react.default.createElement("div", null, _react.default.createElement("input", {
        type: 'checkbox',
        name: name,
        id: name,
        checked: value,
        onChange: function onChange(e) {
          _this2.onChange(e);
        }
      }), _react.default.createElement("label", {
        htmlFor: name,
        style: label.style
      }, _react.default.createElement("div", null), _react.default.createElement("div", null, label.text)))));
    }
  }]);

  return CustomCheckBox;
}(_react.default.Component);

exports.default = CustomCheckBox;