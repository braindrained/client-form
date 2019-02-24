'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sumClasses = exports.camelToTitle = exports.notEmpty = exports.makeId = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment2.default.locale('it');
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
	return str === null || str === undefined ? name.replace(/([A-Z][a-z]+)/g, ' $1') // Words beginning with UC
	.replace(/([A-Z][A-Z]+)/g, ' $1') // "Words" of only UC
	.replace(/([^A-Za-z ]+)/g, ' $1') // "Words" of non-letters
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