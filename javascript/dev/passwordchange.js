webpackJsonp([6],{

/***/ 0:
/*!*********************************************!*\
  !*** ./javascript/PasswordChange/index.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 32);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Bind = __webpack_require__(/*! ../Mixin/Helper/Bind.js */ 189);
	
	var _Bind2 = _interopRequireDefault(_Bind);
	
	var _Message = __webpack_require__(/*! ../Mixin/Html/Message.jsx */ 187);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $, hash */
	
	var PasswordChange = function (_React$Component) {
	  _inherits(PasswordChange, _React$Component);
	
	  function PasswordChange(props) {
	    _classCallCheck(this, PasswordChange);
	
	    var _this = _possibleConstructorReturn(this, (PasswordChange.__proto__ || Object.getPrototypeOf(PasswordChange)).call(this, props));
	
	    _this.state = {
	      password: '',
	      passwordCheck: '',
	      username: '',
	      passwordError: null,
	      usernameError: null,
	      message: null
	    };
	    (0, _Bind2.default)(['updateUsername', 'updatePassword', 'updatePasswordCheck', 'checkPassword', 'checkUsername', 'disabled', 'save'], _this);
	    return _this;
	  }
	
	  _createClass(PasswordChange, [{
	    key: 'save',
	    value: function save() {
	      var _state = this.state;
	      var password = _state.password;
	      var username = _state.username;
	
	      $.post('./properties/Manager/changepw', {
	        password: password,
	        username: username,
	        hash: hash
	      }, null, 'json').done(function (data) {
	        if (data.success === false) {
	          this.setState({ message: data.error });
	        } else {
	          window.location.href = './properties/Manager/passwordChangeComplete';
	        }
	      }.bind(this)).fail(function () {
	        this.setState({ message: 'There was an error during your password update.' });
	      });
	    }
	  }, {
	    key: 'updateUsername',
	    value: function updateUsername(e) {
	      var username = e.target.value;
	      this.setState({ username: username });
	    }
	  }, {
	    key: 'updatePassword',
	    value: function updatePassword(e) {
	      var password = e.target.value;
	      this.setState({ password: password });
	    }
	  }, {
	    key: 'updatePasswordCheck',
	    value: function updatePasswordCheck(e) {
	      var password = e.target.value;
	      this.setState({ passwordCheck: password });
	    }
	  }, {
	    key: 'passwordError',
	    value: function passwordError() {
	      if (this.state.passwordError) {
	        return _react2.default.createElement(
	          'span',
	          { className: 'label label-danger' },
	          this.state.passwordError
	        );
	      }
	    }
	  }, {
	    key: 'usernameError',
	    value: function usernameError() {
	      if (this.state.usernameError) {
	        return _react2.default.createElement(
	          'span',
	          { className: 'label label-danger' },
	          this.state.usernameError
	        );
	      }
	    }
	  }, {
	    key: 'disabled',
	    value: function disabled() {
	      return this.state.password.length < 8 || this.state.password !== this.state.passwordCheck;
	    }
	  }, {
	    key: 'checkPassword',
	    value: function checkPassword() {
	      var errorMessage = void 0;
	      if (this.state.password.length < 8) {
	        errorMessage = 'Password must be at least eight characters in length';
	      } else if (this.state.password !== this.state.passwordCheck) {
	        errorMessage = 'Password must match';
	      }
	      this.setState({ passwordError: errorMessage });
	    }
	  }, {
	    key: 'checkUsername',
	    value: function checkUsername() {
	      var errorMessage = void 0;
	      if (this.state.username.length === 0) {
	        errorMessage = 'Username may not be empty';
	      }
	      this.setState({ usernameError: errorMessage });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var message = void 0;
	      if (this.state.message) {
	        message = _react2.default.createElement(_Message2.default, { type: 'danger', message: this.state.message });
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Password change'
	        ),
	        message,
	        _react2.default.createElement(
	          'p',
	          null,
	          'This form will change your sign in password. Enter your current user name and new password.'
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
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { htmlFor: 'username' },
	                  'Username'
	                ),
	                _react2.default.createElement('input', {
	                  id: 'username',
	                  type: 'text',
	                  name: 'username',
	                  value: this.state.username,
	                  className: 'form-control',
	                  onBlur: this.checkUsername,
	                  onChange: this.updateUsername }),
	                this.usernameError()
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
	                _react2.default.createElement(
	                  'label',
	                  { htmlFor: 'password' },
	                  'New password'
	                ),
	                _react2.default.createElement('input', {
	                  id: 'password',
	                  type: 'password',
	                  name: 'password1',
	                  value: this.state.password,
	                  className: 'form-control',
	                  onBlur: this.checkPassword,
	                  onChange: this.updatePassword }),
	                ' ',
	                this.passwordError()
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { htmlFor: 'password2' },
	                  'Verify password'
	                ),
	                _react2.default.createElement('input', {
	                  id: 'password2',
	                  type: 'password',
	                  name: 'password2',
	                  className: 'form-control',
	                  value: this.state.passwordCheck,
	                  onBlur: this.checkPassword,
	                  onChange: this.updatePasswordCheck })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'button',
	            {
	              type: 'button',
	              className: 'btn btn-primary',
	              disabled: this.disabled(),
	              onClick: this.save },
	            'Update password'
	          )
	        )
	      );
	    }
	  }]);
	
	  return PasswordChange;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(PasswordChange, null), document.getElementById('passwordchange'));

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
//# sourceMappingURL=passwordchange.js.map