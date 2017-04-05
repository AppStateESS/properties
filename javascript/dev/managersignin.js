webpackJsonp([4],{

/***/ 0:
/*!********************************************!*\
  !*** ./javascript/ManagerSignin/index.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 32);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ManagerSignin = __webpack_require__(/*! ./ManagerSignin.jsx */ 200);
	
	var _ManagerSignin2 = _interopRequireDefault(_ManagerSignin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_ManagerSignin2.default, null), document.getElementById('managersignin'));

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

/***/ 193:
/*!******************************************!*\
  !*** ./javascript/Mixin/Helper/Empty.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = empty;
	function empty(value) {
	  return value === undefined || value === null || value === 0 || value === '0' || value.length === 0 || value === false;
	}

/***/ },

/***/ 200:
/*!****************************************************!*\
  !*** ./javascript/ManagerSignin/ManagerSignin.jsx ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InputField = __webpack_require__(/*! ../Mixin/Form/InputField.jsx */ 183);
	
	var _InputField2 = _interopRequireDefault(_InputField);
	
	var _Empty = __webpack_require__(/*! ../Mixin/Helper/Empty.js */ 193);
	
	var _Empty2 = _interopRequireDefault(_Empty);
	
	var _DecodeUrl = __webpack_require__(/*! ../Mixin/Helper/DecodeUrl.js */ 201);
	
	var _DecodeUrl2 = _interopRequireDefault(_DecodeUrl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ManagerSignin = function (_React$Component) {
	  _inherits(ManagerSignin, _React$Component);
	
	  function ManagerSignin(props) {
	    _classCallCheck(this, ManagerSignin);
	
	    var _this = _possibleConstructorReturn(this, (ManagerSignin.__proto__ || Object.getPrototypeOf(ManagerSignin)).call(this, props));
	
	    _this.state = {
	      username: '',
	      password: ''
	    };
	    _this.updateUsername = _this.updateUsername.bind(_this);
	    _this.updatePassword = _this.updatePassword.bind(_this);
	    _this.submit = _this.submit.bind(_this);
	    _this.url = new _DecodeUrl2.default();
	    return _this;
	  }
	
	  _createClass(ManagerSignin, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.url.values.username) {
	        this.setState({ username: this.url.values.username });
	      }
	    }
	  }, {
	    key: 'updateUsername',
	    value: function updateUsername(e) {
	      this.setState({ username: e.target.value });
	    }
	  }, {
	    key: 'updatePassword',
	    value: function updatePassword(e) {
	      this.setState({ password: e.target.value });
	    }
	  }, {
	    key: 'submit',
	    value: function submit(e) {
	      if (this.state.username.length === 0 || this.state.password.length === 0) {
	        e.preventDefault();
	      }
	    }
	  }, {
	    key: 'checkError',
	    value: function checkError() {
	      if (this.url.values.error === undefined) {
	        return;
	      }
	      switch (this.url.values.error) {
	        case 'not_found':
	          return _react2.default.createElement(
	            'div',
	            { className: 'alert alert-warning' },
	            _react2.default.createElement(
	              'p',
	              null,
	              'Could not log-in account.'
	            ),
	            _react2.default.createElement(
	              'ul',
	              null,
	              _react2.default.createElement(
	                'li',
	                null,
	                'Is your caps lock on?'
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                'Has your account been approved?'
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'a',
	                  { href: './properties/Manager/signup' },
	                  'Have you applied for an account yet? ',
	                  _react2.default.createElement('i', { className: 'fa fa-external-link' })
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'a',
	                  { href: './properties/Manager/forgot' },
	                  'Did you forget your password? ',
	                  _react2.default.createElement('i', { className: 'fa fa-external-link' })
	                )
	              )
	            )
	          );
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var disabled = (0, _Empty2.default)(this.state.username) || (0, _Empty2.default)(this.state.password);
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Manager log-in'
	        ),
	        this.checkError(),
	        _react2.default.createElement(
	          'form',
	          { action: './properties/Manager/signin', method: 'post' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'manager_username',
	                label: 'Username',
	                value: this.state.username,
	                change: this.updateUsername,
	                autocomplete: false,
	                required: true })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'manager_password',
	                type: 'password',
	                label: 'Password',
	                value: this.state.password,
	                change: this.updatePassword,
	                autocomplete: false,
	                required: true })
	            )
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn btn-primary', disabled: disabled, onClick: this.submit },
	            'Log in'
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'marginTop' },
	          _react2.default.createElement(
	            'a',
	            { href: './properties/Manager/forgot' },
	            'Forgot password?'
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          _react2.default.createElement(
	            'a',
	            { href: './properties/Manager/signup' },
	            'Request a manager account.'
	          )
	        )
	      );
	    }
	  }]);
	
	  return ManagerSignin;
	}(_react2.default.Component);
	
	exports.default = ManagerSignin;
	
	
	ManagerSignin.propTypes = {};

/***/ },

/***/ 201:
/*!**********************************************!*\
  !*** ./javascript/Mixin/Helper/DecodeUrl.js ***!
  \**********************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Adapted from http://ideasandpixels.com/get-post-variables-with-javascript
	 */
	
	var DecodeUrl = function () {
	  function DecodeUrl() {
	    _classCallCheck(this, DecodeUrl);
	
	    this.url = document.location.search;
	    this.values = [];
	    this.process();
	  }
	
	  _createClass(DecodeUrl, [{
	    key: "process",
	    value: function process() {
	      this.url.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	        function decode(s) {
	          return decodeURIComponent(s.split("+").join(" "));
	        }
	
	        this.values[decode(arguments[1])] = decode(arguments[2]);
	      }.bind(this));
	    }
	  }]);
	
	  return DecodeUrl;
	}();
	
	exports.default = DecodeUrl;

/***/ }

});
//# sourceMappingURL=managersignin.js.map