webpackJsonp([18],{

/***/ 0:
/*!********************************************!*\
  !*** ./javascript/SubleasePhoto/index.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 32);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Photo = __webpack_require__(/*! ./Photo.jsx */ 603);
	
	var _Photo2 = _interopRequireDefault(_Photo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_Photo2.default, null), document.getElementById('subleasephoto'));

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

/***/ 204:
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
	
	var _reactSwipeable = __webpack_require__(/*! react-swipeable */ 205);
	
	var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);
	
	var _lodash = __webpack_require__(/*! lodash.throttle */ 206);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var screenChangeEvents = ['fullscreenchange', 'msfullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange'];
	
	var ImageGallery = function (_React$Component) {
	  _inherits(ImageGallery, _React$Component);
	
	  function ImageGallery(props) {
	    _classCallCheck(this, ImageGallery);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageGallery).call(this, props));
	
	    _this.state = {
	      currentIndex: props.startIndex,
	      thumbsTranslate: 0,
	      offsetPercentage: 0,
	      galleryWidth: 0,
	      thumbnailsWrapperWidth: 0,
	      thumbnailsWrapperHeight: 0,
	      isFullscreen: false,
	      isPlaying: false
	    };
	
	    if (props.lazyLoad) {
	      _this._lazyLoaded = [];
	    }
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
	
	      if (nextProps.lazyLoad && (!this.props.lazyLoad || this.props.items !== nextProps.items)) {
	        this._lazyLoaded = [];
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (prevProps.thumbnailPosition !== this.props.thumbnailPosition || prevProps.showThumbnails !== this.props.showThumbnails || prevState.thumbnailsWrapperHeight !== this.state.thumbnailsWrapperHeight || prevState.thumbnailsWrapperWidth !== this.state.thumbnailsWrapperWidth) {
	        this._handleResize();
	      }
	
	      if (prevState.currentIndex !== this.state.currentIndex) {
	        if (this.props.onSlide) {
	          this.props.onSlide(this.state.currentIndex);
	        }
	
	        this._updateThumbnailTranslate(prevState);
	      }
	
	      if (prevProps.slideDuration !== this.props.slideDuration) {
	        this.slideToIndex = (0, _lodash2.default)(this._unthrottledSlideToIndex, this.props.slideDuration, { trailing: false });
	      }
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      // Used to update the throttle if slideDuration changes
	      this._unthrottledSlideToIndex = this.slideToIndex.bind(this);
	      this.slideToIndex = (0, _lodash2.default)(this._unthrottledSlideToIndex, this.props.slideDuration, { trailing: false });
	
	      this._handleResize = this._handleResize.bind(this);
	      this._handleScreenChange = this._handleScreenChange.bind(this);
	      this._handleKeyDown = this._handleKeyDown.bind(this);
	      this._thumbnailDelay = 300;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._handleResize();
	
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
	
	      if (this._resizeTimer) {
	        window.clearTimeout(this._resizeTimer);
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      var _this2 = this;
	
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      if (!this._intervalId) {
	        var _props = this.props;
	        var slideInterval = _props.slideInterval;
	        var slideDuration = _props.slideDuration;
	
	        this.setState({ isPlaying: true });
	        this._intervalId = window.setInterval(function () {
	          if (!_this2.state.hovering) {
	            if (!_this2.props.infinite && !_this2._canSlideRight()) {
	              _this2.pause();
	            } else {
	              _this2.slideToIndex(_this2.state.currentIndex + 1);
	            }
	          }
	        }, Math.max(slideInterval, slideDuration));
	
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
	    key: 'setModalFullscreen',
	    value: function setModalFullscreen(state) {
	      this.setState({ modalFullscreen: state });
	      // manually call because browser does not support screenchange events
	      if (this.props.onScreenChange) {
	        this.props.onScreenChange(state);
	      }
	    }
	  }, {
	    key: 'fullScreen',
	    value: function fullScreen() {
	      var gallery = this._imageGallery;
	
	      if (this.props.useBrowserFullscreen) {
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
	          this.setModalFullscreen(true);
	        }
	      } else {
	        this.setModalFullscreen(true);
	      }
	
	      this.setState({ isFullscreen: true });
	    }
	  }, {
	    key: 'exitFullScreen',
	    value: function exitFullScreen() {
	      if (this.state.isFullscreen) {
	        if (this.props.useBrowserFullscreen) {
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
	            this.setModalFullscreen(false);
	          }
	        } else {
	          this.setModalFullscreen(false);
	        }
	
	        this.setState({ isFullscreen: false });
	      }
	    }
	  }, {
	    key: 'slideToIndex',
	    value: function slideToIndex(index, event) {
	      var currentIndex = this.state.currentIndex;
	
	
	      if (event) {
	        if (this._intervalId) {
	          // user triggered event while ImageGallery is playing, reset interval
	          this.pause(false);
	          this.play(false);
	        }
	      }
	
	      var slideCount = this.props.items.length - 1;
	      var nextIndex = index;
	
	      if (index < 0) {
	        nextIndex = slideCount;
	      } else if (index > slideCount) {
	        nextIndex = 0;
	      }
	
	      this.setState({
	        previousIndex: currentIndex,
	        currentIndex: nextIndex,
	        offsetPercentage: 0,
	        style: {
	          transition: 'transform ' + this.props.slideDuration + 'ms ease-out'
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
	      var _this3 = this;
	
	      screenChangeEvents.map(function (eventName) {
	        document.addEventListener(eventName, _this3._handleScreenChange);
	      });
	    }
	  }, {
	    key: '_offScreenChangeEvent',
	    value: function _offScreenChangeEvent() {
	      var _this4 = this;
	
	      screenChangeEvents.map(function (eventName) {
	        document.removeEventListener(eventName, _this4._handleScreenChange);
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
	      var _this5 = this;
	
	      // delay initial resize to get the accurate this._imageGallery height/width
	      this._resizeTimer = window.setTimeout(function () {
	        if (_this5._imageGallery) {
	          _this5.setState({
	            galleryWidth: _this5._imageGallery.offsetWidth
	          });
	        }
	
	        // adjust thumbnail container when thumbnail width or height is adjusted
	        _this5._setThumbsTranslate(-_this5._getThumbsTranslate(_this5.state.currentIndex > 0 ? 1 : 0) * _this5.state.currentIndex);
	
	        if (_this5._imageGallerySlideWrapper) {
	          _this5.setState({
	            gallerySlideWrapperHeight: _this5._imageGallerySlideWrapper.offsetHeight
	          });
	        }
	
	        if (_this5._thumbnailsWrapper) {
	          if (_this5._isThumbnailHorizontal()) {
	            _this5.setState({ thumbnailsWrapperHeight: _this5._thumbnailsWrapper.offsetHeight });
	          } else {
	            _this5.setState({ thumbnailsWrapperWidth: _this5._thumbnailsWrapper.offsetWidth });
	          }
	        }
	      }, 500);
	    }
	  }, {
	    key: '_isThumbnailHorizontal',
	    value: function _isThumbnailHorizontal() {
	      var thumbnailPosition = this.props.thumbnailPosition;
	
	      return thumbnailPosition === 'left' || thumbnailPosition === 'right';
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
	
	      this._unthrottledSlideToIndex(slideTo);
	    }
	  }, {
	    key: '_handleSwiping',
	    value: function _handleSwiping(index, _, delta) {
	      var offsetPercentage = index * (delta / this.state.galleryWidth * 100);
	      if (Math.abs(offsetPercentage) >= 100) {
	        offsetPercentage = index * 100;
	      }
	      this.setState({
	        offsetPercentage: offsetPercentage,
	        style: {}
	      });
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
	    key: '_updateThumbnailTranslate',
	    value: function _updateThumbnailTranslate(prevState) {
	      if (this.state.currentIndex === 0) {
	        this._setThumbsTranslate(0);
	      } else {
	        var indexDifference = Math.abs(prevState.currentIndex - this.state.currentIndex);
	        var scroll = this._getThumbsTranslate(indexDifference);
	        if (scroll > 0) {
	          if (prevState.currentIndex < this.state.currentIndex) {
	            this._setThumbsTranslate(this.state.thumbsTranslate - scroll);
	          } else if (prevState.currentIndex > this.state.currentIndex) {
	            this._setThumbsTranslate(this.state.thumbsTranslate + scroll);
	          }
	        }
	      }
	    }
	  }, {
	    key: '_setThumbsTranslate',
	    value: function _setThumbsTranslate(thumbsTranslate) {
	      this.setState({ thumbsTranslate: thumbsTranslate });
	    }
	  }, {
	    key: '_getThumbsTranslate',
	    value: function _getThumbsTranslate(indexDifference) {
	      if (this.props.disableThumbnailScroll) {
	        return 0;
	      }
	
	      var _state = this.state;
	      var thumbnailsWrapperWidth = _state.thumbnailsWrapperWidth;
	      var thumbnailsWrapperHeight = _state.thumbnailsWrapperHeight;
	
	      var totalScroll = void 0;
	
	      if (this._thumbnails) {
	
	        // total scroll required to see the last thumbnail
	        if (this._isThumbnailHorizontal()) {
	          if (this._thumbnails.scrollHeight <= thumbnailsWrapperHeight) {
	            return 0;
	          }
	          totalScroll = this._thumbnails.scrollHeight - thumbnailsWrapperHeight;
	        } else {
	          if (this._thumbnails.scrollWidth <= thumbnailsWrapperWidth) {
	            return 0;
	          }
	          totalScroll = this._thumbnails.scrollWidth - thumbnailsWrapperWidth;
	        }
	
	        var totalThumbnails = this._thumbnails.children.length;
	        // scroll-x required per index change
	        var perIndexScroll = totalScroll / (totalThumbnails - 1);
	
	        return indexDifference * perIndexScroll;
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
	      var _state2 = this.state;
	      var currentIndex = _state2.currentIndex;
	      var offsetPercentage = _state2.offsetPercentage;
	      var previousIndex = _state2.previousIndex;
	
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
	    key: '_getThumbnailBarHeight',
	    value: function _getThumbnailBarHeight() {
	      if (this._isThumbnailHorizontal()) {
	        return {
	          height: this.state.gallerySlideWrapperHeight
	        };
	      }
	      return {};
	    }
	  }, {
	    key: '_getSlideStyle',
	    value: function _getSlideStyle(index) {
	      var _state3 = this.state;
	      var currentIndex = _state3.currentIndex;
	      var offsetPercentage = _state3.offsetPercentage;
	      var _props2 = this.props;
	      var infinite = _props2.infinite;
	      var items = _props2.items;
	
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
	      } else if (index === 0 || index === totalSlides) {
	        zIndex = 0;
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
	      var translate3d = void 0;
	
	      if (this._isThumbnailHorizontal()) {
	        translate3d = 'translate3d(0, ' + this.state.thumbsTranslate + 'px, 0)';
	      } else {
	        translate3d = 'translate3d(' + this.state.thumbsTranslate + 'px, 0, 0)';
	      }
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
	
	      var _state4 = this.state;
	      var currentIndex = _state4.currentIndex;
	      var isFullscreen = _state4.isFullscreen;
	      var modalFullscreen = _state4.modalFullscreen;
	      var isPlaying = _state4.isPlaying;
	
	
	      var thumbnailStyle = this._getThumbnailStyle();
	      var thumbnailPosition = this.props.thumbnailPosition;
	
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
	
	        var showItem = !_this7.props.lazyLoad || alignment || _this7._lazyLoaded[index];
	        if (showItem && _this7.props.lazyLoad) {
	          _this7._lazyLoaded[index] = true;
	        }
	
	        var slide = _react2.default.createElement(
	          'div',
	          {
	            key: index,
	            className: 'image-gallery-slide' + alignment + originalClass,
	            style: _extends(_this7._getSlideStyle(index), _this7.state.style),
	            onClick: _this7.props.onClick
	          },
	          showItem ? renderItem(item) : _react2.default.createElement('div', { style: { height: '100%' } })
	        );
	
	        slides.push(slide);
	
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
	              role: 'button',
	              'aria-pressed': currentIndex === index ? 'true' : 'false',
	              'aria-label': 'Go to Slide ' + (index + 1),
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
	            type: 'button',
	            className: 'image-gallery-bullet ' + (currentIndex === index ? 'active' : ''),
	
	            onClick: function onClick(event) {
	              return _this7.slideToIndex.call(_this7, index, event);
	            },
	            'aria-pressed': currentIndex === index ? 'true' : 'false',
	            'aria-label': 'Go to Slide ' + (index + 1)
	          }));
	        }
	      });
	
	      var slideWrapper = _react2.default.createElement(
	        'div',
	        {
	          ref: function ref(i) {
	            return _this7._imageGallerySlideWrapper = i;
	          },
	          className: 'image-gallery-slide-wrapper ' + thumbnailPosition
	        },
	        this.props.renderCustomControls && this.props.renderCustomControls(),
	        this.props.showFullscreenButton && this.props.renderFullscreenButton(this._toggleFullScreen.bind(this), isFullscreen),
	        this.props.showPlayButton && this.props.renderPlayPauseButton(this._togglePlay.bind(this), isPlaying),
	        this._canNavigate() ? [this.props.showNav && _react2.default.createElement(
	          'span',
	          { key: 'navigation' },
	          this.props.renderLeftNav(slideLeft, !this._canSlideLeft()),
	          this.props.renderRightNav(slideRight, !this._canSlideRight())
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
	            {
	              className: 'image-gallery-bullets-container',
	              role: 'navigation',
	              'aria-label': 'Bullet Navigation'
	            },
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
	      );
	
	      return _react2.default.createElement(
	        'section',
	        {
	          ref: function ref(i) {
	            return _this7._imageGallery = i;
	          },
	          className: 'image-gallery' + (modalFullscreen ? ' fullscreen-modal' : ''),
	          'aria-live': 'polite'
	        },
	        _react2.default.createElement(
	          'div',
	          {
	            className: 'image-gallery-content' + (isFullscreen ? ' fullscreen' : '')
	          },
	          (thumbnailPosition === 'bottom' || thumbnailPosition === 'right') && slideWrapper,
	          this.props.showThumbnails && _react2.default.createElement(
	            'div',
	            {
	              className: 'image-gallery-thumbnails-wrapper ' + thumbnailPosition,
	              style: this._getThumbnailBarHeight()
	            },
	            _react2.default.createElement(
	              'div',
	              {
	                className: 'image-gallery-thumbnails',
	                ref: function ref(i) {
	                  return _this7._thumbnailsWrapper = i;
	                }
	              },
	              _react2.default.createElement(
	                'div',
	                {
	                  ref: function ref(t) {
	                    return _this7._thumbnails = t;
	                  },
	                  className: 'image-gallery-thumbnails-container',
	                  style: thumbnailStyle,
	                  role: 'navigation',
	                  'aria-label': 'Thumbnail Navigation'
	                },
	                thumbnails
	              )
	            )
	          ),
	          (thumbnailPosition === 'top' || thumbnailPosition === 'left') && slideWrapper
	        )
	      );
	    }
	  }]);
	
	  return ImageGallery;
	}(_react2.default.Component);
	
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
	  useBrowserFullscreen: _react2.default.PropTypes.bool,
	  defaultImage: _react2.default.PropTypes.string,
	  indexSeparator: _react2.default.PropTypes.string,
	  thumbnailPosition: _react2.default.PropTypes.string,
	  startIndex: _react2.default.PropTypes.number,
	  slideDuration: _react2.default.PropTypes.number,
	  slideInterval: _react2.default.PropTypes.number,
	  onSlide: _react2.default.PropTypes.func,
	  onScreenChange: _react2.default.PropTypes.func,
	  onPause: _react2.default.PropTypes.func,
	  onPlay: _react2.default.PropTypes.func,
	  onClick: _react2.default.PropTypes.func,
	  onImageLoad: _react2.default.PropTypes.func,
	  onImageError: _react2.default.PropTypes.func,
	  onThumbnailError: _react2.default.PropTypes.func,
	  renderCustomControls: _react2.default.PropTypes.func,
	  renderLeftNav: _react2.default.PropTypes.func,
	  renderRightNav: _react2.default.PropTypes.func,
	  renderPlayPauseButton: _react2.default.PropTypes.func,
	  renderFullscreenButton: _react2.default.PropTypes.func,
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
	  useBrowserFullscreen: true,
	  indexSeparator: ' / ',
	  thumbnailPosition: 'bottom',
	  startIndex: 0,
	  slideDuration: 450,
	  slideInterval: 3000,
	  renderLeftNav: function renderLeftNav(onClick, disabled) {
	    return _react2.default.createElement('button', {
	      type: 'button',
	      className: 'image-gallery-left-nav',
	      disabled: disabled,
	      onClick: onClick,
	      'aria-label': 'Previous Slide'
	    });
	  },
	  renderRightNav: function renderRightNav(onClick, disabled) {
	    return _react2.default.createElement('button', {
	      type: 'button',
	      className: 'image-gallery-right-nav',
	      disabled: disabled,
	      onClick: onClick,
	      'aria-label': 'Next Slide'
	    });
	  },
	  renderPlayPauseButton: function renderPlayPauseButton(onClick, isPlaying) {
	    return _react2.default.createElement('button', {
	      type: 'button',
	      className: 'image-gallery-play-button' + (isPlaying ? ' active' : ''),
	      onClick: onClick,
	      'aria-label': 'Play or Pause Slideshow'
	    });
	  },
	  renderFullscreenButton: function renderFullscreenButton(onClick, isFullscreen) {
	    return _react2.default.createElement('button', {
	      type: 'button',
	      className: 'image-gallery-fullscreen-button' + (isFullscreen ? ' active' : ''),
	      onClick: onClick,
	      'aria-label': 'Open Fullscreen'
	    });
	  }
	};
	exports.default = ImageGallery;

/***/ },

/***/ 205:
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

/***/ 206:
/*!************************************!*\
  !*** ./~/lodash.throttle/index.js ***!
  \************************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = throttle;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 207:
/*!************************************************************!*\
  !*** ./~/react-image-gallery/styles/css/image-gallery.css ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !../../../css-loader!./image-gallery.css */ 208);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ../../../style-loader/addStyles.js */ 210)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../css-loader/index.js!./image-gallery.css", function() {
				var newContent = require("!!../../../css-loader/index.js!./image-gallery.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 208:
/*!***************************************************************************!*\
  !*** ./~/css-loader!./~/react-image-gallery/styles/css/image-gallery.css ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../css-loader/lib/css-base.js */ 209)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/*!\n  Ionicons, v2.0.0\n  Created by Ben Sperry for the Ionic Framework, http://ionicons.com/\n  https://twitter.com/benjsperry  https://twitter.com/ionicframework\n  MIT License: https://github.com/driftyco/ionicons\n\n  Android-style icons originally built by Google’s\n  Material Design Icons: https://github.com/google/material-design-icons\n  used under CC BY http://creativecommons.org/licenses/by/4.0/\n  Modified icons to fit ionicon’s grid from original.\n*/\n@font-face {\n  font-family: \"Ionicons\";\n  src: url(\"https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.eot?v=2.0.0\");\n  src: url(\"https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.eot?v=2.0.0#iefix\") format(\"embedded-opentype\"), url(\"https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.ttf?v=2.0.0\") format(\"truetype\"), url(\"https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.woff?v=2.0.0\") format(\"woff\"), url(\"https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts/ionicons.svg?v=2.0.0#Ionicons\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.image-gallery-fullscreen-button::before,\n.image-gallery-play-button::before,\n.image-gallery-left-nav::before,\n.image-gallery-right-nav::before {\n  display: inline-block;\n  font-family: \"Ionicons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  text-rendering: auto;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.image-gallery {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent; }\n  .image-gallery.fullscreen-modal {\n    background: #000;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: fixed;\n    right: 0;\n    top: 0;\n    width: 100%;\n    z-index: 5; }\n    .image-gallery.fullscreen-modal .image-gallery-content {\n      top: 50%;\n      transform: translateY(-50%); }\n\n.image-gallery-content {\n  position: relative;\n  line-height: 0;\n  top: 0; }\n  .image-gallery-content.fullscreen {\n    background: #000; }\n    .image-gallery-content.fullscreen .image-gallery-slide {\n      background: #000; }\n\n.image-gallery-slide-wrapper {\n  position: relative; }\n  .image-gallery-slide-wrapper.left, .image-gallery-slide-wrapper.right {\n    display: inline-block;\n    width: calc(100% - 113px); }\n    @media (max-width: 768px) {\n      .image-gallery-slide-wrapper.left, .image-gallery-slide-wrapper.right {\n        width: calc(100% - 84px); } }\n\n.image-gallery-fullscreen-button,\n.image-gallery-play-button,\n.image-gallery-left-nav,\n.image-gallery-right-nav {\n  appearance: none;\n  background-color: transparent;\n  border: 0;\n  cursor: pointer;\n  outline: none;\n  position: absolute;\n  z-index: 4; }\n  .image-gallery-fullscreen-button::before,\n  .image-gallery-play-button::before,\n  .image-gallery-left-nav::before,\n  .image-gallery-right-nav::before {\n    color: #fff;\n    line-height: .7;\n    text-shadow: 0 2px 2px #1a1a1a;\n    transition: color .2s ease-out; }\n  .image-gallery-fullscreen-button:hover::before,\n  .image-gallery-play-button:hover::before,\n  .image-gallery-left-nav:hover::before,\n  .image-gallery-right-nav:hover::before {\n    color: #337ab7; }\n    @media (max-width: 768px) {\n      .image-gallery-fullscreen-button:hover::before,\n      .image-gallery-play-button:hover::before,\n      .image-gallery-left-nav:hover::before,\n      .image-gallery-right-nav:hover::before {\n        color: #fff; } }\n\n.image-gallery-fullscreen-button,\n.image-gallery-play-button {\n  bottom: 0; }\n  .image-gallery-fullscreen-button::before,\n  .image-gallery-play-button::before {\n    font-size: 2.7em;\n    padding: 15px 20px;\n    text-shadow: 0 1px 1px #1a1a1a; }\n    @media (max-width: 768px) {\n      .image-gallery-fullscreen-button::before,\n      .image-gallery-play-button::before {\n        font-size: 2.4em; } }\n    @media (max-width: 480px) {\n      .image-gallery-fullscreen-button::before,\n      .image-gallery-play-button::before {\n        font-size: 2em; } }\n  .image-gallery-fullscreen-button:hover::before,\n  .image-gallery-play-button:hover::before {\n    color: #fff;\n    transform: scale(1.1); }\n    @media (max-width: 768px) {\n      .image-gallery-fullscreen-button:hover::before,\n      .image-gallery-play-button:hover::before {\n        transform: none; } }\n\n.image-gallery-fullscreen-button {\n  right: 0; }\n  .image-gallery-fullscreen-button::before {\n    content: \"\\F386\"; }\n  .image-gallery-fullscreen-button.active::before {\n    content: \"\\F37D\"; }\n  .image-gallery-fullscreen-button.active:hover::before {\n    transform: scale(0.9); }\n\n.image-gallery-play-button {\n  left: 0; }\n  .image-gallery-play-button::before {\n    content: \"\\F488\"; }\n  .image-gallery-play-button.active::before {\n    content: \"\\F478\"; }\n\n.image-gallery-left-nav,\n.image-gallery-right-nav {\n  color: #fff;\n  font-size: 5em;\n  padding: 50px 15px;\n  top: 50%;\n  transform: translateY(-50%); }\n  .image-gallery-left-nav[disabled],\n  .image-gallery-right-nav[disabled] {\n    cursor: disabled;\n    opacity: .6;\n    pointer-events: none; }\n  @media (max-width: 768px) {\n    .image-gallery-left-nav,\n    .image-gallery-right-nav {\n      font-size: 3.4em; } }\n  @media (max-width: 480px) {\n    .image-gallery-left-nav,\n    .image-gallery-right-nav {\n      font-size: 2.4em; } }\n\n.image-gallery-left-nav {\n  left: 0; }\n  .image-gallery-left-nav::before {\n    content: \"\\F3D2\"; }\n\n.image-gallery-right-nav {\n  right: 0; }\n  .image-gallery-right-nav::before {\n    content: \"\\F3D3\"; }\n\n.image-gallery-slides {\n  line-height: 0;\n  overflow: hidden;\n  position: relative;\n  white-space: nowrap; }\n\n.image-gallery-slide {\n  background: #fff;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%; }\n  .image-gallery-slide.center {\n    position: relative; }\n  .image-gallery-slide img {\n    width: 100%; }\n  .image-gallery-slide .image-gallery-description {\n    background: rgba(0, 0, 0, 0.4);\n    bottom: 70px;\n    color: #fff;\n    left: 0;\n    line-height: 1;\n    padding: 10px 20px;\n    position: absolute;\n    white-space: normal; }\n    @media (max-width: 768px) {\n      .image-gallery-slide .image-gallery-description {\n        bottom: 45px;\n        font-size: .8em;\n        padding: 8px 15px; } }\n\n.image-gallery-bullets {\n  bottom: 20px;\n  left: 0;\n  margin: 0 auto;\n  position: absolute;\n  right: 0;\n  width: 80%;\n  z-index: 4; }\n  .image-gallery-bullets .image-gallery-bullets-container {\n    margin: 0;\n    padding: 0;\n    text-align: center; }\n  .image-gallery-bullets .image-gallery-bullet {\n    appearance: none;\n    background-color: transparent;\n    border: 1px solid #fff;\n    border-radius: 50%;\n    box-shadow: 0 1px 0 #1a1a1a;\n    cursor: pointer;\n    display: inline-block;\n    margin: 0 5px;\n    outline: none;\n    padding: 5px; }\n    @media (max-width: 768px) {\n      .image-gallery-bullets .image-gallery-bullet {\n        margin: 0 3px;\n        padding: 3px; } }\n    @media (max-width: 480px) {\n      .image-gallery-bullets .image-gallery-bullet {\n        padding: 2.7px; } }\n    .image-gallery-bullets .image-gallery-bullet.active {\n      background: #fff; }\n\n.image-gallery-thumbnails-wrapper {\n  position: relative; }\n  .image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right {\n    display: inline-block;\n    vertical-align: top;\n    width: 108px; }\n    @media (max-width: 768px) {\n      .image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right {\n        width: 81px; } }\n    .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails {\n      height: 100%;\n      width: 100%;\n      left: 0;\n      padding: 0;\n      position: absolute;\n      top: 0; }\n      .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail {\n        display: block;\n        margin-right: 0;\n        padding: 0; }\n  .image-gallery-thumbnails-wrapper.left {\n    margin-right: 5px; }\n    @media (max-width: 768px) {\n      .image-gallery-thumbnails-wrapper.left {\n        margin-right: 3px; } }\n  .image-gallery-thumbnails-wrapper.right {\n    margin-left: 5px; }\n    @media (max-width: 768px) {\n      .image-gallery-thumbnails-wrapper.right {\n        margin-left: 3px; } }\n\n.image-gallery-thumbnails {\n  overflow: hidden;\n  padding: 5px 0; }\n  @media (max-width: 768px) {\n    .image-gallery-thumbnails {\n      padding: 3px 0; } }\n  .image-gallery-thumbnails .image-gallery-thumbnails-container {\n    cursor: pointer;\n    text-align: center;\n    transition: transform .45s ease-out;\n    white-space: nowrap; }\n\n.image-gallery-thumbnail {\n  display: inline-block;\n  margin-right: 5px;\n  border: 4px solid transparent;\n  transition: border .3s ease-out;\n  width: 100px; }\n  @media (max-width: 768px) {\n    .image-gallery-thumbnail {\n      border: 3px solid transparent;\n      width: 75px; } }\n  .image-gallery-thumbnail img {\n    vertical-align: middle;\n    width: 100%; }\n  .image-gallery-thumbnail.active {\n    border: 4px solid #337ab7; }\n    @media (max-width: 768px) {\n      .image-gallery-thumbnail.active {\n        border: 3px solid #337ab7; } }\n\n.image-gallery-thumbnail-label {\n  color: #1a1a1a;\n  font-size: 1em; }\n  @media (max-width: 768px) {\n    .image-gallery-thumbnail-label {\n      font-size: .8em; } }\n\n.image-gallery-index {\n  background: rgba(0, 0, 0, 0.4);\n  color: #fff;\n  line-height: 1;\n  padding: 10px 20px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 4; }\n  @media (max-width: 768px) {\n    .image-gallery-index {\n      font-size: .8em;\n      padding: 5px 10px; } }\n", ""]);
	
	// exports


/***/ },

/***/ 209:
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

/***/ 210:
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
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
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


/***/ },

/***/ 603:
/*!********************************************!*\
  !*** ./javascript/SubleasePhoto/Photo.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactImageGallery = __webpack_require__(/*! react-image-gallery */ 204);
	
	var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);
	
	var _Waiting = __webpack_require__(/*! ../Mixin/Html/Waiting.jsx */ 188);
	
	var _Waiting2 = _interopRequireDefault(_Waiting);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(/*! react-image-gallery/styles/css/image-gallery.css */ 207);
	
	/* global $, require, subleaseId, loadPhotos, currentPhotos */
	
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
	      $.getJSON('./properties/SubleasePhoto/list', { subleaseId: subleaseId }).done(function (data) {
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

/***/ }

});
//# sourceMappingURL=subleasephoto.js.map