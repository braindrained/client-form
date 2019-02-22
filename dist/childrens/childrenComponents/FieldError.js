'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldError = function FieldError(props) {
	var isValid = props.isValid,
	    errorMessage = props.errorMessage;


	return _react2.default.createElement(
		'div',
		{ className: 'validation-error noselect' },
		'\xA0',
		isValid === false ? errorMessage : ''
	);
};
exports.default = FieldError;