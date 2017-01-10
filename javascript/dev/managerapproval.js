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

/***/ 181:
/*!**************************************!*\
  !*** ./javascript/Mixin/Waiting.jsx ***!
  \**************************************/
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
	      return _react2.default.createElement(
	        "div",
	        { className: "lead text-center" },
	        _react2.default.createElement("i", { className: "fa fa-cog fa-spin fa-lg" }),
	        "\xA0 Loading ",
	        this.props.label,
	        "..."
	      );
	    }
	  }]);
	
	  return Waiting;
	}(_react2.default.Component);
	
	Waiting.defaultProps = {
	  label: ''
	};
	
	Waiting.propTypes = {
	  label: _react2.default.PropTypes.string
	};
	
	exports.default = Waiting;

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
	
	var _RefuseModal = __webpack_require__(/*! ./RefuseModal.jsx */ 184);
	
	var _RefuseModal2 = _interopRequireDefault(_RefuseModal);
	
	var _InquiryModal = __webpack_require__(/*! ./InquiryModal.jsx */ 185);
	
	var _InquiryModal2 = _interopRequireDefault(_InquiryModal);
	
	var _Empty = __webpack_require__(/*! ../Mixin/Empty.js */ 186);
	
	var _Empty2 = _interopRequireDefault(_Empty);
	
	var _ErrorPage = __webpack_require__(/*! ../Mixin/ErrorPage.jsx */ 187);
	
	var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Waiting.jsx */ 181);
	
	var _Waiting2 = _interopRequireDefault(_Waiting);
	
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
	      modalType: '',
	      errorPage: null
	    };
	    _this.currentManager = {};
	    _this.currentKey = null;
	    _this.refuseReason = _this.refuseReason.bind(_this);
	    _this.inquiryType = _this.inquiryType.bind(_this);
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
	        this.setState({ modal: false, modalType: '' });
	      }.bind(this));
	      this.setState({ modal: true });
	    }
	  }, {
	    key: 'closeModal',
	    value: function closeModal() {
	      $('#reactModal').modal('hide');
	      this.setState({ modal: false, modalType: '' });
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
	      $.ajax({ url: './properties/ManagerAdmin/' + managerId + '/approve', dataType: 'json', type: 'patch' }).done(function (data) {
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
	    value: function refuse(manager, key) {
	      this.setState({ modal: true, modalType: 'refuse' });
	      this.currentManager = manager;
	      this.currentKey = key;
	    }
	  }, {
	    key: 'inquiry',
	    value: function inquiry(manager, key) {
	      this.setState({ modal: true, modalType: 'inquiry' });
	      this.currentManager = manager;
	      this.currentKey = key;
	    }
	  }, {
	    key: 'inquiryType',
	    value: function inquiryType(e) {
	      var type = e.target.dataset.inquiryType;
	      $.ajax({
	        url: './properties/ManagerAdmin/' + this.currentManager.id + '/inquiry/',
	        data: {
	          inquiryType: type
	        },
	        dataType: 'json',
	        type: 'put'
	      }).done(function () {
	        this.closeModal();
	        this.load();
	        this.setMessage('Inquiry sent');
	      }.bind(this)).error(function (data) {
	        this.closeModal();
	        this.setState({ 'errorPage': data.responseText });
	      }.bind(this));
	    }
	  }, {
	    key: 'refuseReason',
	    value: function refuseReason(e) {
	      var reason = e.target.dataset.reason;
	      $.ajax({
	        url: './properties/ManagerAdmin/' + this.currentManager.id + '/refuse/',
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
	          this.removeManager(this.currentKey);
	          this.resetCurrentManager();
	        }
	      }.bind(this)).error(function (data) {
	        this.closeModal();
	        this.setState({ 'errorPage': data.responseText });
	      }.bind(this));
	    }
	  }, {
	    key: 'resetCurrentManager',
	    value: function resetCurrentManager() {
	      this.currentManager = {};
	      this.currentKey = null;
	    }
	  }, {
	    key: 'cancelReason',
	    value: function cancelReason() {
	      this.resetCurrentManager();
	    }
	  }, {
	    key: 'inquiryTypeOptions',
	    value: function inquiryTypeOptions(manager) {
	      switch (manager.inquiry_type) {
	        case 'sublease':
	          return 'Made sublease inquiry on';
	
	        case 'information':
	          return 'Property information requested on';
	      }
	    }
	  }, {
	    key: 'listing',
	    value: function listing() {
	      var listing = void 0;
	      var companyAddress = void 0;
	      var websiteAddress = void 0;
	
	      if (this.state.managers === null) {
	        return _react2.default.createElement(_Waiting2.default, { label: 'Loading managers...' });
	      } else if (this.state.managers.length === 0) {
	        return _react2.default.createElement(
	          'div',
	          null,
	          'No managers need approving.'
	        );
	      }
	
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
	              '\xA0',
	              value.inquiry_date ? null : _react2.default.createElement(
	                'span',
	                null,
	                _react2.default.createElement(
	                  'button',
	                  { className: 'btn btn-info', onClick: this.inquiry.bind(this, value, key) },
	                  _react2.default.createElement('i', { className: 'fa fa-question' }),
	                  '\xA0Inquiry'
	                ),
	                '\xA0'
	              ),
	              _react2.default.createElement(
	                'button',
	                { className: 'btn btn-danger', onClick: this.refuse.bind(this, value, key) },
	                _react2.default.createElement('i', { className: 'fa fa-ban' }),
	                '\xA0Refuse'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'panel-body' },
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
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
	                value.last_log_date
	              )
	            )
	          ),
	          value.inquiry_date ? _react2.default.createElement(
	            'div',
	            { className: 'panel-footer' },
	            _react2.default.createElement(
	              'strong',
	              null,
	              _react2.default.createElement('i', { className: 'fa fa-exclamation-circle' }),
	              '\xA0 ',
	              this.inquiryTypeOptions(value),
	              '\xA0',
	              value.inquiry_date
	            )
	          ) : null
	        );
	      }.bind(this));
	      return listing;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.errorPage !== null) {
	        return _react2.default.createElement(_ErrorPage2.default, { message: this.state.errorPage });
	      }
	      var message = this.getMessage();
	      var modal = void 0;
	      if (this.state.modal) {
	        if (this.state.modalType === 'refuse') {
	          modal = _react2.default.createElement(_RefuseModal2.default, { reason: this.refuseReason, manager: this.currentManager });
	        } else if (this.state.modalType === 'inquiry') {
	          modal = _react2.default.createElement(_InquiryModal2.default, { inquiry: this.inquiryType, manager: this.currentManager });
	        }
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Manager Approval'
	        ),
	        modal,
	        message,
	        this.listing()
	      );
	    }
	  }]);
	
	  return ManagerApproval;
	}(_react2.default.Component);
	
	exports.default = ManagerApproval;

/***/ },

/***/ 184:
/*!****************************************************!*\
  !*** ./javascript/ManagerApproval/RefuseModal.jsx ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Modal = __webpack_require__(/*! ../Mixin/Modal.jsx */ 178);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RefuseModal = function (_React$Component) {
	  _inherits(RefuseModal, _React$Component);
	
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
	      var header = 'Refuse manager request for: ' + this.props.manager.company_name;
	      var body = _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'button',
	          {
	            style: spacing,
	            className: 'btn btn-primary',
	            onClick: this.props.reason,
	            'data-reason': 'duplicate' },
	          'Using duplicate company name'
	        ),
	        _react2.default.createElement(
	          'button',
	          {
	            style: spacing,
	            className: 'btn btn-primary',
	            onClick: this.props.reason,
	            'data-reason': 'bad_data' },
	          'Improper information'
	        ),
	        this.props.manager.inquiry_date !== null ? _react2.default.createElement(
	          'button',
	          {
	            style: spacing,
	            className: 'btn btn-primary',
	            onClick: this.props.reason,
	            'data-reason': 'no_response' },
	          'No response to inquiry since ',
	          this.props.manager.inquiry_date
	        ) : null
	      );
	      return _react2.default.createElement(_Modal2.default, { body: body, header: header });
	    }
	  }]);
	
	  return RefuseModal;
	}(_react2.default.Component);
	
	exports.default = RefuseModal;
	
	
	RefuseModal.propTypes = {
	  reason: _react2.default.PropTypes.func,
	  manager: _react2.default.PropTypes.object
	};

/***/ },

/***/ 185:
/*!*****************************************************!*\
  !*** ./javascript/ManagerApproval/InquiryModal.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Modal = __webpack_require__(/*! ../Mixin/Modal.jsx */ 178);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InquiryModal = function (_React$Component) {
	  _inherits(InquiryModal, _React$Component);
	
	  function InquiryModal(props) {
	    _classCallCheck(this, InquiryModal);
	
	    return _possibleConstructorReturn(this, (InquiryModal.__proto__ || Object.getPrototypeOf(InquiryModal)).call(this, props));
	  }
	
	  _createClass(InquiryModal, [{
	    key: 'render',
	    value: function render() {
	      var spacing = {
	        marginBottom: '10px',
	        display: 'block'
	      };
	      var header = 'Send inquiry to ' + this.props.manager.company_name + ' c/o ' + this.props.manager.first_name + ' ' + this.props.manager.last_name;
	      var body = _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'button',
	          {
	            style: spacing,
	            className: 'btn btn-primary',
	            onClick: this.props.inquiry,
	            'data-inquiry-type': 'sublease' },
	          'Appears to be a sublease'
	        ),
	        _react2.default.createElement(
	          'button',
	          {
	            style: spacing,
	            className: 'btn btn-primary',
	            onClick: this.props.inquiry,
	            'data-inquiry-type': 'information' },
	          'Need more property information'
	        )
	      );
	      return _react2.default.createElement(_Modal2.default, { body: body, header: header });
	    }
	  }]);
	
	  return InquiryModal;
	}(_react2.default.Component);
	
	exports.default = InquiryModal;
	
	
	InquiryModal.propTypes = {
	  inquiry: _react2.default.PropTypes.func,
	  manager: _react2.default.PropTypes.object
	};

/***/ },

/***/ 186:
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

/***/ 187:
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