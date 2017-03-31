webpackJsonp([13],{

/***/ 0:
/*!***************************************!*\
  !*** ./javascript/Settings/index.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 32);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _InputField = __webpack_require__(/*! ../Mixin/Form/InputField.jsx */ 183);
	
	var _InputField2 = _interopRequireDefault(_InputField);
	
	var _CheckValues = __webpack_require__(/*! ../Mixin/Helper/CheckValues.js */ 185);
	
	var _CheckValues2 = _interopRequireDefault(_CheckValues);
	
	var _Bind = __webpack_require__(/*! ../Mixin/Helper/Bind.js */ 189);
	
	var _Bind2 = _interopRequireDefault(_Bind);
	
	var _Message = __webpack_require__(/*! ../Mixin/Html/Message.jsx */ 187);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var Settings = function (_React$Component) {
	  _inherits(Settings, _React$Component);
	
	  function Settings() {
	    _classCallCheck(this, Settings);
	
	    var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));
	
	    _this.state = {
	      message: null,
	      settings: {
	        our_email: '',
	        approval_email: '',
	        our_name: '',
	        our_phone: ''
	      },
	      errors: {
	        our_email: false,
	        approval_email: false,
	        our_phone: false
	      }
	    };
	    (0, _Bind2.default)(['setValue', 'setError', 'checkValues', 'save', 'clearMessage', 'checkSiteEmail', 'checkApprovalEmail', 'checkPhone'], _this);
	    return _this;
	  }
	
	  _createClass(Settings, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.load();
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(varname, value) {
	      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.target !== undefined) {
	        value = value.target.value;
	      }
	      this.setError(varname, null);
	      var settings = this.state.settings;
	      settings[varname] = value;
	      this.setState({ settings: settings });
	    }
	  }, {
	    key: 'setError',
	    value: function setError(varname, value) {
	      var errors = this.state.errors;
	      errors[varname] = value;
	      this.setState({ errors: errors });
	    }
	  }, {
	    key: 'checkPhone',
	    value: function checkPhone() {
	      if (this.state.settings.our_phone.length > 0 && !_CheckValues2.default.isPhone(this.state.settings.our_phone)) {
	        this.setError('our_phone', true);
	        return false;
	      } else {
	        this.setError('our_phone', false);
	        return true;
	      }
	    }
	  }, {
	    key: 'checkSiteEmail',
	    value: function checkSiteEmail() {
	      if (!_CheckValues2.default.isEmail(this.state.settings.our_email)) {
	        this.setError('our_email', true);
	        return false;
	      } else {
	        this.setError('our_email', false);
	        return true;
	      }
	    }
	  }, {
	    key: 'checkApprovalEmail',
	    value: function checkApprovalEmail() {
	      if (!_CheckValues2.default.isEmail(this.state.settings.approval_email)) {
	        this.setError('approval_email', true);
	        return false;
	      } else {
	        this.setError('approval_email', false);
	        return true;
	      }
	    }
	  }, {
	    key: 'checkValues',
	    value: function checkValues() {
	      var allClear = true;
	      if (!this.checkSiteEmail()) {
	        allClear = false;
	      }
	      if (!this.checkApprovalEmail()) {
	        allClear = false;
	      }
	      if (!this.checkPhone()) {
	        allClear = false;
	      }
	      return allClear;
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      if (this.checkValues()) {
	        $.post('./properties/Settings/', this.state.settings, null, 'json').done(function (data) {
	          if (data.success) {
	            this.setState({ message: 'Settings saved' });
	          }
	        }.bind(this)).fail(function () {
	          this.setState({ message: 'Server error prevented saving' });
	        });
	      }
	    }
	  }, {
	    key: 'errorFree',
	    value: function errorFree() {
	      var _state = this.state;
	      var errors = _state.errors;
	      var settings = _state.settings;
	
	      return errors.our_email === false && errors.approval_email === false && settings.our_email !== '' && settings.approval_email !== '' && errors.our_phone === false;
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      $.getJSON('./properties/Settings/view').done(function (data) {
	        this.setState({ settings: data });
	      }.bind(this));
	    }
	  }, {
	    key: 'clearMessage',
	    value: function clearMessage() {
	      this.setState({ message: null });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var message = void 0;
	      if (this.state.message !== null) {
	        message = _react2.default.createElement(_Message2.default, { message: this.state.message, onClose: this.clearMessage });
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Administrative Settings'
	        ),
	        message,
	        _react2.default.createElement(
	          'form',
	          null,
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(_InputField2.default, {
	                  label: 'Approval email',
	                  name: 'approval_email',
	                  value: this.state.settings.approval_email,
	                  placeholder: 'This email address will receive new manager notifications.',
	                  required: true,
	                  change: this.setValue.bind(this, 'approval_email'),
	                  errorMessage: this.state.errors.approval_email ? 'Email address must be complete and in the correct format' : null,
	                  blur: this.checkApprovalEmail })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(_InputField2.default, {
	                  label: 'Site email',
	                  name: 'our_email',
	                  value: this.state.settings.our_email,
	                  required: true,
	                  placeholder: 'This is the from/reply-to address from this site.',
	                  change: this.setValue.bind(this, 'our_email'),
	                  errorMessage: this.state.errors.our_email ? 'Email address must be complete and in the correct format' : null,
	                  blur: this.checkSiteEmail })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(_InputField2.default, {
	                  label: 'Contact name',
	                  name: 'our_name',
	                  value: this.state.settings.our_name,
	                  placeholder: 'The contact name on outgoing email.',
	                  change: this.setValue.bind(this, 'our_name') })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(_InputField2.default, {
	                  label: 'Contact phone',
	                  name: 'our_phone',
	                  value: this.state.settings.our_phone,
	                  placeholder: 'The contact phone number on outgoing email.',
	                  change: this.setValue.bind(this, 'our_phone'),
	                  errorMessage: this.state.errors.our_phone ? 'Check your phone number formatting (10 digits)' : null,
	                  blur: this.checkPhone })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'button',
	            {
	              type: 'button',
	              className: 'btn btn-primary',
	              disabled: !this.errorFree(),
	              onClick: this.save },
	            'Save settings'
	          )
	        )
	      );
	    }
	  }]);
	
	  return Settings;
	}(_react2.default.Component);
	
	exports.default = Settings;
	
	Settings.propTypes = {};
	
	_reactDom2.default.render(_react2.default.createElement(Settings, null), document.getElementById('settings'));

/***/ },

/***/ 183:
/*!**********************************************!*\
  !*** ./javascript/Mixin/Form/InputField.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RequiredIcon = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * When using errorMessage with required, be sure to clear
	 * the errorMessage prop on successful input
	 */
	
	var InputField = function (_React$Component) {
	  _inherits(InputField, _React$Component);
	
	  function InputField(props) {
	    _classCallCheck(this, InputField);
	
	    var _this = _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).call(this, props));
	
	    _this.state = {
	      empty: false
	    };
	
	    _this.handleBlur = _this.handleBlur.bind(_this);
	    _this.handleChange = _this.handleChange.bind(_this);
	    return _this;
	  }
	
	  _createClass(InputField, [{
	    key: 'handleBlur',
	    value: function handleBlur(e) {
	      var value = e.target.value;
	      if (value.length === 0) {
	        this.setState({ empty: true });
	        if (this.props.onEmpty) {
	          this.props.onEmpty();
	        }
	      } else {
	        this.setState({ empty: false });
	      }
	      if (this.props.blur) {
	        this.props.blur();
	      }
	    }
	  }, {
	    key: 'emptyMessage',
	    value: function emptyMessage() {
	      if (this.props.label.length > 0) {
	        return this.props.label + ' may not be empty';
	      } else {
	        return 'Field may not be empty';
	      }
	    }
	  }, {
	    key: 'select',
	    value: function select(event) {
	      event.target.select();
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(e) {
	      var value = e.target.value;
	      if (value.length > 0) {
	        this.setState({ empty: false });
	      }
	      this.props.change(e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var inputClass = void 0;
	      if (this.props.errorMessage !== null && this.props.errorMessage !== '' || this.state.empty && this.props.required && this.props.disableRequireCheck === false) {
	        inputClass = 'form-control error-highlight';
	      } else {
	        inputClass = 'form-control';
	      }
	      var required = this.props.required ? _react2.default.createElement(RequiredIcon, null) : null;
	
	      var input = _react2.default.createElement('input', {
	        id: this.props.iid,
	        type: this.props.type,
	        name: this.props.name,
	        value: this.props.value,
	        className: inputClass,
	        onChange: this.handleChange,
	        onBlur: this.handleBlur,
	        onClick: this.props.selectOnClick === true ? this.select : null,
	        disabled: this.props.disabled,
	        size: this.props.size,
	        maxLength: this.props.maxLength,
	        placeholder: this.props.placeholder,
	        autoComplete: this.props.autocomplete });
	
	      if (this.props.wrap) {
	        input = this.props.wrap(input);
	      }
	
	      var errorMessage = void 0;
	      if (this.props.errorMessage) {
	        errorMessage = this.props.errorMessage;
	      } else if (this.state.empty && this.props.required && this.props.disableRequireCheck === false) {
	        errorMessage = this.emptyMessage();
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'form-group' },
	        this.props.label.length > 0 ? _react2.default.createElement(
	          'label',
	          { htmlFor: this.props.iid },
	          this.props.label,
	          ' ',
	          required
	        ) : undefined,
	        input,
	        errorMessage ? _react2.default.createElement(
	          'div',
	          { className: 'label label-danger' },
	          errorMessage
	        ) : null
	      );
	    }
	  }]);
	
	  return InputField;
	}(_react2.default.Component);
	
	exports.default = InputField;
	
	
	InputField.defaultProps = {
	  label: '',
	  type: 'text',
	  name: '',
	  value: '',
	  change: null,
	  blur: null,
	  required: false,
	  id: null,
	  autocomplete: false,
	  placeholder: null,
	  errorMessage: '',
	  disabled: false,
	  size: null,
	  maxLength: null,
	  selectOnClick: true,
	  wrap: null,
	  onEmpty: null,
	  flagEmpty: true,
	  disableRequireCheck: false
	};
	
	InputField.propTypes = {
	  name: _react2.default.PropTypes.string,
	  label: _react2.default.PropTypes.string,
	  type: _react2.default.PropTypes.string,
	  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  change: _react2.default.PropTypes.func,
	  blur: _react2.default.PropTypes.func,
	  placeholder: _react2.default.PropTypes.string,
	  errorMessage: _react2.default.PropTypes.string,
	  iid: _react2.default.PropTypes.string,
	  autocomplete: _react2.default.PropTypes.bool,
	  required: _react2.default.PropTypes.bool,
	  disabled: _react2.default.PropTypes.bool,
	  size: _react2.default.PropTypes.number,
	  maxLength: _react2.default.PropTypes.number,
	  wrap: _react2.default.PropTypes.func,
	  selectOnClick: _react2.default.PropTypes.bool,
	  onEmpty: _react2.default.PropTypes.func,
	  flagEmpty: _react2.default.PropTypes.bool,
	  disableRequireCheck: _react2.default.PropTypes.bool
	};
	
	var RequiredIcon = exports.RequiredIcon = function RequiredIcon() {
	  return _react2.default.createElement('i', { className: 'fa fa-asterisk text-danger' });
	};

/***/ },

/***/ 185:
/*!************************************************!*\
  !*** ./javascript/Mixin/Helper/CheckValues.js ***!
  \************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CheckValues = function () {
	  function CheckValues() {
	    _classCallCheck(this, CheckValues);
	  }
	
	  _createClass(CheckValues, null, [{
	    key: 'isEmpty',
	    value: function isEmpty(value) {
	      return value === '' || value === null || value === undefined;
	    }
	  }, {
	    key: 'isEmail',
	    value: function isEmail(value) {
	      if (this.isEmpty(value)) {
	        return false;
	      }
	      return value.match(/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i);
	    }
	  }, {
	    key: 'isPhone',
	    value: function isPhone(value) {
	      if (this.isEmpty(value)) {
	        return false;
	      }
	      return value.replace(/[^\d]/g, '').length == 10;
	    }
	  }, {
	    key: 'isUrl',
	    value: function isUrl(value) {
	      var httpRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	      if (httpRequired) {
	        return value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
	      } else {
	        return value.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
	      }
	    }
	  }, {
	    key: 'randomId',
	    value: function randomId() {
	      return (Math.random().toString(36) + '00000000000000000').slice(2, 10);
	    }
	  }]);
	
	  return CheckValues;
	}();
	
	exports.default = CheckValues;

/***/ },

/***/ 187:
/*!*******************************************!*\
  !*** ./javascript/Mixin/Html/Message.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Message = function (_React$Component) {
	  _inherits(Message, _React$Component);
	
	  function Message(props) {
	    _classCallCheck(this, Message);
	
	    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));
	  }
	
	  _createClass(Message, [{
	    key: 'render',
	    value: function render() {
	      var icon = '';
	      switch (this.props.type) {
	        case 'danger':
	          icon = 'fa fa-exclamation-triangle';
	          break;
	
	        case 'success':
	          icon = 'fa fa-thumbs-o-up';
	          break;
	
	        case 'info':
	          icon = 'fa fa-info-circle';
	          break;
	
	        case 'warning':
	          icon = 'fa fa-hand-paper-o';
	          break;
	      }
	
	      var messageType = 'alert alert-dismissible alert-' + this.props.type;
	      return _react2.default.createElement(
	        'div',
	        { className: messageType, role: 'alert' },
	        _react2.default.createElement(
	          'button',
	          {
	            type: 'button',
	            onClick: this.props.onClose,
	            className: 'close',
	            'data-dismiss': 'alert',
	            'aria-label': 'Close' },
	          _react2.default.createElement(
	            'span',
	            { 'aria-hidden': 'true' },
	            '\xD7'
	          )
	        ),
	        _react2.default.createElement('i', { className: icon }),
	        '\xA0',
	        this.props.message
	      );
	    }
	  }]);
	
	  return Message;
	}(_react2.default.Component);
	
	Message.propTypes = {
	  type: _react2.default.PropTypes.string,
	  message: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  onClose: _react2.default.PropTypes.func
	};
	
	Message.defaultProps = {
	  type: 'info'
	};
	
	exports.default = Message;

/***/ },

/***/ 189:
/*!*****************************************!*\
  !*** ./javascript/Mixin/Helper/Bind.js ***!
  \*****************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = bindMethods;
	function bindMethods(bindable, object) {
	  bindable.map(function (v) {
	    if (object[v] === undefined) {
	      throw new Error("Cannot bind undefined method: " + v);
	    }
	    object[v] = this[v].bind(object);
	  }.bind(object));
	}

/***/ }

});
//# sourceMappingURL=settings.js.map