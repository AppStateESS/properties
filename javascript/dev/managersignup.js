webpackJsonp([1],{

/***/ 0:
/*!********************************************!*\
  !*** ./javascript/ManagerSignup/index.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ManagerSignup = __webpack_require__(/*! ./ManagerSignup.jsx */ 183);
	
	var _ManagerSignup2 = _interopRequireDefault(_ManagerSignup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_ManagerSignup2.default, null), document.getElementById('managersignup'));

/***/ },

/***/ 177:
/*!*****************************************!*\
  !*** ./javascript/Mixin/InputField.jsx ***!
  \*****************************************/
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
	      if (this.props.required && value.length > 0) {
	        this.setState({ empty: false });
	      }
	      this.props.change(e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var inputClass = void 0;
	      if (this.props.errorMessage !== null && this.props.errorMessage !== '' || this.state.empty && this.props.required) {
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
	        placeholder: this.state.placeholder,
	        autoComplete: this.props.autocomplete });
	
	      if (this.props.wrap) {
	        input = this.props.wrap(input);
	      }
	
	      var errorMessage = void 0;
	      if (this.props.errorMessage) {
	        errorMessage = this.props.errorMessage;
	      } else if (this.state.empty && this.props.required) {
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
	  flagEmpty: true
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
	  flagEmpty: _react2.default.PropTypes.bool
	};
	
	var RequiredIcon = exports.RequiredIcon = function RequiredIcon() {
	  return _react2.default.createElement('i', { className: 'fa fa-asterisk required' });
	};

/***/ },

/***/ 179:
/*!*****************************************!*\
  !*** ./javascript/Mixin/CheckValues.js ***!
  \*****************************************/
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
	      return value === '' || value === null;
	    }
	  }, {
	    key: 'isEmail',
	    value: function isEmail(value) {
	      return value.match(/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i);
	    }
	  }, {
	    key: 'isPhone',
	    value: function isPhone(value) {
	      return value.replace(/[^\d]/g, '').length == 10;
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

/***/ 180:
/*!**************************************!*\
  !*** ./javascript/Mixin/Message.jsx ***!
  \**************************************/
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
	
	      var messageType = 'lead alert alert-dismissible alert-' + this.props.type;
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
	  message: _react2.default.PropTypes.string,
	  onClose: _react2.default.PropTypes.func
	};
	
	Message.defaultProps = {
	  type: 'info'
	};
	
	exports.default = Message;

/***/ },

/***/ 182:
/*!**********************************!*\
  !*** ./javascript/Mixin/Bind.js ***!
  \**********************************/
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

/***/ },

/***/ 183:
/*!****************************************************!*\
  !*** ./javascript/ManagerSignup/ManagerSignup.jsx ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InputField = __webpack_require__(/*! ../Mixin/InputField.jsx */ 177);
	
	var _InputField2 = _interopRequireDefault(_InputField);
	
	var _Bind = __webpack_require__(/*! ../Mixin/Bind.js */ 182);
	
	var _Bind2 = _interopRequireDefault(_Bind);
	
	var _Empty = __webpack_require__(/*! ../Mixin/Empty.js */ 184);
	
	var _Empty2 = _interopRequireDefault(_Empty);
	
	var _Message = __webpack_require__(/*! ../Mixin/Message.jsx */ 180);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _CheckValues = __webpack_require__(/*! ../Mixin/CheckValues.js */ 179);
	
	var _CheckValues2 = _interopRequireDefault(_CheckValues);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var ManagerSignin = function (_React$Component) {
	  _inherits(ManagerSignin, _React$Component);
	
	  function ManagerSignin(props) {
	    _classCallCheck(this, ManagerSignin);
	
	    var _this = _possibleConstructorReturn(this, (ManagerSignin.__proto__ || Object.getPrototypeOf(ManagerSignin)).call(this, props));
	
	    _this.empty = {
	      username: true,
	      password: true,
	      phone: true,
	      email_address: true,
	      first_name: true,
	      last_name: true,
	      company_name: true
	    };
	
	    _this.state = {
	      username: '',
	      password: '',
	      first_name: '',
	      last_name: '',
	      email_address: '',
	      phone: '',
	      company_name: '',
	      company_url: '',
	      company_address: '',
	      message: '',
	      errors: {
	        username: null,
	        password: null,
	        phone: null,
	        email_address: null,
	        first_name: null,
	        last_name: null,
	        company_name: null
	      }
	    };
	    (0, _Bind2.default)(['submit', 'resetMessage', 'updateUsername', 'checkUsernameAjax', 'checkEmailAjax', 'checkCompanyName', 'checkPassword', 'checkEmail', 'checkPhone', 'post'], _this);
	    return _this;
	  }
	
	  _createClass(ManagerSignin, [{
	    key: 'updateState',
	    value: function updateState(varname, event) {
	      this.setError(varname, '');
	      var value = (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object' ? event.target.value : event;
	      this.empty[varname] = (0, _Empty2.default)(value);
	      this.setState(_defineProperty({}, varname, value));
	    }
	  }, {
	    key: 'updateUsername',
	    value: function updateUsername(event) {
	      var value = event.target.value;
	      if (value.length === 0 || value.search(/^[\w@\-\+\.]+$/g) >= 0) {
	        this.updateState('username', value.toLowerCase());
	      }
	    }
	  }, {
	    key: 'setEmpty',
	    value: function setEmpty(varname) {
	      this.empty[varname] = true;
	    }
	  }, {
	    key: 'setError',
	    value: function setError(varname, value) {
	      var errors = this.state.errors;
	      errors[varname] = value;
	      this.setState({ errors: errors });
	    }
	  }, {
	    key: 'checkUsernameAjax',
	    value: function checkUsernameAjax() {
	      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	      if ((0, _Empty2.default)(this.state.username)) {
	        if (callback !== null) {
	          callback();
	        }
	      } else {
	        $.getJSON('./properties/ManagerSignup/checkUsername', { username: this.state.username }).done(function (data) {
	          this.setError('username', data.duplicate ? 'Please use try a different username' : null);
	          if (callback !== null) {
	            callback();
	          }
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'checkEmailAjax',
	    value: function checkEmailAjax() {
	      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	      if ((0, _Empty2.default)(this.state.email_address)) {
	        if (callback !== null) {
	          callback();
	        }
	      } else {
	        $.getJSON('./properties/ManagerSignup/checkEmail', { email: this.state.email_address }).done(function (data) {
	          this.setError('email_address', data.duplicate ? 'Email address already in use' : null);
	          if (callback !== null) {
	            callback();
	          }
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'checkCompanyName',
	    value: function checkCompanyName() {
	      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	      if ((0, _Empty2.default)(this.state.company_name)) {
	        if (callback !== null) {
	          callback();
	        }
	      } else {
	        $.getJSON('./properties/ManagerSignup/checkCompanyName', { company_name: this.state.company_name }).done(function (data) {
	          this.setError('company_name', data.duplicate ? 'Company name already in use' : null);
	          if (callback !== null) {
	            callback();
	          }
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'checkPassword',
	    value: function checkPassword() {
	      var status = this.state.password.length >= 10;
	      this.setError('password', status ? null : 'Password must be 10 characters or more');
	      return status;
	    }
	  }, {
	    key: 'checkPhone',
	    value: function checkPhone() {
	      var status = _CheckValues2.default.isPhone(this.state.phone);
	      this.setError('phone', status ? null : 'Phone number must be 10 digits');
	      return status;
	    }
	  }, {
	    key: 'checkEmail',
	    value: function checkEmail() {
	      if (!(0, _Empty2.default)(this.state.email_address) && this.checkEmailStructure()) {
	        this.checkEmailAjax();
	      }
	    }
	  }, {
	    key: 'checkEmailStructure',
	    value: function checkEmailStructure() {
	      var status = _CheckValues2.default.isEmail(this.state.email_address);
	      this.setError('email_address', status ? null : 'Email poorly formatted');
	      return status;
	    }
	  }, {
	    key: 'urlWrap',
	    value: function urlWrap(input) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'input-group' },
	        _react2.default.createElement(
	          'span',
	          { className: 'input-group-addon' },
	          'http://'
	        ),
	        input
	      );
	    }
	  }, {
	    key: 'resetMessage',
	    value: function resetMessage() {
	      this.setState({ message: '' });
	    }
	  }, {
	    key: 'presubmitTest',
	    value: function presubmitTest() {
	      var allowSubmit = true;
	      var empty = false;
	
	      for (var vname in this.empty) {
	        if (this.empty[vname] === true) {
	          this.setError(vname, '' + vname.charAt(0).toUpperCase() + vname.replace(/_/, ' ').substr(1) + ' may not be empty');
	          empty = true;
	        }
	        if (empty === true) {
	          allowSubmit = false;
	          this.setState({ message: 'Please complete all required fields' });
	        }
	      }
	
	      if (!this.checkPassword()) {
	        allowSubmit = false;
	      }
	
	      if (!this.checkPhone()) {
	        allowSubmit = false;
	      }
	
	      if (!this.empty.email_address) {
	        if (!this.checkEmailStructure()) {
	          allowSubmit = false;
	        }
	      }
	
	      for (var prop in this.state.errors) {
	        if (this.state.errors[prop] === true) {
	          this.setState({ message: 'There are errors in your submission' });
	          allowSubmit = false;
	          break;
	        }
	      }
	
	      if (this.empty.company_name) {
	        if (!this.empty.first_name && !this.empty.last_name) {
	          this.setState({ company_name: this.state.first_name + ' ' + this.state.last_name, message: 'Company name is required. Using your first and last name.' });
	          this.empty.company_name = false;
	          this.setError('company_name', '');
	        } else {
	          this.setState({ message: 'Please complete all required fields' });
	        }
	        allowSubmit = false;
	      }
	
	      return allowSubmit;
	    }
	  }, {
	    key: 'checkAllDuplicates',
	    value: function checkAllDuplicates(callback) {
	      var usernameCallback = this.checkUsernameAjax.bind(this, callback);
	      var emailCallback = this.checkEmailAjax.bind(this, usernameCallback);
	      this.checkCompanyName(emailCallback);
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var allowSubmit = this.presubmitTest();
	      if (allowSubmit) {
	        this.checkAllDuplicates(this.post);
	      } else {
	        this.checkAllDuplicates();
	      }
	    }
	  }, {
	    key: 'post',
	    value: function post() {
	      var values = this.state;
	      delete values.message;
	      delete values.errors;
	
	      $.ajax({
	        method: 'POST',
	        url: './properties/ManagerSignup',
	        dataType: 'json',
	        data: values,
	        success: function (data) {
	          window.location.href = './properties/ManagerSignup/success';
	        }.bind(this),
	        failure: function failure(data) {
	          this.setState({ message: 'Error: there was a problem with your application. Please contact us.' });
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var message = void 0;
	      if (!(0, _Empty2.default)(this.state.message)) {
	        message = _react2.default.createElement(_Message2.default, {
	          message: this.state.message,
	          type: 'danger',
	          onClose: this.resetMessage });
	      }
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        message,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Sign up for Manager Account'
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Manager accounts are for people who rent property to tenants only.'
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'If you need to sublease your current residence, head over to our\xA0',
	          _react2.default.createElement(
	            'a',
	            { href: './properties/Sublease' },
	            'sublease page.'
	          )
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Contact information'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-6' },
	            _react2.default.createElement(_InputField2.default, {
	              label: 'Username',
	              required: true,
	              change: this.updateUsername,
	              errorMessage: this.state.errors.username,
	              blur: this.checkUsernameAjax,
	              onEmpty: this.setEmpty.bind(this, 'username'),
	              value: this.state.username })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-6' },
	            _react2.default.createElement(_InputField2.default, {
	              type: 'Password',
	              required: true,
	              change: this.updateState.bind(this, 'password'),
	              errorMessage: this.state.errors.password,
	              blur: this.checkPassword,
	              placeholder: '10 character minimum',
	              value: this.state.password,
	              onEmpty: this.setEmpty.bind(this, 'password'),
	              label: 'Password' })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-6' },
	            _react2.default.createElement(_InputField2.default, {
	              required: true,
	              change: this.updateState.bind(this, 'first_name'),
	              errorMessage: this.state.errors.first_name,
	              onEmpty: this.setEmpty.bind(this, 'first_name'),
	              value: this.state.first_name,
	              label: 'First name' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-6' },
	            _react2.default.createElement(_InputField2.default, {
	              required: true,
	              change: this.updateState.bind(this, 'last_name'),
	              errorMessage: this.state.errors.last_name,
	              onEmpty: this.setEmpty.bind(this, 'last_name'),
	              value: this.state.last_name,
	              label: 'Last name' })
	          )
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Company Information'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-6' },
	            _react2.default.createElement(_InputField2.default, {
	              required: true,
	              change: this.updateState.bind(this, 'email_address'),
	              blur: this.checkEmail,
	              errorMessage: this.state.errors.email_address,
	              onEmpty: this.setEmpty.bind(this, 'email_address'),
	              value: this.state.email_address,
	              label: 'Email address' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-6' },
	            _react2.default.createElement(_InputField2.default, {
	              required: true,
	              blur: this.checkPhone,
	              placeholder: 'xxx-xxx-xxxx',
	              change: this.updateState.bind(this, 'phone'),
	              onEmpty: this.setEmpty.bind(this, 'phone'),
	              errorMessage: this.state.errors.phone,
	              value: this.state.phone,
	              label: 'Phone number' })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-6' },
	            _react2.default.createElement(_InputField2.default, {
	              required: true,
	              blur: this.checkCompanyName,
	              change: this.updateState.bind(this, 'company_name'),
	              value: this.state.company_name,
	              errorMessage: this.state.errors.company_name,
	              onEmpty: this.setEmpty.bind(this, 'company_name'),
	              label: 'Company name' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-6' },
	            _react2.default.createElement(_InputField2.default, {
	              wrap: this.urlWrap,
	              change: this.updateState.bind(this, 'company_url'),
	              value: this.state.company_url,
	              label: 'Company url' })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-12' },
	            _react2.default.createElement(_InputField2.default, {
	              change: this.updateState.bind(this, 'company_address'),
	              value: this.state.company_address,
	              label: 'Company address' })
	          )
	        ),
	        _react2.default.createElement(
	          'button',
	          { type: 'button', className: 'btn btn-success', onClick: this.submit },
	          'Submit request'
	        )
	      );
	    }
	  }]);
	
	  return ManagerSignin;
	}(_react2.default.Component);
	
	exports.default = ManagerSignin;
	
	ManagerSignin.propTypes = {};

/***/ },

/***/ 184:
/*!***********************************!*\
  !*** ./javascript/Mixin/Empty.js ***!
  \***********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = empty;
	function empty(value) {
	  return value === undefined || value === null || value === 0 || value === '0' || value.length === 0;
	}

/***/ }

});
//# sourceMappingURL=managersignup.js.map