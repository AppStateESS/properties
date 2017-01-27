webpackJsonp([0],{

/***/ 0:
/*!**************************************!*\
  !*** ./javascript/Manager/index.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Manager = __webpack_require__(/*! ./Manager.jsx */ 172);
	
	var _Manager2 = _interopRequireDefault(_Manager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_Manager2.default, null), document.getElementById('manager'));

/***/ },

/***/ 172:
/*!****************************************!*\
  !*** ./javascript/Manager/Manager.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ListManagers = __webpack_require__(/*! ./ListManagers.jsx */ 173);
	
	var _ListManagers2 = _interopRequireDefault(_ListManagers);
	
	var _ManagerForm = __webpack_require__(/*! ./ManagerForm.jsx */ 176);
	
	var _ManagerForm2 = _interopRequireDefault(_ManagerForm);
	
	var _Message = __webpack_require__(/*! ../Mixin/Html/Message.jsx */ 434);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Html/Waiting.jsx */ 427);
	
	var _Waiting2 = _interopRequireDefault(_Waiting);
	
	var _Bind = __webpack_require__(/*! ../Mixin/Helper/Bind.js */ 432);
	
	var _Bind2 = _interopRequireDefault(_Bind);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var Manager = function (_React$Component) {
	  _inherits(Manager, _React$Component);
	
	  function Manager(props) {
	    _classCallCheck(this, Manager);
	
	    var _this = _possibleConstructorReturn(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).call(this, props));
	
	    _this.delay;
	    _this.admin = false;
	    _this.state = {
	      managers: null,
	      message: null,
	      currentManager: {}
	    };
	    _this.search = '';
	    var bindable = ['clearSearch', 'dropManager', 'getMessage', 'load', 'fillForm', 'searchManager', 'setMessage', 'updateManager'];
	
	    (0, _Bind2.default)(bindable, _this);
	    return _this;
	  }
	
	  _createClass(Manager, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.load();
	    }
	  }, {
	    key: 'fillForm',
	    value: function fillForm(manager) {
	      this.setState({ currentManager: manager });
	      $('#reactModal').modal('show');
	    }
	  }, {
	    key: 'setMessage',
	    value: function setMessage(message) {
	      this.setState({ 'message': message });
	    }
	  }, {
	    key: 'getMessage',
	    value: function getMessage() {
	      if (this.state.message !== null) {
	        setTimeout(function () {
	          this.setState({ message: null });
	        }.bind(this), 4000);
	        return _react2.default.createElement(_Message2.default, { message: this.state.message });
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      $.getJSON('properties/Manager', { search: this.search }).done(function (data) {
	        this.admin = data.admin;
	        this.setState({ managers: data['managerList'] });
	      }.bind(this)).fail(function () {
	        this.setState({ managers: null });
	        this.setMessage('Error: failure pulling managers');
	      }.bind(this));
	    }
	  }, {
	    key: 'updateManager',
	    value: function updateManager(key) {
	      var managers = this.state.managers;
	      var manager = this.state.managers[key];
	      $.getJSON('properties/Manager/' + manager.id).done(function (data) {
	        managers[key] = data;
	        this.setState({ managers: managers });
	      }.bind(this));
	    }
	  }, {
	    key: 'dropManager',
	    value: function dropManager(key) {
	      var managers = this.state.managers;
	      managers.splice(key, 1);
	      this.setState({ managers: managers });
	    }
	  }, {
	    key: 'searchManager',
	    value: function searchManager(e) {
	      clearTimeout(this.delay);
	      var search = e.target.value;
	      if (search.length < 3 && search.length > 0) {
	        return;
	      }
	      this.delay = setTimeout(function () {
	        this.search = search;
	        this.load();
	      }.bind(this, search), 500);
	    }
	  }, {
	    key: 'clearSearch',
	    value: function clearSearch() {
	      this.refs.managerSearch.value = '';
	      this.search = '';
	      this.load();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var managerForm = null;
	      var message = this.getMessage();
	      if (this.admin) {
	        managerForm = _react2.default.createElement(_ManagerForm2.default, { manager: this.state.currentManager, reload: this.load, message: this.setMessage });
	      }
	      if (this.state.managers === null) {
	        return _react2.default.createElement(_Waiting2.default, { label: 'managers' });
	      } else {
	        return _react2.default.createElement(
	          'div',
	          null,
	          managerForm,
	          message,
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(
	                'div',
	                { className: 'input-group' },
	                _react2.default.createElement('input', {
	                  ref: 'managerSearch',
	                  className: 'form-control',
	                  type: 'text',
	                  placeholder: 'Search for managers...',
	                  onChange: this.searchManager }),
	                _react2.default.createElement(
	                  'span',
	                  { className: 'input-group-btn' },
	                  _react2.default.createElement(
	                    'button',
	                    { className: 'btn btn-default', type: 'button', onClick: this.clearSearch },
	                    'Clear'
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-2' },
	              this.admin ? _react2.default.createElement(
	                'button',
	                {
	                  className: 'btn btn-success',
	                  'data-toggle': 'modal',
	                  'data-target': '#reactModal' },
	                _react2.default.createElement('i', { className: 'fa fa-plus' }),
	                '\xA0 Add manager'
	              ) : null
	            )
	          ),
	          _react2.default.createElement('hr', null),
	          _react2.default.createElement(_ListManagers2.default, {
	            managers: this.state.managers,
	            fillForm: this.fillForm,
	            reload: this.updateManager,
	            remove: this.dropManager,
	            message: this.setMessage,
	            admin: this.admin })
	        );
	      }
	    }
	  }]);
	
	  return Manager;
	}(_react2.default.Component);
	
	exports.default = Manager;

/***/ },

/***/ 173:
/*!*********************************************!*\
  !*** ./javascript/Manager/ListManagers.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ManagerRow = __webpack_require__(/*! ./ManagerRow.jsx */ 174);
	
	var _ManagerRow2 = _interopRequireDefault(_ManagerRow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ListManagers = function (_React$Component) {
	  _inherits(ListManagers, _React$Component);
	
	  function ListManagers(props) {
	    _classCallCheck(this, ListManagers);
	
	    return _possibleConstructorReturn(this, (ListManagers.__proto__ || Object.getPrototypeOf(ListManagers)).call(this, props));
	  }
	
	  _createClass(ListManagers, [{
	    key: 'render',
	    value: function render() {
	      var listRows = null;
	      if (!this.props.managers || this.props.managers.length === 0) {
	        return _react2.default.createElement(
	          'h2',
	          null,
	          'No managers found.'
	        );
	      } else {
	        listRows = this.props.managers.map(function (value, key) {
	          return _react2.default.createElement(_ManagerRow2.default, _extends({
	            key: key
	          }, value, {
	            showProperties: this.props.showProperties,
	            fillForm: this.props.fillForm.bind(this, value),
	            reload: this.props.reload.bind(this, key),
	            remove: this.props.remove.bind(this, key),
	            message: this.props.message,
	            admin: this.props.admin }));
	        }.bind(this));
	      }
	      return _react2.default.createElement(
	        'table',
	        { className: 'table' },
	        _react2.default.createElement(
	          'thead',
	          null,
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'th',
	              null,
	              'Manager'
	            ),
	            _react2.default.createElement(
	              'th',
	              null,
	              'Properties'
	            ),
	            _react2.default.createElement(
	              'th',
	              null,
	              'Contact'
	            ),
	            this.props.admin === true ? _react2.default.createElement(
	              'th',
	              null,
	              'Options'
	            ) : null
	          )
	        ),
	        _react2.default.createElement(
	          'tbody',
	          null,
	          listRows
	        )
	      );
	    }
	  }]);
	
	  return ListManagers;
	}(_react2.default.Component);
	
	ListManagers.propTypes = {
	  managers: _react2.default.PropTypes.array,
	  fillForm: _react2.default.PropTypes.func,
	  reload: _react2.default.PropTypes.func,
	  showProperties: _react2.default.PropTypes.func,
	  message: _react2.default.PropTypes.func,
	  remove: _react2.default.PropTypes.func,
	  admin: _react2.default.PropTypes.bool
	};
	
	exports.default = ListManagers;

/***/ },

/***/ 174:
/*!*******************************************!*\
  !*** ./javascript/Manager/ManagerRow.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Dropdown = __webpack_require__(/*! ../Mixin/Form/Dropdown.jsx */ 442);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var ManagerRow = function (_React$Component) {
	  _inherits(ManagerRow, _React$Component);
	
	  function ManagerRow(props) {
	    _classCallCheck(this, ManagerRow);
	
	    var _this = _possibleConstructorReturn(this, (ManagerRow.__proto__ || Object.getPrototypeOf(ManagerRow)).call(this, props));
	
	    _this.delete = _this.delete.bind(_this);
	    _this.activate = _this.activate.bind(_this);
	    _this.deactivate = _this.deactivate.bind(_this);
	    return _this;
	  }
	
	  _createClass(ManagerRow, [{
	    key: 'delete',
	    value: function _delete() {
	      if (prompt("Deleting this manager will remove their account and all their properties.\nType " + "'DELETE' to confirm") === 'DELETE') {
	        $.ajax({
	          url: './properties/Manager/?managerId=' + this.props.id,
	          dataType: 'json',
	          type: 'delete'
	        }).done(function (data) {
	          if (data.success === true) {
	            this.props.remove();
	          }
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'activate',
	    value: function activate() {
	      $.ajax({
	        url: './properties/Manager',
	        type: 'patch',
	        data: {
	          param: 'active',
	          active: true,
	          managerId: this.props.id
	        }
	      }).done(function () {
	        this.props.message('Manager activated');
	        this.props.reload();
	      }.bind(this));
	    }
	  }, {
	    key: 'deactivate',
	    value: function deactivate() {
	      $.ajax({
	        url: './properties/Manager',
	        type: 'patch',
	        data: {
	          param: 'active',
	          active: false,
	          managerId: this.props.id
	        }
	      }).done(function () {
	        this.props.message('Manager deactivated');
	        this.props.reload();
	      }.bind(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var lastLog = void 0;
	
	      if (this.props.last_log !== null) {
	        var lastDate = new Date(this.props.last_log * 1000);
	        lastLog = lastDate.toDateString();
	      }
	
	      var alabel = null;
	      var aicon = null;
	      var ahandle = null;
	
	      if (this.props.active === '1') {
	        alabel = 'Deactivate';
	        aicon = _react2.default.createElement('i', {
	          className: 'text-danger fa fa-lg fa-times-circle',
	          role: 'button',
	          title: 'Click to deactivate' });
	        ahandle = this.deactivate;
	      } else {
	        alabel = 'Activate';
	        aicon = _react2.default.createElement('i', {
	          className: 'text-success fa fa-lg fa-check-circle',
	          role: 'button',
	          title: 'Click to activate' });
	        ahandle = this.activate;
	      }
	
	      var optionList = null;
	      if (this.props.admin) {
	        var options = [{
	          label: 'Edit',
	          icon: _react2.default.createElement('i', { className: 'fa fa-pencil-square-o' }),
	          handleClick: this.props.fillForm
	        }, {
	          label: 'Add property',
	          icon: _react2.default.createElement('i', { className: 'fa fa-building-o' }),
	          link: './properties/Property/create/?managerId=' + this.props.id
	        }, {
	          label: alabel,
	          icon: aicon,
	          handleClick: ahandle
	        }, {
	          label: 'Delete',
	          icon: _react2.default.createElement('i', { className: 'fa fa-trash' }),
	          handleClick: this.delete
	        }];
	        optionList = _react2.default.createElement(_Dropdown2.default, { options: options, label: 'Options' });
	      }
	
	      var properties = _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'em',
	          null,
	          'None'
	        )
	      );
	      if (this.props.property_count > 0) {
	        properties = _react2.default.createElement(
	          'a',
	          {
	            href: './properties/Property/?managerId=' + this.props.id,
	            className: 'btn btn-default' },
	          'View Properties'
	        );
	      }
	
	      var co = null;
	      if (this.props.first_name.length > 0) {
	        co = _react2.default.createElement(
	          'small',
	          null,
	          '(c/o ',
	          this.props.first_name,
	          '\xA0',
	          this.props.last_name,
	          ')'
	        );
	      }
	      var email = 'mailto:' + this.props.email_address;
	      var viewLink = './properties/Manager/' + this.props.id + '/view';
	      return _react2.default.createElement(
	        'tr',
	        { className: this.props.active === '0' ? 'bg-danger' : '' },
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            'span',
	            { className: 'company-name' },
	            _react2.default.createElement(
	              'a',
	              { href: viewLink },
	              this.props.company_name
	            )
	          ),
	          _react2.default.createElement('br', null),
	          co
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          properties
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(LinkToButton, { url: this.props.phone_tel, icon: 'fa-phone', label: this.props.phone }),
	          _react2.default.createElement(Website, { url: this.props.company_url }),
	          _react2.default.createElement(LinkToButton, {
	            url: email,
	            icon: 'fa-envelope-o',
	            label: this.props.email_address })
	        ),
	        this.props.admin === true ? _react2.default.createElement(
	          'td',
	          null,
	          optionList
	        ) : null
	      );
	    }
	  }]);
	
	  return ManagerRow;
	}(_react2.default.Component);
	
	ManagerRow.defaultProps = {
	  phone: '',
	  phone_tel: '',
	  email_address: '',
	  last_log: null,
	  company_url: '',
	  first_name: '',
	  last_name: '',
	  admin: false
	};
	
	ManagerRow.propTypes = {
	  property_count: _react2.default.PropTypes.string,
	  email_address: _react2.default.PropTypes.string,
	  company_name: _react2.default.PropTypes.string,
	  showProperties: _react2.default.PropTypes.func,
	  company_url: _react2.default.PropTypes.string,
	  first_name: _react2.default.PropTypes.string,
	  last_name: _react2.default.PropTypes.string,
	  phone_tel: _react2.default.PropTypes.string,
	  last_log: _react2.default.PropTypes.string,
	  fillForm: _react2.default.PropTypes.func,
	  active: _react2.default.PropTypes.string,
	  message: _react2.default.PropTypes.func,
	  phone: _react2.default.PropTypes.string,
	  remove: _react2.default.PropTypes.func,
	  reload: _react2.default.PropTypes.func,
	  admin: _react2.default.PropTypes.bool,
	  id: _react2.default.PropTypes.string
	};
	
	var Website = function (_React$Component2) {
	  _inherits(Website, _React$Component2);
	
	  function Website() {
	    _classCallCheck(this, Website);
	
	    return _possibleConstructorReturn(this, (Website.__proto__ || Object.getPrototypeOf(Website)).apply(this, arguments));
	  }
	
	  _createClass(Website, [{
	    key: 'render',
	    value: function render() {
	      if (this.props.url.length > 0) {
	        return _react2.default.createElement(LinkToButton, { url: this.props.url, label: this.props.url, icon: 'fa-link' });
	      } else {
	        return null;
	      }
	    }
	  }]);
	
	  return Website;
	}(_react2.default.Component);
	
	Website.propTypes = {
	  url: _react2.default.PropTypes.string
	};
	
	var LinkToButton = function (_React$Component3) {
	  _inherits(LinkToButton, _React$Component3);
	
	  function LinkToButton() {
	    _classCallCheck(this, LinkToButton);
	
	    return _possibleConstructorReturn(this, (LinkToButton.__proto__ || Object.getPrototypeOf(LinkToButton)).apply(this, arguments));
	  }
	
	  _createClass(LinkToButton, [{
	    key: 'render',
	    value: function render() {
	      var bigIconClass = 'fa fa-2x ' + this.props.icon;
	      var smallIconClass = 'fa ' + this.props.icon;
	      return _react2.default.createElement(
	        'span',
	        null,
	        _react2.default.createElement(
	          'a',
	          {
	            href: this.props.url,
	            target: '_blank',
	            className: 'link-button visible-xs-inline-block btn btn-primary' },
	          _react2.default.createElement('i', { className: bigIconClass })
	        ),
	        _react2.default.createElement(
	          'a',
	          {
	            href: this.props.url,
	            className: 'visible-sm visible-md visible-lg',
	            target: '_blank' },
	          _react2.default.createElement('i', { className: smallIconClass }),
	          '\xA0',
	          this.props.label
	        )
	      );
	    }
	  }]);
	
	  return LinkToButton;
	}(_react2.default.Component);
	
	LinkToButton.propTypes = {
	  url: _react2.default.PropTypes.string,
	  icon: _react2.default.PropTypes.string,
	  label: _react2.default.PropTypes.string
	};
	
	exports.default = ManagerRow;

/***/ },

/***/ 176:
/*!********************************************!*\
  !*** ./javascript/Manager/ManagerForm.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InputField = __webpack_require__(/*! ../Mixin/Form/InputField.jsx */ 428);
	
	var _InputField2 = _interopRequireDefault(_InputField);
	
	var _Modal = __webpack_require__(/*! ../Mixin/Html/Modal.jsx */ 444);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _CheckValues = __webpack_require__(/*! ../Mixin/Helper/CheckValues */ 436);
	
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
	      id: 0,
	      username: '',
	      password: '',
	      first_name: '',
	      last_name: '',
	      phone: '',
	      email_address: '',
	      company_name: '',
	      company_address: '',
	      company_url: '',
	      times_available: '',
	      usernameError: null,
	      passwordError: null,
	      firstNameError: null,
	      lastNameError: null,
	      phoneError: null,
	      emailError: null,
	      companyNameError: null
	    };
	
	    var bindable = ['addTestData', 'checkCompanyName', 'checkEmailAddress', 'checkEmailDuplicate', 'checkPassword', 'checkPhone', 'checkUsername', 'checkUsernameDuplicate', 'resetForm', 'save', 'setCompanyName', 'setCompanyAddress', 'setCompanyUrl', 'setEmailAddress', 'setFirstName', 'setLastName', 'setPassword', 'setPhone', 'setTimesAvailable', 'setUsername'];
	
	    bindable.map(function (v) {
	      this[v] = this[v].bind(this);
	    }.bind(_this));
	    return _this;
	  }
	
	  _createClass(ManagerForm, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var manager = this.props.manager;
	      if (manager.length === 0) {
	        return;
	      }
	      this.setState({
	        id: manager.id,
	        username: manager.username,
	        password: manager.password,
	        first_name: manager.first_name,
	        last_name: manager.last_name,
	        phone: manager.phone,
	        email_address: manager.email_address,
	        company_name: manager.company_name,
	        company_address: manager.company_address,
	        company_url: manager.company_url,
	        times_available: manager.times_available,
	        usernameError: null,
	        passwordError: null,
	        firstNameError: null,
	        lastNameError: null,
	        phoneError: null,
	        emailError: null,
	        companyNameError: null
	      });
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(props) {
	      var manager = props.manager;
	      if (manager.id !== undefined && manager.id !== this.state.id) {
	        this.setState({
	          id: manager.id,
	          username: manager.username,
	          password: '',
	          first_name: manager.first_name,
	          last_name: manager.last_name,
	          phone: manager.phone,
	          email_address: manager.email_address,
	          company_name: manager.company_name,
	          company_address: manager.company_address,
	          company_url: manager.company_url,
	          times_available: manager.times_available,
	          usernameError: null,
	          passwordError: null,
	          firstNameError: null,
	          lastNameError: null,
	          phoneError: null,
	          emailError: null,
	          companyNameError: null
	        });
	      }
	    }
	  }, {
	    key: 'resetForm',
	    value: function resetForm() {
	      this.setState({
	        id: '0',
	        username: '',
	        password: '',
	        first_name: '',
	        last_name: '',
	        phone: '',
	        email_address: '',
	        company_name: '',
	        company_address: '',
	        company_url: '',
	        times_available: '',
	        usernameError: null,
	        passwordError: null,
	        firstNameError: null,
	        lastNameError: null,
	        phoneError: null,
	        emailError: null,
	        companyNameError: null
	      });
	      $('#reactModal').modal('hide');
	    }
	  }, {
	    key: 'copyUsername',
	    value: function copyUsername(username) {
	      if (_CheckValues2.default.isEmail(username) && _CheckValues2.default.isEmpty(this.state.email_address)) {
	        this.setState({ email_address: username });
	      }
	    }
	  }, {
	    key: 'setUsername',
	    value: function setUsername(e) {
	      this.setState({ username: e.target.value });
	    }
	  }, {
	    key: 'setPassword',
	    value: function setPassword(e) {
	      this.setState({ password: e.target.value });
	    }
	  }, {
	    key: 'setFirstName',
	    value: function setFirstName(e) {
	      this.setState({ first_name: e.target.value });
	    }
	  }, {
	    key: 'setLastName',
	    value: function setLastName(e) {
	      this.setState({ last_name: e.target.value });
	    }
	  }, {
	    key: 'setPhone',
	    value: function setPhone(e) {
	      this.setState({ phone: e.target.value });
	    }
	  }, {
	    key: 'setEmailAddress',
	    value: function setEmailAddress(e) {
	      this.setState({ email_address: e.target.value });
	    }
	  }, {
	    key: 'setCompanyName',
	    value: function setCompanyName(e) {
	      this.setState({ company_name: e.target.value });
	    }
	  }, {
	    key: 'setCompanyAddress',
	    value: function setCompanyAddress(e) {
	      this.setState({ company_address: e.target.value });
	    }
	  }, {
	    key: 'setCompanyUrl',
	    value: function setCompanyUrl(e) {
	      this.setState({ company_url: e.target.value });
	    }
	  }, {
	    key: 'setTimesAvailable',
	    value: function setTimesAvailable(e) {
	      this.setState({ times_available: e.target.value });
	    }
	  }, {
	    key: 'postErrors',
	    value: function postErrors(errors) {
	      if (errors.companyEmpty) {
	        this.setState({ companyNameError: 'Please enter a company name' });
	      } else if (errors.companyDuplicate) {
	        this.setState({ companyNameError: 'Company name already in use' });
	      }
	
	      if (errors.emailEmpty) {
	        this.setState({ emailError: 'Email may not be empty' });
	      }
	
	      if (errors.firstNameEmpty) {
	        this.setState({ firstNameError: 'First name may not be empty' });
	      }
	
	      if (errors.lastNameEmpty) {
	        this.setState({ lastNameError: 'Last name may not be empty' });
	      }
	
	      if (errors.passwordEmpty) {
	        this.setState({ passwordError: 'Password may not be empty' });
	      } else if (errors.passwordShort) {
	        this.setState({ passwordError: 'Password must be a least 8 characters' });
	      }
	
	      if (errors.phoneEmpty) {
	        this.setState({ phoneError: 'Phone number may not be empty' });
	      } else if (errors.phoneBadFormat) {
	        this.setState({ phoneError: 'Phone number is improperly formatted' });
	      }
	
	      if (errors.usernameEmpty) {
	        this.setState({ usernameError: 'Username may not be empty' });
	      } else if (errors.usernameDuplicate) {
	        this.setState({ usernameError: 'Username already in use' });
	      }
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      $.post('properties/Manager/', {
	        id: this.state.id,
	        username: this.state.username,
	        password: this.state.password,
	        first_name: this.state.first_name,
	        last_name: this.state.last_name,
	        phone: this.state.phone,
	        email_address: this.state.email_address,
	        company_name: this.state.company_name,
	        company_address: this.state.company_address,
	        company_url: this.state.company_url,
	        times_available: this.state.times_available
	      }, null, 'json').done(function (data) {
	        if (data.status === 'error') {
	          this.postErrors(data);
	        } else {
	          this.resetForm();
	          this.props.reload();
	        }
	      }.bind(this)).fail(function () {});
	    }
	  }, {
	    key: 'checkPhone',
	    value: function checkPhone() {
	      if (!_CheckValues2.default.isPhone(this.state.phone)) {
	        this.setState({ phoneError: 'Phone number not formatted properly' });
	      } else {
	        this.setState({ phoneError: null });
	      }
	    }
	  }, {
	    key: 'checkUsername',
	    value: function checkUsername() {
	      if (this.state.username.match(/\s/)) {
	        this.setState({ usernameError: 'No spaces are allowed' });
	      } else {
	        this.checkUsernameDuplicate(function () {
	          this.copyUsername(this.state.username);
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'checkUsernameDuplicate',
	    value: function checkUsernameDuplicate(callback) {
	      $.getJSON('properties/Manager/checkUsername', {
	        username: this.state.username,
	        id: this.state.id
	      }).done(function (data) {
	        if (data.duplicate) {
	          this.setState({ usernameError: 'Username already in use' });
	        } else {
	          this.setState({ usernameError: null });
	          if (callback !== undefined) {
	            callback();
	          }
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'checkEmailAddress',
	    value: function checkEmailAddress() {
	      if (!_CheckValues2.default.isEmail(this.state.email_address)) {
	        this.setState({ emailError: 'Email not formatted properly' });
	      } else {
	        this.checkEmailDuplicate();
	      }
	    }
	  }, {
	    key: 'checkEmailDuplicate',
	    value: function checkEmailDuplicate(callback) {
	      $.getJSON('properties/Manager/checkEmail', {
	        email_address: this.state.email_address,
	        id: this.state.id
	      }).done(function (data) {
	        if (data.duplicate) {
	          this.setState({ emailError: 'Email address already in use' });
	        } else {
	          this.setState({ emailError: null });
	        }
	        if (callback !== undefined) {
	          callback();
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'checkPassword',
	    value: function checkPassword() {
	      if (this.state.password.length < 8) {
	        this.setState({ passwordError: 'Password must be 8 characters or more' });
	      } else {
	        this.setState({ passwordError: null });
	      }
	    }
	  }, {
	    key: 'checkCompanyName',
	    value: function checkCompanyName() {
	      if (_CheckValues2.default.isEmpty(this.state.company_name)) {
	        if (this.state.first_name.length > 0 && this.state.last_name.length > 0) {
	          this.setState({
	            company_name: this.state.first_name + ' ' + this.state.last_name,
	            companyNameEmptyError: false
	          });
	        }
	      } else {
	        this.checkCompanyDuplicate(function () {
	          this.setState({ companyNameError: null });
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'checkCompanyDuplicate',
	    value: function checkCompanyDuplicate(callback) {
	      $.getJSON('properties/Manager/checkCompanyName', {
	        company_name: this.state.company_name,
	        'id': this.state.id
	      }).done(function (data) {
	        if (data.duplicate) {
	          this.setState({ companyNameError: 'Company Name already in use' });
	        } else {
	          this.setState({ companyNameError: null });
	          if (callback !== undefined) {
	            callback();
	          }
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'addTestData',
	    value: function addTestData() {
	      this.setState({
	        username: 'tommy',
	        password: 'password',
	        first_name: 'Tommy',
	        last_name: 'Tutone',
	        phone: '828-123-1233',
	        email_address: 'Tom@aol.com',
	        company_name: 'Tommy Place',
	        company_address: '123 Elm Street',
	        company_url: 'http://google.com',
	        times_available: '8am to 5pm'
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var testButton = _react2.default.createElement(
	        'button',
	        { className: 'btn btn-warning', onClick: this.addTestData },
	        'Test'
	      );
	
	      var button = _react2.default.createElement(
	        'button',
	        { className: 'btn btn-success', onClick: this.save },
	        _react2.default.createElement('i', { className: 'fa fa-floppy-o' }),
	        '\xA0Save'
	      );
	
	      var footer = _react2.default.createElement(
	        'span',
	        null,
	        button,
	        '\xA0',
	        testButton,
	        '\xA0'
	      );
	
	      var managerForm = _react2.default.createElement(
	        'div',
	        { className: 'managerForm' },
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
	                name: 'username',
	                label: 'Username',
	                value: this.state.username,
	                change: this.setUsername,
	                required: true,
	                blur: this.checkUsername,
	                errorMessage: this.state.usernameError })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                type: 'password',
	                name: 'password',
	                iid: 'managerPassword',
	                label: 'Password',
	                blur: this.checkPassword,
	                value: this.state.password,
	                change: this.setPassword,
	                errorMessage: this.state.passwordError,
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
	                name: 'first_name',
	                iid: 'managerFirstName',
	                label: 'First name',
	                value: this.state.first_name,
	                change: this.setFirstName,
	                errorMessage: this.state.firstNameError,
	                required: true })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'last_name',
	                iid: 'managerLastName',
	                label: 'Last name',
	                value: this.state.last_name,
	                change: this.setLastName,
	                errorMessage: this.state.lastNameError,
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
	                value: this.state.phone,
	                change: this.setPhone,
	                errorMessage: this.state.phoneError,
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
	                value: this.state.email_address,
	                change: this.setEmailAddress,
	                blur: this.checkEmailAddress,
	                errorMessage: this.state.emailError,
	                required: true })
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-12' },
	              _react2.default.createElement(_InputField2.default, {
	                name: 'company_name',
	                iid: 'managerCompanyName',
	                label: 'Company name',
	                value: this.state.company_name,
	                change: this.setCompanyName,
	                errorMessage: this.state.companyNameError,
	                required: true,
	                blur: this.checkCompanyName }),
	              _react2.default.createElement(_InputField2.default, {
	                name: 'company_address',
	                iid: 'managerCompanyAddress',
	                label: 'Company address',
	                value: this.state.company_address,
	                change: this.setCompanyAddress }),
	              _react2.default.createElement(_InputField2.default, {
	                name: 'company_url',
	                iid: 'managerCompanyUrl',
	                label: 'Company URL',
	                value: this.state.company_url,
	                change: this.setCompanyUrl }),
	              _react2.default.createElement(
	                'label',
	                { htmlFor: 'm-times-available' },
	                'Times available'
	              ),
	              _react2.default.createElement('textarea', {
	                id: 'm-times-available',
	                className: 'form-control',
	                name: 'times_available',
	                value: this.state.times_available,
	                onChange: this.setTimesAvailable })
	            )
	          )
	        )
	      );
	      return _react2.default.createElement(_Modal2.default, {
	        body: managerForm,
	        header: 'Create manager',
	        footer: footer,
	        onClose: this.resetForm });
	    }
	  }]);
	
	  return ManagerForm;
	}(_react2.default.Component);
	
	ManagerForm.propTypes = {
	  reload: _react2.default.PropTypes.func,
	  manager: _react2.default.PropTypes.object
	};
	
	exports.default = ManagerForm;

/***/ },

/***/ 427:
/*!*******************************************!*\
  !*** ./javascript/Mixin/Html/Waiting.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	
	var Waiting = function (_React$Component) {
	  _inherits(Waiting, _React$Component);
	
	  function Waiting() {
	    _classCallCheck(this, Waiting);
	
	    return _possibleConstructorReturn(this, (Waiting.__proto__ || Object.getPrototypeOf(Waiting)).apply(this, arguments));
	  }
	
	  _createClass(Waiting, [{
	    key: "render",
	    value: function render() {
	      var message = void 0;
	      if (this.props.message.length === 0) {
	        message = _react2.default.createElement(
	          "span",
	          null,
	          "Loading ",
	          this.props.label,
	          "..."
	        );
	      } else {
	        message = this.props.message;
	      }
	      return _react2.default.createElement(
	        "div",
	        { className: "lead text-center" },
	        _react2.default.createElement("i", { className: "fa fa-cog fa-spin fa-lg" }),
	        "\xA0",
	        message
	      );
	    }
	  }]);
	
	  return Waiting;
	}(_react2.default.Component);
	
	Waiting.defaultProps = {
	  label: ''
	};
	
	Waiting.propTypes = {
	  label: _react2.default.PropTypes.string,
	  message: _react2.default.PropTypes.string
	};
	
	Waiting.defaultProps = {
	  message: '',
	  label: 'data'
	};
	
	exports.default = Waiting;

/***/ },

/***/ 428:
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
	        placeholder: this.props.placeholder,
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
	  return _react2.default.createElement('i', { className: 'fa fa-asterisk', style: { color: 'red' } });
	};

/***/ },

/***/ 432:
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

/***/ },

/***/ 434:
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
	  message: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  onClose: _react2.default.PropTypes.func
	};
	
	Message.defaultProps = {
	  type: 'info'
	};
	
	exports.default = Message;

/***/ },

/***/ 436:
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

/***/ 442:
/*!********************************************!*\
  !*** ./javascript/Mixin/Form/Dropdown.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	
	/**
	props.label = 'Pick option below'
	props.small = false
	props.options = [
	{
	  link : 'http://address', // default: null
	  icon : <i className="fa fa-check"></i>, // default: null
	  label : 'Click here',
	  handleClick : functionName,
	},
	{
	  divider: true
	}
	]
	*/
	var Dropdown = function (_React$Component) {
	  _inherits(Dropdown, _React$Component);
	
	  function Dropdown(props) {
	    _classCallCheck(this, Dropdown);
	
	    return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));
	  }
	
	  _createClass(Dropdown, [{
	    key: "render",
	    value: function render() {
	      var options = null;
	      var label = null;
	      var optionList = null;
	      if (this.props.options !== null) {
	        options = this.props.options.map(function (value, key) {
	          if (value.divider !== undefined && value.divider === true) {
	            return _react2.default.createElement("hr", { key: key });
	          }
	          if (value.link !== null) {
	            label = _react2.default.createElement(
	              "a",
	              { href: value.link },
	              value.icon,
	              " ",
	              value.label
	            );
	          } else {
	            label = _react2.default.createElement(
	              "a",
	              null,
	              value.icon,
	              value.label
	            );
	          }
	          return _react2.default.createElement(
	            "li",
	            { onClick: value.handleClick, key: key, role: "button" },
	            label
	          );
	        });
	        optionList = _react2.default.createElement(
	          "ul",
	          { className: "dropdown-menu" },
	          options
	        );
	      } else {
	        optionList = null;
	      }
	      var buttonClass = 'btn btn-default dropdown-toggle';
	      if (this.props.small) {
	        buttonClass = buttonClass.concat(' btn-sm');
	      }
	      return _react2.default.createElement(
	        "div",
	        { className: "dropdown" },
	        _react2.default.createElement(
	          "button",
	          {
	            className: buttonClass,
	            type: "button",
	            "data-toggle": "dropdown",
	            "aria-haspopup": "true",
	            "aria-expanded": "true" },
	          this.props.label,
	          "\xA0",
	          _react2.default.createElement("span", { className: "caret" })
	        ),
	        optionList
	      );
	    }
	  }]);
	
	  return Dropdown;
	}(_react2.default.Component);
	
	Dropdown.propTypes = {
	  label: _react2.default.PropTypes.string,
	  options: _react2.default.PropTypes.array,
	  small: _react2.default.PropTypes.bool
	};
	
	Dropdown.defaultProps = {
	  small: false
	};
	
	exports.default = Dropdown;

/***/ },

/***/ 444:
/*!*****************************************!*\
  !*** ./javascript/Mixin/Html/Modal.jsx ***!
  \*****************************************/
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
	
	/* global $ */
	
	var Modal = function (_React$Component) {
	  _inherits(Modal, _React$Component);
	
	  function Modal(props) {
	    _classCallCheck(this, Modal);
	
	    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));
	
	    _this.state = {
	      header: null,
	      body: null,
	      footer: null
	    };
	    return _this;
	  }
	
	  _createClass(Modal, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.onClose) {
	        $('#' + this.props.modalId).on('hidden.bs.modal', function () {
	          this.props.onClose();
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { id: this.props.modalId, className: 'modal fade', tabIndex: '-1', role: 'dialog' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-header' },
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  '\xD7'
	                )
	              ),
	              _react2.default.createElement(
	                'h4',
	                { className: 'modal-title' },
	                this.props.header
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              this.props.body
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-footer' },
	              this.props.footer,
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
	                'Close'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return Modal;
	}(_react2.default.Component);
	
	Modal.defaultProps = {
	  header: null,
	  body: null,
	  footer: null,
	  modalId: 'reactModal',
	  onClose: null
	};
	
	Modal.propTypes = {
	  header: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  body: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  footer: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  modalId: _react2.default.PropTypes.string,
	  onClose: _react2.default.PropTypes.func
	};
	
	exports.default = Modal;

/***/ }

});
//# sourceMappingURL=manager.js.map