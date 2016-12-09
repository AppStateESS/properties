webpackJsonp([1],{

/***/ 0:
/*!**********************************************!*\
  !*** ./javascript/ManagerApproval/index.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ManagerApproval = __webpack_require__(/*! ./ManagerApproval.jsx */ 183);
	
	var _ManagerApproval2 = _interopRequireDefault(_ManagerApproval);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_ManagerApproval2.default, null), document.getElementById('managerapproval'));

/***/ },

/***/ 178:
/*!************************************!*\
  !*** ./javascript/Mixin/Modal.jsx ***!
  \************************************/
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
	  message: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  onClose: _react2.default.PropTypes.func
	};
	
	Message.defaultProps = {
	  type: 'info'
	};
	
	exports.default = Message;

/***/ },

/***/ 183:
/*!********************************************************!*\
  !*** ./javascript/ManagerApproval/ManagerApproval.jsx ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Message = __webpack_require__(/*! ../Mixin/Message.jsx */ 180);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _Modal = __webpack_require__(/*! ../Mixin/Modal.jsx */ 178);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _Empty = __webpack_require__(/*! ../Mixin/Empty.js */ 184);
	
	var _Empty2 = _interopRequireDefault(_Empty);
	
	var _ErrorPage = __webpack_require__(/*! ../Mixin/ErrorPage.jsx */ 185);
	
	var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//import bindMethods from '../Mixin/Bind.js'
	
	/* global $ */
	
	var ManagerApproval = function (_React$Component) {
	  _inherits(ManagerApproval, _React$Component);
	
	  function ManagerApproval(props) {
	    _classCallCheck(this, ManagerApproval);
	
	    var _this = _possibleConstructorReturn(this, (ManagerApproval.__proto__ || Object.getPrototypeOf(ManagerApproval)).call(this, props));
	
	    _this.state = {
	      managers: null,
	      message: null,
	      messageType: 'danger',
	      modal: false,
	      errorPage: null
	    };
	    _this.currentManager = {
	      managerId: 0,
	      inquiryDate: 0,
	      key: null
	    };
	    _this.refuseReason = _this.refuseReason.bind(_this);
	    return _this;
	  }
	
	  _createClass(ManagerApproval, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.load();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(props, state) {
	      if (state.modal !== this.state.modal && this.state.modal) {
	        this.openModal();
	      }
	    }
	  }, {
	    key: 'openModal',
	    value: function openModal() {
	      $('#reactModal').modal('show');
	      $('#reactModal').on('hidden.bs.modal', function () {
	        this.setState({ modal: false });
	      }.bind(this));
	      this.setState({ modal: true });
	    }
	  }, {
	    key: 'closeModal',
	    value: function closeModal() {
	      $('#reactModal').modal('hide');
	      this.setState({ modal: false });
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      $.getJSON('properties/ManagerApproval').done(function (data) {
	        this.setState({ managers: data['managerList'] });
	      }.bind(this)).fail(function (data) {
	        this.setState({ managers: null });
	        this.setState({ 'errorPage': data.responseText });
	      }.bind(this));
	    }
	  }, {
	    key: 'setMessage',
	    value: function setMessage(message, type) {
	      this.setState({ message: message, messageType: type });
	    }
	  }, {
	    key: 'getMessage',
	    value: function getMessage() {
	      if (this.state.message !== null) {
	        setTimeout(function () {
	          this.setState({ message: null, messageType: 'danger' });
	        }.bind(this), 4000);
	        return _react2.default.createElement(_Message2.default, { message: this.state.message, type: this.state.messageType });
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'approve',
	    value: function approve(managerId, key) {
	      $.ajax({
	        url: './properties/Manager',
	        data: {
	          managerId: managerId,
	          param: 'approved',
	          approved: 1
	        },
	        dataType: 'json',
	        type: 'patch'
	      }).done(function (data) {
	        if (data.success) {
	          this.removeManager(key);
	          this.setMessage('Manager approved', 'success');
	        } else {
	          this.setMessage('Could not approve manager', 'danger');
	        }
	      }.bind(this)).error(function (data) {
	        this.closeModal();
	        this.setState({ 'errorPage': data.responseText });
	      }.bind(this));
	    }
	  }, {
	    key: 'removeManager',
	    value: function removeManager(key) {
	      var managers = this.state.managers;
	      delete managers[key];
	      this.setState({ managers: managers });
	    }
	  }, {
	    key: 'refuse',
	    value: function refuse(managerId, inquiryDate, key) {
	      this.setState({ modal: true });
	      this.currentManager = {
	        managerId: managerId,
	        inquiryDate: inquiryDate,
	        key: key
	      };
	    }
	  }, {
	    key: 'refuseReason',
	    value: function refuseReason(e) {
	      var reason = e.target.dataset.reason;
	      $.ajax({
	        url: './properties/Manager/' + this.currentManager.managerId + '/refuse/',
	        data: {
	          reason: reason
	        },
	        dataType: 'json',
	        type: 'put'
	      }).done(function () {
	        this.closeModal();
	        if (this.state.managers.length === 1) {
	          window.location.href = './properties/Manager/';
	        } else {
	          this.removeManager(this.currentManager.key);
	          this.resetCurrentManager();
	        }
	      }.bind(this)).error(function (data) {
	        this.closeModal();
	        this.setState({ 'errorPage': data.responseText });
	      }.bind(this)).complete(function () {});
	    }
	  }, {
	    key: 'resetCurrentManager',
	    value: function resetCurrentManager() {
	      this.currentManager = {
	        managerId: 0,
	        inquiryDate: 0,
	        key: null
	      };
	    }
	  }, {
	    key: 'cancelReason',
	    value: function cancelReason() {
	      this.resetCurrentManager();
	    }
	  }, {
	    key: 'inquiry',
	    value: function inquiry() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.errorPage !== null) {
	        return _react2.default.createElement(_ErrorPage2.default, { message: this.state.errorPage });
	      }
	      var listing = _react2.default.createElement(
	        'p',
	        null,
	        'No managers waiting for approval'
	      );
	      var companyAddress = void 0;
	      var websiteAddress = void 0;
	      var message = this.getMessage();
	      var modal = void 0;
	      if (this.state.modal) {
	        modal = _react2.default.createElement(RefuseModal, {
	          reason: this.refuseReason,
	          inquiryDate: this.currentManager.inquiryDate });
	      }
	
	      if (this.state.managers !== null) {
	        listing = this.state.managers.map(function (value, key) {
	          companyAddress = (0, _Empty2.default)(value.company_address) ? _react2.default.createElement(
	            'em',
	            null,
	            'No physical address'
	          ) : _react2.default.createElement(
	            'span',
	            null,
	            value.company_address,
	            '\xA0',
	            _react2.default.createElement(
	              'a',
	              { href: value.company_map_address, target: '_index' },
	              _react2.default.createElement('i', { className: 'fa fa-map' })
	            )
	          );
	
	          var searchLink = 'https://www.google.com/search?q=' + value.company_name.replace(/ /g, '+');
	          websiteAddress = (0, _Empty2.default)(value.company_url) ? _react2.default.createElement(
	            'span',
	            null,
	            _react2.default.createElement(
	              'em',
	              null,
	              'No website address'
	            ),
	            '\xA0',
	            _react2.default.createElement(
	              'a',
	              { target: '_index', href: searchLink },
	              _react2.default.createElement('i', { className: 'fa fa-search' })
	            )
	          ) : _react2.default.createElement(
	            'a',
	            { href: value.company_url, target: '_index' },
	            value.company_url
	          );
	          var email = 'mailto:' + value.email_address;
	          return _react2.default.createElement(
	            'div',
	            { className: 'panel panel-info', key: key },
	            _react2.default.createElement(
	              'div',
	              { className: 'panel-heading' },
	              _react2.default.createElement(
	                'span',
	                { style: {
	                    fontSize: '2em'
	                  } },
	                value.company_name
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'pull-right' },
	                _react2.default.createElement(
	                  'button',
	                  {
	                    className: 'btn btn-success',
	                    onClick: this.approve.bind(this, value.id, key) },
	                  _react2.default.createElement('i', { className: 'fa fa-check' }),
	                  '\xA0Accept'
	                ),
	                '\xA0 ',
	                value.last_inquiry_date ? null : _react2.default.createElement(
	                  'span',
	                  null,
	                  _react2.default.createElement(
	                    'button',
	                    {
	                      className: 'btn btn-info',
	                      onClick: this.inquiry.bind(this, value.id, key) },
	                    _react2.default.createElement('i', { className: 'fa fa-question' }),
	                    '\xA0Inquiry'
	                  ),
	                  '\xA0'
	                ),
	                _react2.default.createElement(
	                  'button',
	                  {
	                    className: 'btn btn-danger',
	                    onClick: this.refuse.bind(this, value.id, value.last_inquiry_date, key) },
	                  _react2.default.createElement('i', { className: 'fa fa-ban' }),
	                  '\xA0Refuse'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'row panel-body' },
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-4' },
	                _react2.default.createElement(
	                  'h4',
	                  null,
	                  'Company'
	                ),
	                websiteAddress,
	                _react2.default.createElement('br', null),
	                ' ',
	                (0, _Empty2.default)(value.times_available) ? _react2.default.createElement(
	                  'em',
	                  null,
	                  'No contact times given'
	                ) : _react2.default.createElement(
	                  'div',
	                  null,
	                  value.times_available
	                ),
	                _react2.default.createElement(
	                  'div',
	                  null,
	                  companyAddress
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-4' },
	                _react2.default.createElement(
	                  'h4',
	                  null,
	                  'Contact'
	                ),
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  'Name:'
	                ),
	                '\xA0',
	                value.first_name,
	                '\xA0',
	                value.last_name,
	                _react2.default.createElement('br', null),
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  'Username:'
	                ),
	                '\xA0',
	                value.username,
	                _react2.default.createElement('br', null),
	                _react2.default.createElement(
	                  'a',
	                  { href: value.phone_tel },
	                  value.phone
	                ),
	                _react2.default.createElement('br', null),
	                _react2.default.createElement(
	                  'a',
	                  { href: email },
	                  value.email_address
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-4' },
	                _react2.default.createElement(
	                  'h4',
	                  null,
	                  'Request date'
	                ),
	                value.last_log_date,
	                value.last_inquiry_date ? _react2.default.createElement(
	                  'div',
	                  null,
	                  _react2.default.createElement(
	                    'h4',
	                    null,
	                    'Inquiry made'
	                  ),
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    value.last_inquiry_date
	                  )
	                ) : null
	              )
	            )
	          );
	        }.bind(this));
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        modal,
	        message,
	        listing
	      );
	    }
	  }]);
	
	  return ManagerApproval;
	}(_react2.default.Component);
	
	exports.default = ManagerApproval;
	
	var RefuseModal = function (_React$Component2) {
	  _inherits(RefuseModal, _React$Component2);
	
	  function RefuseModal(props) {
	    _classCallCheck(this, RefuseModal);
	
	    return _possibleConstructorReturn(this, (RefuseModal.__proto__ || Object.getPrototypeOf(RefuseModal)).call(this, props));
	  }
	
	  _createClass(RefuseModal, [{
	    key: 'render',
	    value: function render() {
	      var spacing = {
	        marginBottom: '10px',
	        display: 'block'
	      };
	      var header = 'Refusal reason';
	      var body = _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'button',
	          {
	            style: spacing,
	            className: 'btn btn-info',
	            onClick: this.props.reason,
	            'data-reason': 'duplicate' },
	          'Using duplicate company name'
	        ),
	        _react2.default.createElement(
	          'button',
	          {
	            style: spacing,
	            className: 'btn btn-info',
	            onClick: this.props.reason,
	            'data-reason': 'bad_data' },
	          'Improper information'
	        ),
	        this.props.inquiryDate !== null ? _react2.default.createElement(
	          'button',
	          {
	            style: spacing,
	            className: 'btn btn-info',
	            onClick: this.props.reason,
	            'data-reason': 'no_response' },
	          'No response to inquiry since ',
	          this.props.inquiryDate
	        ) : null
	      );
	      return _react2.default.createElement(_Modal2.default, { body: body, header: header });
	    }
	  }]);
	
	  return RefuseModal;
	}(_react2.default.Component);
	
	RefuseModal.propTypes = {
	  reason: _react2.default.PropTypes.func,
	  inquiryDate: _react2.default.PropTypes.string
	};

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

/***/ },

/***/ 185:
/*!****************************************!*\
  !*** ./javascript/Mixin/ErrorPage.jsx ***!
  \****************************************/
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
	
	var ErrorPage = function (_React$Component) {
	  _inherits(ErrorPage, _React$Component);
	
	  function ErrorPage(props) {
	    _classCallCheck(this, ErrorPage);
	
	    var _this = _possibleConstructorReturn(this, (ErrorPage.__proto__ || Object.getPrototypeOf(ErrorPage)).call(this, props));
	
	    _this.state = {};
	    return _this;
	  }
	
	  _createClass(ErrorPage, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Uh oh'
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Something went wrong'
	        ),
	        _react2.default.createElement(
	          'pre',
	          null,
	          this.props.message
	        )
	      );
	    }
	  }]);
	
	  return ErrorPage;
	}(_react2.default.Component);
	
	ErrorPage.propTypes = {
	  message: _react2.default.PropTypes.string
	};
	
	exports.default = ErrorPage;

/***/ }

});
//# sourceMappingURL=managerapproval.js.map