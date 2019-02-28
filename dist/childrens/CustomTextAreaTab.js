"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../helpers/utils");

var _FieldError = _interopRequireDefault(require("./childrenComponents/FieldError"));

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

var CustomTextareaWithTab =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomTextareaWithTab, _React$Component);

  function CustomTextareaWithTab(props) {
    var _this;

    _classCallCheck(this, CustomTextareaWithTab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomTextareaWithTab).call(this, props));
    _this.state = {
      tabs: _this.props.tabs,
      value: _this.props.value,
      selected: 0
    };
    return _this;
  }

  _createClass(CustomTextareaWithTab, [{
    key: "filterTabs",
    value: function filterTabs(obj) {
      if (this === obj.name) {
        return true;
      }

      return false;
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var _this2 = this;

      var formObject = [];
      this.state.value.map(function (item) {
        if (item.name === event.target.name) {
          item.value = event.target.value.replace(/<(?:.|\n)*?>/gm, '').replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/, '').substring(0, _this2.props.limitChar);
        }

        formObject.push(item);
        return null;
      });
      this.setState({
        value: formObject
      });
      var eventObject = {
        target: {
          name: this.props.name,
          value: formObject
        }
      };
      this.props.onUpdate(eventObject);
    }
  }, {
    key: "selectTab",
    value: function selectTab(wich) {
      this.setState({
        selected: wich
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          name = _this$props.name,
          isValid = _this$props.isValid,
          tabs = _this$props.tabs,
          value = _this$props.value,
          limitChar = _this$props.limitChar,
          errorMessage = _this$props.errorMessage;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)(['container-field', className]),
        style: style
      }, _react.default.createElement("div", {
        className: "container-field-tabs",
        id: name
      }, this.state.tabs.map(function (item, i) {
        return _react.default.createElement("div", {
          key: item.name,
          style: {
            borderRadius: i === 0 ? '4px 0px 0px 0px' : i === 4 ? '0px 4px 0px 0px' : '0px',
            textAlign: 'left'
          },
          className: _this3.state.selected === i ? 'container-field-tabs-item container-field-tabs-item-selected' : 'container-field-tabs-item',
          onClick: _this3.selectTab.bind(_this3, i),
          role: 'button'
        }, _react.default.createElement("div", {
          className: "noselect"
        }, _react.default.createElement("span", {
          className: "tab-label"
        }, item.label), _react.default.createElement("span", {
          className: "tab-abbr"
        }, item.abbr)));
      })), value.map(function (item, i) {
        return _react.default.createElement("div", {
          key: item.name,
          style: {
            width: '100%',
            float: 'left',
            display: _this3.state.selected === i ? 'inline-block' : 'none',
            position: 'relative'
          }
        }, _react.default.createElement("div", null, _react.default.createElement("textarea", {
          placeholder: tabs[i].placeholder,
          className: 'large-field',
          name: item.name,
          id: item.name,
          onChange: function onChange(e) {
            _this3.onChange(e);
          },
          value: item.value,
          style: {
            borderRadius: '0px 4px 4px',
            height: 200,
            resize: 'none',
            border: !isValid ? '1px solid #e4002b' : '1px solid #949da2'
          },
          rows: 2,
          cols: 20
        })), _react.default.createElement("div", {
          className: "limit-char noselect"
        }, item.value.length, "/", limitChar));
      }), _react.default.createElement(_FieldError.default, {
        isValid: isValid,
        errorMessage: errorMessage,
        style: {
          paddingRight: 60
        }
      }));
    }
  }]);

  return CustomTextareaWithTab;
}(_react.default.Component);

var _default = CustomTextareaWithTab;
exports.default = _default;