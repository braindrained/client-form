"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomLabel = function CustomLabel(props) {
  var name = props.name,
      style = props.style,
      text = props.text,
      label = props.label;
  return _react.default.createElement("div", {
    className: 'noselect',
    name: name,
    style: style
  }, label ? label.text : text);
};

var _default = CustomLabel;
exports.default = _default;