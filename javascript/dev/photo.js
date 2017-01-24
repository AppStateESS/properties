webpackJsonp([5],{

/***/ 0:
/*!************************************!*\
  !*** ./javascript/Photo/index.jsx ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Photo = __webpack_require__(/*! ./Photo.jsx */ 194);
	
	var _Photo2 = _interopRequireDefault(_Photo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_Photo2.default, null), document.getElementById('photo'));

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

/***/ 194:
/*!************************************!*\
  !*** ./javascript/Photo/Photo.jsx ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactImageGallery = __webpack_require__(/*! react-image-gallery */ 195);
	
	var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Waiting.jsx */ 181);
	
	var _Waiting2 = _interopRequireDefault(_Waiting);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(/*! react-image-gallery/styles/css/image-gallery.css */ 197);
	
	/* global $, require, propertyId, loadPhotos, currentPhotos */
	
	var Photo = function (_React$Component) {
	  _inherits(Photo, _React$Component);
	
	  function Photo() {
	    _classCallCheck(this, Photo);
	
	    var _this = _possibleConstructorReturn(this, (Photo.__proto__ || Object.getPrototypeOf(Photo)).call(this));
	
	    _this.state = {
	      photos: null,
	      fullscreen: false
	    };
	    _this.toggleScreen = _this.toggleScreen.bind(_this);
	    return _this;
	  }
	
	  _createClass(Photo, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ photos: currentPhotos });
	      loadPhotos.callback = this.load.bind(this);
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      $.getJSON('./properties/Photo/list', { propertyId: propertyId }).done(function (data) {
	        currentPhotos = data;
	        this.setState({ photos: data });
	      }.bind(this));
	    }
	  }, {
	    key: 'toggleScreen',
	    value: function toggleScreen() {
	      this.setState({
	        fullscreen: !this.state.fullscreen
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var images = void 0;
	      if (this.state.photos === null) {
	        images = _react2.default.createElement(_Waiting2.default, { label: 'photos' });
	      } else if (this.state.photos.length > 0) {
	        images = _react2.default.createElement(_reactImageGallery2.default, {
	          ref: function ref(i) {
	            return _this2._imageGallery = i;
	          },
	          items: this.state.photos,
	          onScreenChange: this.toggleScreen,
	          infinite: true,
	          showFullscreenButton: true,
	          showPlayButton: true,
	          showThumbnails: true,
	          showIndex: true,
	          showNav: true,
	          slideInterval: 4000 });
	      } else {
	        images = _react2.default.createElement(
	          'div',
	          { className: 'well text-center text-muted' },
	          _react2.default.createElement('i', { className: 'fa fa-camera fa-5x' }),
	          _react2.default.createElement('br', null),
	          'No photos'
	        );
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        images
	      );
	    }
	  }]);
	
	  return Photo;
	}(_react2.default.Component);
	
	exports.default = Photo;

/***/ },

/***/ 195:
/*!******************************************************!*\
  !*** ./~/react-image-gallery/build/image-gallery.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSwipeable = __webpack_require__(/*! react-swipeable */ 196);
	
	var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MIN_INTERVAL = 500;
	
	function throttle(func, wait) {
	  var context = void 0,
	      args = void 0,
	      result = void 0;
	  var timeout = null;
	  var previous = 0;
	
	  var later = function later() {
	    previous = new Date().getTime();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	
	  return function () {
	    var now = new Date().getTime();
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	}
	
	var screenChangeEvents = ['fullscreenchange', 'msfullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange'];
	
	var ImageGallery = function (_React$Component) {
	  _inherits(ImageGallery, _React$Component);
	
	  function ImageGallery(props) {
	    _classCallCheck(this, ImageGallery);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageGallery).call(this, props));
	
	    _this.state = {
	      currentIndex: props.startIndex,
	      thumbsTranslateX: 0,
	      offsetPercentage: 0,
	      galleryWidth: 0,
	      thumbnailWidth: 0,
	      isFullscreen: false,
	      isPlaying: false
	    };
	    return _this;
	  }
	
	  _createClass(ImageGallery, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.disableArrowKeys !== nextProps.disableArrowKeys) {
	        if (nextProps.disableArrowKeys) {
	          window.removeEventListener('keydown', this._handleKeyDown);
	        } else {
	          window.addEventListener('keydown', this._handleKeyDown);
	        }
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (prevState.thumbnailWidth !== this.state.thumbnailWidth || prevProps.showThumbnails !== this.props.showThumbnails) {
	
	        // adjust thumbnail container when thumbnail width is adjusted
	        this._setThumbsTranslateX(-this._getThumbsTranslateX(this.state.currentIndex > 0 ? 1 : 0) * this.state.currentIndex);
	      }
	
	      if (prevState.currentIndex !== this.state.currentIndex) {
	        if (this.props.onSlide) {
	          this.props.onSlide(this.state.currentIndex);
	        }
	
	        this._updateThumbnailTranslateX(prevState);
	      }
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this._slideLeft = throttle(this._slideLeft.bind(this), MIN_INTERVAL, true);
	      this._slideRight = throttle(this._slideRight.bind(this), MIN_INTERVAL, true);
	      this._handleResize = this._handleResize.bind(this);
	      this._handleScreenChange = this._handleScreenChange.bind(this);
	      this._handleKeyDown = this._handleKeyDown.bind(this);
	      this._thumbnailDelay = 300;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      // delay initial resize to get the accurate this._imageGallery.offsetWidth
	      window.setTimeout(function () {
	        return _this2._handleResize();
	      }, 500);
	
	      if (this.props.autoPlay) {
	        this.play();
	      }
	      if (!this.props.disableArrowKeys) {
	        window.addEventListener('keydown', this._handleKeyDown);
	      }
	      window.addEventListener('resize', this._handleResize);
	      this._onScreenChangeEvent();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (!this.props.disableArrowKeys) {
	        window.removeEventListener('keydown', this._handleKeyDown);
	      }
	      window.removeEventListener('resize', this._handleResize);
	      this._offScreenChangeEvent();
	
	      if (this._intervalId) {
	        window.clearInterval(this._intervalId);
	        this._intervalId = null;
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      var _this3 = this;
	
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      if (!this._intervalId) {
	        this.setState({ isPlaying: true });
	        var slideInterval = this.props.slideInterval;
	
	        this._intervalId = window.setInterval(function () {
	          if (!_this3.state.hovering) {
	            if (!_this3.props.infinite && !_this3._canSlideRight()) {
	              _this3.pause();
	            } else {
	              _this3.slideToIndex(_this3.state.currentIndex + 1);
	            }
	          }
	        }, slideInterval > MIN_INTERVAL ? slideInterval : MIN_INTERVAL);
	
	        if (this.props.onPlay && callback) {
	          this.props.onPlay(this.state.currentIndex);
	        }
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      if (this._intervalId) {
	        window.clearInterval(this._intervalId);
	        this._intervalId = null;
	        this.setState({ isPlaying: false });
	
	        if (this.props.onPause && callback) {
	          this.props.onPause(this.state.currentIndex);
	        }
	      }
	    }
	  }, {
	    key: 'fullScreen',
	    value: function fullScreen() {
	      var gallery = this._imageGallery;
	
	      if (gallery.requestFullscreen) {
	        gallery.requestFullscreen();
	      } else if (gallery.msRequestFullscreen) {
	        gallery.msRequestFullscreen();
	      } else if (gallery.mozRequestFullScreen) {
	        gallery.mozRequestFullScreen();
	      } else if (gallery.webkitRequestFullscreen) {
	        gallery.webkitRequestFullscreen();
	      } else {
	        // fallback to fullscreen modal for unsupported browsers
	        this.setState({ modalFullscreen: true });
	        // manually call because browser does not support screenchange events
	        if (this.props.onScreenChange) {
	          this.props.onScreenChange(true);
	        }
	      }
	
	      this.setState({ isFullscreen: true });
	    }
	  }, {
	    key: 'exitFullScreen',
	    value: function exitFullScreen() {
	      if (this.state.isFullscreen) {
	        if (document.exitFullscreen) {
	          document.exitFullscreen();
	        } else if (document.webkitExitFullscreen) {
	          document.webkitExitFullscreen();
	        } else if (document.mozCancelFullScreen) {
	          document.mozCancelFullScreen();
	        } else if (document.msExitFullscreen) {
	          document.msExitFullscreen();
	        } else {
	          // fallback to fullscreen modal for unsupported browsers
	          this.setState({ modalFullscreen: false });
	          // manually call because browser does not support screenchange events
	          if (this.props.onScreenChange) {
	            this.props.onScreenChange(false);
	          }
	        }
	
	        this.setState({ isFullscreen: false });
	      }
	    }
	  }, {
	    key: 'slideToIndex',
	    value: function slideToIndex(index, event) {
	      if (event) {
	        if (this._intervalId) {
	          // user triggered event while ImageGallery is playing, reset interval
	          this.pause(false);
	          this.play(false);
	        }
	      }
	
	      var slideCount = this.props.items.length - 1;
	      var currentIndex = index;
	
	      if (index < 0) {
	        currentIndex = slideCount;
	      } else if (index > slideCount) {
	        currentIndex = 0;
	      }
	
	      this.setState({
	        previousIndex: this.state.currentIndex,
	        currentIndex: currentIndex,
	        offsetPercentage: 0,
	        style: {
	          transition: 'transform .45s ease-out'
	        }
	      });
	    }
	  }, {
	    key: 'getCurrentIndex',
	    value: function getCurrentIndex() {
	      return this.state.currentIndex;
	    }
	  }, {
	    key: '_handleScreenChange',
	    value: function _handleScreenChange() {
	      /*
	        handles screen change events that the browser triggers e.g. esc key
	      */
	      var fullScreenElement = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	
	      if (this.props.onScreenChange) {
	        this.props.onScreenChange(fullScreenElement);
	      }
	
	      this.setState({ isFullscreen: !!fullScreenElement });
	    }
	  }, {
	    key: '_onScreenChangeEvent',
	    value: function _onScreenChangeEvent() {
	      var _this4 = this;
	
	      screenChangeEvents.map(function (eventName) {
	        document.addEventListener(eventName, _this4._handleScreenChange);
	      });
	    }
	  }, {
	    key: '_offScreenChangeEvent',
	    value: function _offScreenChangeEvent() {
	      var _this5 = this;
	
	      screenChangeEvents.map(function (eventName) {
	        document.removeEventListener(eventName, _this5._handleScreenChange);
	      });
	    }
	  }, {
	    key: '_toggleFullScreen',
	    value: function _toggleFullScreen() {
	      if (this.state.isFullscreen) {
	        this.exitFullScreen();
	      } else {
	        this.fullScreen();
	      }
	    }
	  }, {
	    key: '_togglePlay',
	    value: function _togglePlay() {
	      if (this._intervalId) {
	        this.pause();
	      } else {
	        this.play();
	      }
	    }
	  }, {
	    key: '_handleResize',
	    value: function _handleResize() {
	      if (this._imageGallery) {
	        this.setState({ galleryWidth: this._imageGallery.offsetWidth });
	      }
	
	      if (this._imageGalleryThumbnail) {
	        this.setState({ thumbnailWidth: this._imageGalleryThumbnail.offsetWidth });
	      }
	    }
	  }, {
	    key: '_handleKeyDown',
	    value: function _handleKeyDown(event) {
	      var LEFT_ARROW = 37;
	      var RIGHT_ARROW = 39;
	      var key = parseInt(event.keyCode || event.which || 0);
	
	      switch (key) {
	        case LEFT_ARROW:
	          if (this._canSlideLeft() && !this._intervalId) {
	            this._slideLeft();
	          }
	          break;
	        case RIGHT_ARROW:
	          if (this._canSlideRight() && !this._intervalId) {
	            this._slideRight();
	          }
	          break;
	      }
	    }
	  }, {
	    key: '_handleMouseOverThumbnails',
	    value: function _handleMouseOverThumbnails(index) {
	      var _this6 = this;
	
	      if (this.props.slideOnThumbnailHover) {
	        this.setState({ hovering: true });
	        if (this._thumbnailTimer) {
	          window.clearTimeout(this._thumbnailTimer);
	          this._thumbnailTimer = null;
	        }
	        this._thumbnailTimer = window.setTimeout(function () {
	          _this6.slideToIndex(index);
	        }, this._thumbnailDelay);
	      }
	    }
	  }, {
	    key: '_handleMouseLeaveThumbnails',
	    value: function _handleMouseLeaveThumbnails() {
	      if (this._thumbnailTimer) {
	        window.clearTimeout(this._thumbnailTimer);
	        this._thumbnailTimer = null;
	        if (this.props.autoPlay === true) {
	          this.play(false);
	        }
	      }
	      this.setState({ hovering: false });
	    }
	  }, {
	    key: '_handleImageError',
	    value: function _handleImageError(event) {
	      if (this.props.defaultImage && event.target.src.indexOf(this.props.defaultImage) === -1) {
	        event.target.src = this.props.defaultImage;
	      }
	    }
	  }, {
	    key: '_handleOnSwiped',
	    value: function _handleOnSwiped(ev, x, y, isFlick) {
	      this.setState({ isFlick: isFlick });
	    }
	  }, {
	    key: '_shouldSlideOnSwipe',
	    value: function _shouldSlideOnSwipe() {
	      var shouldSlide = Math.abs(this.state.offsetPercentage) > 30 || this.state.isFlick;
	
	      if (shouldSlide) {
	        // reset isFlick state after so data is not persisted
	        this.setState({ isFlick: false });
	      }
	      return shouldSlide;
	    }
	  }, {
	    key: '_handleOnSwipedTo',
	    value: function _handleOnSwipedTo(index) {
	      var slideTo = this.state.currentIndex;
	
	      if (this._shouldSlideOnSwipe()) {
	        slideTo += index;
	      }
	
	      if (index < 0) {
	        if (!this._canSlideLeft()) {
	          slideTo = this.state.currentIndex;
	        }
	      } else {
	        if (!this._canSlideRight()) {
	          slideTo = this.state.currentIndex;
	        }
	      }
	
	      this.slideToIndex(slideTo);
	    }
	  }, {
	    key: '_handleSwiping',
	    value: function _handleSwiping(index, _, delta) {
	      var offsetPercentage = index * (delta / this.state.galleryWidth * 100);
	      this.setState({ offsetPercentage: offsetPercentage, style: {} });
	    }
	  }, {
	    key: '_canNavigate',
	    value: function _canNavigate() {
	      return this.props.items.length >= 2;
	    }
	  }, {
	    key: '_canSlideLeft',
	    value: function _canSlideLeft() {
	      return this.props.infinite || this.state.currentIndex > 0;
	    }
	  }, {
	    key: '_canSlideRight',
	    value: function _canSlideRight() {
	      return this.props.infinite || this.state.currentIndex < this.props.items.length - 1;
	    }
	  }, {
	    key: '_updateThumbnailTranslateX',
	    value: function _updateThumbnailTranslateX(prevState) {
	      if (this.state.currentIndex === 0) {
	        this._setThumbsTranslateX(0);
	      } else {
	        var indexDifference = Math.abs(prevState.currentIndex - this.state.currentIndex);
	        var scrollX = this._getThumbsTranslateX(indexDifference);
	        if (scrollX > 0) {
	          if (prevState.currentIndex < this.state.currentIndex) {
	            this._setThumbsTranslateX(this.state.thumbsTranslateX - scrollX);
	          } else if (prevState.currentIndex > this.state.currentIndex) {
	            this._setThumbsTranslateX(this.state.thumbsTranslateX + scrollX);
	          }
	        }
	      }
	    }
	  }, {
	    key: '_setThumbsTranslateX',
	    value: function _setThumbsTranslateX(thumbsTranslateX) {
	      this.setState({ thumbsTranslateX: thumbsTranslateX });
	    }
	  }, {
	    key: '_getThumbsTranslateX',
	    value: function _getThumbsTranslateX(indexDifference) {
	      if (this.props.disableThumbnailScroll) {
	        return 0;
	      }
	
	      var thumbnailWidth = this.state.thumbnailWidth;
	
	
	      if (this._thumbnails) {
	        if (this._thumbnails.scrollWidth <= thumbnailWidth) {
	          return 0;
	        }
	        var totalThumbnails = this._thumbnails.children.length;
	        // total scroll-x required to see the last thumbnail
	        var totalScrollX = this._thumbnails.scrollWidth - thumbnailWidth;
	        // scroll-x required per index change
	        var perIndexScrollX = totalScrollX / (totalThumbnails - 1);
	
	        return indexDifference * perIndexScrollX;
	      }
	    }
	  }, {
	    key: '_getAlignmentClassName',
	    value: function _getAlignmentClassName(index) {
	      // LEFT, and RIGHT alignments are necessary for lazyLoad
	      var currentIndex = this.state.currentIndex;
	
	      var alignment = '';
	      var LEFT = 'left';
	      var CENTER = 'center';
	      var RIGHT = 'right';
	
	      switch (index) {
	        case currentIndex - 1:
	          alignment = ' ' + LEFT;
	          break;
	        case currentIndex:
	          alignment = ' ' + CENTER;
	          break;
	        case currentIndex + 1:
	          alignment = ' ' + RIGHT;
	          break;
	      }
	
	      if (this.props.items.length >= 3 && this.props.infinite) {
	        if (index === 0 && currentIndex === this.props.items.length - 1) {
	          // set first slide as right slide if were sliding right from last slide
	          alignment = ' ' + RIGHT;
	        } else if (index === this.props.items.length - 1 && currentIndex === 0) {
	          // set last slide as left slide if were sliding left from first slide
	          alignment = ' ' + LEFT;
	        }
	      }
	
	      return alignment;
	    }
	  }, {
	    key: '_getTranslateXForTwoSlide',
	    value: function _getTranslateXForTwoSlide(index) {
	      // For taking care of infinite swipe when there are only two slides
	      var _state = this.state;
	      var currentIndex = _state.currentIndex;
	      var offsetPercentage = _state.offsetPercentage;
	      var previousIndex = _state.previousIndex;
	
	      var baseTranslateX = -100 * currentIndex;
	      var translateX = baseTranslateX + index * 100 + offsetPercentage;
	
	      // keep track of user swiping direction
	      if (offsetPercentage > 0) {
	        this.direction = 'left';
	      } else if (offsetPercentage < 0) {
	        this.direction = 'right';
	      }
	
	      // when swiping make sure the slides are on the correct side
	      if (currentIndex === 0 && index === 1 && offsetPercentage > 0) {
	        translateX = -100 + offsetPercentage;
	      } else if (currentIndex === 1 && index === 0 && offsetPercentage < 0) {
	        translateX = 100 + offsetPercentage;
	      }
	
	      if (currentIndex !== previousIndex) {
	        // when swiped move the slide to the correct side
	        if (previousIndex === 0 && index === 0 && offsetPercentage === 0 && this.direction === 'left') {
	          translateX = 100;
	        } else if (previousIndex === 1 && index === 1 && offsetPercentage === 0 && this.direction === 'right') {
	          translateX = -100;
	        }
	      } else {
	        // keep the slide on the correct slide even when not a swipe
	        if (currentIndex === 0 && index === 1 && offsetPercentage === 0 && this.direction === 'left') {
	          translateX = -100;
	        } else if (currentIndex === 1 && index === 0 && offsetPercentage === 0 && this.direction === 'right') {
	          translateX = 100;
	        }
	      }
	
	      return translateX;
	    }
	  }, {
	    key: '_getSlideStyle',
	    value: function _getSlideStyle(index) {
	      var _state2 = this.state;
	      var currentIndex = _state2.currentIndex;
	      var offsetPercentage = _state2.offsetPercentage;
	      var _props = this.props;
	      var infinite = _props.infinite;
	      var items = _props.items;
	
	      var baseTranslateX = -100 * currentIndex;
	      var totalSlides = items.length - 1;
	
	      // calculates where the other slides belong based on currentIndex
	      var translateX = baseTranslateX + index * 100 + offsetPercentage;
	
	      // adjust zIndex so that only the current slide and the slide were going
	      // to is at the top layer, this prevents transitions from flying in the
	      // background when swiping before the first slide or beyond the last slide
	      var zIndex = 1;
	      if (index === currentIndex) {
	        zIndex = 3;
	      } else if (index === this.state.previousIndex) {
	        zIndex = 2;
	      }
	
	      if (infinite && items.length > 2) {
	        if (currentIndex === 0 && index === totalSlides) {
	          // make the last slide the slide before the first
	          translateX = -100 + offsetPercentage;
	        } else if (currentIndex === totalSlides && index === 0) {
	          // make the first slide the slide after the last
	          translateX = 100 + offsetPercentage;
	        }
	      }
	
	      // Special case when there are only 2 items with infinite on
	      if (infinite && items.length === 2) {
	        translateX = this._getTranslateXForTwoSlide(index);
	      }
	
	      var translate3d = 'translate3d(' + translateX + '%, 0, 0)';
	
	      return {
	        WebkitTransform: translate3d,
	        MozTransform: translate3d,
	        msTransform: translate3d,
	        OTransform: translate3d,
	        transform: translate3d,
	        zIndex: zIndex
	      };
	    }
	  }, {
	    key: '_getThumbnailStyle',
	    value: function _getThumbnailStyle() {
	      var translate3d = 'translate3d(' + this.state.thumbsTranslateX + 'px, 0, 0)';
	      return {
	        WebkitTransform: translate3d,
	        MozTransform: translate3d,
	        msTransform: translate3d,
	        OTransform: translate3d,
	        transform: translate3d
	      };
	    }
	  }, {
	    key: '_slideLeft',
	    value: function _slideLeft(event) {
	      this.slideToIndex(this.state.currentIndex - 1, event);
	    }
	  }, {
	    key: '_slideRight',
	    value: function _slideRight(event) {
	      this.slideToIndex(this.state.currentIndex + 1, event);
	    }
	  }, {
	    key: '_renderItem',
	    value: function _renderItem(item) {
	      var onImageError = this.props.onImageError || this._handleImageError;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'image-gallery-image' },
	        _react2.default.createElement('img', {
	          src: item.original,
	          alt: item.originalAlt,
	          srcSet: item.srcSet,
	          sizes: item.sizes,
	          onLoad: this.props.onImageLoad,
	          onError: onImageError.bind(this)
	        }),
	        item.description && _react2.default.createElement(
	          'span',
	          { className: 'image-gallery-description' },
	          item.description
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this7 = this;
	
	      var _state3 = this.state;
	      var currentIndex = _state3.currentIndex;
	      var isFullscreen = _state3.isFullscreen;
	      var modalFullscreen = _state3.modalFullscreen;
	      var isPlaying = _state3.isPlaying;
	
	
	      var thumbnailStyle = this._getThumbnailStyle();
	
	      var slideLeft = this._slideLeft.bind(this);
	      var slideRight = this._slideRight.bind(this);
	
	      var slides = [];
	      var thumbnails = [];
	      var bullets = [];
	
	      this.props.items.map(function (item, index) {
	        var alignment = _this7._getAlignmentClassName(index);
	        var originalClass = item.originalClass ? ' ' + item.originalClass : '';
	        var thumbnailClass = item.thumbnailClass ? ' ' + item.thumbnailClass : '';
	
	        var renderItem = item.renderItem || _this7.props.renderItem || _this7._renderItem.bind(_this7);
	
	        var slide = _react2.default.createElement(
	          'div',
	          {
	            key: index,
	            className: 'image-gallery-slide' + alignment + originalClass,
	            style: _extends(_this7._getSlideStyle(index), _this7.state.style),
	            onClick: _this7.props.onClick
	          },
	          renderItem(item)
	        );
	
	        if (_this7.props.lazyLoad) {
	          if (alignment) {
	            slides.push(slide);
	          }
	        } else {
	          slides.push(slide);
	        }
	
	        var onThumbnailError = _this7._handleImageError;
	        if (_this7.props.onThumbnailError) {
	          onThumbnailError = _this7.props.onThumbnailError;
	        }
	
	        if (_this7.props.showThumbnails) {
	          thumbnails.push(_react2.default.createElement(
	            'a',
	            {
	              onMouseOver: _this7._handleMouseOverThumbnails.bind(_this7, index),
	              onMouseLeave: _this7._handleMouseLeaveThumbnails.bind(_this7, index),
	              key: index,
	              className: 'image-gallery-thumbnail' + (currentIndex === index ? ' active' : '') + thumbnailClass,
	
	              onClick: function onClick(event) {
	                return _this7.slideToIndex.call(_this7, index, event);
	              } },
	            _react2.default.createElement('img', {
	              src: item.thumbnail,
	              alt: item.thumbnailAlt,
	              onError: onThumbnailError.bind(_this7) }),
	            _react2.default.createElement(
	              'div',
	              { className: 'image-gallery-thumbnail-label' },
	              item.thumbnailLabel
	            )
	          ));
	        }
	
	        if (_this7.props.showBullets) {
	          bullets.push(_react2.default.createElement('button', {
	            key: index,
	            className: 'image-gallery-bullet ' + (currentIndex === index ? 'active' : ''),
	
	            onClick: function onClick(event) {
	              return _this7.slideToIndex.call(_this7, index, event);
	            } }));
	        }
	      });
	
	      return _react2.default.createElement(
	        'section',
	        {
	          ref: function ref(i) {
	            return _this7._imageGallery = i;
	          },
	          className: 'image-gallery' + (modalFullscreen ? ' fullscreen-modal' : '') },
	        _react2.default.createElement(
	          'div',
	          { className: 'image-gallery-content' + (isFullscreen ? ' fullscreen' : '') },
	          _react2.default.createElement(
	            'div',
	            { className: 'image-gallery-slide-wrapper' },
	            this.props.showFullscreenButton && _react2.default.createElement('a', {
	              className: 'image-gallery-fullscreen-button' + (isFullscreen ? ' active' : ''),
	              onClick: this._toggleFullScreen.bind(this) }),
	            this.props.showPlayButton && _react2.default.createElement('a', {
	              ref: function ref(p) {
	                return _this7._playButton = p;
	              },
	              className: 'image-gallery-play-button' + (isPlaying ? ' active' : ''),
	              onClick: this._togglePlay.bind(this) }),
	            this._canNavigate() ? [this.props.showNav && _react2.default.createElement(
	              'span',
	              { key: 'navigation' },
	              _react2.default.createElement('button', {
	                className: 'image-gallery-left-nav',
	                disabled: !this._canSlideLeft(),
	                onClick: slideLeft }),
	              _react2.default.createElement('button', {
	                className: 'image-gallery-right-nav',
	                disabled: !this._canSlideRight(),
	                onClick: slideRight })
	            ), this.props.disableSwipe ? _react2.default.createElement(
	              'div',
	              { className: 'image-gallery-slides', key: 'slides' },
	              slides
	            ) : _react2.default.createElement(
	              _reactSwipeable2.default,
	              {
	                className: 'image-gallery-swipe',
	                key: 'swipeable',
	                delta: 1,
	                onSwipingLeft: this._handleSwiping.bind(this, -1),
	                onSwipingRight: this._handleSwiping.bind(this, 1),
	                onSwiped: this._handleOnSwiped.bind(this),
	                onSwipedLeft: this._handleOnSwipedTo.bind(this, 1),
	                onSwipedRight: this._handleOnSwipedTo.bind(this, -1)
	              },
	              _react2.default.createElement(
	                'div',
	                { className: 'image-gallery-slides' },
	                slides
	              )
	            )] : _react2.default.createElement(
	              'div',
	              { className: 'image-gallery-slides' },
	              slides
	            ),
	            this.props.showBullets && _react2.default.createElement(
	              'div',
	              { className: 'image-gallery-bullets' },
	              _react2.default.createElement(
	                'ul',
	                { className: 'image-gallery-bullets-container' },
	                bullets
	              )
	            ),
	            this.props.showIndex && _react2.default.createElement(
	              'div',
	              { className: 'image-gallery-index' },
	              _react2.default.createElement(
	                'span',
	                { className: 'image-gallery-index-current' },
	                this.state.currentIndex + 1
	              ),
	              _react2.default.createElement(
	                'span',
	                { className: 'image-gallery-index-separator' },
	                this.props.indexSeparator
	              ),
	              _react2.default.createElement(
	                'span',
	                { className: 'image-gallery-index-total' },
	                this.props.items.length
	              )
	            )
	          ),
	          this.props.showThumbnails && _react2.default.createElement(
	            'div',
	            {
	              className: 'image-gallery-thumbnails',
	              ref: function ref(i) {
	                return _this7._imageGalleryThumbnail = i;
	              }
	            },
	            _react2.default.createElement(
	              'div',
	              {
	                ref: function ref(t) {
	                  return _this7._thumbnails = t;
	                },
	                className: 'image-gallery-thumbnails-container',
	                style: thumbnailStyle },
	              thumbnails
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return ImageGallery;
	}(_react2.default.Component);
	
	exports.default = ImageGallery;
	
	
	ImageGallery.propTypes = {
	  items: _react2.default.PropTypes.array.isRequired,
	  showNav: _react2.default.PropTypes.bool,
	  autoPlay: _react2.default.PropTypes.bool,
	  lazyLoad: _react2.default.PropTypes.bool,
	  infinite: _react2.default.PropTypes.bool,
	  showIndex: _react2.default.PropTypes.bool,
	  showBullets: _react2.default.PropTypes.bool,
	  showThumbnails: _react2.default.PropTypes.bool,
	  showPlayButton: _react2.default.PropTypes.bool,
	  showFullscreenButton: _react2.default.PropTypes.bool,
	  slideOnThumbnailHover: _react2.default.PropTypes.bool,
	  disableThumbnailScroll: _react2.default.PropTypes.bool,
	  disableArrowKeys: _react2.default.PropTypes.bool,
	  disableSwipe: _react2.default.PropTypes.bool,
	  defaultImage: _react2.default.PropTypes.string,
	  indexSeparator: _react2.default.PropTypes.string,
	  startIndex: _react2.default.PropTypes.number,
	  slideInterval: _react2.default.PropTypes.number,
	  onSlide: _react2.default.PropTypes.func,
	  onScreenChange: _react2.default.PropTypes.func,
	  onPause: _react2.default.PropTypes.func,
	  onPlay: _react2.default.PropTypes.func,
	  onClick: _react2.default.PropTypes.func,
	  onImageLoad: _react2.default.PropTypes.func,
	  onImageError: _react2.default.PropTypes.func,
	  onThumbnailError: _react2.default.PropTypes.func,
	  renderItem: _react2.default.PropTypes.func
	};
	
	ImageGallery.defaultProps = {
	  items: [],
	  showNav: true,
	  autoPlay: false,
	  lazyLoad: false,
	  infinite: true,
	  showIndex: false,
	  showBullets: false,
	  showThumbnails: true,
	  showPlayButton: true,
	  showFullscreenButton: true,
	  slideOnThumbnailHover: false,
	  disableThumbnailScroll: false,
	  disableArrowKeys: false,
	  disableSwipe: false,
	  indexSeparator: ' / ',
	  startIndex: 0,
	  slideInterval: 3000
	};

/***/ },

/***/ 196:
/*!********************************************!*\
  !*** ./~/react-swipeable/lib/Swipeable.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(/*! react */ 1);
	
	var Swipeable = React.createClass({
	  displayName: 'Swipeable',
	
	  propTypes: {
	    onSwiped: React.PropTypes.func,
	    onSwiping: React.PropTypes.func,
	    onSwipingUp: React.PropTypes.func,
	    onSwipingRight: React.PropTypes.func,
	    onSwipingDown: React.PropTypes.func,
	    onSwipingLeft: React.PropTypes.func,
	    onSwipedUp: React.PropTypes.func,
	    onSwipedRight: React.PropTypes.func,
	    onSwipedDown: React.PropTypes.func,
	    onSwipedLeft: React.PropTypes.func,
	    flickThreshold: React.PropTypes.number,
	    delta: React.PropTypes.number,
	    preventDefaultTouchmoveEvent: React.PropTypes.bool,
	    stopPropagation: React.PropTypes.bool,
	    nodeName: React.PropTypes.string,
	    trackMouse: React.PropTypes.bool
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      x: null,
	      y: null,
	      swiping: false,
	      start: 0
	    };
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      flickThreshold: 0.6,
	      delta: 10,
	      preventDefaultTouchmoveEvent: true,
	      stopPropagation: false,
	      nodeName: 'div'
	    };
	  },
	
	  calculatePos: function calculatePos(e) {
	    var x = void 0,
	        y = void 0;
	    // If not a touch, determine point from mouse coordinates
	    if (e.changedTouches) {
	      x = e.changedTouches[0].clientX;
	      y = e.changedTouches[0].clientY;
	    } else {
	      x = e.clientX;
	      y = e.clientY;
	    }
	
	    var xd = this.state.x - x;
	    var yd = this.state.y - y;
	
	    var axd = Math.abs(xd);
	    var ayd = Math.abs(yd);
	
	    var time = Date.now() - this.state.start;
	    var velocity = Math.sqrt(axd * axd + ayd * ayd) / time;
	
	    return {
	      deltaX: xd,
	      deltaY: yd,
	      absX: axd,
	      absY: ayd,
	      velocity: velocity
	    };
	  },
	
	  eventStart: function eventStart(e) {
	    if (e.touches && e.touches.length > 1) {
	      return;
	    }
	    // If not a touch, determine point from mouse coordinates
	    var touches = e.touches;
	    if (!touches) {
	      touches = [{ clientX: e.clientX, clientY: e.clientY }];
	    }
	    if (this.props.stopPropagation) e.stopPropagation();
	
	    this.setState({
	      start: Date.now(),
	      x: touches[0].clientX,
	      y: touches[0].clientY,
	      swiping: false
	    });
	  },
	
	  eventMove: function eventMove(e) {
	    if (!this.state.x || !this.state.y || e.touches && e.touches.length > 1) {
	      return;
	    }
	
	    var cancelPageSwipe = false;
	    var pos = this.calculatePos(e);
	
	    if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
	      return;
	    }
	
	    if (this.props.stopPropagation) e.stopPropagation();
	
	    if (this.props.onSwiping) {
	      this.props.onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY, pos.velocity);
	    }
	
	    if (pos.absX > pos.absY) {
	      if (pos.deltaX > 0) {
	        if (this.props.onSwipingLeft || this.props.onSwipedLeft) {
	          this.props.onSwipingLeft && this.props.onSwipingLeft(e, pos.absX);
	          cancelPageSwipe = true;
	        }
	      } else {
	        if (this.props.onSwipingRight || this.props.onSwipedRight) {
	          this.props.onSwipingRight && this.props.onSwipingRight(e, pos.absX);
	          cancelPageSwipe = true;
	        }
	      }
	    } else {
	      if (pos.deltaY > 0) {
	        if (this.props.onSwipingUp || this.props.onSwipedUp) {
	          this.props.onSwipingUp && this.props.onSwipingUp(e, pos.absY);
	          cancelPageSwipe = true;
	        }
	      } else {
	        if (this.props.onSwipingDown || this.props.onSwipedDown) {
	          this.props.onSwipingDown && this.props.onSwipingDown(e, pos.absY);
	          cancelPageSwipe = true;
	        }
	      }
	    }
	
	    this.setState({ swiping: true });
	
	    if (cancelPageSwipe && this.props.preventDefaultTouchmoveEvent) {
	      e.preventDefault();
	    }
	  },
	
	  eventEnd: function eventEnd(e) {
	    if (this.state.swiping) {
	      var pos = this.calculatePos(e);
	
	      if (this.props.stopPropagation) e.stopPropagation();
	
	      var isFlick = pos.velocity > this.props.flickThreshold;
	
	      this.props.onSwiped && this.props.onSwiped(e, pos.deltaX, pos.deltaY, isFlick, pos.velocity);
	
	      if (pos.absX > pos.absY) {
	        if (pos.deltaX > 0) {
	          this.props.onSwipedLeft && this.props.onSwipedLeft(e, pos.deltaX, isFlick);
	        } else {
	          this.props.onSwipedRight && this.props.onSwipedRight(e, pos.deltaX, isFlick);
	        }
	      } else {
	        if (pos.deltaY > 0) {
	          this.props.onSwipedUp && this.props.onSwipedUp(e, pos.deltaY, isFlick);
	        } else {
	          this.props.onSwipedDown && this.props.onSwipedDown(e, pos.deltaY, isFlick);
	        }
	      }
	    }
	
	    this.setState(this.getInitialState());
	  },
	
	  render: function render() {
	    var newProps = _extends({}, this.props, {
	      onTouchStart: this.eventStart,
	      onTouchMove: this.eventMove,
	      onTouchEnd: this.eventEnd,
	      onMouseDown: this.props.trackMouse && this.eventStart,
	      onMouseMove: this.props.trackMouse && this.eventMove,
	      onMouseUp: this.props.trackMouse && this.eventEnd
	    });
	
	    delete newProps.onSwiped;
	    delete newProps.onSwiping;
	    delete newProps.onSwipingUp;
	    delete newProps.onSwipingRight;
	    delete newProps.onSwipingDown;
	    delete newProps.onSwipingLeft;
	    delete newProps.onSwipedUp;
	    delete newProps.onSwipedRight;
	    delete newProps.onSwipedDown;
	    delete newProps.onSwipedLeft;
	    delete newProps.flickThreshold;
	    delete newProps.delta;
	    delete newProps.preventDefaultTouchmoveEvent;
	    delete newProps.stopPropagation;
	    delete newProps.nodeName;
	    delete newProps.children;
	    delete newProps.trackMouse;
	
	    return React.createElement(this.props.nodeName, newProps, this.props.children);
	  }
	});
	
	module.exports = Swipeable;

/***/ },

/***/ 197:
/*!************************************************************!*\
  !*** ./~/react-image-gallery/styles/css/image-gallery.css ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../css-loader!./image-gallery.css */ 198);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../style-loader/addStyles.js */ 200)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./image-gallery.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./image-gallery.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 198:
/*!***************************************************************************!*\
  !*** ./~/css-loader!./~/react-image-gallery/styles/css/image-gallery.css ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../css-loader/lib/css-base.js */ 199)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/*!\n  Ionicons, v2.0.0\n  Created by Ben Sperry for the Ionic Framework, http://ionicons.com/\n  https://twitter.com/benjsperry  https://twitter.com/ionicframework\n  MIT License: https://github.com/driftyco/ionicons\n\n  Android-style icons originally built by Google’s\n  Material Design Icons: https://github.com/google/material-design-icons\n  used under CC BY http://creativecommons.org/licenses/by/4.0/\n  Modified icons to fit ionicon’s grid from original.\n*/\n@font-face {\n  font-family: \"Ionicons\";\n  src: url(\"//cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.eot?v=2.0.0\");\n  src: url(\"//cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.eot?v=2.0.0#iefix\") format(\"embedded-opentype\"), url(\"//cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.ttf?v=2.0.0\") format(\"truetype\"), url(\"//cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.woff?v=2.0.0\") format(\"woff\"), url(\"//cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.svg?v=2.0.0#Ionicons\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.image-gallery-fullscreen-button::before,\n.image-gallery-play-button::before,\n.image-gallery-left-nav::before,\n.image-gallery-right-nav::before {\n  display: inline-block;\n  font-family: \"Ionicons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  text-rendering: auto;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.image-gallery {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent; }\n  .image-gallery.fullscreen-modal {\n    background: #000;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: fixed;\n    right: 0;\n    top: 0;\n    width: 100%;\n    z-index: 5; }\n    .image-gallery.fullscreen-modal .image-gallery-content {\n      position: relative;\n      top: 50%;\n      transform: translateY(-50%); }\n\n.image-gallery-content {\n  top: 0; }\n  .image-gallery-content.fullscreen {\n    background: #000; }\n\n.image-gallery-slide-wrapper {\n  position: relative; }\n\n.image-gallery-fullscreen-button,\n.image-gallery-play-button,\n.image-gallery-left-nav,\n.image-gallery-right-nav {\n  cursor: pointer;\n  position: absolute;\n  z-index: 4; }\n  .image-gallery-fullscreen-button::before,\n  .image-gallery-play-button::before,\n  .image-gallery-left-nav::before,\n  .image-gallery-right-nav::before {\n    color: #fff;\n    line-height: .7;\n    text-shadow: 0 2px 2px #1a1a1a;\n    transition: color .2s ease-out; }\n  .image-gallery-fullscreen-button:hover::before,\n  .image-gallery-play-button:hover::before,\n  .image-gallery-left-nav:hover::before,\n  .image-gallery-right-nav:hover::before {\n    color: #337ab7; }\n    @media (max-width: 768px) {\n      .image-gallery-fullscreen-button:hover::before,\n      .image-gallery-play-button:hover::before,\n      .image-gallery-left-nav:hover::before,\n      .image-gallery-right-nav:hover::before {\n        color: #fff; } }\n\n.image-gallery-fullscreen-button,\n.image-gallery-play-button {\n  bottom: 0; }\n  .image-gallery-fullscreen-button::before,\n  .image-gallery-play-button::before {\n    font-size: 1.7em;\n    padding: 15px 20px;\n    text-shadow: 0 1px 1px #1a1a1a; }\n    @media (max-width: 768px) {\n      .image-gallery-fullscreen-button::before,\n      .image-gallery-play-button::before {\n        font-size: 1.4em; } }\n    @media (max-width: 480px) {\n      .image-gallery-fullscreen-button::before,\n      .image-gallery-play-button::before {\n        font-size: 1em; } }\n  .image-gallery-fullscreen-button:hover::before,\n  .image-gallery-play-button:hover::before {\n    color: #fff;\n    transform: scale(1.1); }\n    @media (max-width: 768px) {\n      .image-gallery-fullscreen-button:hover::before,\n      .image-gallery-play-button:hover::before {\n        transform: none; } }\n\n.image-gallery-fullscreen-button {\n  right: 0; }\n  .image-gallery-fullscreen-button::before {\n    content: \"\\F386\"; }\n  .image-gallery-fullscreen-button.active::before {\n    content: \"\\F37D\"; }\n  .image-gallery-fullscreen-button.active:hover::before {\n    transform: scale(0.9); }\n\n.image-gallery-play-button {\n  left: 0; }\n  .image-gallery-play-button::before {\n    content: \"\\F488\"; }\n  .image-gallery-play-button.active::before {\n    content: \"\\F478\"; }\n\n.image-gallery-left-nav,\n.image-gallery-right-nav {\n  appearance: none;\n  background-color: transparent;\n  border: 0;\n  color: #fff;\n  font-size: 5em;\n  outline: none;\n  padding: 50px 15px;\n  top: 50%;\n  transform: translateY(-50%); }\n  .image-gallery-left-nav[disabled],\n  .image-gallery-right-nav[disabled] {\n    cursor: disabled;\n    opacity: .6;\n    pointer-events: none; }\n  @media (max-width: 768px) {\n    .image-gallery-left-nav,\n    .image-gallery-right-nav {\n      font-size: 3.4em; } }\n  @media (max-width: 480px) {\n    .image-gallery-left-nav,\n    .image-gallery-right-nav {\n      font-size: 2.4em; } }\n\n.image-gallery-left-nav {\n  left: 0; }\n  .image-gallery-left-nav::before {\n    content: \"\\F3D2\"; }\n\n.image-gallery-right-nav {\n  right: 0; }\n  .image-gallery-right-nav::before {\n    content: \"\\F3D3\"; }\n\n.image-gallery-slides {\n  line-height: 0;\n  overflow: hidden;\n  position: relative;\n  white-space: nowrap; }\n\n.image-gallery-slide {\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%; }\n  .image-gallery-slide.center {\n    position: relative; }\n  .image-gallery-slide img {\n    width: 100%; }\n  .image-gallery-slide .image-gallery-description {\n    background: rgba(0, 0, 0, 0.4);\n    bottom: 70px;\n    color: #fff;\n    left: 0;\n    line-height: 1;\n    padding: 10px 20px;\n    position: absolute;\n    white-space: normal; }\n    @media (max-width: 768px) {\n      .image-gallery-slide .image-gallery-description {\n        bottom: 45px;\n        font-size: .8em;\n        padding: 8px 15px; } }\n\n.image-gallery-bullets {\n  bottom: 20px;\n  left: 0;\n  margin: 0 auto;\n  position: absolute;\n  right: 0;\n  width: 80%;\n  z-index: 4; }\n  .image-gallery-bullets .image-gallery-bullets-container {\n    margin: 0;\n    padding: 0;\n    text-align: center; }\n  .image-gallery-bullets .image-gallery-bullet {\n    appearance: none;\n    background-color: transparent;\n    border: 1px solid #fff;\n    border-radius: 50%;\n    box-shadow: 0 1px 0 #1a1a1a;\n    cursor: pointer;\n    display: inline-block;\n    margin: 0 5px;\n    outline: none;\n    padding: 5px; }\n    @media (max-width: 768px) {\n      .image-gallery-bullets .image-gallery-bullet {\n        margin: 0 3px;\n        padding: 3px; } }\n    @media (max-width: 480px) {\n      .image-gallery-bullets .image-gallery-bullet {\n        padding: 2.7px; } }\n    .image-gallery-bullets .image-gallery-bullet.active {\n      background: #fff; }\n\n.image-gallery-thumbnails {\n  overflow: hidden;\n  padding: 5px 0; }\n  .image-gallery-thumbnails .image-gallery-thumbnails-container {\n    cursor: pointer;\n    text-align: center;\n    transition: transform .45s ease-out;\n    white-space: nowrap; }\n\n.image-gallery-thumbnail {\n  display: inline-block;\n  padding-right: 5px; }\n  .image-gallery-thumbnail img {\n    border: 4px solid transparent;\n    transition: border .3s ease-out;\n    vertical-align: middle;\n    width: 100px; }\n    @media (max-width: 768px) {\n      .image-gallery-thumbnail img {\n        border: 3px solid transparent;\n        width: 75px; } }\n  .image-gallery-thumbnail.active img {\n    border: 4px solid #337ab7; }\n    @media (max-width: 768px) {\n      .image-gallery-thumbnail.active img {\n        border: 3px solid #337ab7; } }\n\n.image-gallery-thumbnail-label {\n  color: #1a1a1a;\n  font-size: 1em; }\n  @media (max-width: 768px) {\n    .image-gallery-thumbnail-label {\n      font-size: .8em; } }\n\n.image-gallery-index {\n  background: rgba(0, 0, 0, 0.4);\n  color: #fff;\n  line-height: 1;\n  padding: 10px 20px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 4; }\n  @media (max-width: 768px) {\n    .image-gallery-index {\n      font-size: .8em;\n      padding: 5px 10px; } }\n", ""]);
	
	// exports


/***/ },

/***/ 199:
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 200:
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }

});
//# sourceMappingURL=photo.js.map