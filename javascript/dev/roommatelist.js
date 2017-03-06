webpackJsonp([11],{

/***/ 0:
/*!*******************************************!*\
  !*** ./javascript/RoommateList/index.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _RoommateList = __webpack_require__(/*! ./RoommateList.jsx */ 437);
	
	var _RoommateList2 = _interopRequireDefault(_RoommateList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_RoommateList2.default, null), document.getElementById('roommatelist'));

/***/ },

/***/ 182:
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

/***/ 187:
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

/***/ 437:
/*!**************************************************!*\
  !*** ./javascript/RoommateList/RoommateList.jsx ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RoommateRow = __webpack_require__(/*! ./RoommateRow.jsx */ 438);
	
	var _RoommateRow2 = _interopRequireDefault(_RoommateRow);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Html/Waiting.jsx */ 182);
	
	var _Waiting2 = _interopRequireDefault(_Waiting);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//import bindMethods from '../Mixin/Helper/Bind.js'
	
	/* global $ */
	
	var RoommateList = function (_React$Component) {
	  _inherits(RoommateList, _React$Component);
	
	  function RoommateList(props) {
	    _classCallCheck(this, RoommateList);
	
	    var _this = _possibleConstructorReturn(this, (RoommateList.__proto__ || Object.getPrototypeOf(RoommateList)).call(this, props));
	
	    _this.state = {
	      roommates: null
	    };
	    //bindMethods([], this)
	    return _this;
	  }
	
	  _createClass(RoommateList, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.load();
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      $.getJSON('./properties/Roommate/list').done(function (data) {
	        if (data.roommates) {
	          this.setState({ roommates: data.roommates });
	        } else {
	          this.setState({ roommates: [] });
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.roommates === null) {
	        return _react2.default.createElement(_Waiting2.default, { label: 'Roommates' });
	      }
	      var rows = this.state.roommates.map(function (value, key) {
	        return _react2.default.createElement(_RoommateRow2.default, { roommate: value, key: key });
	      });
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Roommate listing'
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          rows
	        )
	      );
	    }
	  }]);
	
	  return RoommateList;
	}(_react2.default.Component);
	
	exports.default = RoommateList;
	
	
	RoommateList.propTypes = {};

/***/ },

/***/ 438:
/*!*************************************************!*\
  !*** ./javascript/RoommateList/RoommateRow.jsx ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Empty = __webpack_require__(/*! ../Mixin/Helper/Empty.js */ 187);
	
	var _Empty2 = _interopRequireDefault(_Empty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RoommateRow = function (_React$Component) {
	  _inherits(RoommateRow, _React$Component);
	
	  function RoommateRow(props) {
	    _classCallCheck(this, RoommateRow);
	
	    var _this = _possibleConstructorReturn(this, (RoommateRow.__proto__ || Object.getPrototypeOf(RoommateRow)).call(this, props));
	
	    _this.state = {};
	    return _this;
	  }
	
	  _createClass(RoommateRow, [{
	    key: 'paragraphIfNotEmpty',
	    value: function paragraphIfNotEmpty(value) {
	      var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	      if ((0, _Empty2.default)(value)) {
	        return null;
	      } else {
	        return _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'strong',
	            null,
	            label
	          ),
	          value
	        );
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var roommate = this.props.roommate;
	
	      var para = this.paragraphIfNotEmpty;
	      var description = roommate.description;
	
	      if (description.length > 50) {
	        description = description.substring(0, 50) + '...';
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel panel-default' },
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
	                null,
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  'Move in:'
	                ),
	                '\xA0',
	                roommate.move_in_date
	              ),
	              _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  'Created:'
	                ),
	                '\xA0',
	                roommate.created
	              ),
	              para(description, 'Description: ')
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-4' },
	              para(roommate.major, 'Major: '),
	              para(roommate.study_time, 'Study time: '),
	              para(roommate.focus, 'Focus: ')
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-4' },
	              para(roommate.free_time, 'Free time: '),
	              para(roommate.music, 'Music: '),
	              para(roommate.hobbies, 'Hobbies: ')
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'panel-footer text-center' },
	          _react2.default.createElement(
	            'a',
	            { className: 'btn btn-primary', href: './properties/Roommate/' + roommate.id },
	            'Full details'
	          )
	        )
	      );
	    }
	  }]);
	
	  return RoommateRow;
	}(_react2.default.Component);
	
	exports.default = RoommateRow;
	
	
	RoommateRow.propTypes = {
	  roommate: _react2.default.PropTypes.object
	};

/***/ }

});
//# sourceMappingURL=roommatelist.js.map