webpackJsonp([20],{

/***/ 14:
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./javascript/Mixin/Helper/Bind.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = bindMethods;\nfunction bindMethods(bindable, object) {\n  bindable.map(function (v) {\n    if (object[v] === undefined) {\n      throw new Error(\"Cannot bind undefined method: \" + v);\n    }\n    object[v] = this[v].bind(object);\n  }.bind(object));\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vamF2YXNjcmlwdC9NaXhpbi9IZWxwZXIvQmluZC5qcz9iMjViIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRNZXRob2RzKGJpbmRhYmxlLCBvYmplY3QpIHtcbiAgYmluZGFibGUubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgaWYgKG9iamVjdFt2XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBiaW5kIHVuZGVmaW5lZCBtZXRob2Q6ICR7dn1gKVxuICAgIH1cbiAgICBvYmplY3Rbdl0gPSB0aGlzW3ZdLmJpbmQob2JqZWN0KVxuICB9LmJpbmQob2JqZWN0KSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBqYXZhc2NyaXB0L01peGluL0hlbHBlci9CaW5kLmpzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),

/***/ 18:
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./javascript/Mixin/Html/Message.jsx ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ 1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ 2);\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Message = function (_Component) {\n  _inherits(Message, _Component);\n\n  function Message(props) {\n    _classCallCheck(this, Message);\n\n    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));\n  }\n\n  _createClass(Message, [{\n    key: 'render',\n    value: function render() {\n      var icon = '';\n      switch (this.props.type) {\n        case 'danger':\n          icon = 'fa fa-exclamation-triangle';\n          break;\n\n        case 'success':\n          icon = 'fa fa-thumbs-o-up';\n          break;\n\n        case 'info':\n          icon = 'fa fa-info-circle';\n          break;\n\n        case 'warning':\n          icon = 'fa fa-hand-paper-o';\n          break;\n      }\n\n      var messageType = 'alert alert-dismissible alert-' + this.props.type;\n      return _react2.default.createElement(\n        'div',\n        { className: messageType, role: 'alert' },\n        _react2.default.createElement(\n          'button',\n          {\n            type: 'button',\n            onClick: this.props.onClose,\n            className: 'close',\n            'data-dismiss': 'alert',\n            'aria-label': 'Close' },\n          _react2.default.createElement(\n            'span',\n            { 'aria-hidden': 'true' },\n            '\\xD7'\n          )\n        ),\n        _react2.default.createElement('i', { className: icon }),\n        '\\xA0',\n        this.props.message\n      );\n    }\n  }]);\n\n  return Message;\n}(_react.Component);\n\nMessage.propTypes = {\n  type: _propTypes2.default.string,\n  message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),\n  onClose: _propTypes2.default.func\n};\n\nMessage.defaultProps = {\n  type: 'info'\n};\n\nexports.default = Message;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vamF2YXNjcmlwdC9NaXhpbi9IdG1sL01lc3NhZ2UuanN4P2U2YmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxuY2xhc3MgTWVzc2FnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGljb24gPSAnJ1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy50eXBlKSB7XG4gICAgICBjYXNlICdkYW5nZXInOlxuICAgICAgICBpY29uID0gJ2ZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJ1xuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgaWNvbiA9ICdmYSBmYS10aHVtYnMtby11cCdcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIGljb24gPSAnZmEgZmEtaW5mby1jaXJjbGUnXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICBpY29uID0gJ2ZhIGZhLWhhbmQtcGFwZXItbydcbiAgICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBsZXQgbWVzc2FnZVR5cGUgPSAnYWxlcnQgYWxlcnQtZGlzbWlzc2libGUgYWxlcnQtJyArIHRoaXMucHJvcHMudHlwZVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bWVzc2FnZVR5cGV9IHJvbGU9XCJhbGVydFwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsb3NlfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImNsb3NlXCJcbiAgICAgICAgICBkYXRhLWRpc21pc3M9XCJhbGVydFwiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxpIGNsYXNzTmFtZT17aWNvbn0+PC9pPiZuYnNwO1xuICAgICAgICB7dGhpcy5wcm9wcy5tZXNzYWdlfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbk1lc3NhZ2UucHJvcFR5cGVzID0ge1xuICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLFByb3BUeXBlcy5lbGVtZW50XSksXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jXG59XG5cbk1lc3NhZ2UuZGVmYXVsdFByb3BzID0ge1xuICB0eXBlOiAnaW5mbydcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGphdmFzY3JpcHQvTWl4aW4vSHRtbC9NZXNzYWdlLmpzeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZBO0FBQ0E7QUFpQkE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU5BO0FBUUE7QUFUQTtBQVVBO0FBVkE7QUFhQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQURBO0FBQ0E7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),

/***/ 551:
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./javascript/PasswordChange/index.jsx ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ 1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ 3);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _Bind = __webpack_require__(/*! ../Mixin/Helper/Bind.js */ 14);\n\nvar _Bind2 = _interopRequireDefault(_Bind);\n\nvar _Message = __webpack_require__(/*! ../Mixin/Html/Message.jsx */ 18);\n\nvar _Message2 = _interopRequireDefault(_Message);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/* global $, hash */\n\nvar PasswordChange = function (_Component) {\n  _inherits(PasswordChange, _Component);\n\n  function PasswordChange(props) {\n    _classCallCheck(this, PasswordChange);\n\n    var _this = _possibleConstructorReturn(this, (PasswordChange.__proto__ || Object.getPrototypeOf(PasswordChange)).call(this, props));\n\n    _this.state = {\n      password: '',\n      passwordCheck: '',\n      username: '',\n      passwordError: null,\n      usernameError: null,\n      message: null\n    };\n    (0, _Bind2.default)(['updateUsername', 'updatePassword', 'updatePasswordCheck', 'checkPassword', 'checkUsername', 'disabled', 'save'], _this);\n    return _this;\n  }\n\n  _createClass(PasswordChange, [{\n    key: 'save',\n    value: function save() {\n      var _state = this.state,\n          password = _state.password,\n          username = _state.username;\n\n      $.post('./properties/Manager/changepw', {\n        password: password,\n        username: username,\n        hash: hash\n      }, null, 'json').done(function (data) {\n        if (data.success === false) {\n          this.setState({ message: data.error });\n        } else {\n          window.location.href = './properties/Manager/passwordChangeComplete';\n        }\n      }.bind(this)).fail(function () {\n        this.setState({ message: 'There was an error during your password update.' });\n      });\n    }\n  }, {\n    key: 'updateUsername',\n    value: function updateUsername(e) {\n      var username = e.target.value;\n      this.setState({ username: username });\n    }\n  }, {\n    key: 'updatePassword',\n    value: function updatePassword(e) {\n      var password = e.target.value;\n      this.setState({ password: password });\n    }\n  }, {\n    key: 'updatePasswordCheck',\n    value: function updatePasswordCheck(e) {\n      var password = e.target.value;\n      this.setState({ passwordCheck: password });\n    }\n  }, {\n    key: 'passwordError',\n    value: function passwordError() {\n      if (this.state.passwordError) {\n        return _react2.default.createElement(\n          'span',\n          { className: 'label label-danger' },\n          this.state.passwordError\n        );\n      }\n    }\n  }, {\n    key: 'usernameError',\n    value: function usernameError() {\n      if (this.state.usernameError) {\n        return _react2.default.createElement(\n          'span',\n          { className: 'label label-danger' },\n          this.state.usernameError\n        );\n      }\n    }\n  }, {\n    key: 'disabled',\n    value: function disabled() {\n      return this.state.password.length < 8 || this.state.password !== this.state.passwordCheck;\n    }\n  }, {\n    key: 'checkPassword',\n    value: function checkPassword() {\n      var errorMessage = void 0;\n      if (this.state.password.length < 8) {\n        errorMessage = 'Password must be at least eight characters in length';\n      } else if (this.state.password !== this.state.passwordCheck) {\n        errorMessage = 'Password must match';\n      }\n      this.setState({ passwordError: errorMessage });\n    }\n  }, {\n    key: 'checkUsername',\n    value: function checkUsername() {\n      var errorMessage = void 0;\n      if (this.state.username.length === 0) {\n        errorMessage = 'Username may not be empty';\n      }\n      this.setState({ usernameError: errorMessage });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var message = void 0;\n      if (this.state.message) {\n        message = _react2.default.createElement(_Message2.default, { type: 'danger', message: this.state.message });\n      }\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          'h2',\n          null,\n          'Password change'\n        ),\n        message,\n        _react2.default.createElement(\n          'p',\n          null,\n          'This form will change your sign in password. Enter your current user name and new password.'\n        ),\n        _react2.default.createElement(\n          'form',\n          null,\n          _react2.default.createElement(\n            'div',\n            { className: 'row' },\n            _react2.default.createElement(\n              'div',\n              { className: 'col-sm-6' },\n              _react2.default.createElement(\n                'div',\n                { className: 'form-group' },\n                _react2.default.createElement(\n                  'label',\n                  { htmlFor: 'username' },\n                  'Username'\n                ),\n                _react2.default.createElement('input', {\n                  id: 'username',\n                  type: 'text',\n                  name: 'username',\n                  value: this.state.username,\n                  className: 'form-control',\n                  onBlur: this.checkUsername,\n                  onChange: this.updateUsername }),\n                this.usernameError()\n              )\n            )\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'row' },\n            _react2.default.createElement(\n              'div',\n              { className: 'col-sm-6' },\n              _react2.default.createElement(\n                'div',\n                { className: 'form-group' },\n                _react2.default.createElement(\n                  'label',\n                  { htmlFor: 'password' },\n                  'New password'\n                ),\n                _react2.default.createElement('input', {\n                  id: 'password',\n                  type: 'password',\n                  name: 'password1',\n                  value: this.state.password,\n                  className: 'form-control',\n                  onBlur: this.checkPassword,\n                  placeholder: 'Eight characters or longer',\n                  onChange: this.updatePassword }),\n                ' ',\n                this.passwordError()\n              ),\n              _react2.default.createElement(\n                'div',\n                { className: 'form-group' },\n                _react2.default.createElement(\n                  'label',\n                  { htmlFor: 'password2' },\n                  'Verify password'\n                ),\n                _react2.default.createElement('input', {\n                  id: 'password2',\n                  type: 'password',\n                  name: 'password2',\n                  className: 'form-control',\n                  value: this.state.passwordCheck,\n                  onBlur: this.checkPassword,\n                  onChange: this.updatePasswordCheck })\n              )\n            )\n          ),\n          _react2.default.createElement(\n            'button',\n            {\n              type: 'button',\n              className: 'btn btn-primary',\n              disabled: this.disabled(),\n              onClick: this.save },\n            'Update password'\n          )\n        )\n      );\n    }\n  }]);\n\n  return PasswordChange;\n}(_react.Component);\n\n_reactDom2.default.render(_react2.default.createElement(PasswordChange, null), document.getElementById('passwordchange'));//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTUxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2phdmFzY3JpcHQvUGFzc3dvcmRDaGFuZ2UvaW5kZXguanN4P2Y2ZGIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCBiaW5kTWV0aG9kIGZyb20gJy4uL01peGluL0hlbHBlci9CaW5kLmpzJ1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi4vTWl4aW4vSHRtbC9NZXNzYWdlLmpzeCdcblxuLyogZ2xvYmFsICQsIGhhc2ggKi9cblxuY2xhc3MgUGFzc3dvcmRDaGFuZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwYXNzd29yZDogJycsXG4gICAgICBwYXNzd29yZENoZWNrOiAnJyxcbiAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgIHBhc3N3b3JkRXJyb3I6IG51bGwsXG4gICAgICB1c2VybmFtZUVycm9yOiBudWxsLFxuICAgICAgbWVzc2FnZTogbnVsbFxuICAgIH1cbiAgICBiaW5kTWV0aG9kKFtcbiAgICAgICd1cGRhdGVVc2VybmFtZScsXG4gICAgICAndXBkYXRlUGFzc3dvcmQnLFxuICAgICAgJ3VwZGF0ZVBhc3N3b3JkQ2hlY2snLFxuICAgICAgJ2NoZWNrUGFzc3dvcmQnLFxuICAgICAgJ2NoZWNrVXNlcm5hbWUnLFxuICAgICAgJ2Rpc2FibGVkJyxcbiAgICAgICdzYXZlJ1xuICAgIF0sIHRoaXMpXG4gIH1cblxuICBzYXZlKCkge1xuICAgIGxldCB7cGFzc3dvcmQsIHVzZXJuYW1lfSA9IHRoaXMuc3RhdGVcbiAgICAkLnBvc3QoJy4vcHJvcGVydGllcy9NYW5hZ2VyL2NoYW5nZXB3Jywge1xuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgaGFzaDogaGFzaFxuICAgIH0sIG51bGwsICdqc29uJykuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogZGF0YS5lcnJvcn0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL3Byb3BlcnRpZXMvTWFuYWdlci9wYXNzd29yZENoYW5nZUNvbXBsZXRlJ1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSkuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiAnVGhlcmUgd2FzIGFuIGVycm9yIGR1cmluZyB5b3VyIHBhc3N3b3JkIHVwZGF0ZS4nfSlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlVXNlcm5hbWUoZSkge1xuICAgIGNvbnN0IHVzZXJuYW1lID0gZS50YXJnZXQudmFsdWVcbiAgICB0aGlzLnNldFN0YXRlKHt1c2VybmFtZTogdXNlcm5hbWV9KVxuICB9XG5cbiAgdXBkYXRlUGFzc3dvcmQoZSkge1xuICAgIGNvbnN0IHBhc3N3b3JkID0gZS50YXJnZXQudmFsdWVcbiAgICB0aGlzLnNldFN0YXRlKHtwYXNzd29yZDogcGFzc3dvcmR9KVxuICB9XG5cbiAgdXBkYXRlUGFzc3dvcmRDaGVjayhlKSB7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBlLnRhcmdldC52YWx1ZVxuICAgIHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkQ2hlY2s6IHBhc3N3b3JkfSlcbiAgfVxuXG4gIHBhc3N3b3JkRXJyb3IoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUucGFzc3dvcmRFcnJvcikge1xuICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIGxhYmVsLWRhbmdlclwiPnt0aGlzLnN0YXRlLnBhc3N3b3JkRXJyb3J9PC9zcGFuPlxuICAgIH1cbiAgfVxuXG4gIHVzZXJuYW1lRXJyb3IoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudXNlcm5hbWVFcnJvcikge1xuICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIGxhYmVsLWRhbmdlclwiPnt0aGlzLnN0YXRlLnVzZXJuYW1lRXJyb3J9PC9zcGFuPlxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnBhc3N3b3JkLmxlbmd0aCA8IDggfHwgdGhpcy5zdGF0ZS5wYXNzd29yZCAhPT0gdGhpcy5zdGF0ZS5wYXNzd29yZENoZWNrXG4gIH1cblxuICBjaGVja1Bhc3N3b3JkKCkge1xuICAgIGxldCBlcnJvck1lc3NhZ2VcbiAgICBpZiAodGhpcy5zdGF0ZS5wYXNzd29yZC5sZW5ndGggPCA4KSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCBlaWdodCBjaGFyYWN0ZXJzIGluIGxlbmd0aCdcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUucGFzc3dvcmQgIT09IHRoaXMuc3RhdGUucGFzc3dvcmRDaGVjaykge1xuICAgICAgZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkIG11c3QgbWF0Y2gnXG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkRXJyb3I6IGVycm9yTWVzc2FnZX0pXG4gIH1cblxuICBjaGVja1VzZXJuYW1lKCkge1xuICAgIGxldCBlcnJvck1lc3NhZ2VcbiAgICBpZiAodGhpcy5zdGF0ZS51c2VybmFtZS5sZW5ndGggPT09IDApIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9ICdVc2VybmFtZSBtYXkgbm90IGJlIGVtcHR5J1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHt1c2VybmFtZUVycm9yOiBlcnJvck1lc3NhZ2V9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBtZXNzYWdlXG4gICAgaWYgKHRoaXMuc3RhdGUubWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IDxNZXNzYWdlIHR5cGU9XCJkYW5nZXJcIiBtZXNzYWdlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9Lz5cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj5QYXNzd29yZCBjaGFuZ2U8L2gyPlxuICAgICAgICB7bWVzc2FnZX1cbiAgICAgICAgPHA+VGhpcyBmb3JtIHdpbGwgY2hhbmdlIHlvdXIgc2lnbiBpbiBwYXNzd29yZC4gRW50ZXIgeW91ciBjdXJyZW50IHVzZXIgbmFtZSBhbmRcbiAgICAgICAgICBuZXcgcGFzc3dvcmQuPC9wPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInVzZXJuYW1lXCI+VXNlcm5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgaWQ9XCJ1c2VybmFtZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICBuYW1lPVwidXNlcm5hbWVcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmNoZWNrVXNlcm5hbWV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGVVc2VybmFtZX0vPnt0aGlzLnVzZXJuYW1lRXJyb3IoKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCI+TmV3IHBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZDFcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmNoZWNrUGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVpZ2h0IGNoYXJhY3RlcnMgb3IgbG9uZ2VyXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVBhc3N3b3JkfS8+IHt0aGlzLnBhc3N3b3JkRXJyb3IoKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGFzc3dvcmQyXCI+VmVyaWZ5IHBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGlkPVwicGFzc3dvcmQyXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmQyXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZENoZWNrfVxuICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmNoZWNrUGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGVQYXNzd29yZENoZWNrfS8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWQoKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2F2ZX0+VXBkYXRlIHBhc3N3b3JkPC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5SZWFjdERPTS5yZW5kZXIoXG4gIDxQYXNzd29yZENoYW5nZS8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmRjaGFuZ2UnKSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBqYXZhc2NyaXB0L1Bhc3N3b3JkQ2hhbmdlL2luZGV4LmpzeCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFWQTtBQW1CQTtBQUNBOzs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBVEE7QUFEQTtBQURBO0FBZUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBVUE7QUFWQTtBQVlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFiQTtBQURBO0FBMkJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFBQTtBQTNDQTtBQUxBO0FBd0RBOzs7Ozs7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

},[551]);