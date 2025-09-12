(function () {
  'use strict';

  // Config
  const CONFIG = {
    videoSelector: '#heroVideo',
    fallbackSelector: '#heroFallback',
    playButtonSelector: '#heroPlayButton',
    loadingSelector: '#videoLoading',
    intersection: { threshold: 0.15, rootMargin: '250px' },
    loadTimeout: 10000,
    autoplayDelay: 400
  };

  // Estado global
  const state = {
    loaded: false,
    playing: false,
    intersectionSeen: false,
    userInteracted: false,
    reducedMotion: false,
    saveData: false,
    isMobile: false,
    inFlightLoad: false
  };

  // Helpers
  const q = sel => document.querySelector(sel);
  const log = (msg, type = 'info') => {
    const tag = '[HeroVideo]';
    if (type === 'error') console.error(tag, msg);
    else if (type === 'warn') console.warn(tag, msg);
    else console.log(tag, msg);
  };

  function detectEnvironment() {
    try {
      state.reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) {
      state.reducedMotion = false;
    }

    try {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
      if (conn) {
        state.saveData = !!(conn.saveData || (conn.effectiveType && /2g|slow-2g/i.test(conn.effectiveType)));
      } else {
        state.saveData = false;
      }
    } catch (e) {
      state.saveData = false;
    }

    try {
      state.isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    } catch (e) {
      state.isMobile = false;
    }
  }

  // Converte <source data-src="..."> em src e retorna Promise que resolve quando video pode play
  function loadVideoSources(video) {
    return new Promise((resolve, reject) => {
      if (!video) return reject(new Error('video element not found'));
      if (state.inFlightLoad) return reject(new Error('load already in progress'));

      const sources = Array.from(video.querySelectorAll('source[data-src]'));
      if (sources.length === 0) {
        return resolve(); // nada a fazer
      }

      state.inFlightLoad = true;

      sources.forEach(s => {
        const data = s.getAttribute('data-src');
        if (data) {
          s.src = data;
          s.removeAttribute('data-src');
        }
      });

      // força o browser a recarregar as fontes
      try { video.load(); } catch (e) { /* ignore */ }

      let settled = false;
      const t = setTimeout(() => {
        if (!settled) {
          settled = true;
          state.inFlightLoad = false;
          reject(new Error('load timeout'));
        }
      }, CONFIG.loadTimeout);

      function cleanupListeners() {
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('canplaythrough', onCanPlayThrough);
        video.removeEventListener('error', onError);
        clearTimeout(t);
      }

      function onCanPlay() {
        if (settled) return;
        settled = true;
        state.inFlightLoad = false;
        cleanupListeners();
        resolve();
      }

      function onCanPlayThrough() {
        // canplaythrough é mais garantido, preferível quando disponível
        if (settled) return;
        settled = true;
        state.inFlightLoad = false;
        cleanupListeners();
        resolve();
      }

      function onError(e) {
        if (settled) return;
        settled = true;
        state.inFlightLoad = false;
        cleanupListeners();
        reject(new Error('video error while loading'));
      }

      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('canplaythrough', onCanPlayThrough);
      video.addEventListener('error', onError);
    });
  }

  // Utils de DOM
  function hideElement(el) { if (!el) return; el.style.display = 'none'; el.setAttribute && el.setAttribute('aria-hidden', 'true'); }
  function showElement(el, display = '') { if (!el) return; el.style.display = display; el.setAttribute && el.setAttribute('aria-hidden', 'false'); }

  // Manager
  const Manager = {
    video: null,
    fallback: null,
    playBtn: null,
    loading: null,
    observer: null,
    listeners: [],

    createPlayButton() {
      let btn = q(CONFIG.playButtonSelector);
      if (btn) return btn;

      // cria um botão acessível se não existir
      btn = document.createElement('button');
      btn.id = CONFIG.playButtonSelector.replace('#', '') || 'heroPlayButton';
      btn.className = 'hero-play-button';
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Reproduzir vídeo');
      // conteúdo visual mínimo; em produção use SVG/icone
      btn.textContent = '▶';
      // tenta inserir antes do vídeo se possível
      try {
        if (this.video && this.video.parentNode) {
          this.video.parentNode.insertBefore(btn, this.video);
        } else {
          document.body.appendChild(btn);
        }
      } catch (e) {
        document.body.appendChild(btn);
      }
      return btn;
    },

    init() {
      // guardar referências
      this.video = q(CONFIG.videoSelector);
      this.fallback = q(CONFIG.fallbackSelector);
      this.loading = q(CONFIG.loadingSelector);
      this.playBtn = q(CONFIG.playButtonSelector) || this.createPlayButton();

      if (!this.video) {
        log('Video não encontrado: abortando inicialização', 'warn');
        return false;
      }

      // Acessibilidade: associe botão ao vídeo
      try {
        if (this.playBtn && this.video.id) {
          this.playBtn.setAttribute('aria-controls', this.video.id);
        }
      } catch (e) { /* ignore */ }

      // Se usuário preferiu reduzir movimento ou save-data, não tentaremos autoplay
      if (state.reducedMotion || state.saveData) {
        log('Reduced-motion ou Save-Data ativo: não tentar autoplay', 'info');
      }

      this.setupListeners();
      this.createObserver();

      return true;
    },

    createObserver() {
      // guarda observer para eventual destroy
      if (this.observer) return;

      if (!('IntersectionObserver' in window)) {
        // sem observer: carrega imediatamente se apropriado
        log('IntersectionObserver não suportado — carregando imediatamente', 'warn');
        this.onIntersect();
        return;
      }

      try {
        this.observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= (CONFIG.intersection.threshold || 0)) {
              this.onIntersect();
            }
          });
        }, CONFIG.intersection);

        this.observer.observe(this.video);
      } catch (e) {
        log('Erro criando IntersectionObserver: ' + e.message, 'warn');
        // fallback
        this.onIntersect();
      }
    },

    onIntersect() {
      if (state.intersectionSeen) return;
      state.intersectionSeen = true;

      // Se reduzido ou save-data, não carrega automaticamente
      if (state.reducedMotion || state.saveData) {
        log('skip load on intersect due to reduced-motion or save-data', 'info');
        return;
      }

      // tenta carregar sources
      loadVideoSources(this.video).then(() => {
        state.loaded = true;
        log('Sources do vídeo carregadas com sucesso', 'info');

        // tenta autoplay se o usuário não interagiu e não há preferência por reduzir movimento
        if (!state.userInteracted && !state.reducedMotion) {
          // pequena pausa para permitir que layout já esteja pronto
          setTimeout(() => {
            // Only try autoplay if video element supports it
            if (!this.video) return;
            this.video.muted = true; // mutar para aumentar chances de autoplay
            const playPromise = this.video.play && this.video.play();
            if (playPromise && typeof playPromise.then === 'function') {
              playPromise.then(() => {
                state.playing = true;
                if (this.fallback) hideElement(this.fallback);
                if (this.playBtn) hideElement(this.playBtn);
                log('Autoplay iniciado', 'info');
              }).catch(err => {
                // autoplay falhou (normal em navegadores que exigem interação)
                log('Autoplay falhou: ' + (err && err.message), 'warn');
                // mostra botão para que usuário possa iniciar
                if (this.playBtn) showElement(this.playBtn);
                // restaura muted se não quisermos vídeo mudo depois do clique
              });
            }
          }, CONFIG.autoplayDelay);
        } else {
          // mostra botão de play para interação do usuário
          if (this.playBtn) showElement(this.playBtn);
        }
      }).catch(err => {
        log('Erro carregando sources: ' + (err && err.message), 'warn');
        // mostra fallback e botão
        if (this.fallback) showElement(this.fallback);
        if (this.playBtn) showElement(this.playBtn);
      });
    },

    setupListeners() {
      // Guard rails
      if (!this.video) return;

      // Play button handler (user gesture)
      if (this.playBtn) {
        const onPlayBtnClick = (e) => {
          e && e.preventDefault && e.preventDefault();
          state.userInteracted = true;

          // guard: se já está carregando, não iniciar outro
          if (state.inFlightLoad) {
            log('load já em andamento; aguardando', 'info');
            return;
          }

          loadVideoSources(this.video).catch(err => {
            log('Erro carregando sources no click: ' + (err && err.message), 'warn');
          }).finally(() => {
            try { showElement(this.video); } catch (e) { /* ignore */ }
            // tenta play (com muted=false para som se permitido)
            try {
              // preferir tentar tocar sem muted se user clicou
              this.video.muted = false;
              const p = this.video.play && this.video.play();
              if (p && typeof p.then === 'function') {
                p.then(() => {
                  state.playing = true;
                  if (this.fallback) hideElement(this.fallback);
                  if (this.playBtn) {
                    hideElement(this.playBtn);
                    this.playBtn.setAttribute('aria-pressed', 'true');
                  }
                }).catch(err => {
                  log('Erro ao tentar play após clique: ' + (err && err.message), 'error');
                });
              }
            } catch (errPlay) {
              log('Erro ao tentar play: ' + (errPlay && errPlay.message), 'error');
            }
          });
        };

        this.playBtn.addEventListener('click', onPlayBtnClick);
        this.listeners.push({ el: this.playBtn, type: 'click', fn: onPlayBtnClick });
      }

      // Fallback click -> forward to play button
      if (this.fallback && this.playBtn) {
        const onFallbackClick = (e) => {
          e && e.preventDefault && e.preventDefault();
          // se botão existe, aciona
          try { this.playBtn && this.playBtn.click(); } catch (e) { /* ignore */ }
        };
        this.fallback.addEventListener('click', onFallbackClick);
        this.listeners.push({ el: this.fallback, type: 'click', fn: onFallbackClick });

        // tornar fallback keyboard-accessible se não estiver
        try {
          if (!this.fallback.hasAttribute('tabindex')) this.fallback.setAttribute('tabindex', '0');
          if (!this.fallback.getAttribute('role')) this.fallback.setAttribute('role', 'button');
          this.fallback.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              onFallbackClick(ev);
            }
          });
        } catch (e) { /* ignore */ }
      }

      // Pause/resume on visibility change
      const onVisibility = () => {
        if (!this.video) return;
        if (document.hidden && state.playing) {
          try { this.video.pause(); } catch (e) { /* ignore */ }
        } else if (!document.hidden && state.userInteracted && !state.reducedMotion) {
          try { this.video.play && this.video.play().catch(() => { }); } catch (e) { /* ignore */ }
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      this.listeners.push({ el: document, type: 'visibilitychange', fn: onVisibility });

      // Optional: cleanup when video is removed from DOM
      const mutationHandler = (mutations) => {
        for (const m of mutations) {
          if (m.removedNodes && m.removedNodes.length) {
            for (const n of m.removedNodes) {
              if (n === this.video) {
                // video removed — destroy manager
                this.destroy();
                return;
              }
            }
          }
        }
      };
      try {
        const mo = new MutationObserver(mutationHandler);
        mo.observe(document.body || document.documentElement, { childList: true, subtree: true });
        // store so we can disconnect later
        this._mutationObserver = mo;
      } catch (e) {
        // ignore if not available
      }
    },

    // Remove listeners/observer/obras para evitar leaks
    destroy() {
      // remove listeners
      (this.listeners || []).forEach(item => {
        try { item.el.removeEventListener(item.type, item.fn); } catch (e) { /* ignore */ }
      });
      this.listeners = [];

      // disconnect intersection observer
      if (this.observer) {
        try { this.observer.disconnect(); } catch (e) { /* ignore */ }
        this.observer = null;
      }

      // disconnect mutation observer
      if (this._mutationObserver) {
        try { this._mutationObserver.disconnect(); } catch (e) { /* ignore */ }
        this._mutationObserver = null;
      }

      // null references
      this.video = null;
      this.fallback = null;
      this.playBtn = null;
      this.loading = null;

      // reset state flags if necessário
      state.loaded = false;
      state.playing = false;
      state.intersectionSeen = false;
      state.inFlightLoad = false;

      log('Manager destruído e listeners removidos', 'info');
    }
  };

  // Inicializa quando DOM pronto
  function boot() {
    detectEnvironment();
    Manager.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Expor para debug em localhost/127.0.0.1
  try {
    if (window.location && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      window.HeroVideoManager = { Manager, state };
      log('HeroVideoManager exposto em window.HeroVideoManager (apenas localhost)', 'info');
    }
  } catch (e) { /* ignore */ }

})();
