webpackJsonp([3],{

/***/ 0:
/*!******************************************!*\
  !*** ./javascript/ManagerEdit/index.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ManagerForm = __webpack_require__(/*! ./ManagerForm.jsx */ 193);
	
	var _ManagerForm2 = _interopRequireDefault(_ManagerForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_ManagerForm2.default, null), document.getElementById('manageredit'));

/***/ },

/***/ 177:
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

/***/ 179:
/*!************************************************!*\
  !*** ./javascript/Mixin/Helper/CheckValues.js ***!
  \************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CheckValues = function () {
	  function CheckValues() {
	    _classCallCheck(this, CheckValues);
	  }
	
	  _createClass(CheckValues, null, [{
	    key: 'isEmpty',
	    value: function isEmpty(value) {
	      return value === '' || value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === undefined;
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

/***/ 193:
/*!************************************************!*\
  !*** ./javascript/ManagerEdit/ManagerForm.jsx ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InputField = __webpack_require__(/*! ../Mixin/Form/InputField.jsx */ 177);
	
	var _InputField2 = _interopRequireDefault(_InputField);
	
	var _CheckValues = __webpack_require__(/*! ../Mixin/Helper/CheckValues */ 179);
	
	var _CheckValues2 = _interopRequireDefault(_CheckValues);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var ManagerForm = function (_React$Component) {
	  _inherits(ManagerForm, _React$Component);
	
	  function ManagerForm(props) {
	    _classCallCheck(this, ManagerForm);
	
	    var _this = _possibleConstructorReturn(this, (ManagerForm.__proto__ || Object.getPrototypeOf(ManagerForm)).call(this, props));
	
	    _this.state = {
	      manager: {},
	      errors: {
	        password: null,
	        first_name: null,
	        last_name: null,
	        phone: null,
	        email: null,
	        company_name: null
	      }
	    };
	
	    var bindable = ['checkCompanyName', 'checkEmailAddress', 'checkEmailDuplicate', 'checkPassword', 'checkPhone', 'save', 'setValue', 'setError'];
	
	    bindable.map(function (v) {
	      this[v] = this[v].bind(this);
	    }.bind(_this));
	    return _this;
	  }
	
	  _createClass(ManagerForm, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.load();
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      $.getJSON('./properties/Manager/view').done(function (data) {
	        this.setState({ manager: data });
	      }.bind(this));
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(varname, value) {
	      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.target !== undefined) {
	        value = value.target.value;
	      }
	      this.setError(varname, null);
	      var manager = this.state.manager;
	      manager[varname] = value;
	      this.setState({ manager: manager });
	    }
	  }, {
	    key: 'setError',
	    value: function setError(varname, value) {
	      var errors = this.state.errors;
	      errors[varname] = value;
	      this.setState({ errors: errors });
	    }
	  }, {
	    key: 'postErrors',
	    value: function postErrors(errors) {
	      if (errors.companyEmpty) {
	        this.setError('company_name', 'Please enter a company name');
	      } else if (errors.companyDuplicate) {
	        this.setError('company_name', 'Company name already in use');
	      } else {
	        this.setError('company_name', null);
	      }
	
	      if (errors.emailEmpty) {
	        this.setError('email', 'Email may not be empty');
	      } else {
	        this.setError('email', null);
	      }
	
	      if (errors.firstNameEmpty) {
	        this.setError('first_name', 'First name may not be empty');
	      } else {
	        this.setError('first_name', null);
	      }
	
	      if (errors.lastNameEmpty) {
	        this.setError('last_name', 'Last name may not be empty');
	      } else {
	        this.setError('last_name', null);
	      }
	
	      if (errors.passwordEmpty) {
	        this.setError('password', 'Password may not be empty');
	      } else if (errors.passwordShort) {
	        this.setError('password', 'Password must be a least 8 characters');
	      } else {
	        this.setError('password', null);
	      }
	
	      if (errors.phoneEmpty) {
	        this.setError('phone', 'Phone number may not be empty');
	      } else if (errors.phoneBadFormat) {
	        this.setError('phone', 'Phone number is improperly formatted');
	      } else {
	        this.setError('phone', null);
	      }
	
	      if (errors.usernameEmpty) {
	        this.setError('username', 'Username may not be empty');
	      } else if (errors.usernameDuplicate) {
	        this.setError('username', 'Username already in use');
	      } else {
	        this.setError('username', null);
	      }
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      $.post('properties/Manager/', this.state.manager, null, 'json').done(function (data) {
	        if (data.status === 'error') {
	          this.postErrors(data);
	        } else {
	          window.location.href = './properties/Manager/desktop';
	        }
	      }.bind(this)).fail(function () {});
	    }
	  }, {
	    key: 'checkPhone',
	    value: function checkPhone() {
	      if (!_CheckValues2.default.isPhone(this.state.manager.phone)) {
	        this.setError('phone', 'Phone number not formatted properly');
	      } else {
	        this.setError('phone', null);
	      }
	    }
	  }, {
	    key: 'checkEmailAddress',
	    value: function checkEmailAddress() {
	      if (!_CheckValues2.default.isEmail(this.state.manager.email_address)) {
	        this.setError('email', 'Email not formatted properly');
	      } else {
	        this.checkEmailDuplicate();
	      }
	    }
	  }, {
	    key: 'checkEmailDuplicate',
	    value: function checkEmailDuplicate(callback) {
	      $.getJSON('properties/Manager/checkEmail', {
	        email_address: this.state.manager.email_address,
	        id: this.state.manager.id
	      }).done(function (data) {
	        if (data.duplicate) {
	          this.setError('email', 'Email address already in use');
	        } else {
	          this.setError('email', null);
	        }
	        if (callback !== undefined) {
	          callback();
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'checkPassword',
	    value: function checkPassword() {
	      if (this.state.manager.password && this.state.manager.password.length < 8) {
	        this.setError('password', 'Password must be 8 characters or more');
	      } else {
	        this.setError('password', null);
	      }
	    }
	  }, {
	    key: 'checkCompanyName',
	    value: function checkCompanyName() {
	      if (_CheckValues2.default.isEmpty(this.state.manager.company_name)) {
	        if (this.state.manager.first_name.length > 0 && this.state.manager.last_name.length > 0) {
	          this.setValue('company_name', this.state.manager.first_name + ' ' + this.state.manager.last_name);
	          this.setError('company_name', 'Company name was empty. Using full name. Change or save to continue.');
	        }
	      } else {
	        this.checkCompanyDuplicate(function () {
	          this.setError('company_name', null);
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'checkCompanyDuplicate',
	    value: function checkCompanyDuplicate(callback) {
	      $.getJSON('properties/Manager/checkCompanyName', {
	        company_name: this.state.manager.company_name,
	        id: this.state.manager.id
	      }).done(function (data) {
	        if (data.duplicate) {
	          this.setError('company_name', 'Company Name already in use');
	        } else {
	          this.setError('company_name', null);
	          if (callback !== undefined) {
	            callback();
	          }
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var button = _react2.default.createElement(
	        'button',
	        { className: 'btn btn-success', onClick: this.save },
	        _react2.default.createElement('i', { className: 'fa fa-floppy-o' }),
	        '\xA0Save'
	      );
	
	      var manager = this.state.manager;
	      var errors = this.state.errors;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'managerForm' },
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Update my account'
	        ),
	        _react2.default.createElement(
	          'form',
	          null,
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'company_name',
	                iid: 'managerCompanyName',
	                label: 'Company name',
	                value: manager.company_name,
	                change: this.setValue.bind(this, 'company_name'),
	                errorMessage: errors.company_name,
	                required: true,
	                blur: this.checkCompanyName })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'company_address',
	                iid: 'managerCompanyAddress',
	                label: 'Company address',
	                value: manager.company_address,
	                change: this.setValue.bind(this, 'company_address') })
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-12' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'company_url',
	                iid: 'managerCompanyUrl',
	                label: 'Company URL',
	                value: manager.company_url,
	                change: this.setValue.bind(this, 'company_url') }),
	              _react2.default.createElement(
	                'label',
	                { htmlFor: 'm-times-available' },
	                'Times available'
	              ),
	              _react2.default.createElement('textarea', {
	                id: 'm-times-available',
	                className: 'form-control',
	                name: 'times_available',
	                value: manager.times_available,
	                onChange: this.setValue.bind(this, 'times_available') })
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
	                name: 'first_name',
	                iid: 'managerFirstName',
	                label: 'First name',
	                value: manager.first_name,
	                change: this.setValue.bind(this, 'first_name'),
	                errorMessage: errors.first_name,
	                required: true })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'last_name',
	                iid: 'managerLastName',
	                label: 'Last name',
	                value: manager.last_name,
	                change: this.setValue.bind(this, 'last_name'),
	                errorMessage: errors.last_name,
	                required: true })
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'phone',
	                iid: 'managerPhone',
	                label: 'Phone',
	                value: manager.phone,
	                change: this.setValue.bind(this, 'phone'),
	                errorMessage: errors.phone,
	                blur: this.checkPhone,
	                required: true })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'email_address',
	                iid: 'managerEmailAddress',
	                label: 'Email',
	                value: manager.email_address,
	                change: this.setValue.bind(this, 'email_address'),
	                blur: this.checkEmailAddress,
	                errorMessage: errors.email,
	                required: true })
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'text-center' },
	            _react2.default.createElement(
	              'button',
	              { type: 'button', className: 'btn btn-primary btn-lg', onClick: this.save },
	              _react2.default.createElement('i', { className: 'fa fa-floppy-o' }),
	              '\xA0Save'
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return ManagerForm;
	}(_react2.default.Component);
	
	ManagerForm.propTypes = {
	  reload: _react2.default.PropTypes.func,
	  manager: _react2.default.PropTypes.object
	};
	
	exports.default = ManagerForm;

/***/ }

});
//# sourceMappingURL=manageredit.js.map