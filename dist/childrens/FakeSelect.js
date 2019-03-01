"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactOnclickout = _interopRequireDefault(require("react-onclickout"));

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

var FakeSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FakeSelect, _React$Component);

  function FakeSelect(props) {
    var _this;

    _classCallCheck(this, FakeSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FakeSelect).call(this, props));
    _this.state = {
      value: _this.props.value,
      displaySelect: true
    };
    return _this;
  }

  _createClass(FakeSelect, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.value !== nextProps.value) return true;
      if (this.state.value !== nextState.value) return true;
      if (this.state.displaySelect !== nextState.displaySelect) return true;
      return false;
    }
  }, {
    key: "onClick",
    value: function onClick(val) {
      if (val !== this.state.displaySelect) {
        this.setState({
          displaySelect: val
        });
      }
    }
  }, {
    key: "onChange",
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
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label,
          text = _this$props.text,
          firstRange = _this$props.firstRange,
          secondRange = _this$props.secondRange,
          rangesStyle = _this$props.rangesStyle,
          isRequired = _this$props.isRequired,
          name = _this$props.name,
          errorMessage = _this$props.errorMessage,
          overlayBg = _this$props.overlayBg;
      var _this$state = this.state,
          displaySelect = _this$state.displaySelect,
          value = _this$state.value;
      var maxRange = this.props.value.min === '' ? secondRange : secondRange.filter(function (o) {
        return o.value > _this2.props.value.min || o.value === '';
      });
      var isValid = this.state.isValid;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)(['container-field', className]),
        style: style
      }, _react.default.createElement(_FieldLabel.default, {
        label: label,
        name: name,
        isRequired: isRequired,
        isValid: isValid
      }), _react.default.createElement(_reactOnclickout.default, {
        onClickOut: function onClickOut() {
          _this2.onClick(true);
        },
        style: {
          maxHeight: 57
        }
      }, _react.default.createElement("div", {
        className: 'select-style noselect',
        onClick: function onClick() {
          _this2.onClick(false);
        },
        style: {
          zIndex: displaySelect ? 1 : 0,
          paddingLeft: 8
        }
      }, value.min !== '' && value.max !== '' ? "".concat(value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'), " -\n\t\t\t\t\t\t\t\t").concat(value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')) : value.min !== '' && value.max === '' ? "da ".concat(value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')) : value.min === '' && value.max !== '' ? "fino a ".concat(value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')) : text), _react.default.createElement(_FieldError.default, {
        isValid: isValid,
        errorMessage: errorMessage
      }), _react.default.createElement("div", {
        className: "fake-cont box-shadow",
        style: {
          width: style.maxWidth,
          opacity: displaySelect ? '0' : '1',
          zIndex: displaySelect ? -1 : 1,
          background: overlayBg
        }
      }, _react.default.createElement("div", {
        className: "min-max"
      }, "Min"), _react.default.createElement("div", {
        className: "select-style",
        style: Object.assign({}, rangesStyle, {
          marginBottom: 10,
          float: 'right'
        })
      }, _react.default.createElement("select", {
        name: "min",
        id: "min",
        value: this.props.value.min,
        onChange: function onChange(o) {
          _this2.onChange(o);
        }
      }, firstRange.map(function (item) {
        return _react.default.createElement("option", {
          value: item.value,
          key: "f_".concat(item.value)
        }, item.text);
      }))), _react.default.createElement("div", {
        className: "clear"
      }), _react.default.createElement("div", {
        className: "min-max"
      }, "Max"), _react.default.createElement("div", {
        className: "select-style",
        style: Object.assign({}, rangesStyle, {
          marginBottom: 10,
          float: 'right'
        })
      }, _react.default.createElement("select", {
        name: "max",
        id: "max",
        value: this.props.value.max,
        onChange: function onChange(o) {
          _this2.onChange(o);
        }
      }, maxRange.map(function (item) {
        return _react.default.createElement("option", {
          value: item.value,
          key: "f_".concat(item.value)
        }, item.text);
      }))))));
    }
  }]);

  return FakeSelect;
}(_react.default.Component);

var _default = FakeSelect;
exports.default = _default;