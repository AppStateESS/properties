webpackJsonp([4],{

/***/ 0:
/*!********************************************!*\
  !*** ./javascript/PropertyImage/index.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _PropertyImage = __webpack_require__(/*! ./PropertyImage.jsx */ 390);
	
	var _PropertyImage2 = _interopRequireDefault(_PropertyImage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_PropertyImage2.default, null), document.getElementById('propertyimage'));

/***/ },

/***/ 195:
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

/***/ 387:
/*!**************************************!*\
  !*** ./javascript/Mixin/Overlay.jsx ***!
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
	
	/* global $ */
	
	var Overlay = function (_React$Component) {
	  _inherits(Overlay, _React$Component);
	
	  function Overlay(props) {
	    _classCallCheck(this, Overlay);
	
	    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, props));
	
	    _this.state = {};
	    _this.lighten = _this.lighten.bind(_this);
	    _this.normal = _this.normal.bind(_this);
	    _this.unlockBody = _this.unlockBody.bind(_this);
	    _this.close = _this.close.bind(_this);
	    return _this;
	  }
	
	  _createClass(Overlay, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.lockBody();
	    }
	  }, {
	    key: 'lockBody',
	    value: function lockBody() {
	      $('body').css('overflow', 'hidden');
	    }
	  }, {
	    key: 'unlockBody',
	    value: function unlockBody() {
	      $('body').css('overflow', 'inherit');
	    }
	  }, {
	    key: 'normal',
	    value: function normal() {
	      this.refs.closebutton.style.backgroundColor = 'inherit';
	    }
	  }, {
	    key: 'lighten',
	    value: function lighten() {
	      this.refs.closebutton.style.backgroundColor = '#e3e3e3';
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.unlockBody();
	      this.props.close();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var overlayStyle = {
	        width: '100%',
	        position: 'fixed',
	        top: '0px',
	        bottom: '0px',
	        left: '0px',
	        backgroundColor: 'white',
	        zIndex: '100',
	        overflowY: 'scroll',
	        overflowX: 'hidden',
	        padding: '10px'
	      };
	
	      var headerStyle = {
	        backgroundColor: '#F2F2F2',
	        border: '1px solid #D9D9D9',
	        marginBottom: '1em',
	        height: '40px'
	      };
	
	      var titleStyle = {
	        padding: '9px',
	        fontSize: '14px',
	        fontWeight: 'bold'
	      };
	
	      var closeButton = {
	        padding: '5px',
	        float: 'right'
	      };
	
	      var childrenStyle = {
	        paddingBottom: '50px'
	      };
	      return _react2.default.createElement(
	        'div',
	        { style: overlayStyle },
	        _react2.default.createElement(
	          'div',
	          { style: headerStyle },
	          _react2.default.createElement(
	            'div',
	            {
	              ref: 'closebutton',
	              style: closeButton,
	              onMouseEnter: this.lighten,
	              onMouseLeave: this.normal },
	            _react2.default.createElement('i', { className: ' fa fa-2x fa-times pointer', onClick: this.close })
	          ),
	          _react2.default.createElement(
	            'div',
	            { style: titleStyle },
	            this.props.title
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { style: childrenStyle },
	          this.props.children
	        )
	      );
	    }
	  }]);
	
	  return Overlay;
	}(_react2.default.Component);
	
	exports.default = Overlay;
	
	
	Overlay.propTypes = {
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  close: _react2.default.PropTypes.func,
	  title: _react2.default.PropTypes.string
	};

/***/ },

/***/ 390:
/*!****************************************************!*\
  !*** ./javascript/PropertyImage/PropertyImage.jsx ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ImageOverlay = __webpack_require__(/*! ./ImageOverlay.jsx */ 391);
	
	var _ImageOverlay2 = _interopRequireDefault(_ImageOverlay);
	
	var _Bind = __webpack_require__(/*! ../Mixin/Bind.js */ 195);
	
	var _Bind2 = _interopRequireDefault(_Bind);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* global $, propertyId, loadPhotos, editPhotos, currentPhotos */
	
	var PropertyImage = function (_React$Component) {
	  _inherits(PropertyImage, _React$Component);
	
	  function PropertyImage(props) {
	    _classCallCheck(this, PropertyImage);
	
	    var _this = _possibleConstructorReturn(this, (PropertyImage.__proto__ || Object.getPrototypeOf(PropertyImage)).call(this, props));
	
	    _this.state = {
	      show: false,
	      newPhotos: [],
	      currentPhotos: [],
	      status: []
	    };
	    var methods = ['overlayOn', 'overlayOff', 'addPhotos', 'clearNewPhotos', 'delete'];
	    (0, _Bind2.default)(methods, _this);
	    return _this;
	  }
	
	  _createClass(PropertyImage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      editPhotos.callback = this.overlayOn;
	      if (currentPhotos.length > 0) {
	        this.setState({ currentPhotos: currentPhotos });
	      }
	    }
	  }, {
	    key: 'clearNewPhotos',
	    value: function clearNewPhotos() {
	      this.setState({ newPhotos: [] });
	    }
	  }, {
	    key: 'addPhotos',
	    value: function addPhotos(photos) {
	      var status = this.state.status;
	      var newPhotos = [];
	      var currentPhotos = [];
	      this.clearNewPhotos();
	      $.each(photos, function (key, value) {
	        var formData = new FormData();
	        formData.append('propertyId', propertyId);
	        formData.append('photo', value);
	        $.ajax({
	          url: './properties/Photo',
	          type: 'POST',
	          data: formData,
	          cache: false,
	          dataType: 'json',
	          processData: false,
	          contentType: false,
	          success: function (data) {
	            currentPhotos = this.state.currentPhotos;
	            if (data.success === true) {
	              currentPhotos.push(data.photo);
	            }
	            newPhotos.push(data.photo);
	            status[key] = data.success;
	            this.setState({ status: status, currentPhotos: currentPhotos, newPhotos: newPhotos });
	          }.bind(this),
	          failure: function (data) {
	            newPhotos.push(data.photo);
	            status[key] = false;
	            this.setState({ status: status, newPhotos: newPhotos });
	          }.bind(this)
	        });
	      }.bind(this));
	    }
	  }, {
	    key: 'overlayOn',
	    value: function overlayOn() {
	      this.setState({ show: true });
	    }
	  }, {
	    key: 'overlayOff',
	    value: function overlayOff() {
	      this.setState({ show: false, newPhotos: [] });
	      loadPhotos.callback();
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(id, key) {
	      $.ajax({
	        url: './properties/Photo/' + id,
	        dataType: 'json',
	        method: 'DELETE',
	        success: function (data) {
	          var photos = this.state.currentPhotos;
	          if (data.success === true) {
	            photos.splice(key, 1);
	          }
	          this.setState({ currentPhotos: photos });
	        }.bind(this),
	        error: function () {}.bind(this)
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var overlay = void 0;
	      if (this.state.show) {
	        overlay = _react2.default.createElement(_ImageOverlay2.default, {
	          'delete': this.delete,
	          close: this.overlayOff,
	          clear: this.clearNewPhotos,
	          update: this.addPhotos,
	          newPhotos: this.state.newPhotos,
	          currentPhotos: this.state.currentPhotos,
	          status: this.state.status });
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        overlay
	      );
	    }
	  }]);
	
	  return PropertyImage;
	}(_react2.default.Component);
	
	exports.default = PropertyImage;
	
	
	PropertyImage.propTypes = {
	  current: _react2.default.PropTypes.array
	};

/***/ },

/***/ 391:
/*!***************************************************!*\
  !*** ./javascript/PropertyImage/ImageOverlay.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Overlay = __webpack_require__(/*! ../Mixin/Overlay.jsx */ 387);
	
	var _Overlay2 = _interopRequireDefault(_Overlay);
	
	var _reactDropzone = __webpack_require__(/*! react-dropzone */ 392);
	
	var _reactDropzone2 = _interopRequireDefault(_reactDropzone);
	
	var _Thumb = __webpack_require__(/*! ./Thumb.jsx */ 393);
	
	var _Thumb2 = _interopRequireDefault(_Thumb);
	
	var _ImageFrame = __webpack_require__(/*! ./ImageFrame.jsx */ 394);
	
	var _ImageFrame2 = _interopRequireDefault(_ImageFrame);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ImageOverlay = function (_React$Component) {
	  _inherits(ImageOverlay, _React$Component);
	
	  function ImageOverlay(props) {
	    _classCallCheck(this, ImageOverlay);
	
	    return _possibleConstructorReturn(this, (ImageOverlay.__proto__ || Object.getPrototypeOf(ImageOverlay)).call(this, props));
	  }
	
	  _createClass(ImageOverlay, [{
	    key: 'render',
	    value: function render() {
	      var photos = _react2.default.createElement(
	        'div',
	        { style: {
	            paddingTop: '2%'
	          } },
	        _react2.default.createElement('i', { className: 'fa fa-camera fa-5x' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(
	          'h4',
	          null,
	          'Click to browse',
	          _react2.default.createElement('br', null),
	          '- or -',
	          _react2.default.createElement('br', null),
	          'drag image(s) here'
	        )
	      );
	      if (this.props.newPhotos.length > 0) {
	        photos = this.props.newPhotos.map(function (value, key) {
	          var status = void 0;
	          if (this.props.status[key] !== undefined) {
	            status = this.props.status[key];
	          }
	          return _react2.default.createElement(_ImageFrame2.default, { key: key, image: value, status: status });
	        }.bind(this));
	      }
	
	      var currentImages = void 0;
	      if (this.props.currentPhotos.length > 0) {
	        currentImages = this.props.currentPhotos.map(function (value, key) {
	          return _react2.default.createElement(_Thumb2.default, _extends({}, value, { key: key, 'delete': this.props.delete.bind(null, value.id, key) }));
	        }.bind(this));
	      }
	
	      return _react2.default.createElement(
	        _Overlay2.default,
	        { close: this.props.close, title: 'Update images' },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            _reactDropzone2.default,
	            {
	              ref: 'dropzone',
	              onDrop: this.props.update,
	              className: 'dropzone text-center pointer' },
	            photos
	          ),
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'button',
	              { className: 'btn btn-default', onClick: this.props.clear },
	              'Clear'
	            )
	          ),
	          _react2.default.createElement('hr', null),
	          _react2.default.createElement('div', { style: { clear: 'both' } }),
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'h4',
	              null,
	              'Current'
	            ),
	            currentImages
	          )
	        )
	      );
	    }
	  }]);
	
	  return ImageOverlay;
	}(_react2.default.Component);
	
	exports.default = ImageOverlay;
	
	
	ImageOverlay.propTypes = {
	  close: _react2.default.PropTypes.func,
	  update: _react2.default.PropTypes.func,
	  delete: _react2.default.PropTypes.func,
	  clear: _react2.default.PropTypes.func,
	  newPhotos: _react2.default.PropTypes.array,
	  currentPhotos: _react2.default.PropTypes.array,
	  status: _react2.default.PropTypes.array
	};

/***/ },

/***/ 392:
/*!****************************************!*\
  !*** ./~/react-dropzone/dist/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(/*! react */ 1));
		else if(typeof define === 'function' && define.amd)
			define(["react"], factory);
		else if(typeof exports === 'object')
			exports["Dropzone"] = factory(require("react"));
		else
			root["Dropzone"] = factory(root["react"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _attrAccept = __webpack_require__(1);
		
		var _attrAccept2 = _interopRequireDefault(_attrAccept);
		
		var _react = __webpack_require__(2);
		
		var _react2 = _interopRequireDefault(_react);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint prefer-template: 0 */
		
		var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;
		
		var Dropzone = function (_React$Component) {
		  _inherits(Dropzone, _React$Component);
		
		  function Dropzone(props, context) {
		    _classCallCheck(this, Dropzone);
		
		    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropzone).call(this, props, context));
		
		    _this.onClick = _this.onClick.bind(_this);
		    _this.onDragStart = _this.onDragStart.bind(_this);
		    _this.onDragEnter = _this.onDragEnter.bind(_this);
		    _this.onDragLeave = _this.onDragLeave.bind(_this);
		    _this.onDragOver = _this.onDragOver.bind(_this);
		    _this.onDrop = _this.onDrop.bind(_this);
		
		    _this.state = {
		      isDragActive: false
		    };
		    return _this;
		  }
		
		  _createClass(Dropzone, [{
		    key: 'componentDidMount',
		    value: function componentDidMount() {
		      this.enterCounter = 0;
		    }
		  }, {
		    key: 'onDragStart',
		    value: function onDragStart(e) {
		      if (this.props.onDragStart) {
		        this.props.onDragStart.call(this, e);
		      }
		    }
		  }, {
		    key: 'onDragEnter',
		    value: function onDragEnter(e) {
		      e.preventDefault();
		
		      // Count the dropzone and any children that are entered.
		      ++this.enterCounter;
		
		      // This is tricky. During the drag even the dataTransfer.files is null
		      // But Chrome implements some drag store, which is accesible via dataTransfer.items
		      var dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];
		
		      // Now we need to convert the DataTransferList to Array
		      var allFilesAccepted = this.allFilesAccepted(Array.prototype.slice.call(dataTransferItems));
		
		      this.setState({
		        isDragActive: allFilesAccepted,
		        isDragReject: !allFilesAccepted
		      });
		
		      if (this.props.onDragEnter) {
		        this.props.onDragEnter.call(this, e);
		      }
		    }
		  }, {
		    key: 'onDragOver',
		    value: function onDragOver(e) {
		      e.preventDefault();
		      e.stopPropagation();
		      e.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
		      return false;
		    }
		  }, {
		    key: 'onDragLeave',
		    value: function onDragLeave(e) {
		      e.preventDefault();
		
		      // Only deactivate once the dropzone and all children was left.
		      if (--this.enterCounter > 0) {
		        return;
		      }
		
		      this.setState({
		        isDragActive: false,
		        isDragReject: false
		      });
		
		      if (this.props.onDragLeave) {
		        this.props.onDragLeave.call(this, e);
		      }
		    }
		  }, {
		    key: 'onDrop',
		    value: function onDrop(e) {
		      e.preventDefault();
		
		      // Reset the counter along with the drag on a drop.
		      this.enterCounter = 0;
		
		      this.setState({
		        isDragActive: false,
		        isDragReject: false
		      });
		
		      var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
		      var max = this.props.multiple ? droppedFiles.length : Math.min(droppedFiles.length, 1);
		      var files = [];
		
		      for (var i = 0; i < max; i++) {
		        var file = droppedFiles[i];
		        // We might want to disable the preview creation to support big files
		        if (!this.props.disablePreview) {
		          file.preview = window.URL.createObjectURL(file);
		        }
		        files.push(file);
		      }
		
		      if (this.allFilesAccepted(files) && this.allFilesMatchSize(files)) {
		        if (this.props.onDrop) {
		          this.props.onDrop.call(this, files, e);
		        }
		
		        if (this.props.onDropAccepted) {
		          this.props.onDropAccepted.call(this, files, e);
		        }
		      } else {
		        if (this.props.onDropRejected) {
		          this.props.onDropRejected.call(this, files, e);
		        }
		      }
		    }
		  }, {
		    key: 'onClick',
		    value: function onClick() {
		      if (!this.props.disableClick) {
		        this.open();
		      }
		    }
		  }, {
		    key: 'allFilesAccepted',
		    value: function allFilesAccepted(files) {
		      var _this2 = this;
		
		      return files.every(function (file) {
		        return (0, _attrAccept2.default)(file, _this2.props.accept);
		      });
		    }
		  }, {
		    key: 'allFilesMatchSize',
		    value: function allFilesMatchSize(files) {
		      var _this3 = this;
		
		      return files.every(function (file) {
		        return file.size <= _this3.props.maxSize && file.size >= _this3.props.minSize;
		      });
		    }
		  }, {
		    key: 'open',
		    value: function open() {
		      this.fileInputEl.value = null;
		      this.fileInputEl.click();
		    }
		  }, {
		    key: 'render',
		    value: function render() {
		      var _this4 = this;
		
		      var _props = this.props;
		      var accept = _props.accept;
		      var activeClassName = _props.activeClassName;
		      var inputProps = _props.inputProps;
		      var multiple = _props.multiple;
		      var name = _props.name;
		      var rejectClassName = _props.rejectClassName;
		
		      var rest = _objectWithoutProperties(_props, ['accept', 'activeClassName', 'inputProps', 'multiple', 'name', 'rejectClassName']);
		
		      var activeStyle = rest.activeStyle;
		      var className = rest.className;
		      var rejectStyle = rest.rejectStyle;
		      var style = rest.style;
		
		      var props = _objectWithoutProperties(rest, ['activeStyle', 'className', 'rejectStyle', 'style']);
		
		      var _state = this.state;
		      var isDragActive = _state.isDragActive;
		      var isDragReject = _state.isDragReject;
		
		
		      className = className || '';
		
		      if (isDragActive && activeClassName) {
		        className += ' ' + activeClassName;
		      }
		      if (isDragReject && rejectClassName) {
		        className += ' ' + rejectClassName;
		      }
		
		      if (!className && !style && !activeStyle && !rejectStyle) {
		        style = {
		          width: 200,
		          height: 200,
		          borderWidth: 2,
		          borderColor: '#666',
		          borderStyle: 'dashed',
		          borderRadius: 5
		        };
		        activeStyle = {
		          borderStyle: 'solid',
		          backgroundColor: '#eee'
		        };
		        rejectStyle = {
		          borderStyle: 'solid',
		          backgroundColor: '#ffdddd'
		        };
		      }
		
		      var appliedStyle = void 0;
		      if (activeStyle && isDragActive) {
		        appliedStyle = _extends({}, style, activeStyle);
		      } else if (rejectStyle && isDragReject) {
		        appliedStyle = _extends({}, style, rejectStyle);
		      } else {
		        appliedStyle = _extends({}, style);
		      }
		
		      var inputAttributes = {
		        accept: accept,
		        type: 'file',
		        style: { display: 'none' },
		        multiple: supportMultiple && multiple,
		        ref: function ref(el) {
		          return _this4.fileInputEl = el;
		        }, // eslint-disable-line
		        onChange: this.onDrop
		      };
		
		      if (name && name.length) {
		        inputAttributes.name = name;
		      }
		
		      // Remove custom properties before passing them to the wrapper div element
		      var customProps = ['disablePreview', 'disableClick', 'onDropAccepted', 'onDropRejected', 'maxSize', 'minSize'];
		      var divProps = _extends({}, props);
		      customProps.forEach(function (prop) {
		        return delete divProps[prop];
		      });
		
		      return _react2.default.createElement(
		        'div',
		        _extends({
		          className: className,
		          style: appliedStyle
		        }, divProps /* expand user provided props first so event handlers are never overridden */, {
		          onClick: this.onClick,
		          onDragStart: this.onDragStart,
		          onDragEnter: this.onDragEnter,
		          onDragOver: this.onDragOver,
		          onDragLeave: this.onDragLeave,
		          onDrop: this.onDrop
		        }),
		        this.props.children,
		        _react2.default.createElement('input', _extends({}, inputProps /* expand user provided inputProps first so inputAttributes override them */, inputAttributes))
		      );
		    }
		  }]);
		
		  return Dropzone;
		}(_react2.default.Component);
		
		Dropzone.defaultProps = {
		  disablePreview: false,
		  disableClick: false,
		  multiple: true,
		  maxSize: Infinity,
		  minSize: 0
		};
		
		Dropzone.propTypes = {
		  // Overriding drop behavior
		  onDrop: _react2.default.PropTypes.func,
		  onDropAccepted: _react2.default.PropTypes.func,
		  onDropRejected: _react2.default.PropTypes.func,
		
		  // Overriding drag behavior
		  onDragStart: _react2.default.PropTypes.func,
		  onDragEnter: _react2.default.PropTypes.func,
		  onDragLeave: _react2.default.PropTypes.func,
		
		  children: _react2.default.PropTypes.node, // Contents of the dropzone
		  style: _react2.default.PropTypes.object, // CSS styles to apply
		  activeStyle: _react2.default.PropTypes.object, // CSS styles to apply when drop will be accepted
		  rejectStyle: _react2.default.PropTypes.object, // CSS styles to apply when drop will be rejected
		  className: _react2.default.PropTypes.string, // Optional className
		  activeClassName: _react2.default.PropTypes.string, // className for accepted state
		  rejectClassName: _react2.default.PropTypes.string, // className for rejected state
		
		  disablePreview: _react2.default.PropTypes.bool, // Enable/disable preview generation
		  disableClick: _react2.default.PropTypes.bool, // Disallow clicking on the dropzone container to open file dialog
		
		  inputProps: _react2.default.PropTypes.object, // Pass additional attributes to the <input type="file"/> tag
		  multiple: _react2.default.PropTypes.bool, // Allow dropping multiple files
		  accept: _react2.default.PropTypes.string, // Allow specific types of files. See https://github.com/okonet/attr-accept for more information
		  name: _react2.default.PropTypes.string, // name attribute for the input tag
		  maxSize: _react2.default.PropTypes.number,
		  minSize: _react2.default.PropTypes.number
		};
		
		exports.default = Dropzone;
		module.exports = exports['default'];
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){"use strict";n.__esModule=!0,r(8),r(9),n["default"]=function(t,n){if(t&&n){var r=function(){var r=n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return{v:r.some(function(t){var n=t.trim();return"."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):/\/\*$/.test(n)?i===n.replace(/\/.*$/,""):o===n})}}();if("object"==typeof r)return r.v}return!0},t.exports=n["default"]},function(t,n){var r=t.exports={version:"1.2.2"};"number"==typeof __e&&(__e=r)},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(2),o=r(1),i=r(4),u=r(19),c="prototype",f=function(t,n){return function(){return t.apply(n,arguments)}},s=function(t,n,r){var a,p,l,d,y=t&s.G,h=t&s.P,v=y?e:t&s.S?e[n]||(e[n]={}):(e[n]||{})[c],x=y?o:o[n]||(o[n]={});y&&(r=n);for(a in r)p=!(t&s.F)&&v&&a in v,l=(p?v:r)[a],d=t&s.B&&p?f(l,e):h&&"function"==typeof l?f(Function.call,l):l,v&&!p&&u(v,a,l),x[a]!=l&&i(x,a,d),h&&((x[c]||(x[c]={}))[a]=l)};e.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,n,r){var e=r(5),o=r(18);t.exports=r(22)?function(t,n,r){return e.setDesc(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){var e=r(20)("wks"),o=r(2).Symbol;t.exports=function(t){return e[t]||(e[t]=o&&o[t]||(o||r(6))("Symbol."+t))}},function(t,n,r){r(26),t.exports=r(1).Array.some},function(t,n,r){r(25),t.exports=r(1).String.endsWith},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r(7)("match")]=!1,!"/./"[t](n)}catch(o){}}return!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(16),o=r(11),i=r(7)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(2),o=r(4),i=r(6)("src"),u="toString",c=Function[u],f=(""+c).split(u);r(1).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,u){"function"==typeof r&&(o(r,i,t[n]?""+t[n]:f.join(String(n))),"name"in r||(r.name=n)),t===e?t[n]=r:(u||delete t[n],o(t,n,r))})(Function.prototype,u,function(){return"function"==typeof this&&this[i]||c.call(this)})},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e=r(17),o=r(13);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){t.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){"use strict";var e=r(3),o=r(24),i=r(21),u="endsWith",c=""[u];e(e.P+e.F*r(14)(u),"String",{endsWith:function(t){var n=i(this,t,u),r=arguments,e=r.length>1?r[1]:void 0,f=o(n.length),s=void 0===e?f:Math.min(o(e),f),a=String(t);return c?c.call(n,a,s):n.slice(s-a.length,s)===a}})},function(t,n,r){var e=r(5),o=r(3),i=r(1).Array||Array,u={},c=function(t,n){e.each.call(t.split(","),function(t){void 0==n&&t in i?u[t]=i[t]:t in[]&&(u[t]=r(12)(Function.call,[][t],n))})};c("pop,reverse,shift,keys,values,entries",1),c("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),c("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",u)}]);
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=index.js.map

/***/ },

/***/ 393:
/*!********************************************!*\
  !*** ./javascript/PropertyImage/Thumb.jsx ***!
  \********************************************/
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
	
	var Thumb = function (_React$Component) {
	  _inherits(Thumb, _React$Component);
	
	  function Thumb(props) {
	    _classCallCheck(this, Thumb);
	
	    return _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this, props));
	  }
	
	  _createClass(Thumb, [{
	    key: 'render',
	    value: function render() {
	      var outer = {
	        width: '180px',
	        height: '180px',
	        float: 'left',
	        margin: '0px 8px 8px 0',
	        textAlign: 'center',
	        backgroundColor: '#e3e3e3',
	        border: '1px solid #bbb',
	        position: 'relative'
	      };
	
	      var inner = {
	        position: 'absolute',
	        display: 'block',
	        bottom: '0px',
	        left: '82px',
	        cursor: 'pointer'
	      };
	      return _react2.default.createElement(
	        'div',
	        { style: outer },
	        _react2.default.createElement('img', { src: this.props.thumbnail }),
	        _react2.default.createElement(
	          'span',
	          { className: 'fa-stack fa-lg', style: inner, onClick: this.props.delete },
	          _react2.default.createElement('i', { className: 'text-danger fa fa-circle fa-stack-2x' }),
	          _react2.default.createElement('i', { className: 'text-danger fa fa-trash-o fa-stack-1x fa-inverse' })
	        )
	      );
	    }
	  }]);
	
	  return Thumb;
	}(_react2.default.Component);
	
	exports.default = Thumb;
	
	
	Thumb.propTypes = {
	  thumbnail: _react2.default.PropTypes.string,
	  id: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
	  delete: _react2.default.PropTypes.func
	};

/***/ },

/***/ 394:
/*!*************************************************!*\
  !*** ./javascript/PropertyImage/ImageFrame.jsx ***!
  \*************************************************/
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
	
	var ImageFrame = function (_React$Component) {
	  _inherits(ImageFrame, _React$Component);
	
	  function ImageFrame(props) {
	    _classCallCheck(this, ImageFrame);
	
	    return _possibleConstructorReturn(this, (ImageFrame.__proto__ || Object.getPrototypeOf(ImageFrame)).call(this, props));
	  }
	
	  _createClass(ImageFrame, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.props.status === false) {
	        $('.tool').tooltip();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var divStyle = {
	        width: '152px',
	        textAlign: 'center',
	        height: '152px',
	        backgroundColor: '#B9B9B9',
	        marginBottom: '4px',
	        border: '1px solid black'
	      };
	      var imageStyle = {
	        maxHeight: '150px',
	        maxWidth: '150px'
	      };
	
	      var flag = _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('i', { className: 'fa fa-spinner fa-spin fa-2x fa-fw' }),
	        _react2.default.createElement(
	          'span',
	          null,
	          'Uploading...'
	        )
	      );
	      if (this.props.status) {
	        if (this.props.status === true) {
	          flag = _react2.default.createElement(
	            'div',
	            { style: imageStyle },
	            _react2.default.createElement('i', { className: 'fa fa-check text-success fa-2x' }),
	            'Success!'
	          );
	        } else if (this.props.status === false) {
	          flag = _react2.default.createElement(
	            'div',
	            {
	              className: 'tool',
	              style: imageStyle,
	              'data-toggle': 'tooltip',
	              'data-placement': 'bottom',
	              title: this.props.status.error },
	            _react2.default.createElement('i', { className: 'fa fa-times text-danger fa-2x' }),
	            'Failure'
	          );
	        }
	      }
	
	      var outerStyle = {
	        float: 'left',
	        marginRight: '6px',
	        textAlign: 'center'
	      };
	      return _react2.default.createElement(
	        'div',
	        { style: outerStyle },
	        _react2.default.createElement(
	          'div',
	          { style: divStyle },
	          _react2.default.createElement('img', { src: this.props.image.thumbnail, style: imageStyle })
	        ),
	        flag
	      );
	    }
	  }]);
	
	  return ImageFrame;
	}(_react2.default.Component);
	
	exports.default = ImageFrame;
	
	
	ImageFrame.propTypes = {
	  image: _react2.default.PropTypes.object,
	  status: _react2.default.PropTypes.bool
	};

/***/ }

});
//# sourceMappingURL=propertyimage.js.map