webpackJsonp([2],{

/***/ 0:
/*!*********************************************!*\
  !*** ./javascript/ManagerDesktop/index.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 32);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ManagerDesktop = __webpack_require__(/*! ./ManagerDesktop.jsx */ 195);
	
	var _ManagerDesktop2 = _interopRequireDefault(_ManagerDesktop);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_ManagerDesktop2.default, null), document.getElementById('managerdesktop'));

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

/***/ 188:
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

/***/ 195:
/*!******************************************************!*\
  !*** ./javascript/ManagerDesktop/ManagerDesktop.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Html/Waiting.jsx */ 188);
	
	var _Waiting2 = _interopRequireDefault(_Waiting);
	
	var _Message = __webpack_require__(/*! ../Mixin/Html/Message.jsx */ 187);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _Empty = __webpack_require__(/*! ../Mixin/Helper/Empty.js */ 193);
	
	var _Empty2 = _interopRequireDefault(_Empty);
	
	var _PropertyListing = __webpack_require__(/*! ./PropertyListing.jsx */ 196);
	
	var _PropertyListing2 = _interopRequireDefault(_PropertyListing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var ManagerDesktop = function (_React$Component) {
	  _inherits(ManagerDesktop, _React$Component);
	
	  function ManagerDesktop(props) {
	    _classCallCheck(this, ManagerDesktop);
	
	    var _this = _possibleConstructorReturn(this, (ManagerDesktop.__proto__ || Object.getPrototypeOf(ManagerDesktop)).call(this, props));
	
	    _this.state = {
	      properties: null,
	      manager: null,
	      message: null,
	      messageType: null
	    };
	    _this.load();
	    _this.managerId = 1;
	    return _this;
	  }
	
	  _createClass(ManagerDesktop, [{
	    key: 'load',
	    value: function load() {
	      $.getJSON('./properties/Manager/mylist').done(function (data) {
	        if (data.properties !== undefined) {
	          this.setState({ properties: data.properties, manager: data.manager });
	        } else if (data.error) {
	          this.setState({ properties: [] });
	          this.setMessage(data.error);
	        }
	      }.bind(this)).fail(function () {
	        this.setState({ properties: [] });
	        this.setMessage('Error: failure pulling properties', 'danger');
	      }.bind(this));
	    }
	  }, {
	    key: 'setMessage',
	    value: function setMessage(message, type) {
	      this.setState({ message: message, messageType: type });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var propertyList = void 0;
	      if (this.state.properties === null) {
	        propertyList = _react2.default.createElement(_Waiting2.default, { label: 'your properties' });
	      } else if (this.state.properties.length > 0) {
	        propertyList = _react2.default.createElement(_PropertyListing2.default, { list: this.state.properties });
	      } else {
	        propertyList = _react2.default.createElement(
	          'p',
	          { className: 'text-center' },
	          'No properties found. ',
	          _react2.default.createElement(
	            'a',
	            { href: './properties/Property/create' },
	            'Click here to create a new property.'
	          )
	        );
	      }
	
	      var message = void 0;
	      if (!(0, _Empty2.default)(this.state.message)) {
	        message = _react2.default.createElement(_Message2.default, { type: this.state.messageType, message: this.state.message });
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'My properties'
	        ),
	        message,
	        propertyList
	      );
	    }
	  }]);
	
	  return ManagerDesktop;
	}(_react2.default.Component);
	
	exports.default = ManagerDesktop;
	
	
	ManagerDesktop.propTypes = {};

/***/ },

/***/ 196:
/*!*******************************************************!*\
  !*** ./javascript/ManagerDesktop/PropertyListing.jsx ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PropertyRow = __webpack_require__(/*! ../Property/PropertyRow.jsx */ 197);
	
	var _PropertyRow2 = _interopRequireDefault(_PropertyRow);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Html/Waiting.jsx */ 188);
	
	var _Waiting2 = _interopRequireDefault(_Waiting);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PropertyListing = function (_React$Component) {
	  _inherits(PropertyListing, _React$Component);
	
	  function PropertyListing(props) {
	    _classCallCheck(this, PropertyListing);
	
	    return _possibleConstructorReturn(this, (PropertyListing.__proto__ || Object.getPrototypeOf(PropertyListing)).call(this, props));
	  }
	
	  _createClass(PropertyListing, [{
	    key: 'render',
	    value: function render() {
	      var list = this.props.list;
	      if (list === null) {
	        return _react2.default.createElement(_Waiting2.default, { label: 'properties' });
	      } else if (list.length === 0) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'lead' },
	          'No properties found.'
	        );
	      } else {
	        var rows = void 0;
	        rows = list.map(function (value, key) {
	          return _react2.default.createElement(_PropertyRow2.default, { property: value, key: key });
	        }.bind(this));
	        return _react2.default.createElement(
	          'div',
	          null,
	          rows
	        );
	      }
	    }
	  }]);
	
	  return PropertyListing;
	}(_react2.default.Component);
	
	exports.default = PropertyListing;
	
	
	PropertyListing.propTypes = {
	  list: _react2.default.PropTypes.array,
	  search: _react2.default.PropTypes.bool
	};

/***/ },

/***/ 197:
/*!*********************************************!*\
  !*** ./javascript/Property/PropertyRow.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Row2 = __webpack_require__(/*! ../Mixin/List/Row.jsx */ 198);
	
	var _Row3 = _interopRequireDefault(_Row2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var PropertyRow = function (_Row) {
	  _inherits(PropertyRow, _Row);
	
	  function PropertyRow(props) {
	    _classCallCheck(this, PropertyRow);
	
	    return _possibleConstructorReturn(this, (PropertyRow.__proto__ || Object.getPrototypeOf(PropertyRow)).call(this, props));
	  }
	
	  _createClass(PropertyRow, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      $('[data-toggle="tooltip"]').tooltip();
	    }
	  }, {
	    key: 'getRent',
	    value: function getRent() {
	      var rent = '$ ' + this.props.property.monthly_rent + ' ' + this.props.property.lease_type;
	      return rent;
	    }
	  }, {
	    key: 'workout',
	    value: function workout() {
	      if (this.props.property.workout_room === '1') {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Workout room on premises' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-heartbeat fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'clubhouse',
	    value: function clubhouse() {
	      if (this.props.property.clubhouse === '1') {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Clubhouse on premises' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-coffee fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var property = this.props.property;
	
	      var link = './properties/Property/' + property.id + '/' + this.urlTitle(property.name);
	      var image = _react2.default.createElement(
	        'div',
	        { className: 'text-muted', style: {
	            padding: '6px'
	          } },
	        _react2.default.createElement('i', { className: 'fa fa-camera fa-5x' }),
	        _react2.default.createElement('br', null),
	        'No photos available'
	      );
	      if (property.thumbnail !== '') {
	        image = _react2.default.createElement('img', { src: property.thumbnail, className: 'img-responsive' });
	      }
	
	      var titleClass = void 0;
	      if (property.active !== undefined && property.active === '0') {
	        titleClass = 'title deactive';
	      } else {
	        titleClass = 'title active';
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'row property-row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-sm-3 col-md-3 text-center' },
	          _react2.default.createElement(
	            'a',
	            { href: link },
	            image
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-sm-9 col-md-9' },
	          _react2.default.createElement(
	            'div',
	            { className: titleClass },
	            _react2.default.createElement(
	              'a',
	              { href: link },
	              property.name
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-7 col-md-8' },
	              _react2.default.createElement(
	                'div',
	                { className: 'rent' },
	                this.getRent()
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'room-bath' },
	                property.proptype,
	                '\xA0 - ',
	                property.bedroom_no,
	                '\xA0Bed, ',
	                property.bathroom_no,
	                '\xA0Bath'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'availability' },
	                'Availability: ',
	                property.move_in_date
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-5 col-md-4' },
	              this.closeToCampus(property.close_to_campus),
	              this.petsAllowed(property.pets_allowed),
	              this.furnished(property.furnished),
	              this.airconditioner(property.airconditioning),
	              this.dishwasher(property.dishwasher),
	              this.utilities(property.utilities_inc),
	              this.workout(),
	              this.clubhouse(),
	              this.appalcart(property.appalcart),
	              this.washer(property.washer)
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return PropertyRow;
	}(_Row3.default);
	
	exports.default = PropertyRow;
	
	
	PropertyRow.propTypes = {
	  property: _react2.default.PropTypes.object
	};

/***/ },

/***/ 198:
/*!***************************************!*\
  !*** ./javascript/Mixin/List/Row.jsx ***!
  \***************************************/
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
	
	var Row = function (_React$Component) {
	  _inherits(Row, _React$Component);
	
	  function Row(props) {
	    _classCallCheck(this, Row);
	
	    return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));
	  }
	
	  _createClass(Row, [{
	    key: 'petsAllowed',
	    value: function petsAllowed(_petsAllowed) {
	      if (_petsAllowed === '1') {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Pet friendly' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-paw fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'furnished',
	    value: function furnished(_furnished) {
	      if (_furnished === '1') {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Furnished' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-bed fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'closeToCampus',
	    value: function closeToCampus(close) {
	      if (close === true) {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Close to campus' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-bicycle fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'appalcart',
	    value: function appalcart(_appalcart) {
	      if (_appalcart === '1') {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'On AppalCART route' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-bus fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'dishwasher',
	    value: function dishwasher(_dishwasher) {
	      if (_dishwasher === '1') {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Dishwasher' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-cutlery fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'washer',
	    value: function washer(_washer) {
	      if (_washer === true) {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Washer/Dryer in unit' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-archive fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'utilities',
	    value: function utilities(included) {
	      if (included === '1') {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Utilities included in rent' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-plug fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'airconditioner',
	    value: function airconditioner(airconditioning) {
	      if (airconditioning === '1') {
	        return _react2.default.createElement(
	          'span',
	          {
	            className: 'fa-stack fa-lg text-success',
	            'data-toggle': 'tooltip',
	            'data-placement': 'top',
	            title: 'Air conditioning in unit' },
	          _react2.default.createElement('i', { className: 'fa fa-square fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'fa fa-snowflake-o fa-stack-1x fa-inverse' })
	        );
	      }
	    }
	  }, {
	    key: 'urlTitle',
	    value: function urlTitle(title) {
	      return title.replace(/[^\w]/g, '-').substring(0, 20).toLowerCase();
	    }
	  }]);
	
	  return Row;
	}(_react2.default.Component);
	
	exports.default = Row;

/***/ }

});
//# sourceMappingURL=managerdesktop.js.map