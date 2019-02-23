'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomLabel = function CustomLabel(props) {
	var name = props.name,
	    style = props.style,
	    text = props.text,
	    label = props.label;


	return _react2.default.createElement(
		'div',
		{
			className: 'noselect',
			name: name,
			style: style
		},
		label ? label.text : text
	);
};

CustomLabel.propTypes = {
	name: _propTypes2.default.string,
	style: _propTypes2.default.instanceOf(Object),
	text: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Object)]),
	label: _propTypes2.default.instanceOf(Object)
};

CustomLabel.defaultProps = {
	name: '',
	style: null,
	text: '',
	label: null
};

exports.default = CustomLabel;