import { resolveDirective as D, openBlock as u, createBlock as E, Transition as p, withCtx as b, createElementBlock as d, normalizeClass as x, normalizeStyle as w, createElementVNode as a, Fragment as T, renderList as z, createCommentVNode as c, withDirectives as f, renderSlot as S, vShow as M, createTextVNode as P, toDisplayString as R, createVNode as I, vModelText as U } from "vue";
const H = ["media", "srcset", "sizes", "src"], j = {
  created: (e) => {
    function t() {
      const o = W(e, "img"), i = W(e, "picture");
      if (o)
        O(o), V(o);
      else if (i) {
        const m = W(i, "img"), g = Array.from(i.children).filter(
          (l) => l.nodeName === "SOURCE"
        );
        m && (O(m), g.length && g.forEach((l) => {
          V(l);
        }), V(m));
      }
    }
    function s(o, i) {
      o.forEach((m) => {
        m.isIntersecting && (t(), i.unobserve(e));
      });
    }
    function n() {
      const o = {
        root: null,
        threshold: "0"
      };
      new IntersectionObserver(s, o).observe(e);
    }
    window.IntersectionObserver ? n() : t();
  }
};
function V(e) {
  H.forEach((t) => {
    const s = e.dataset[t];
    s && (e[t] = s, e.removeAttribute(`data-${t}`));
  });
}
function O(e) {
  e.addEventListener("load", () => {
    setTimeout(() => e.classList.add("loaded"), 100);
  }), e.addEventListener("error", () => console.log("error"));
}
function W(e, t) {
  return Array.from(e.children).find(
    (s) => s.nodeName === t.toUpperCase()
  );
}
const q = {
  created: (e) => {
    function t(i) {
      const m = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      return !!(i.match(m) ? RegExp.$1 : !1);
    }
    function s() {
      const i = e.tagName;
      if (e.dataset.autoplay) {
        if (i === "VIDEO") {
          e.muted = !0, e.autoplay = !0;
          return;
        }
        if (i === "IFRAME") {
          var g = new URL(e.src);
          let l = "muted";
          t(e.src) && (l = "mute"), g.searchParams.append(l, 1), g.searchParams.append("autoplay", 1), e.src = g.href;
        }
      }
    }
    function n(i, m) {
      i.forEach((g) => {
        g.isIntersecting && (s(), m.unobserve(e));
      });
    }
    function o() {
      const i = {
        root: null,
        threshold: "0"
      };
      new IntersectionObserver(n, i).observe(e);
    }
    window.IntersectionObserver ? o() : loadImage();
  }
};
function G(e) {
  if (Array.isArray(e)) {
    for (var t = 0, s = Array(e.length); t < e.length; t++)
      s[t] = e[t];
    return s;
  } else
    return Array.from(e);
}
var F = !1;
if (typeof window < "u") {
  var N = {
    get passive() {
      F = !0;
    }
  };
  window.addEventListener("testPassive", null, N), window.removeEventListener("testPassive", null, N);
}
var B = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), y = [], C = !1, X = -1, _ = void 0, v = void 0, k = void 0, Y = function(t) {
  return y.some(function(s) {
    return !!(s.options.allowTouchMove && s.options.allowTouchMove(t));
  });
}, L = function(t) {
  var s = t || window.event;
  return Y(s.target) || s.touches.length > 1 ? !0 : (s.preventDefault && s.preventDefault(), !1);
}, J = function(t) {
  if (k === void 0) {
    var s = !!t && t.reserveScrollBarGap === !0, n = window.innerWidth - document.documentElement.clientWidth;
    if (s && n > 0) {
      var o = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
      k = document.body.style.paddingRight, document.body.style.paddingRight = o + n + "px";
    }
  }
  _ === void 0 && (_ = document.body.style.overflow, document.body.style.overflow = "hidden");
}, K = function() {
  k !== void 0 && (document.body.style.paddingRight = k, k = void 0), _ !== void 0 && (document.body.style.overflow = _, _ = void 0);
}, Q = function() {
  return window.requestAnimationFrame(function() {
    if (v === void 0) {
      v = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left
      };
      var t = window, s = t.scrollY, n = t.scrollX, o = t.innerHeight;
      document.body.style.position = "fixed", document.body.style.top = -s, document.body.style.left = -n, setTimeout(function() {
        return window.requestAnimationFrame(function() {
          var i = o - window.innerHeight;
          i && s >= o && (document.body.style.top = -(s + i));
        });
      }, 300);
    }
  });
}, $ = function() {
  if (v !== void 0) {
    var t = -parseInt(document.body.style.top, 10), s = -parseInt(document.body.style.left, 10);
    document.body.style.position = v.position, document.body.style.top = v.top, document.body.style.left = v.left, window.scrollTo(s, t), v = void 0;
  }
}, ee = function(t) {
  return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1;
}, te = function(t, s) {
  var n = t.targetTouches[0].clientY - X;
  return Y(t.target) ? !1 : s && s.scrollTop === 0 && n > 0 || ee(s) && n < 0 ? L(t) : (t.stopPropagation(), !0);
}, ie = function(t, s) {
  if (!t) {
    console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
    return;
  }
  if (!y.some(function(o) {
    return o.targetElement === t;
  })) {
    var n = {
      targetElement: t,
      options: s || {}
    };
    y = [].concat(G(y), [n]), B ? Q() : J(s), B && (t.ontouchstart = function(o) {
      o.targetTouches.length === 1 && (X = o.targetTouches[0].clientY);
    }, t.ontouchmove = function(o) {
      o.targetTouches.length === 1 && te(o, t);
    }, C || (document.addEventListener("touchmove", L, F ? { passive: !1 } : void 0), C = !0));
  }
}, A = function(t) {
  if (!t) {
    console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
    return;
  }
  y = y.filter(function(s) {
    return s.targetElement !== t;
  }), B && (t.ontouchstart = null, t.ontouchmove = null, C && y.length === 0 && (document.removeEventListener("touchmove", L, F ? { passive: !1 } : void 0), C = !1)), B ? $() : K();
};
const se = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, oe = {
  directives: {
    lazyload: j,
    autoplayObserver: q
  },
  data() {
    return {
      initialMouseX: 0,
      initialMouseY: 0,
      endMouseX: 0,
      endMouseY: 0,
      swipeType: null,
      IsSwipping: !1,
      isDraggingSwipe: !1,
      prevTime: 0,
      xSwipeWrapper: 0,
      ySwipeWrapper: 0,
      swipeAnimation: null,
      swipeInterval: null,
      lightboxInnerWidth: null,
      imgIndex: this.index,
      isVisible: !1,
      paddingBottom: !1,
      imageLoading: !1,
      showThumbs: !1,
      isFullScreenMode: !1,
      aspectRatioVideo: {
        width: "auto",
        height: "auto"
      },
      buttonsVisible: !0,
      scale: 1,
      top: 0,
      left: 0,
      lastX: 0,
      lastY: 0,
      isDraging: !1,
      canZoom: !0,
      isZooming: !1,
      transition: "all .3s ease",
      zoomBar: 0,
      isPlayingSlideShow: !1,
      intervalProgress: null,
      loopData: !1,
      stylesInterval: {
        display: "block"
      }
    };
  },
  props: {
    index: {
      required: !0
    },
    effect: {
      type: String,
      default: "swipe"
    },
    items: {
      type: Array,
      required: !0
    },
    loop: {
      type: Boolean,
      default: !0
    },
    slideshow: {
      type: Boolean,
      default: !0
    },
    slideshowColorBar: {
      type: String,
      default: "#fa4242"
    },
    slideshowDuration: {
      type: Number,
      default: 3e3
    },
    useZoomBar: {
      type: Boolean,
      default: !1
    },
    closeOnClickOutsideMobile: {
      type: Boolean,
      default: !1
    },
    srcName: {
      type: String,
      default: "src"
    },
    srcSetName: {
      type: String,
      default: "srcset"
    },
    srcThumb: {
      type: String,
      default: "thumb"
    },
    srcMediaType: {
      type: String,
      default: "mediaType"
    },
    overlayColor: {
      type: String,
      default: "rgba(30, 30, 30, .9)"
    },
    zIndex: {
      type: Number,
      default: 9999
    },
    gallery: {
      type: Boolean,
      default: !0
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    thumbsPosition: {
      type: String,
      default: "right"
    },
    youtubeCookies: {
      type: Boolean,
      default: !0
    },
    enableWheelEvent: {
      type: Boolean,
      default: !1
    },
    showCloseButton: {
      type: Boolean,
      default: !0
    },
    disableZoom: {
      type: Boolean,
      default: !1
    },
    dir: {
      type: String,
      default: "ltr"
    },
    enableScrollLock: {
      type: Boolean,
      default: !0
    },
    translations: {
      type: Object,
      default() {
        return {
          previous: "Previous",
          next: "Next",
          showThumbNails: "Show thumbnails",
          playSlideShow: "Play slideshow",
          fullScreen: "Fullscreen",
          close: "Close"
        };
      }
    }
  },
  watch: {
    zoomBar(e, t) {
      let s;
      if (this.isZooming) {
        this.effect == "swipe" ? s = this.$refs.items[this.imgIndex].childNodes[0] : s = this.$refs.items.childNodes[0];
        const n = 1.6 + e / 10;
        s.style.transform = "translate3d(calc(-50% + " + this.left + "px), calc(-50% + " + this.top + "px), 0px) scale3d(" + n + ", " + n + ", " + n + ")";
      }
    },
    showThumbs(e, t) {
      let s = 212, n = "all .3s ease";
      window.innerWidth < 767 && (s = 102, n = null), this.thumbsPosition === "bottom" && (s = 0);
      const o = this;
      this.swipeAnimation = n, e ? this.dir === "rtl" ? this.xSwipeWrapper = this.imgIndex * (window.innerWidth - s) + 30 * this.imgIndex : this.xSwipeWrapper = -this.imgIndex * (window.innerWidth - s) - 30 * this.imgIndex : this.dir === "rtl" ? this.xSwipeWrapper = this.imgIndex * window.innerWidth + 30 * this.imgIndex : this.xSwipeWrapper = -this.imgIndex * window.innerWidth - 30 * this.imgIndex, setTimeout(function() {
        o.swipeAnimation = null;
      }, 300);
    },
    index(e, t) {
      const s = this;
      document.querySelector("body"), e !== null ? (this.swipeType = null, this.initialMouseY = 0, this.ySwipeWrapper = 0, this.loopData = this.loop, this.effect === "swipe" && (this.loopData = !1, window.addEventListener("resize", this.xPositionOnResize)), this.imgIndex = e, this.isVisible = !0, window.addEventListener("keydown", this.eventListener), this.enableWheelEvent && window.addEventListener("wheel", this.wheelEvent), setTimeout(function() {
        window.addEventListener("click", s.showButtons);
      }, 200), this.enableScrollLock && setTimeout(function() {
        s.setCompensateForScrollbar(), ie(s.$refs.coolLightbox);
      }, 50)) : (this.isVisible = !1, this.stopSlideShow(), this.startsX = 0, this.initialMouseY = 0, this.swipeType = null, clearInterval(this.swipeInterval), this.swipeAnimation = null, this.isDraggingSwipe = !1, this.isZooming = !0, window.removeEventListener("keydown", this.eventListener), this.enableScrollLock && (s.removeCompensateForScrollbar(), A(s.$refs.coolLightbox)), window.removeEventListener("click", this.showButtons), window.removeEventListener("resize", this.xPositionOnResize), this.enableWheelEvent && window.removeEventListener("wheel", this.wheelEvent));
    },
    imgIndex(e, t) {
      this.$nextTick(() => {
        this.effect === "swipe" && (this.setLightboxInnerWidth(), this.setXPosition(e)), e !== null & t === null && this.$emit("on-open", e), e !== null && (e !== t && !this.getYoutubeUrl(this.getItemSrc(e)) && !this.getVimeoUrl(this.getItemSrc(e)) && this.stopVideos(), this.getVideoUrl(this.getItemSrc(e)) || this.is_cached(this.getItemSrc(e)) || (this.imageLoading = !0), this.addCaptionPadding(), this.effect === "swipe" ? this.setAspectRatioVideo() : this.getVideoUrl(this.getItemSrc(e)) && this.setAspectRatioVideo()), this.resetZoom(), this.swipeType = null, this.ySwipeWrapper = 0;
      });
    }
  },
  beforeDestroy() {
    this.enableScrollLock && (this.removeCompensateForScrollbar(), this.$refs.coolLightbox && A(this.$refs.coolLightbox));
  },
  methods: {
    getExtFromItem(e) {
      if (e === null)
        return !1;
      if (this.checkIfIsObject(e)) {
        const t = this.items[e];
        return t.ext ? t.ext : "mp4";
      }
    },
    stopVideos() {
      const e = document.getElementsByClassName("cool-lightbox-video"), t = (s) => s.currentTime > 0 && !s.paused && !s.ended && s.readyState > 2;
      e.length > 0 && Array.prototype.forEach.call(e, (s) => {
        if (s.tagName === "IFRAME") {
          var o = s.src;
          return s.src = o;
        }
        if (t(s))
          return s.pause();
      });
    },
    removeCompensateForScrollbar() {
      document.body.classList.remove("compensate-for-scrollbar"), document.getElementById("coollightbox-style-noscroll") !== null && document.getElementById("coollightbox-style-noscroll").remove();
    },
    setCompensateForScrollbar() {
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && document.body.scrollHeight > window.innerHeight && (document.getElementsByTagName("head")[0].insertAdjacentHTML(
        "beforeend",
        '<style id="coollightbox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (window.innerWidth - document.documentElement.clientWidth) + "px;}</style>"
      ), document.body.classList.add("compensate-for-scrollbar"));
    },
    setAutoplay(e) {
      return !!(this.checkIfIsObject(e) && this.items[e].hasOwnProperty("autoplay") && this.items[e].autoplay);
    },
    toggleFullScreenMode() {
      this.isFullScreenMode ? this.closeFullscreen() : this.fullScreenMode(), this.isFullScreenMode = !this.isFullScreenMode;
    },
    closeFullscreen() {
      document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
    },
    fullScreenMode() {
      var e = document.documentElement;
      e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
    },
    checkIfIsButton(e) {
      var t = ".cool-lightbox__iframe *, .cool-lightbox-button, .cool-lightbox-button *, .cool-lightbox-toolbar__btn, .cool-lightbox-toolbar__btn *, .cool-lightbox-caption h6, .cool-lightbox-caption p, .cool-lightbox-caption a";
      return !!e.target.matches(t);
    },
    startSwipe(e) {
      if (this.isZooming || this.checkIfIsButton(e))
        return !1;
      clearInterval(this.swipeInterval), this.swipeAnimation = null, this.isDraggingSwipe = !0, this.initialMouseX = this.getMouseXPosFromEvent(e), this.initialMouseY = this.getMouseYPosFromEvent(e);
    },
    continueSwipe(e) {
      if (this.isDraggingSwipe) {
        this.IsSwipping = !0;
        const t = this.getMouseXPosFromEvent(e), s = this.getMouseYPosFromEvent(e), n = this.lightboxInnerWidth, o = Math.abs(t - this.initialMouseX), i = Math.abs(s - this.initialMouseY);
        this.swipeType == null && (i > 5 || o > 5) && (i > o ? this.swipeType = "v" : this.swipeType = "h"), this.swipeType == "h" ? this.dir === "rtl" ? this.xSwipeWrapper = n * this.imgIndex + t - this.initialMouseX + 30 * this.imgIndex : this.xSwipeWrapper = -(n * this.imgIndex) + t - this.initialMouseX - 30 * this.imgIndex : this.ySwipeWrapper = s - this.initialMouseY, e.type === "touchmove" && (this.endMouseX = this.getMouseXPosFromEvent(e), this.endMouseY = this.getMouseYPosFromEvent(e));
      }
    },
    endSwipe(e) {
      if (this.checkIfIsButton(e) && this.initialMouseX === 0)
        return !1;
      const t = this, s = this.swipeType;
      if (this.isDraggingSwipe = !1, this.initialMouseX === 0 && s == "h")
        return !1;
      if (e.type !== "touchend")
        this.endMouseX = this.getMouseXPosFromEvent(e), this.endMouseY = this.getMouseYPosFromEvent(e);
      else if (this.endMouseX === 0)
        return;
      if (this.endMouseX - this.initialMouseX === 0 && s == "h" || this.isZooming || this.endMouseY - this.initialMouseY === 0 && s == "v")
        return;
      if (this.setSwipeAnimation(), setTimeout(function() {
        t.IsSwipping = !1, t.initialMouseX = 0, t.endMouseX = 0;
      }, 10), this.swipeType === "h") {
        if (this.endMouseX - this.initialMouseX < -40)
          return this.dir === "rtl" ? this.swipeToLeft() : this.swipeToRight();
        if (this.endMouseX - this.initialMouseX > 40)
          return this.dir === "rtl" ? this.swipeToRight() : this.swipeToLeft();
      }
      this.swipeType === "v" && (Math.abs(this.endMouseY - this.initialMouseY) >= 90 ? this.close() : this.ySwipeWrapper = 0), this.swipeType = null;
      const n = this.lightboxInnerWidth;
      if (this.dir === "rtl") {
        this.xSwipeWrapper = this.imgIndex * n + 30 * this.imgIndex;
        return;
      }
      this.xSwipeWrapper = -this.imgIndex * n - 30 * this.imgIndex;
    },
    swipeToLeft() {
      if (!this.hasPrevious && this.effect === "swipe")
        return this.dir === "rtl" ? this.xSwipeWrapper = this.imgIndex * this.lightboxInnerWidth + 30 * this.imgIndex : this.xSwipeWrapper = -this.imgIndex * this.lightboxInnerWidth - 30 * this.imgIndex;
      this.changeIndexToPrev();
    },
    swipeToRight() {
      if (!this.hasNext && this.effect === "swipe")
        return this.dir === "rtl" ? this.xSwipeWrapper = this.imgIndex * this.lightboxInnerWidth + 30 * this.imgIndex : this.xSwipeWrapper = -this.imgIndex * this.lightboxInnerWidth - 30 * this.imgIndex;
      this.changeIndexToNext();
    },
    getMouseXPosFromEvent(e) {
      return e.type.indexOf("mouse") !== -1 ? e.clientX : e.touches[0].clientX;
    },
    getMouseYPosFromEvent(e) {
      return e.type.indexOf("mouse") !== -1 ? e.clientY : e.touches[0].clientY;
    },
    is_cached(e) {
      var t = new Image();
      return t.src = e, t.complete;
    },
    imageLoaded() {
      this.imageLoading = !1;
    },
    itemThumb(e, t) {
      var s = this.getItemThumb(t);
      if (s)
        return s;
      var n = this.getYoutubeID(e);
      if (n)
        return "https://img.youtube.com/vi/" + n + "/mqdefault.jpg";
      var o = this.getVimeoID(e);
      return o ? !1 : e;
    },
    isItemPicture(e) {
      if (e === null)
        return !1;
      const t = this.items[e];
      return this.checkIfIsObject(e) ? t.picture : !1;
    },
    getPictureSources(e) {
      if (e === null)
        return !1;
      const t = this.items[e].picture;
      return t.sources ? t.sources : [];
    },
    getItemSrc(e) {
      if (e === null)
        return !1;
      const t = this.items[e];
      return this.checkIfIsObject(e) ? t[this.srcName] : t;
    },
    getItemSrcSet(e) {
      if (e === null)
        return !1;
      const t = this.items[e];
      return this.checkIfIsObject(e) ? t[this.srcSetName] : null;
    },
    getItemSizes(e) {
      if (e === null)
        return !1;
      const t = this.items[e];
      return this.checkIfIsObject(e) ? t.sizes : null;
    },
    getItemAlt(e) {
      if (e === null)
        return !1;
      const t = this.items[e];
      return this.checkIfIsObject(e) ? t.alt : null;
    },
    getItemThumb(e) {
      if (e === null)
        return !1;
      const t = this.items[e];
      return this.checkIfIsObject(e) ? t[this.srcThumb] : this.getVideoUrl(t) ? !1 : t;
    },
    getMediaType(e) {
      if (e === null)
        return !1;
      if (this.checkIfIsObject(e)) {
        const t = this.items[e];
        if (t[this.srcMediaType])
          return t[this.srcMediaType];
      }
      return this.getVideoUrl(this.getItemSrc(e)) ? "video" : this.getPDFurl(this.getItemSrc(e)) ? "iframe" : "image";
    },
    togglePlaySlideshow() {
      if (!this.slideshow || !this.hasNext && !this.loopData)
        return !1;
      this.isPlayingSlideShow = !this.isPlayingSlideShow, this.isPlayingSlideShow ? this.move() : this.stopSlideShow();
    },
    stopSlideShow() {
      this.isPlayingSlideShow = !1, clearInterval(this.intervalProgress), this.stylesInterval = {
        transform: "scaleX(0)",
        transition: "none"
      };
    },
    move() {
      const e = this;
      this.progressWidth = 100, this.intervalProgress = setInterval(t, this.slideshowDuration + 90), e.stylesInterval = {
        transform: "scaleX(1)",
        background: this.slideshowColorBar,
        "transition-duration": this.slideshowDuration + "ms"
      };
      function t() {
        e.stylesInterval = {
          transform: "scaleX(0)",
          transition: "none"
        }, e.dir === "rtl" ? e.onPrevClick(!0) : e.onNextClick(!0), !e.hasNext && !e.loopData ? e.stopSlideShow() : setTimeout(function() {
          e.stylesInterval = {
            transform: "scaleX(1)",
            background: e.slideshowColorBar,
            "transition-duration": e.slideshowDuration + "ms"
          };
        }, 50);
      }
    },
    showButtons(e) {
      if (this.disableZoom && !this.checkIfIsButton(e)) {
        const t = this;
        setTimeout(function() {
          t.buttonsVisible = !t.buttonsVisible;
        }, 100);
      }
    },
    checkMouseEventPropButton(e) {
      return this.isZooming ? e === 0 : !1;
    },
    handleMouseDown(e) {
      !(e.type === "touchstart" && this.isZooming || e.type === "mousedown" && this.checkMouseEventPropButton(e.button)) || (this.lastX = (e.type === "touchstart" ? e.touches[0] : e).clientX, this.lastY = (e.type === "touchstart" ? e.touches[0] : e).clientY, this.isZooming && (this.isDraging = !0), e.stopPropagation());
    },
    handleMouseUp(e) {
      if (!(e.type === "touchend" && this.isZooming || e.type === "mouseup" && this.checkMouseEventPropButton(e.button)))
        return;
      this.isDraging = !1, this.lastX = this.lastY = 0;
      const t = this;
      setTimeout(function() {
        t.canZoom = !0;
      }, 100);
    },
    handleMouseLeave(e) {
      if (!(e.type === "mouseleave" && this.isZooming))
        return;
      this.isDraging = !1, this.lastX = this.lastY = 0;
      const t = this;
      setTimeout(function() {
        t.canZoom = !0;
      }, 100);
    },
    handleMouseMove(e) {
      if (!!(e.type === "touchmove" && this.isZooming || e.type === "mousemove" && this.checkMouseEventPropButton(e.button))) {
        if (this.isDraging) {
          const t = (e.type === "touchmove" ? e.touches[0] : e).clientX, s = (e.type === "touchmove" ? e.touches[0] : e).clientY;
          this.top = this.top - this.lastY + s, this.left = this.left - this.lastX + t, this.lastX = t, this.lastY = s, this.canZoom = !1;
          const n = e.target.parentNode.nodeName === "PICTURE" ? e.target.parentNode.parentNode : e.target.parentNode, o = 1.6 + this.zoomBar / 10;
          n.style.transform = "translate3d(calc(-50% + " + this.left + "px), calc(-50% + " + this.top + "px), 0px) scale3d(" + o + ", " + o + ", " + o + ")";
        }
        e.stopPropagation();
      }
    },
    zoomImage(e) {
      if (this.disableZoom || !this.canZoom || this.IsSwipping)
        return !1;
      let t;
      this.effect == "swipe" ? t = this.$refs.items[this.imgIndex].childNodes[0] : t = this.$refs.items.childNodes[0];
      const s = this.isZooming, n = this;
      s ? this.isDraging || (this.isZooming = !1, this.zoomBar = 0) : this.isZooming = !0, this.isZooming ? (this.stopSlideShow(), t.style.transform = "translate3d(calc(-50%), calc(-50%), 0px) scale3d(1.6, 1.6, 1.6)", this.buttonsVisible = !1, setTimeout(function() {
        n.transition = "all .0s ease";
      }, 100)) : (this.buttonsVisible = !0, this.resetZoom());
    },
    resetZoom() {
      if (this.scale = 1, this.left = 0, this.top = 0, this.zoomBar = 0, this.isZooming = !1, this.swipeType = null, this.transition = "all .3s ease", this.imgIndex != null) {
        let e;
        this.effect == "swipe" ? e = this.$refs.items[this.imgIndex].childNodes[0] : e = this.$refs.items.childNodes[0], this.disableZoom ? e.style.transform = "translate3d(calc(-50% + " + this.left + "px), calc(-50% + " + this.top + "px), 0px)" : e.style.transform = "translate3d(calc(-50% + " + this.left + "px), calc(-50% + " + this.top + "px), 0px) scale3d(1, 1, 1)", this.initialMouseX = 0, window.innerWidth >= 700 && (this.buttonsVisible = !0);
      }
    },
    setAspectRatioVideo() {
      const e = this;
      let t = document.getElementsByClassName("cool-lightbox__inner");
      t = t[0];
      let s = getComputedStyle(t);
      if (window.innerWidth < 1440) {
        let n = t.clientWidth, o = Math.round(n / 16 * 9);
        this.aspectRatioVideo.height = o + "px", this.aspectRatioVideo.width = n + "px";
      } else
        setTimeout(function() {
          let n = t.clientHeight;
          n -= parseFloat(s.paddingTop) + parseFloat(s.paddingBottom);
          let o = n / 9 * 16;
          e.aspectRatioVideo.height = n + "px", e.aspectRatioVideo.width = o + "px";
        }, 150);
    },
    close() {
      this.stopSlideShow(), this.swipeType = null, this.$emit("close", this.imgIndex), this.showThumbs = !1, this.imgIndex = null;
    },
    wheelEvent(e) {
      const s = new Date().getTime();
      let n = e.deltaY > 0 ? "top" : "down";
      if (!(s - this.prevTime < 350))
        switch (this.prevTime = s, n) {
          case "top":
            return this.changeIndexToPrev();
          case "down":
            return this.changeIndexToNext();
        }
    },
    closeModal(e) {
      if (!this.closeOnClickOutsideMobile && window.innerWidth < 700 || this.IsSwipping)
        return !1;
      var t = ".cool-lightbox__iframe, .cool-lightbox__iframe *, .cool-lightbox-zoom, .cool-lightbox-zoom *, .cool-lightbox-thumbs, svg, path, rect, .cool-lightbox-thumbs *, .cool-lightbox-button, .cool-lightbox-toolbar__btn, .cool-lightbox-toolbar__btn *, .cool-lightbox-button *, .cool-lightbox__slide__img *, .cool-lightbox-video, .cool-lightbox-caption h6, .cool-lightbox-caption p, .cool-lightbox-caption a";
      e.target.matches(t) || this.close();
    },
    setSwipeAnimation() {
      const e = this;
      clearInterval(this.swipeInterval), this.swipeAnimation = null, this.swipeAnimation = "all .3s ease", this.swipeInterval = setInterval(t, 330);
      function t() {
        e.swipeAnimation = null;
      }
    },
    onNextClick(e = !1) {
      if (this.isZooming)
        return !1;
      if (e || this.stopSlideShow(), this.setSwipeAnimation(), this.dir === "rtl")
        return this.changeIndexToPrev();
      this.changeIndexToNext();
    },
    onPrevClick(e = !1) {
      if (this.isZooming)
        return !1;
      if (e || this.stopSlideShow(), this.setSwipeAnimation(), this.dir === "rtl")
        return this.changeIndexToNext();
      this.changeIndexToPrev();
    },
    changeIndexToNext() {
      this.hasNext ? this.onIndexChange(this.imgIndex + 1) : this.loopData && this.onIndexChange(0);
    },
    changeIndexToPrev() {
      this.hasPrevious ? this.onIndexChange(this.imgIndex - 1) : this.loopData && this.onIndexChange(this.items.length - 1);
    },
    setLightboxInnerWidth() {
      let t = document.getElementsByClassName("cool-lightbox__inner")[0].clientWidth;
      this.lightboxInnerWidth = t;
    },
    xPositionOnResize() {
      this.setLightboxInnerWidth();
      const e = this.imgIndex;
      if (this.dir === "rtl") {
        this.xSwipeWrapper = e * this.lightboxInnerWidth + 30 * e;
        return;
      }
      this.xSwipeWrapper = -e * this.lightboxInnerWidth - 30 * e;
    },
    setXPosition(e) {
      if (this.dir === "rtl") {
        this.xSwipeWrapper = e * this.lightboxInnerWidth + 30 * e;
        return;
      }
      this.xSwipeWrapper = -e * this.lightboxInnerWidth - 30 * e;
    },
    onIndexChange(e) {
      const t = this;
      this.imgIndex = e, this.$emit("on-change", e), setTimeout(function() {
        t.$emit("on-change-end", e);
      }, 400);
    },
    addCaptionPadding() {
      if (this.checkIfIsObject(this.imgIndex) && (this.items[this.imgIndex].title || this.items[this.imgIndex].descripcion)) {
        const e = document.getElementsByClassName("cool-lightbox-caption");
        e.length > 0 && (this.paddingBottom = e[0].offsetHeight);
      } else
        this.paddingBottom = 60;
    },
    getPDFurl(e) {
      return this.imgIndex === null ? !1 : new String(e).endsWith(".pdf") ? e : !1;
    },
    getVideoUrl(e) {
      const t = this.getYoutubeUrl(e), s = this.getVimeoUrl(e), n = this.getVzaarVideo(e), o = this.checkIsMp4(e);
      return t || s || n || o || !1;
    },
    getYoutubeID(e) {
      const t = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/, s = e.match(t) ? RegExp.$1 : !1;
      return s || !1;
    },
    getYoutubeUrl(e) {
      const t = this.getYoutubeID(e);
      return t ? this.youtubeCookies ? "https://www.youtube.com/embed/" + t : "https://www.youtube-nocookie.com/embed/" + t : !1;
    },
    getVimeoID(e) {
      const t = e.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i);
      return t !== null ? t[1] : !1;
    },
    getVimeoUrl(e) {
      const t = e.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i);
      return t !== null ? "//player.vimeo.com/video/" + t[1] + "?hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1" : !1;
    },
    getVzaarVideo(e) {
      const t = /(?:https?:\/\/)?(?:view\.)?vzaar\.com\/(?:videos\/)?([a-z0-9-]+)(?:\/player)?/i, s = e.match(t) ? RegExp.$1 : !1;
      return s ? "https://view.vzaar.com/" + s + "/player" : !1;
    },
    checkIsMp4(e) {
      if (this.imgIndex === null)
        return !1;
      const t = new String(e);
      return [
        ".mp4",
        ".mov",
        ".webm",
        ".ogg",
        ".avi"
      ].filter((o) => t.indexOf(o) !== -1 || t.indexOf(o.toUpperCase()) !== -1).length > 0 ? e : !1;
    },
    getVideoExt(e) {
      if (this.imgIndex === null)
        return !1;
      const t = new String(e);
      return t.indexOf(".mp4") !== -1 || t.indexOf(".mov") !== -1 ? "mp4" : t.indexOf(".webm") !== -1 ? "webm" : t.indexOf(".ogg") !== -1 ? "ogg" : t.indexOf(".avi") !== -1 ? "avi" : !1;
    },
    checkIfIsObject(e) {
      const t = this.items[e];
      return typeof t == "object" && t !== null;
    },
    eventListener(e) {
      switch (e.keyCode) {
        case 39:
          return this.onNextClick();
        case 37:
          return this.onPrevClick();
        case 38:
        case 40:
        case " ":
          return e.preventDefault();
        case 27:
          return this.close();
      }
    }
  },
  computed: {
    imgWrapperStyle() {
      return {
        top: "50%",
        left: "50%",
        transition: this.transition
      };
    },
    lightboxStyles() {
      return {
        "z-index": this.zIndex,
        "background-color": this.overlayColor
      };
    },
    innerStyles() {
      return {
        "padding-bottom": this.paddingBottom + "px"
      };
    },
    itemSrc() {
      if (this.imgIndex === null)
        return !1;
      const e = this.items[this.imgIndex];
      return this.checkIfIsObject(this.imgIndex) ? e[this.srcName] : e;
    },
    lightboxClasses() {
      let e = [
        { "cool-lightbox--can-zoom": this.canZoom && !this.disableZoom },
        { "cool-lightbox--zoom-disabled": this.disableZoom },
        { "cool-lightbox--is-zooming": this.isZooming },
        { "cool-lightbox--show-thumbs": this.showThumbs },
        { "cool-lightbox--is-swipping": this.isDraggingSwipe }
      ], t = "cool-lightbox--thumbs-" + this.thumbsPosition;
      return e.push(t), e;
    },
    buttonsClasses() {
      return {
        hidden: !this.buttonsVisible
      };
    },
    hasNextButton() {
      return this.dir === "rtl" ? this.imgIndex - 1 >= 0 : this.imgIndex + 1 < this.items.length;
    },
    hasPreviousButton() {
      return this.dir === "rtl" ? this.imgIndex + 1 < this.items.length : this.imgIndex - 1 >= 0;
    },
    hasNext() {
      return this.imgIndex + 1 < this.items.length;
    },
    hasPrevious() {
      return this.imgIndex - 1 >= 0;
    }
  }
}, le = {
  key: 0,
  class: "cool-lightbox-thumbs"
}, ne = { class: "cool-lightbox-thumbs__list" }, re = ["onClick"], ae = {
  key: 0,
  class: "cool-lightbox__thumb__icon",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, he = /* @__PURE__ */ a("path", { d: "M6.5 5.4v13.2l11-6.6z" }, null, -1), ue = [
  he
], de = ["src"], ce = { class: "cool-lightbox__navigation" }, ge = ["title"], me = /* @__PURE__ */ a("div", { class: "cool-lightbox-button__icon" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, [
    /* @__PURE__ */ a("path", { d: "M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z" })
  ])
], -1), fe = ["title"], we = /* @__PURE__ */ a("div", { class: "cool-lightbox-button__icon" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, [
    /* @__PURE__ */ a("path", { d: "M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z" })
  ])
], -1), pe = ["data-src", "data-srcset", "data-sizes", "alt", "onClick"], be = { key: 1 }, ve = ["data-srcset", "data-media", "type", "data-sizes"], ye = ["data-src", "data-srcset", "data-sizes", "alt", "onClick"], xe = { class: "cool-lightbox-loading-wrapper" }, Ie = /* @__PURE__ */ a("div", { class: "cool-lightbox-loading" }, null, -1), Se = {
  key: "video",
  class: "cool-lightbox__iframe"
}, Me = ["data-autoplay", "src"], _e = ["src"], ke = ["data-autoplay"], Te = ["src", "type"], ze = {
  key: 1,
  class: "cool-lightbox__wrapper"
}, Pe = {
  ref: "items",
  class: "cool-lightbox__slide cool-lightbox__slide--current"
}, Be = ["src", "srcset", "sizes", "alt"], Ce = ["srcset", "type", "media", "sizes"], Le = ["src", "srcset", "sizes", "alt"], Ee = { class: "cool-lightbox-loading-wrapper" }, Ve = /* @__PURE__ */ a("div", { class: "cool-lightbox-loading" }, null, -1), We = {
  key: "video",
  class: "cool-lightbox__iframe"
}, Fe = ["data-autoplay", "src"], De = ["src"], Oe = ["data-autoplay"], Ne = ["src", "type"], Ae = {
  key: "caption-block",
  class: "cool-lightbox-caption"
}, Xe = ["innerHTML"], Ye = ["innerHTML"], Ze = ["title"], Re = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, Ue = /* @__PURE__ */ a("path", { d: "M6.5 5.4v13.2l11-6.6z" }, null, -1), He = [
  Ue
], je = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg"
}, qe = /* @__PURE__ */ a("g", null, [
  /* @__PURE__ */ a("rect", {
    id: "svg_4",
    height: "11.97529",
    width: "11.728392",
    y: "6.030873",
    x: "6.259265",
    "stroke-width": "1.5",
    stroke: "#000",
    fill: "#000000"
  })
], -1), Ge = [
  qe
], Je = ["title"], Ke = /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ a("path", { d: `M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47
              0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47
              0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47
              0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z` })
], -1), Qe = [
  Ke
], $e = ["title"], et = /* @__PURE__ */ a("svg", {
  width: "20px",
  height: "20px",
  viewBox: "0 0 18 18",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ a("path", { d: "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z" })
], -1), tt = [
  et
], it = ["title"], st = /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ a("path", { d: "M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z" })
], -1), ot = {
  key: 0,
  class: "cool-lightbox-zoom"
}, lt = /* @__PURE__ */ a("svg", {
  height: "469pt",
  class: "cool-lightbox-zoom__icon",
  viewBox: "0 -192 469.33333 469",
  width: "469pt",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ a("path", { d: `m437.332031.167969h-405.332031c-17.664062
            0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938
            32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0` })
], -1), nt = /* @__PURE__ */ a("svg", {
  height: "426.66667pt",
  class: "cool-lightbox-zoom__icon",
  viewBox: "0 0 426.66667 426.66667",
  width: "426.66667pt",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ a("path", { d: `m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031
            9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0
            11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031
            21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594
            21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0` })
], -1);
function rt(e, t, s, n, o, i) {
  const m = D("lazyload"), g = D("autoplayObserver");
  return u(), E(p, { name: "cool-lightbox-modal" }, {
    default: b(() => [
      o.isVisible ? (u(), d("div", {
        key: 0,
        class: x(["cool-lightbox", i.lightboxClasses]),
        ref: "coolLightbox",
        onClick: t[41] || (t[41] = (...l) => i.closeModal && i.closeModal(...l)),
        style: w(i.lightboxStyles)
      }, [
        s.gallery ? (u(), d("div", le, [
          a("div", ne, [
            (u(!0), d(T, null, z(s.items, (l, r) => (u(), d("button", {
              type: "button",
              key: r,
              class: x([{
                active: r === o.imgIndex,
                "is-video": i.getMediaType(r) === "video"
              }, "cool-lightbox__thumb"]),
              onClick: (h) => o.imgIndex = r
            }, [
              i.getMediaType(r) === "video" ? (u(), d("svg", ae, ue)) : c("", !0),
              a("img", {
                src: i.itemThumb(i.getItemSrc(r), r),
                alt: ""
              }, null, 8, de)
            ], 10, re))), 128))
          ])
        ])) : c("", !0),
        a("div", {
          class: "cool-lightbox__inner",
          style: w(i.innerStyles),
          onMousedown: t[34] || (t[34] = (...l) => i.startSwipe && i.startSwipe(...l)),
          onMousemove: t[35] || (t[35] = (...l) => i.continueSwipe && i.continueSwipe(...l)),
          onMouseup: t[36] || (t[36] = (...l) => i.endSwipe && i.endSwipe(...l)),
          onTouchstart: t[37] || (t[37] = (...l) => i.startSwipe && i.startSwipe(...l)),
          onTouchmove: t[38] || (t[38] = (...l) => i.continueSwipe && i.continueSwipe(...l)),
          onTouchend: t[39] || (t[39] = (...l) => i.endSwipe && i.endSwipe(...l))
        }, [
          a("div", {
            class: "cool-lightbox__progressbar",
            style: w(o.stylesInterval)
          }, null, 4),
          a("div", ce, [
            f(a("button", {
              type: "button",
              class: x(["cool-lightbox-button cool-lightbox-button--prev", i.buttonsClasses]),
              title: s.translations.previous,
              onClick: t[0] || (t[0] = (...l) => i.onPrevClick && i.onPrevClick(...l))
            }, [
              S(e.$slots, "icon-previous", {}, () => [
                me
              ])
            ], 10, ge), [
              [M, (i.hasPreviousButton || o.loopData) && s.items.length > 1]
            ]),
            f(a("button", {
              type: "button",
              class: x(["cool-lightbox-button cool-lightbox-button--next", i.buttonsClasses]),
              title: s.translations.next,
              onClick: t[1] || (t[1] = (l) => i.onNextClick(!1))
            }, [
              S(e.$slots, "icon-next", {}, () => [
                we
              ])
            ], 10, fe), [
              [M, (i.hasNextButton || o.loopData) && s.items.length > 1]
            ])
          ]),
          s.effect === "swipe" ? (u(), d("div", {
            key: 0,
            class: "cool-lightbox__wrapper cool-lightbox__wrapper--swipe",
            style: w({
              transform: "translate3d(" + o.xSwipeWrapper + "px, " + o.ySwipeWrapper + "px, 0)",
              transition: o.swipeAnimation
            })
          }, [
            (u(!0), d(T, null, z(s.items, (l, r) => (u(), d("div", {
              key: r,
              ref_for: !0,
              ref: "items",
              class: x(["cool-lightbox__slide", { "cool-lightbox__slide--current": r === o.imgIndex }])
            }, [
              i.getMediaType(r) === "image" ? f((u(), d("div", {
                key: "image",
                style: w(i.imgWrapperStyle),
                class: "cool-lightbox__slide__img"
              }, [
                i.isItemPicture(r) ? (u(), d("picture", be, [
                  (u(!0), d(T, null, z(i.getPictureSources(r), (h, Z) => (u(), d("source", {
                    "data-srcset": h.srcset,
                    "data-media": h.media,
                    type: h.type,
                    "data-sizes": h.sizes || i.getItemSizes(o.imgIndex),
                    key: `source-${o.imgIndex}-${Z}`
                  }, null, 8, ve))), 128)),
                  a("img", {
                    "data-src": i.getItemSrc(r),
                    "data-srcset": i.getItemSrcSet(r),
                    "data-sizes": i.getItemSizes(r),
                    draggable: "false",
                    alt: i.getItemAlt(r),
                    onLoad: t[10] || (t[10] = (...h) => i.imageLoaded && i.imageLoaded(...h)),
                    onClick: (h) => i.zoomImage(r),
                    onMousedown: t[11] || (t[11] = (h) => i.handleMouseDown(h)),
                    onMouseup: t[12] || (t[12] = (h) => i.handleMouseUp(h)),
                    onMouseleave: t[13] || (t[13] = (h) => i.handleMouseLeave(h)),
                    onMousemove: t[14] || (t[14] = (h) => i.handleMouseMove(h)),
                    onTouchstart: t[15] || (t[15] = (h) => i.handleMouseDown(h)),
                    onTouchmove: t[16] || (t[16] = (h) => i.handleMouseMove(h)),
                    onTouchend: t[17] || (t[17] = (h) => i.handleMouseUp(h))
                  }, null, 40, ye)
                ])) : (u(), d("img", {
                  key: 0,
                  "data-src": i.getItemSrc(r),
                  "data-srcset": i.getItemSrcSet(r),
                  "data-sizes": i.getItemSizes(r),
                  draggable: "false",
                  alt: i.getItemAlt(r),
                  onLoad: t[2] || (t[2] = (...h) => i.imageLoaded && i.imageLoaded(...h)),
                  onClick: (h) => i.zoomImage(r),
                  onMousedown: t[3] || (t[3] = (h) => i.handleMouseDown(h)),
                  onMouseup: t[4] || (t[4] = (h) => i.handleMouseUp(h)),
                  onMouseleave: t[5] || (t[5] = (h) => i.handleMouseLeave(h)),
                  onMousemove: t[6] || (t[6] = (h) => i.handleMouseMove(h)),
                  onTouchstart: t[7] || (t[7] = (h) => i.handleMouseDown(h)),
                  onTouchmove: t[8] || (t[8] = (h) => i.handleMouseMove(h)),
                  onTouchend: t[9] || (t[9] = (h) => i.handleMouseUp(h))
                }, null, 40, pe)),
                f(a("div", xe, [
                  S(e.$slots, "loading", {}, () => [
                    Ie
                  ])
                ], 512), [
                  [M, o.imageLoading]
                ])
              ], 4)), [
                [m]
              ]) : (u(), d("div", Se, [
                !i.checkIsMp4(i.getItemSrc(r)) && i.getMediaType(r) === "video" ? f((u(), d("iframe", {
                  class: "cool-lightbox-video",
                  "data-autoplay": i.setAutoplay(r),
                  src: i.getVideoUrl(i.getItemSrc(r)),
                  style: w(o.aspectRatioVideo),
                  key: r,
                  frameborder: "0",
                  allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
                  allowfullscreen: ""
                }, [
                  P(`
              `)
                ], 12, Me)), [
                  [g]
                ]) : c("", !0),
                a("pre", null, "                " + R(i.getVideoUrl(i.getItemSrc(r))) + `
              `, 1),
                i.getMediaType(r) === "iframe" || i.getPDFurl(i.getItemSrc(r)) ? (u(), d("iframe", {
                  class: "cool-lightbox-pdf",
                  src: i.getItemSrc(r),
                  key: r,
                  frameborder: "0",
                  allowfullscreen: ""
                }, `
              `, 8, _e)) : c("", !0),
                i.checkIsMp4(i.getItemSrc(r)) || i.getMediaType(r) === "webVideo" ? f((u(), d("video", {
                  "data-autoplay": i.setAutoplay(r),
                  class: "cool-lightbox-video",
                  style: w(o.aspectRatioVideo),
                  key: i.checkIsMp4(i.getItemSrc(r)),
                  controls: "",
                  controlslist: "nodownload",
                  l: "",
                  poster: ""
                }, [
                  a("source", {
                    src: i.checkIsMp4(i.getItemSrc(r)),
                    type: "video/" + (i.getVideoExt(i.getItemSrc(r)) ? i.getVideoExt(i.getItemSrc(r)) : i.getExtFromItem(r))
                  }, null, 8, Te),
                  P(" Sorry, your browser doesn't support embedded videos ")
                ], 12, ke)), [
                  [g]
                ]) : c("", !0)
              ]))
            ], 2))), 128))
          ], 4)) : c("", !0),
          s.effect === "fade" ? (u(), d("div", ze, [
            a("div", Pe, [
              I(p, {
                name: "cool-lightbox-slide-change",
                mode: "out-in"
              }, {
                default: b(() => [
                  i.getMediaType(o.imgIndex) === "image" ? (u(), d("div", {
                    key: "image",
                    style: w(i.imgWrapperStyle),
                    class: "cool-lightbox__slide__img"
                  }, [
                    i.isItemPicture(o.imgIndex) ? (u(), E(p, {
                      key: 1,
                      name: "cool-lightbox-slide-change",
                      mode: "out-in"
                    }, {
                      default: b(() => [
                        (u(), d("picture", { key: o.imgIndex }, [
                          (u(!0), d(T, null, z(i.getPictureSources(o.imgIndex), (l, r) => (u(), d("source", {
                            srcset: l.srcset,
                            type: l.type,
                            media: l.media,
                            sizes: l.sizes || i.getItemSizes(o.imgIndex),
                            key: `source-${o.imgIndex}-${r}`
                          }, null, 8, Ce))), 128)),
                          a("img", {
                            src: i.getItemSrc(o.imgIndex),
                            srcset: i.getItemSrcSet(o.imgIndex),
                            sizes: i.getItemSizes(o.imgIndex),
                            draggable: "false",
                            alt: i.getItemAlt(o.imgIndex),
                            onLoad: t[24] || (t[24] = (...l) => i.imageLoaded && i.imageLoaded(...l)),
                            onClick: t[25] || (t[25] = (l) => i.zoomImage(o.imgIndex)),
                            onMousedown: t[26] || (t[26] = (l) => i.handleMouseDown(l)),
                            onMouseup: t[27] || (t[27] = (l) => i.handleMouseUp(l)),
                            onMouseleave: t[28] || (t[28] = (l) => i.handleMouseLeave(l)),
                            onMousemove: t[29] || (t[29] = (l) => i.handleMouseMove(l))
                          }, null, 40, Le)
                        ]))
                      ]),
                      _: 1
                    })) : (u(), E(p, {
                      key: 0,
                      name: "cool-lightbox-slide-change",
                      mode: "out-in"
                    }, {
                      default: b(() => [
                        (u(), d("img", {
                          src: i.getItemSrc(o.imgIndex),
                          srcset: i.getItemSrcSet(o.imgIndex),
                          sizes: i.getItemSizes(o.imgIndex),
                          key: o.imgIndex,
                          draggable: "false",
                          alt: i.getItemAlt(o.imgIndex),
                          onLoad: t[18] || (t[18] = (...l) => i.imageLoaded && i.imageLoaded(...l)),
                          onClick: t[19] || (t[19] = (...l) => i.zoomImage && i.zoomImage(...l)),
                          onMousedown: t[20] || (t[20] = (l) => i.handleMouseDown(l)),
                          onMouseup: t[21] || (t[21] = (l) => i.handleMouseUp(l)),
                          onMouseleave: t[22] || (t[22] = (l) => i.handleMouseLeave(l)),
                          onMousemove: t[23] || (t[23] = (l) => i.handleMouseMove(l))
                        }, null, 40, Be))
                      ]),
                      _: 1
                    })),
                    f(a("div", Ee, [
                      S(e.$slots, "loading", {}, () => [
                        Ve
                      ])
                    ], 512), [
                      [M, o.imageLoading]
                    ])
                  ], 4)) : (u(), d("div", We, [
                    I(p, {
                      name: "cool-lightbox-slide-change",
                      mode: "out-in"
                    }, {
                      default: b(() => [
                        a("div", null, [
                          !i.checkIsMp4(i.getItemSrc(o.imgIndex)) && i.getMediaType(o.imgIndex) === "video" ? f((u(), d("iframe", {
                            class: "cool-lightbox-video",
                            "data-autoplay": i.setAutoplay(o.imgIndex),
                            src: i.getVideoUrl(i.getItemSrc(o.imgIndex)),
                            style: w(o.aspectRatioVideo),
                            key: i.getVideoUrl(i.getItemSrc(o.imgIndex)),
                            frameborder: "0",
                            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
                            allowfullscreen: ""
                          }, [
                            P(`
                    `)
                          ], 12, Fe)), [
                            [g]
                          ]) : c("", !0),
                          i.getMediaType(o.imgIndex) === "iframe" || i.getPDFurl(i.getItemSrc(o.imgIndex)) ? (u(), d("iframe", {
                            class: "cool-lightbox-pdf",
                            src: i.getItemSrc(o.imgIndex),
                            key: o.imgIndex,
                            frameborder: "0",
                            allowfullscreen: ""
                          }, `
                    `, 8, De)) : c("", !0),
                          i.checkIsMp4(i.getItemSrc(o.imgIndex)) || i.getMediaType(o.imgIndex) === "webVideo" ? f((u(), d("video", {
                            class: "cool-lightbox-video",
                            "data-autoplay": i.setAutoplay(o.imgIndex),
                            style: w(o.aspectRatioVideo),
                            key: i.checkIsMp4(i.getItemSrc(o.imgIndex)),
                            controls: "",
                            controlslist: "nodownload",
                            poster: ""
                          }, [
                            a("source", {
                              src: i.checkIsMp4(i.getItemSrc(o.imgIndex)),
                              type: "video/" + (i.getVideoExt(i.getItemSrc(o.imgIndex)) ? i.getVideoExt(i.getItemSrc(o.imgIndex)) : i.getExtFromItem(o.imgIndex))
                            }, null, 8, Ne),
                            P(" Sorry, your browser doesn't support embedded videos ")
                          ], 12, Oe)), [
                            [g]
                          ]) : c("", !0)
                        ])
                      ]),
                      _: 1
                    })
                  ]))
                ]),
                _: 3
              })
            ], 512)
          ])) : c("", !0),
          I(p, { name: "cool-lightbox-modal" }, {
            default: b(() => [
              f(a("div", Ae, [
                I(p, {
                  name: "cool-lightbox-slide-change",
                  mode: "out-in"
                }, {
                  default: b(() => [
                    i.checkIfIsObject(o.imgIndex) && s.items[o.imgIndex].title ? (u(), d("h6", {
                      key: "title",
                      innerHTML: s.items[o.imgIndex].title
                    }, null, 8, Xe)) : c("", !0)
                  ]),
                  _: 1
                }),
                I(p, {
                  name: "cool-lightbox-slide-change",
                  mode: "out-in"
                }, {
                  default: b(() => [
                    i.checkIfIsObject(o.imgIndex) && s.items[o.imgIndex].description ? (u(), d("p", {
                      key: "description",
                      innerHTML: s.items[o.imgIndex].description
                    }, null, 8, Ye)) : c("", !0)
                  ]),
                  _: 1
                })
              ], 512), [
                [M, i.checkIfIsObject(o.imgIndex) && (s.items[o.imgIndex].title || s.items[o.imgIndex].description)]
              ])
            ]),
            _: 1
          }),
          a("div", {
            class: x(["cool-lightbox-toolbar", i.buttonsClasses])
          }, [
            this.slideshow && s.items.length > 1 ? (u(), d("button", {
              key: 0,
              type: "button",
              title: s.translations.playSlideShow,
              class: "cool-lightbox-toolbar__btn",
              onClick: t[30] || (t[30] = (...l) => i.togglePlaySlideshow && i.togglePlaySlideshow(...l))
            }, [
              o.isPlayingSlideShow ? (u(), d("svg", je, Ge)) : (u(), d("svg", Re, He))
            ], 8, Ze)) : c("", !0),
            s.items.length > 1 && s.gallery ? (u(), d("button", {
              key: 1,
              type: "button",
              onClick: t[31] || (t[31] = (l) => o.showThumbs = !o.showThumbs),
              title: s.translations.showThumbNails,
              class: "cool-lightbox-toolbar__btn"
            }, Qe, 8, Je)) : c("", !0),
            s.fullScreen ? (u(), d("button", {
              key: 2,
              type: "button",
              onClick: t[32] || (t[32] = (...l) => i.toggleFullScreenMode && i.toggleFullScreenMode(...l)),
              class: "cool-lightbox-toolbar__btn",
              title: s.translations.fullScreen
            }, tt, 8, $e)) : c("", !0),
            s.showCloseButton ? (u(), d("button", {
              key: 3,
              type: "button",
              class: "cool-lightbox-toolbar__btn",
              title: s.translations.close,
              onClick: t[33] || (t[33] = (...l) => i.close && i.close(...l))
            }, [
              S(e.$slots, "close", {}, () => [
                st
              ])
            ], 8, it)) : c("", !0)
          ], 2)
        ], 36),
        I(p, { name: "cool-lightbox-modal" }, {
          default: b(() => [
            o.isZooming && s.useZoomBar ? (u(), d("div", ot, [
              lt,
              f(a("input", {
                type: "range",
                "onUpdate:modelValue": t[40] || (t[40] = (l) => o.zoomBar = l),
                name: "points",
                min: "0",
                max: "50"
              }, null, 512), [
                [U, o.zoomBar]
              ]),
              nt
            ])) : c("", !0)
          ]),
          _: 1
        })
      ], 6)) : c("", !0)
    ]),
    _: 3
  });
}
const ht = /* @__PURE__ */ se(oe, [["render", rt]]);
export {
  ht as CoolLightBox
};
