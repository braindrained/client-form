'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sumClasses = exports.camelToTitle = exports.notEmpty = exports.makeId = exports.arrayToObject = exports.dateObject = exports.formatDateIt = exports.flatten = exports.replaceVar = exports.setEmpty = exports.formatCurrency = exports.replaceInt = exports.replaceBool = exports.parseBool = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment2.default.locale('it');

var parseBool = exports.parseBool = function parseBool(val, noNull) {
	if (noNull) return val !== null && val !== undefined ? val : false;
	return val !== null && val !== undefined ? val.toString() : '';
};

var replaceBool = exports.replaceBool = function replaceBool(val) {
	return val === '' ? null : val === 'true' || val === 'on' || val === true;
};

var replaceInt = exports.replaceInt = function replaceInt(val) {
	return val && val !== '' ? parseFloat(val) : null;
};

var formatCurrency = exports.formatCurrency = function formatCurrency(val) {
	return val && val !== '' ? parseFloat(val.toString().replace(/[.]/g, '')) : null;
};

var setEmpty = exports.setEmpty = function setEmpty(val) {
	return val !== null && val !== undefined ? val : '';
};

var replaceVar = exports.replaceVar = function replaceVar(template, variables) {
	return template.replace(new RegExp('{([^{]+)}', 'g'), function (_unused, varName) {
		return variables[varName];
	});
};

var flatten = exports.flatten = function flatten(input) {
	var output = {};
	Object.keys(input).forEach(function (key) {
		if (key.toString() !== 'jwt' && key.toString() !== 'suburb' && key.toString() !== 'zone' && key.toString() !== 'region' && key.toString() !== 'province' && key !== 'projectProfileId') {
			var value = input[key];
			if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
				Object.keys(input[key]).forEach(function (keyChild) {
					if (keyChild.toString() !== 'suburb' && keyChild.toString() !== 'zone' && keyChild.toString() !== 'region' && keyChild.toString() !== 'province' && keyChild !== 'townZone') {
						var valueChild = input[key][keyChild];
						output[keyChild] = valueChild;
					} else if (keyChild === 'townZone') {
						Object.keys(input[key][keyChild]).forEach(function (keyChildChild) {
							if (keyChildChild.toString() === 'townZoneId') {
								var valueChildChild = input[key][keyChild][keyChildChild];
								output[keyChildChild] = valueChildChild;
							}
						});
					}
				});
			} else {
				output[key] = value === 'null' ? null : value;
			}
		}
	});
	return output;
};

var formatDateIt = exports.formatDateIt = function formatDateIt(date) {
	if ((0, _moment2.default)(date, 'DD/MM/YYYY').isValid()) return date;

	var d = date ? new Date(date) : new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	var nd = day + '/' + month + '/' + year;

	nd = nd.replace(/\d+/g, function (m) {
		return m.length === 1 ? '0'.substr(m.length - 1) + m : m;
	});

	return nd;
};

var dateObject = exports.dateObject = function dateObject(date) {
	var dateParts = date.split('/');
	return new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));
};

var arrayToObject = exports.arrayToObject = function arrayToObject(e) {
	var newObject = {};
	e.map(function (item) {
		newObject[item.name] = item.value;
		return null;
	});
	return newObject;
};

var makeId = exports.makeId = function makeId() {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < 5; i += 1) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

var notEmpty = exports.notEmpty = function notEmpty(val) {
	return val !== null && val !== undefined && val !== '';
};

var camelToTitle = exports.camelToTitle = function camelToTitle(str, name) {
	return str === null ? name.replace(/([A-Z][a-z]+)/g, " $1") // Words beginning with UC
	.replace(/([A-Z][A-Z]+)/g, " $1") // "Words" of only UC
	.replace(/([^A-Za-z ]+)/g, " $1") // "Words" of non-letters
	.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	}) : str;
};

var sumClasses = exports.sumClasses = function sumClasses(classes) {
	var filteredClasses = classes.filter(function (o) {
		return o !== '';
	});
	var returnEach = '';
	filteredClasses.map(function (item, i) {
		returnEach += i === filteredClasses.length - 1 ? '' + item : item + ' ';
		return null;
	});
	return returnEach;
};