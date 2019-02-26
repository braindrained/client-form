"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldError = function FieldError(props) {
  var isValid = props.isValid,
      errorMessage = props.errorMessage,
      style = props.style;
  return _react.default.createElement("div", {
    className: "validation-error noselect",
    style: style
  }, "\xA0", isValid === false ? errorMessage : '');
};

var _default = FieldError;
exports.default = _default;