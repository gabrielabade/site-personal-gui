(function () {
  var selector = '#heroVideo';
  var posterElSelector = '.hero-fallback';
  var PLAY_BTN_ID = 'heroPlayFallback';
  var VIDEO_LOAD_OFFSET = 200;

  function getVideo() {
    return document.querySelector(selector);
  }

  function getFallback() {
    return document.querySelector(posterElSelector);
  }

  function getPlayBtn() {
    return document.getElementById(PLAY_BTN_ID);
  }

  function setSrcFromDataSrc(video) {
    var source = video && video.querySelector('source[data-src]');
    if (!source) return false;
    var src = source.getAttribute('data-src');
    if (src) {
      source.setAttribute('src', src);
      source.removeAttribute('data-src');
      video.load();
      return true;
    }
    return false;
  }

  function hideFallback() {
    var fallback = getFallback();
    if (fallback) {
      fallback.style.visibility = 'hidden';
      fallback.setAttribute('aria-hidden', 'true');
    }
  }

  function showPlayButton() {
    var existing = getPlayBtn();
    if (existing) {
      existing.style.display = 'flex';
      existing.setAttribute('aria-hidden', 'false');
      return;
    }

    var btn = document.createElement('button');
    btn.id = PLAY_BTN_ID;
    btn.className = 'hero-play-fallback';
    btn.setAttribute('aria-label', 'Tocar vídeo');

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "48");
    svg.setAttribute("height", "48");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M8 5v14l11-7z");
    path.setAttribute("fill", "currentColor");

    svg.appendChild(path);
    btn.appendChild(svg);

    btn.addEventListener('click', function () {
      var v = getVideo();
      if (!v) return;

      v.muted = true;
      v.play().then(function () {
        hideFallback();
        btn.style.display = 'none';
        btn.setAttribute('aria-hidden', 'true');
      }).catch(function () {
        // mantém o botão visível
      });
    }, { once: false });

    document.body.appendChild(btn);
  }

  function tryPlay(video, onFail) {
    if (!video) return;

    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        hideFallback();
        var btn = getPlayBtn();
        if (btn) {
          btn.style.display = 'none';
          btn.setAttribute('aria-hidden', 'true');
        }
      }).catch(function (err) {
        if (typeof onFail === 'function') onFail(err);
        showPlayButton();
      });
    }
  }

  function loadAndTryPlay() {
    var video = getVideo();
    if (!video) return;

    var changed = setSrcFromDataSrc(video);
    if (changed) {
      var onCanplay = function () {
        video.removeEventListener('canplay', onCanplay);
        tryPlay(video);
      };
      video.addEventListener('canplay', onCanplay);
    } else {
      tryPlay(video);
    }
  }

  function init() {
    var video = getVideo();
    if (!video) return;

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      showPlayButton();
      return;
    }

    var hasSource = video.querySelector('source[src]');
    if (hasSource) {
      tryPlay(video, function () {
        showPlayButton();
      });
    } else {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              loadAndTryPlay();
              obs.disconnect();
            }
          });
        }, {
          root: null,
          rootMargin: VIDEO_LOAD_OFFSET + 'px',
          threshold: 0.01
        });
        io.observe(video);
      } else {
        loadAndTryPlay();
      }
    }

    var wakeHandler = function () {
      try {
        video.muted = true;
        video.play().then(function () {
          hideFallback();
          var btn = getPlayBtn();
          if (btn) {
            btn.style.display = 'none';
            btn.setAttribute('aria-hidden', 'true');
          }
        }).catch(function () {
          showPlayButton();
        });
      } catch (e) { }
      window.removeEventListener('mousemove', wakeHandler);
      window.removeEventListener('touchstart', wakeHandler);
      window.removeEventListener('keydown', wakeHandler);
    };

    window.addEventListener('mousemove', wakeHandler, { passive: true });
    window.addEventListener('touchstart', wakeHandler, { passive: true });
    window.addEventListener('keydown', wakeHandler, { passive: true });

    var btnHtml = getPlayBtn();
    if (btnHtml) {
      btnHtml.addEventListener('click', function () {
        setSrcFromDataSrc(video);
        video.play().then(function () {
          hideFallback();
          btnHtml.style.display = 'none';
          btnHtml.setAttribute('aria-hidden', 'true');
        }).catch(function () {
          // se falhar, mantemos o botão visível
        });
      }, { once: false });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
