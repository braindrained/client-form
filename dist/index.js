"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CustomTextField = _interopRequireDefault(require("./childrens/CustomTextField"));

var _CustomTextarea = _interopRequireDefault(require("./childrens/CustomTextarea"));

var _CustomCheckBox = _interopRequireDefault(require("./childrens/CustomCheckBox"));

var _CustomSelect = _interopRequireDefault(require("./childrens/CustomSelect"));

var _CustomRadio = _interopRequireDefault(require("./childrens/CustomRadio"));

var _CustomLabel = _interopRequireDefault(require("./childrens/CustomLabel"));

var _CustomTextAreaTab = _interopRequireDefault(require("./childrens/CustomTextAreaTab"));

var _CustomPlusMinus = _interopRequireDefault(require("./childrens/CustomPlusMinus"));

var _FakeSelect = _interopRequireDefault(require("./childrens/FakeSelect"));

require("./Form.css");

var _utils = require("./helpers/utils");

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

var Form =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));
    _this.state = {
      controls: _this.props.controls
    };
    return _this;
  }

  _createClass(Form, [{
    key: "onUpdate",
    value: function onUpdate(e, hasError) {
      var _this2 = this;

      var controls = this.state.controls;
      var updatedControls = controls.map(function (item) {
        if (e.target.name === item.name) {
          item.isValid = !hasError;
          item.value = e.target.value;
        } else {
          if (_typeof(item.hideIf) === 'object') {
            var hide = false;
            item.hideIf.map(function (v) {
              var control = _this2.state.controls.filter(function (o) {
                return o.name === v.field;
              });

              if (control.length > 0) {
                if (control[0].value.toString().match(v.regEx) != null) {
                  hide = true;
                }
              }

              return null;
            });
            item.value = hide ? '' : item.value;
            item.hide = hide;
          }

          if (item.label && _typeof(item.label.changeIf) === 'object') {
            item.label.changeIf.map(function (v) {
              var control = _this2.state.controls.filter(function (o) {
                return o.name === v.field;
              });

              if (control.length > 0) {
                item.label.text = control[0].value.toString().match(v.regEx) != null ? v.ifTrue : v.ifFalse;
              }

              return null;
            });
          }

          if (_typeof(item.optionIf) === 'object') {
            item.optionIf.map(function (v) {
              var control = _this2.state.controls.filter(function (o) {
                return o.name === v.field;
              });

              if (control.length > 0) {
                item.options = v.options.filter(function (o) {
                  return o.type.indexOf(parseFloat(control[0].value)) !== -1;
                });
              }

              return null;
            });
          }

          if (_typeof(item.changeStyleIf) === 'object') {
            item.changeStyleIf.map(function (v) {
              var control = _this2.state.controls.filter(function (o) {
                return o.name === v.field;
              });

              if (control.length > 0) {
                if (control[0].value.toString().match(v.regEx) != null) {
                  item.style = v.style;
                } else {
                  item.style = v.altStyle;
                }
              }

              return null;
            });
          }
        }

        return item;
      });
      this.setState({
        controls: updatedControls
      });

      if (this.props.updateOnChange) {
        this.props.updateOnChange(noUndefined ? updatedControls.filter(function (o) {
          return o.value !== 'undefined';
        }) : updatedControls);
      }
    }
  }, {
    key: "formIsValid",
    value: function formIsValid() {
      var _this3 = this;

      var formIsValid = true;
      var controls = this.state.controls;
      var noUndefined = this.props.noUndefined;
      var updatedControls = controls.map(function (item) {
        if (item.isRequired && !item.hide) {
          if (item.control !== 'select' && (item.value === '' || !item.value)) {
            item.isValid = false;
            formIsValid = false;
          } else if (item.control === 'select' && item.value === '0' && item.value === 0) {
            item.isValid = false;
            formIsValid = false;
          }
        }

        if (_typeof(item.value) === 'object' && item.valueAsObject) {
          if (item.value && item.value.filter(function (o) {
            return o.isRequired === true;
          }).length > 0) {
            var updatedValues = item.value.map(function (itemS) {
              if (itemS.isRequired) {
                if (itemS.value === '' || !itemS.value) {
                  itemS.isValid = false;
                  item.isValid = false;
                  formIsValid = false;
                }
              }

              return itemS;
            });
            item.value = updatedValues;
          }
        }

        if (item.regEx !== undefined && !item.hide) {
          if (item.value !== '' && !item.regEx.test(item.value)) {
            item.isValid = false;
            formIsValid = false;
          }
        }

        if (item.equalTo !== undefined) {
          var valueToCompare = _this3.state.controls.filter(function (o) {
            return o.name === item.equalTo;
          })[0].value;

          if (!(item.value === valueToCompare) || item.value === '') {
            item.isValid = false;
            formIsValid = false;
          }
        }

        if (item.greaterThan !== undefined) {
          var _valueToCompare = _this3.state.controls.filter(function (o) {
            return o.name === item.greaterThan;
          })[0].value;

          if (parseFloat(item.value.toString().replace(/\./g, '')) < parseFloat(_valueToCompare.toString().replace(/\./g, ''))) {
            item.isValid = false;
            formIsValid = false;
          }
        }

        return item;
      });
      this.setState({
        controls: updatedControls
      });

      if (formIsValid) {
        var formObject = {};
        updatedControls.filter(function (o) {
          return o.control !== 'label';
        }).map(function (item) {
          if (noUndefined && item.value !== undefined) formObject[item.name] = item.value;
          if (!noUndefined) formObject[item.name] = item.value;
          return null;
        });
        this.props.sendForm(formObject);
      } else {
        var firstRequired = updatedControls.filter(function (o) {
          return o.isRequired && !o.isValid || o.greaterThan && !o.isValid || o.regEx && !o.isValid || o.equalTo && !o.isValid;
        })[0];

        if (_typeof(firstRequired.value) === 'object') {
          var subFieldRequired = firstRequired.value.filter(function (o) {
            return o.isRequired && !o.isValid || o.greaterThan && !o.isValid || o.regEx && !o.isValid || o.equalTo && !o.isValid;
          })[0];
          /* eslint-disable-next-line */

          /* flow-disable-next-line */

          document.getElementById(subFieldRequired.name).focus();
        } else {
          /* eslint-disable-next-line */

          /* flow-disable-next-line */
          document.getElementById(firstRequired.name).focus();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          succeed = _this$props.succeed,
          isSent = _this$props.isSent,
          sendButton = _this$props.sendButton,
          textBeforeButton = _this$props.textBeforeButton,
          buttonContainerStyle = _this$props.buttonContainerStyle,
          textAfterButton = _this$props.textAfterButton;
      var controls = this.state.controls;
      var sendButtonClass = (0, _utils.sumClasses)([succeed !== null ? succeed ? 'btn btn-succeed' : 'btn btn-error' : 'btn', isSent ? 'spinner' : '', sendButton && sendButton.disabled ? 'btn-disabled' : '']);
      var sendButtonValue = sendButton ? succeed === null ? sendButton.text : succeed === false ? sendButton.errorText : sendButton.succeedText : null;
      return _react.default.createElement("div", {
        className: (0, _utils.sumClasses)(['client-form', className !== null && className !== undefined ? className : '']),
        style: style
      }, controls.map(function (item) {
        switch (item.control) {
          default:
            return null;

          case 'external':
            if (item.hide) return null;
            return Object.assign({}, item.component, {
              key: item.name,
              props: Object.assign({}, item, {
                onUpdate: function onUpdate(e, h) {
                  _this4.onUpdate(e, h);
                }
              })
            });

          case 'text':
            if (item.hide) return null;
            return _react.default.createElement(_CustomTextField.default, {
              type: item.type,
              onlyNumber: item.onlyNumber,
              key: item.name,
              placeholder: item.placeholder,
              name: item.name,
              label: item.label,
              value: item.value ? item.value : '',
              onUpdate: function onUpdate(e, h) {
                _this4.onUpdate(e, h);
              },
              isRequired: item.isRequired,
              isValid: item.isValid,
              disabled: item.disabled,
              errorMessage: item.errorMessage,
              className: item.className ? item.className : '',
              style: item.style,
              updateOnChange: item.updateOnChange,
              limitChar: item.limitChar,
              currency: item.currency
            });

          case 'plusMinus':
            if (item.hide) return null;
            return _react.default.createElement(_CustomPlusMinus.default, {
              type: item.type,
              onlyNumber: item.onlyNumber,
              key: item.name,
              placeholder: item.placeholder,
              name: item.name,
              label: item.label,
              value: parseFloat(item.value),
              onUpdate: function onUpdate(e, h) {
                _this4.onUpdate(e, h);
              },
              isRequired: item.isRequired,
              isValid: item.isValid,
              disabled: item.disabled,
              errorMessage: item.errorMessage,
              className: item.className ? item.className : '',
              style: item.style
            });

          case 'textArea':
            if (item.hide) return null;
            return _react.default.createElement(_CustomTextarea.default, {
              key: item.name,
              placeholder: item.placeholder,
              name: item.name,
              label: item.label,
              value: item.value ? item.value : '',
              onUpdate: function onUpdate(e, h) {
                _this4.onUpdate(e, h);
              },
              isRequired: item.isRequired,
              isValid: item.isValid,
              errorMessage: item.errorMessage,
              style: item.style,
              className: item.className ? item.className : '',
              limitChar: item.limitChar,
              updateOnChange: item.updateOnChange
            });

          case 'select':
            if (item.hide) return null;
            return _react.default.createElement(_CustomSelect.default, {
              key: item.name,
              name: item.name,
              label: item.label,
              disabled: item.disabled,
              options: item.options,
              onUpdate: function onUpdate(e, h) {
                _this4.onUpdate(e, h);
              },
              value: item.value,
              style: item.style,
              className: item.className ? item.className : '',
              isRequired: item.isRequired,
              isValid: item.isValid,
              errorMessage: item.errorMessage,
              default: item.default
            });

          case 'check':
            if (item.hide) return null;
            return _react.default.createElement(_CustomCheckBox.default, {
              key: item.name,
              name: item.name,
              label: item.label,
              value: item.value,
              style: item.style,
              textBefore: item.textBefore,
              hideCheck: item.hideCheck,
              className: item.className ? item.className : '',
              onUpdate: function onUpdate(e, h) {
                _this4.onUpdate(e, h);
              }
            });

          case 'radio':
            if (item.hide) return null;
            return _react.default.createElement(_CustomRadio.default, {
              key: item.name,
              name: item.name,
              label: item.label,
              options: item.options,
              onUpdate: function onUpdate(e, h) {
                _this4.onUpdate(e, h);
              },
              value: (0, _utils.notEmpty)(item.value) ? item.value : item.default,
              hideRadio: item.hideRadio,
              uncheck: item.uncheck,
              className: item.className ? item.className : '',
              style: item.style,
              highlightSel: item.highlightSel
            });

          case 'label':
            if (item.hide) return null;
            return _react.default.createElement(_CustomLabel.default, {
              key: item.name,
              name: item.name,
              label: item.label,
              style: item.style,
              text: item.text,
              value: item.value,
              className: item.className ? item.className : ''
            });

          case 'tabTextArea':
            if (item.hide) return null;
            return _react.default.createElement(_CustomTextAreaTab.default, {
              key: item.name,
              name: item.name,
              value: item.value,
              tabs: item.tabs,
              onUpdate: function onUpdate(e, h) {
                _this4.onUpdate(e, h);
              },
              style: item.style,
              className: item.className ? item.className : '',
              isRequired: item.isRequired,
              isValid: item.isValid,
              errorMessage: item.errorMessage,
              valueAsObject: item.valueAsObject,
              limitChar: item.limitChar
            });

          case 'fakeselect':
            if (item.hide) return null;
            return _react.default.createElement(_FakeSelect.default, {
              key: item.name,
              name: item.name,
              label: item.label,
              value: item.value,
              text: item.text,
              onUpdate: function onUpdate(e, h) {
                _this4.onUpdate(e, h);
              },
              style: item.style,
              firstRange: item.firstRange,
              secondRange: item.secondRange,
              rangesStyle: item.rangesStyle,
              className: item.className ? item.className : '',
              overlayBg: item.overlayBg
            });
        }
      }), textBeforeButton, sendButton ? _react.default.createElement("div", {
        className: "button-container",
        style: buttonContainerStyle
      }, _react.default.createElement("button", {
        className: sendButtonClass,
        style: sendButton.style,
        onClick: succeed === null && isSent === null && sendButton.disabled === undefined ? function () {
          _this4.formIsValid();
        } : function () {
          return null;
        },
        type: 'button'
      }, sendButtonValue)) : null, textAfterButton);
    }
  }]);

  return Form;
}(_react.default.Component);

var _default = Form;
exports.default = _default;