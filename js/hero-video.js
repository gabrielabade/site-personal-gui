(function () {
  var selector = '#heroVideo';
  var posterElSelector = '.hero-fallback';
  var PLAY_BTN_ID = 'heroPlayFallback'; // id do botão no HTML
  var VIDEO_LOAD_OFFSET = 200; // carrega antes de entrar totalmente na viewport (px)

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
      // preferir visibility para manter layout previsível
      fallback.style.visibility = 'hidden';
      fallback.setAttribute('aria-hidden', 'true');
    }
  }

  function showPlayButton() {
    var existing = getPlayBtn();
    if (existing) {
      existing.style.display = 'inline-block';
      existing.setAttribute('aria-hidden', 'false');
      return;
    }
    // Se não existir no DOM, criamos um botão com a mesma aparência (fallback)
    var btn = document.createElement('button');
    btn.id = PLAY_BTN_ID;
    btn.className = 'hero-play-fallback';
    btn.setAttribute('aria-label', 'Tocar vídeo');
    btn.innerText = '▶️ Ver vídeo';
    btn.addEventListener('click', function () {
      var v = getVideo();
      if (!v) return;
      // mantemos muted=true por padrão; se quiser som, o usuário pode ativar
      v.play().then(function () {
        hideFallback();
        btn.style.display = 'none';
        btn.setAttribute('aria-hidden', 'true');
      }).catch(function () {
        // mantém o botão visível
      });
    }, { once: false });
    // adiciona ao body — css do site posiciona esse botão centralizado
    document.body.appendChild(btn);
  }

  function tryPlay(video, onFail) {
    if (!video) return;
    // Tenta reproduzir. A promise resolve se autoplay for permitido (mesmo muted).
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        // autoplay funcionou
        hideFallback();
        var btn = getPlayBtn();
        if (btn) {
          btn.style.display = 'none';
          btn.setAttribute('aria-hidden', 'true');
        }
      }).catch(function (err) {
        // autoplay bloqueado
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
      // esperar canplay antes de tentar tocar (melhora chance de sucesso)
      var onCanplay = function () {
        video.removeEventListener('canplay', onCanplay);
        tryPlay(video);
      };
      video.addEventListener('canplay', onCanplay);
    } else {
      // se já tinha src, tentar tocar imediatamente
      tryPlay(video);
    }
  }

  function init() {
    var video = getVideo();
    if (!video) return;

    // Respeita usuários que pedem reduced-motion: não autoplay
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // Mostrar botão de play para dar escolha ao usuário
      showPlayButton();
      return;
    }

    // Se o vídeo já tem source[src], tentar tocar direto
    var hasSource = video.querySelector('source[src]');
    if (hasSource) {
      tryPlay(video, function () {
        showPlayButton();
      });
    } else {
      // Usa IntersectionObserver para lazy-load com rootMargin
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
        // fallback: carrega imediatamente
        loadAndTryPlay();
      }
    }

    // Se houver interação do usuário (mousemove/touchstart/keydown), alguns navegadores permitem tocar
    var wakeHandler = function () {
      try {
        // mantemos muted true para não disparar som sem permissão
        video.muted = true;
        video.play().then(function () {
          hideFallback();
          var btn = getPlayBtn();
          if (btn) {
            btn.style.display = 'none';
            btn.setAttribute('aria-hidden', 'true');
          }
        }).catch(function () {
          // sem sucesso, cria botão caso não exista
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

    // Se já existir o botão no HTML, ligar o listener (para quando o usuário clicar)
    var btnHtml = getPlayBtn();
    if (btnHtml) {
      btnHtml.addEventListener('click', function () {
        // Ao clicar no botão de play criado no HTML, garantimos carregar a source e tocar
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
