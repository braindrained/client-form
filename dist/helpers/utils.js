"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumClasses = exports.camelToTitle = exports.notEmpty = exports.makeId = void 0;

var makeId = function makeId() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

exports.makeId = makeId;

var notEmpty = function notEmpty(val) {
  return val !== null && val !== undefined && val !== '';
};

exports.notEmpty = notEmpty;

var camelToTitle = function camelToTitle(str, name) {
  return str === null || str === undefined ? name.replace(/([a-z\d])([A-Z])/g, '$1  $2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2').replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }) : str;
};

exports.camelToTitle = camelToTitle;

var sumClasses = function sumClasses(classes) {
  var filteredClasses = classes.filter(function (o) {
    return o !== '';
  });
  var returnEach = '';
  filteredClasses.map(function (item, i) {
    returnEach += i === filteredClasses.length - 1 ? "".concat(item) : "".concat(item, " ");
    return null;
  });
  return returnEach;
};

exports.sumClasses = sumClasses;