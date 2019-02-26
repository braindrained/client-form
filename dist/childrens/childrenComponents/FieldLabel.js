"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldLabel = function FieldLabel(props) {
  var label = props.label,
      name = props.name,
      isRequired = props.isRequired,
      isValid = props.isValid;
  return _react.default.createElement("label", {
    htmlFor: name,
    className: "field-label noselect",
    style: Object.assign({}, label && label.style ? label.style : {}, isValid === false ? {
      color: '#e4002b'
    } : {})
  }, (0, _utils.camelToTitle)(label && label.text, name), " ", isRequired ? '*' : null, label && label.object ? label.object : null);
};

var _default = FieldLabel;
exports.default = _default;