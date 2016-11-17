webpackJsonp([2],{

/***/ 0:
/*!***************************************!*\
  !*** ./javascript/Property/index.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Property = __webpack_require__(/*! ./Property.jsx */ 190);
	
	var _Property2 = _interopRequireDefault(_Property);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_Property2.default, null), document.getElementById('property'));

/***/ },

/***/ 175:
/*!***************************************!*\
  !*** ./javascript/Mixin/Dropdown.jsx ***!
  \***************************************/
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
	      return _react2.default.createElement(
	        "div",
	        { className: "dropdown" },
	        _react2.default.createElement(
	          "button",
	          {
	            className: "btn btn-default dropdown-toggle",
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
	  options: _react2.default.PropTypes.array
	};
	
	exports.default = Dropdown;

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

/***/ 190:
/*!******************************************!*\
  !*** ./javascript/Property/Property.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _DecodeUrl = __webpack_require__(/*! ../Mixin/DecodeUrl.js */ 191);
	
	var _DecodeUrl2 = _interopRequireDefault(_DecodeUrl);
	
	var _PropertyListing = __webpack_require__(/*! ./PropertyListing.jsx */ 192);
	
	var _PropertyListing2 = _interopRequireDefault(_PropertyListing);
	
	var _Bind = __webpack_require__(/*! ../Mixin/Bind.js */ 182);
	
	var _Bind2 = _interopRequireDefault(_Bind);
	
	var _Empty = __webpack_require__(/*! ../Mixin/Empty.js */ 194);
	
	var _Empty2 = _interopRequireDefault(_Empty);
	
	var _PropertyBar = __webpack_require__(/*! ./PropertyBar.jsx */ 195);
	
	var _PropertyBar2 = _interopRequireDefault(_PropertyBar);
	
	var _Message = __webpack_require__(/*! ../Mixin/Message.jsx */ 180);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _setIfDefined = __webpack_require__(/*! ../Mixin/setIfDefined.js */ 197);
	
	var _setIfDefined2 = _interopRequireDefault(_setIfDefined);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var Property = function (_React$Component) {
	  _inherits(Property, _React$Component);
	
	  function Property(props) {
	    _classCallCheck(this, Property);
	
	    var _this = _possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this, props));
	
	    _this.state = {
	      properties: null,
	      manager: null,
	      message: '',
	      type: null
	    };
	
	    _this.delay;
	    _this.search;
	    _this.searchVars = {
	      beds: '1',
	      baths: '1',
	      minprice: '0',
	      maxprice: '0'
	    };
	    _this.loadAmenities();
	    _this.managerId = 0;
	    (0, _Bind2.default)(['load', 'updateSearchVars', 'clearSearch', 'updateSearchString', 'toggle'], _this);
	    return _this;
	  }
	
	  _createClass(Property, [{
	    key: 'loadAmenities',
	    value: function loadAmenities() {
	      var url = new _DecodeUrl2.default();
	
	      this.searchVars = {
	        beds: (0, _setIfDefined2.default)(url.values, 'beds', '1'),
	        baths: (0, _setIfDefined2.default)(url.values, 'baths', '1'),
	        furnished: (0, _setIfDefined2.default)(url.values, 'furnished'),
	        ac: (0, _setIfDefined2.default)(url.values, 'ac'),
	        pets: (0, _setIfDefined2.default)(url.values, 'pets'),
	        utils: (0, _setIfDefined2.default)(url.values, 'utils'),
	        minprice: (0, _setIfDefined2.default)(url.values, 'minprice', '0'),
	        maxprice: (0, _setIfDefined2.default)(url.values, 'maxprice', '0'),
	        appalcart: (0, _setIfDefined2.default)(url.values, 'appalcart', '0'),
	        campus: (0, _setIfDefined2.default)(url.values, 'campus', '0'),
	        dishwasher: (0, _setIfDefined2.default)(url.values, 'dishwasher', '0'),
	        laundry: (0, _setIfDefined2.default)(url.values, 'laundry', '0'),
	        clubhouse: (0, _setIfDefined2.default)(url.values, 'clubhouse', '0'),
	        efficiency: (0, _setIfDefined2.default)(url.values, 'efficiency', '0'),
	        apartment: (0, _setIfDefined2.default)(url.values, 'apartment', '0'),
	        house: (0, _setIfDefined2.default)(url.values, 'house', '0'),
	        condo: (0, _setIfDefined2.default)(url.values, 'condo', '0'),
	        townhouse: (0, _setIfDefined2.default)(url.values, 'townhouse', '0'),
	        duplex: (0, _setIfDefined2.default)(url.values, 'duplex', '0')
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var decode = new _DecodeUrl2.default();
	      this.managerId = decode.values.managerId;
	      this.load();
	    }
	  }, {
	    key: 'setMessage',
	    value: function setMessage(message, type) {
	      this.setState({ message: message, type: type });
	    }
	  }, {
	    key: 'setManagerId',
	    value: function setManagerId(id) {
	      this.managerId = id;
	    }
	  }, {
	    key: 'clearSearch',
	    value: function clearSearch() {
	      this.search = '';
	      /*
	      this.beds = '1'
	      this.searchVars.baths = '1'
	      this.furnished = 0
	      this.ac = 0
	      this.pets = 0
	      this.utils = 0
	      */
	      this.load();
	    }
	  }, {
	    key: 'updateLink',
	    value: function updateLink() {
	      var stateObj = {};
	      var url = 'properties/?' + $.param(this.searchVars);
	
	      window.history.pushState(stateObj, "", url);
	    }
	  }, {
	    key: 'updateSearchVars',
	    value: function updateSearchVars(varname, value) {
	      this.searchVars[varname] = value;
	      this.load();
	      this.updateLink();
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(type) {
	      this.updateSearchVars(type, this.searchVars[type] === '1' ? undefined : '1');
	    }
	  }, {
	    key: 'processAjaxData',
	    value: function processAjaxData(response, urlPath) {
	      document.getElementById("content").innerHTML = response.html;
	      document.title = response.pageTitle;
	      window.history.pushState({
	        "html": response.html,
	        "pageTitle": response.pageTitle
	      }, "", urlPath);
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      this.setState({ properties: null });
	      var sendData = this.searchVars;
	      sendData.managerId = this.managerId;
	      sendData.search = this.search;
	      $.getJSON('./properties/Property', sendData).done(function (data) {
	        this.setState({ properties: data.properties, manager: data.manager });
	      }.bind(this)).fail(function () {
	        this.setState({ managers: null, loading: false });
	        this.setMessage('Error: failure pulling properties');
	      }.bind(this));
	    }
	  }, {
	    key: 'updateSearchString',
	    value: function updateSearchString(e) {
	      clearTimeout(this.delay);
	      var search = e.target.value;
	      if (search.length < 4 && search.length > 0) {
	        return;
	      }
	      this.delay = setTimeout(function () {
	        this.search = search;
	        this.load();
	      }.bind(this, search), 500);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var manager = 'All managers';
	      if (this.state.manager) {
	        manager = this.state.manager.company_name;
	      }
	
	      var message = void 0;
	      if (this.state.message.length > 0) {
	        message = _react2.default.createElement(_Message2.default, { message: this.state.message, type: this.state.type });
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        message,
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Properties: ',
	          manager
	        ),
	        _react2.default.createElement(_PropertyBar2.default, {
	          updateSearchString: this.updateSearchString,
	          clear: this.clearSearch,
	          updateSearchVars: this.updateSearchVars,
	          searchVars: this.searchVars,
	          toggle: this.toggle }),
	        _react2.default.createElement(_PropertyListing2.default, { list: this.state.properties, search: !(0, _Empty2.default)(this.search) })
	      );
	    }
	  }]);
	
	  return Property;
	}(_react2.default.Component);
	
	exports.default = Property;

/***/ },

/***/ 191:
/*!***************************************!*\
  !*** ./javascript/Mixin/DecodeUrl.js ***!
  \***************************************/
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

/***/ },

/***/ 192:
/*!*************************************************!*\
  !*** ./javascript/Property/PropertyListing.jsx ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PropertyRow = __webpack_require__(/*! ./PropertyRow.jsx */ 193);
	
	var _PropertyRow2 = _interopRequireDefault(_PropertyRow);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Waiting.jsx */ 181);
	
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
	        if (this.props.search === true) {
	          return _react2.default.createElement(
	            'div',
	            { className: 'lead' },
	            'No properties found. Try a different search?'
	          );
	        } else {
	          return _react2.default.createElement(
	            'div',
	            { className: 'lead' },
	            'No properties found.'
	          );
	        }
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

/***/ 193:
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $ */
	
	var PropertyRow = function (_React$Component) {
	  _inherits(PropertyRow, _React$Component);
	
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
	      var rent = '$' + this.props.property.monthly_rent;
	      if (this.props.property.lease_type === '1') {
	        return rent.concat(' per tenant');
	      } else {
	        return rent.concat(' per unit');
	      }
	    }
	  }, {
	    key: 'petsAllowed',
	    value: function petsAllowed() {
	      if (this.props.property.pets_allowed === '1') {
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
	    value: function furnished() {
	      if (this.props.property.furnished === '1') {
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
	    key: 'dishwasher',
	    value: function dishwasher() {
	      if (this.props.property.dishwasher === '1') {
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
	    key: 'utilities',
	    value: function utilities() {
	      if (this.props.property.utilities_inc === '1') {
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
	    value: function airconditioner() {
	      if (this.props.property.airconditioning === '1') {
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
	    key: 'appalcart',
	    value: function appalcart() {
	      if (this.props.property.appalcart === '1') {
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
	    key: 'urlTitle',
	    value: function urlTitle(title) {
	      return title.replace(/[^\w]/g, '-').substring(0, 20).toLowerCase();
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
	            { className: 'title' },
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
	                '- ',
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
	              this.petsAllowed(),
	              this.furnished(),
	              this.airconditioner(),
	              this.dishwasher(),
	              this.utilities(),
	              this.workout(),
	              this.clubhouse(),
	              this.appalcart()
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return PropertyRow;
	}(_react2.default.Component);
	
	exports.default = PropertyRow;
	
	
	PropertyRow.propTypes;

/***/ },

/***/ 194:
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

/***/ 195:
/*!*********************************************!*\
  !*** ./javascript/Property/PropertyBar.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Dropdown = __webpack_require__(/*! ../Mixin/Dropdown.jsx */ 175);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _Amenities = __webpack_require__(/*! ./Amenities.jsx */ 196);
	
	var _Amenities2 = _interopRequireDefault(_Amenities);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PropertyBar = function (_React$Component) {
	  _inherits(PropertyBar, _React$Component);
	
	  function PropertyBar(props) {
	    _classCallCheck(this, PropertyBar);
	
	    var _this = _possibleConstructorReturn(this, (PropertyBar.__proto__ || Object.getPrototypeOf(PropertyBar)).call(this, props));
	
	    _this.state = {
	      fullSize: true
	    };
	    _this.clearSearch = _this.clearSearch.bind(_this);
	    return _this;
	  }
	
	  _createClass(PropertyBar, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var minprice = this.props.searchVars['minprice'];
	      var maxprice = this.props.searchVars['maxprice'];
	      if (maxprice !== '0' && minprice !== '0' && parseInt(maxprice) < parseInt(minprice)) {
	        this.props.updateSearchVars('minprice', maxprice);
	        this.props.updateSearchVars('maxprice', minprice);
	      }
	    }
	  }, {
	    key: 'clearSearch',
	    value: function clearSearch() {
	      this.refs.propertySearch.value = '';
	      this.props.clear();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var beds = [{
	        label: '1+ beds',
	        handleClick: this.props.updateSearchVars.bind(null, 'beds', '1')
	      }, {
	        label: '2+ beds',
	        handleClick: this.props.updateSearchVars.bind(null, 'beds', '2')
	      }, {
	        label: '3+ beds',
	        handleClick: this.props.updateSearchVars.bind(null, 'beds', '3')
	      }, {
	        label: '4+ beds',
	        handleClick: this.props.updateSearchVars.bind(null, 'beds', '4')
	      }, {
	        label: '5+ beds',
	        handleClick: this.props.updateSearchVars.bind(null, 'beds', '5')
	      }];
	
	      var baths = [{
	        label: '1+ baths',
	        handleClick: this.props.updateSearchVars.bind(null, 'baths', '1')
	      }, {
	        label: '2+ baths',
	        handleClick: this.props.updateSearchVars.bind(null, 'baths', '2')
	      }, {
	        label: '3+ baths',
	        handleClick: this.props.updateSearchVars.bind(null, 'baths', '3')
	      }, {
	        label: '4+ baths',
	        handleClick: this.props.updateSearchVars.bind(null, 'baths', '4')
	      }, {
	        label: '5+ baths',
	        handleClick: this.props.updateSearchVars.bind(null, 'baths', '5')
	      }];
	
	      var minprice = [{
	        label: 'Min. Price',
	        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '0')
	      }, {
	        label: '$100',
	        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '100')
	      }, {
	        label: '$200',
	        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '200')
	      }, {
	        label: '$300',
	        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '300')
	      }, {
	        label: '$400',
	        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '400')
	      }, {
	        label: '$500',
	        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '500')
	      }, {
	        label: '$750',
	        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '750')
	      }, {
	        label: '$1000',
	        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '1000')
	      }];
	
	      var maxprice = [{
	        label: 'Max price',
	        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '0')
	      }, {
	        label: '$200',
	        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '200')
	      }, {
	        label: '$300',
	        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '300')
	      }, {
	        label: '$400',
	        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '400')
	      }, {
	        label: '$500',
	        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '500')
	      }, {
	        label: '$750',
	        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '750')
	      }, {
	        label: '$1000',
	        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '1000')
	      }, {
	        label: '$2000',
	        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '2000')
	      }];
	
	      var bedLabel = this.props.searchVars.beds + '+ beds';
	      var bathLabel = this.props.searchVars.baths + '+ baths';
	      var minpriceLabel = this.props.searchVars.minprice === '0' ? 'Min. price' : '$' + this.props.searchVars.minprice;
	      var maxpriceLabel = this.props.searchVars.maxprice === '0' ? 'Max. price' : '$' + this.props.searchVars.maxprice;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel panel-default marginBottom' },
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
	                'div',
	                { className: 'input-group' },
	                _react2.default.createElement('input', {
	                  ref: 'propertySearch',
	                  className: 'form-control input-sm',
	                  type: 'text',
	                  placeholder: 'Search for properties...',
	                  onChange: this.props.updateSearchString }),
	                _react2.default.createElement(
	                  'span',
	                  { className: 'input-group-btn' },
	                  _react2.default.createElement(
	                    'button',
	                    {
	                      className: 'btn btn-default btn-sm',
	                      type: 'button',
	                      onClick: this.clearSearch },
	                    'Clear'
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-8' },
	              _react2.default.createElement(
	                'div',
	                { className: 'pull-left' },
	                _react2.default.createElement(_Dropdown2.default, { label: bedLabel, options: beds })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'pull-left' },
	                _react2.default.createElement(_Dropdown2.default, { label: bathLabel, options: baths })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'pull-left' },
	                _react2.default.createElement(_Dropdown2.default, { label: minpriceLabel, options: minprice })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'pull-left' },
	                _react2.default.createElement(_Dropdown2.default, { label: maxpriceLabel, options: maxprice })
	              )
	            )
	          ),
	          this.state.fullSize === true ? _react2.default.createElement(_Amenities2.default, { toggle: this.props.toggle, searchVars: this.props.searchVars }) : null
	        )
	      );
	    }
	  }]);
	
	  return PropertyBar;
	}(_react2.default.Component);
	
	exports.default = PropertyBar;
	
	
	PropertyBar.propTypes = {
	  updateSearchString: _react2.default.PropTypes.func,
	  clear: _react2.default.PropTypes.func,
	  updateSearchVars: _react2.default.PropTypes.func,
	  searchVars: _react2.default.PropTypes.object,
	  toggle: _react2.default.PropTypes.func
	};

/***/ },

/***/ 196:
/*!*******************************************!*\
  !*** ./javascript/Property/Amenities.jsx ***!
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
	
	var Amenities = function (_React$Component) {
	  _inherits(Amenities, _React$Component);
	
	  function Amenities(props) {
	    _classCallCheck(this, Amenities);
	
	    var _this = _possibleConstructorReturn(this, (Amenities.__proto__ || Object.getPrototypeOf(Amenities)).call(this, props));
	
	    _this.state = {
	      drop: false
	    };
	    _this.toggleDrop = _this.toggleDrop.bind(_this);
	    return _this;
	  }
	
	  _createClass(Amenities, [{
	    key: 'stop',
	    value: function stop(e) {
	      e.stopPropagation();
	    }
	  }, {
	    key: 'toggleDrop',
	    value: function toggleDrop() {
	      this.setState({
	        drop: !this.state.drop
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      /*
	      const dropped = (this.state.drop === true)
	        ? 'btn-group open'
	        : 'btn-group'
	        */
	      var searchVars = this.props.searchVars;
	
	      return _react2.default.createElement(
	        'div',
	        { style: {
	            clear: 'both'
	          } },
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-4' },
	            _react2.default.createElement(
	              'h4',
	              null,
	              'Features'
	            ),
	            _react2.default.createElement(
	              'ul',
	              { className: 'list-unstyled' },
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', {
	                    type: 'checkbox',
	                    checked: searchVars.furnished === '1',
	                    onChange: this.props.toggle.bind(null, 'furnished') }),
	                  '\xA0 Furnished'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.pets === '1', onChange: this.props.toggle.bind(null, 'pets') }),
	                  '\xA0 Pets allowed'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.appalcart === '1', onChange: this.props.toggle.bind(null, 'appalcart') }),
	                  '\xA0 AppalCART'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.campus === '1', onChange: this.props.toggle.bind(null, 'campus') }),
	                  '\xA0 Close to campus'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.utils === '1', onChange: this.props.toggle.bind(null, 'utils') }),
	                  '\xA0 Utilities included'
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-4' },
	            _react2.default.createElement(
	              'h4',
	              null,
	              'Amenities'
	            ),
	            _react2.default.createElement(
	              'ul',
	              { className: 'list-unstyled' },
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.ac === '1', onChange: this.props.toggle.bind(null, 'ac') }),
	                  '\xA0 Air conditioning'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.dishwasher === '1', onChange: this.props.toggle.bind(null, 'dishwasher') }),
	                  '\xA0 Dishwasher'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.laundry === '1', onChange: this.props.toggle.bind(null, 'laundry') }),
	                  '\xA0 Washer/Dryer'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.clubhouse === '1', onChange: this.props.toggle.bind(null, 'clubhouse') }),
	                  '\xA0 Club House'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.workout === '1', onChange: this.props.toggle.bind(null, 'workout') }),
	                  '\xA0 Workout Room'
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-4' },
	            _react2.default.createElement(
	              'h4',
	              null,
	              'Property type'
	            ),
	            _react2.default.createElement(
	              'ul',
	              { className: 'list-unstyled' },
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.efficiency === '1', onChange: this.props.toggle.bind(null, 'efficiency') }),
	                  '\xA0 Efficiency'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.apartment === '1', onChange: this.props.toggle.bind(null, 'apartment') }),
	                  '\xA0 Apartment'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.house === '1', onChange: this.props.toggle.bind(null, 'house') }),
	                  '\xA0 House'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.condo === '1', onChange: this.props.toggle.bind(null, 'condo') }),
	                  '\xA0 Condo'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.townhouse === '1', onChange: this.props.toggle.bind(null, 'townhouse') }),
	                  '\xA0 Townhouse'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  _react2.default.createElement('input', { type: 'checkbox',
	                    checked: searchVars.duplex === '1', onChange: this.props.toggle.bind(null, 'duplex') }),
	                  '\xA0 Duplex'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return Amenities;
	}(_react2.default.Component);
	
	exports.default = Amenities;
	
	
	Amenities.propTypes = {
	  toggle: _react2.default.PropTypes.func,
	  searchVars: _react2.default.PropTypes.object
	};

/***/ },

/***/ 197:
/*!******************************************!*\
  !*** ./javascript/Mixin/setIfDefined.js ***!
  \******************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = setIfDefined;
	function setIfDefined(value, varname) {
	  var defaultVar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	  var forceval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	  if (forceval !== null) {
	    if (defaultVar !== null) {
	      return value[varname] !== undefined ? forceval : defaultVar;
	    } else {
	      return value[varname] !== undefined ? forceval : undefined;
	    }
	  } else {
	    if (defaultVar !== null) {
	      return value[varname] !== undefined ? value[varname] : defaultVar;
	    } else {
	      return value[varname] !== undefined ? value[varname] : undefined;
	    }
	  }
	}

/***/ }

});
//# sourceMappingURL=property.js.map