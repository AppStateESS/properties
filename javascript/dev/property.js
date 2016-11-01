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
	
	var _Property = __webpack_require__(/*! ./Property.jsx */ 187);
	
	var _Property2 = _interopRequireDefault(_Property);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_Property2.default, null), document.getElementById('property'));

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

/***/ 187:
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
	
	var _DecodeUrl = __webpack_require__(/*! ../Mixin/DecodeUrl.js */ 188);
	
	var _DecodeUrl2 = _interopRequireDefault(_DecodeUrl);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Waiting.jsx */ 181);
	
	var _Waiting2 = _interopRequireDefault(_Waiting);
	
	var _PropertyListing = __webpack_require__(/*! ./PropertyListing.jsx */ 189);
	
	var _PropertyListing2 = _interopRequireDefault(_PropertyListing);
	
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
	      manager: null
	    };
	    _this.search = '';
	    _this.managerId = 0;
	    _this.bindMethods();
	    return _this;
	  }
	
	  _createClass(Property, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var decode = new _DecodeUrl2.default();
	      this.managerId = decode.values.managerId;
	      this.load();
	    }
	  }, {
	    key: 'setManagerId',
	    value: function setManagerId(id) {
	      this.managerId = id;
	    }
	  }, {
	    key: 'bindMethods',
	    value: function bindMethods() {
	      var bindable = ['load'];
	
	      bindable.map(function (v) {
	        this[v] = this[v].bind(this);
	      }.bind(this));
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      $.getJSON('./properties/Property', {
	        managerId: this.managerId,
	        search: this.search
	      }).done(function (data) {
	        this.setState({ properties: data.properties, manager: data.manager });
	      }.bind(this)).fail(function () {
	        this.setState({ managers: null, loading: false });
	        this.setMessage('Error: failure pulling properties');
	      }.bind(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var manager = 'All managers';
	      if (this.state.manager) {
	        manager = this.state.manager.company_name;
	      }
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Properties: ',
	          manager
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_PropertyListing2.default, { list: this.state.properties })
	        )
	      );
	    }
	  }]);
	
	  return Property;
	}(_react2.default.Component);
	
	exports.default = Property;

/***/ },

/***/ 188:
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

/***/ 189:
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
	
	var _PropertyRow = __webpack_require__(/*! ./PropertyRow.jsx */ 190);
	
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
	  list: _react2.default.PropTypes.array
	};

/***/ },

/***/ 190:
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
	
	var _Pluralize = __webpack_require__(/*! ../Mixin/Pluralize.js */ 191);
	
	var _Pluralize2 = _interopRequireDefault(_Pluralize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PropertyRow = function (_React$Component) {
	  _inherits(PropertyRow, _React$Component);
	
	  function PropertyRow(props) {
	    _classCallCheck(this, PropertyRow);
	
	    return _possibleConstructorReturn(this, (PropertyRow.__proto__ || Object.getPrototypeOf(PropertyRow)).call(this, props));
	  }
	
	  _createClass(PropertyRow, [{
	    key: 'getRent',
	    value: function getRent() {
	      var rent = '$' + this.props.property.monthly_rent;
	      if (this.props.property.lease_type === '1') {
	        return rent.concat(' per renter');
	      } else {
	        return rent;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var property = this.props.property;
	
	      var link = './properties/Property/' + property.id;
	      var company = property.company_name;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'row panel panel-default' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-sm-2' },
	          'picture'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-sm-10' },
	          _react2.default.createElement(
	            'div',
	            { className: 'panel-body property-row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'title' },
	              property.name
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-6' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'rent' },
	                  this.getRent()
	                ),
	                _react2.default.createElement(
	                  'div',
	                  null,
	                  property.bedroom_no,
	                  '\xA0 ',
	                  (0, _Pluralize2.default)('bed', property.bedroom_no),
	                  '\xA0\u2022 \xA0',
	                  property.bathroom_no,
	                  '\xA0',
	                  (0, _Pluralize2.default)('bath', property.bathroom_no)
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-6' },
	                company
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(
	                'a',
	                { className: 'btn btn-default', href: link },
	                'Read more'
	              )
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

/***/ 191:
/*!***************************************!*\
  !*** ./javascript/Mixin/Pluralize.js ***!
  \***************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pluralize;
	function pluralize(text, number) {
	  return number > 1 ? text + 's' : text;
	}

/***/ }

});
//# sourceMappingURL=property.js.map