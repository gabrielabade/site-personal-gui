(function () {
  'use strict';

  // Configurações centralizadas
  const CONFIG = {
    video: {
      selector: '#heroVideo',
      preload: 'none',
      autoplayDelay: 500,
      loadTimeout: 10000
    },
    fallback: {
      selector: '#heroFallback',
      hideDelay: 500
    },
    playButton: {
      selector: '#heroPlayButton',
      className: 'hero-play-button'
    },
    loading: {
      selector: '#videoLoading'
    },
    intersection: {
      threshold: 0.1,
      rootMargin: '200px'
    }
  };

  // Cache de elementos DOM
  const elements = new Map();

  // Estados globais
  const state = {
    videoLoaded: false,
    videoPlaying: false,
    intersectionTriggered: false,
    userInteracted: false,
    isMobile: false,
    reducedMotion: false
  };

  // Utilitários
  const utils = {
    // Cache de elementos DOM
    getElement(selector) {
      if (!elements.has(selector)) {
        elements.set(selector, document.querySelector(selector));
      }
      return elements.get(selector);
    },

    // Detectar dispositivo móvel
    checkMobile() {
      state.isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Verificar preferências de movimento reduzido
    checkReducedMotion() {
      state.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // Animar elemento com classe
    animateElement(element, className, show = true) {
      if (!element) return;

      if (show) {
        element.style.display = '';
        element.classList.add(className);
        element.classList.remove('hidden');
      } else {
        element.classList.remove(className);
        element.classList.add('hidden');
        setTimeout(() => {
          if (element.classList.contains('hidden')) {
            element.style.display = 'none';
          }
        }, CONFIG.fallback.hideDelay);
      }
    },

    // Criar promise para eventos de carregamento
    createLoadPromise(element, eventType, timeout = CONFIG.video.loadTimeout) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(`${eventType} timeout após ${timeout}ms`));
        }, timeout);

        const successHandler = () => {
          clearTimeout(timer);
          element.removeEventListener(eventType, successHandler);
          element.removeEventListener('error', errorHandler);
          resolve();
        };

        const errorHandler = (error) => {
          clearTimeout(timer);
          element.removeEventListener(eventType, successHandler);
          element.removeEventListener('error', errorHandler);
          reject(error);
        };

        element.addEventListener(eventType, successHandler, { once: true });
        element.addEventListener('error', errorHandler, { once: true });
      });
    },

    // Debounce para otimizar eventos
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Logger com timestamp
    log(message, type = 'info') {
      const timestamp = new Date().toLocaleTimeString();
      const prefix = `[HeroVideo ${timestamp}]`;

      switch (type) {
        case 'error':
          console.error(`${prefix} ❌`, message);
          break;
        case 'warn':
          console.warn(`${prefix} ⚠️`, message);
          break;
        case 'success':
          console.log(`${prefix} ✅`, message);
          break;
        default:
          console.log(`${prefix} ℹ️`, message);
      }
    }
  };

  // Gerenciador de vídeo
  const VideoManager = {
    video: null,

    init() {
      this.video = utils.getElement(CONFIG.video.selector);
      if (!this.video) {
        utils.log('Elemento de vídeo não encontrado', 'error');
        return false;
      }

      this.setupVideo();
      this.attachEventListeners();
      utils.log('VideoManager inicializado');
      return true;
    },

    setupVideo() {
      // Configurar atributos otimizados
      this.video.preload = CONFIG.video.preload;
      this.video.muted = true; // Essencial para autoplay
      this.video.playsInline = true;
      this.video.setAttribute('playsinline', ''); // iOS Safari

      // Otimização para performance
      if ('requestVideoFrameCallback' in this.video) {
        this.video.requestVideoFrameCallback(() => {
          utils.log('Video frame callback disponível');
        });
      }
    },

    attachEventListeners() {
      // Evento: vídeo começou a carregar
      this.video.addEventListener('loadstart', () => {
        utils.log('Carregamento iniciado');
        this.showLoading();
      });

      // Evento: metadados carregados
      this.video.addEventListener('loadedmetadata', () => {
        utils.log('Metadados carregados');
      });

      // Evento: pode começar a reproduzir
      this.video.addEventListener('canplay', () => {
        utils.log('Vídeo pronto para reprodução', 'success');
        state.videoLoaded = true;
        this.hideLoading();
        this.video.classList.add('loaded');
      });

      // Evento: reproduzindo
      this.video.addEventListener('playing', () => {
        utils.log('Vídeo reproduzindo', 'success');
        state.videoPlaying = true;
        this.hideFallback();
        PlayButtonManager.hide();
      });

      // Evento: pausado
      this.video.addEventListener('pause', () => {
        utils.log('Vídeo pausado');
        state.videoPlaying = false;
      });

      // Evento: erro
      this.video.addEventListener('error', (e) => {
        const error = this.video.error;
        utils.log(`Erro no vídeo: ${error ? error.message : 'Erro desconhecido'}`, 'error');
        this.handleError();
      });

      // Evento: aguardando dados
      this.video.addEventListener('waiting', () => {
        utils.log('Vídeo aguardando dados...');
      });

      // Evento: pode reproduzir completamente
      this.video.addEventListener('canplaythrough', () => {
        utils.log('Vídeo pode reproduzir completamente');
      });
    },

    async load() {
      if (state.videoLoaded) return Promise.resolve();

      try {
        utils.log('Iniciando carregamento do vídeo...');
        this.video.preload = 'auto';
        this.video.load();

        await utils.createLoadPromise(this.video, 'canplay');
        utils.log('Vídeo carregado com sucesso', 'success');
        return Promise.resolve();
      } catch (error) {
        utils.log(`Falha no carregamento: ${error.message}`, 'error');
        throw error;
      }
    },

    async play() {
      try {
        if (!state.videoLoaded) {
          await this.load();
        }

        // Garantir que está mudo para autoplay
        this.video.muted = true;

        utils.log('Tentando reproduzir vídeo...');
        await this.video.play();

        utils.log('Vídeo reproduzindo com sucesso', 'success');
        return true;
      } catch (error) {
        utils.log(`Falha na reprodução: ${error.message}`, 'warn');
        PlayButtonManager.show();
        return false;
      }
    },

    pause() {
      if (this.video && state.videoPlaying) {
        this.video.pause();
      }
    },

    showLoading() {
      const loading = utils.getElement(CONFIG.loading.selector);
      utils.animateElement(loading, 'visible', true);
    },

    hideLoading() {
      const loading = utils.getElement(CONFIG.loading.selector);
      utils.animateElement(loading, 'visible', false);
    },

    hideFallback() {
      const fallback = utils.getElement(CONFIG.fallback.selector);
      utils.animateElement(fallback, 'hidden', false);
    },

    showFallback() {
      const fallback = utils.getElement(CONFIG.fallback.selector);
      utils.animateElement(fallback, 'hidden', false);
    },

    handleError() {
      utils.log('Tratando erro do vídeo...', 'error');
      this.hideLoading();
      PlayButtonManager.hide();
      this.showFallback();

      // Reportar erro se analytics disponível
      if (typeof gtag !== 'undefined') {
        gtag('event', 'video_error', {
          event_category: 'Hero Video',
          event_label: 'Load Failed'
        });
      }
    }
  };

  // Gerenciador do botão de play
  const PlayButtonManager = {
    button: null,

    init() {
      this.button = utils.getElement(CONFIG.playButton.selector);
      if (!this.button) {
        this.createButton();
      }

      if (this.button) {
        this.attachEventListener();
        utils.log('PlayButtonManager inicializado');
      }
    },

    createButton() {
      utils.log('Criando botão de play dinamicamente...');

      this.button = document.createElement('button');
      this.button.id = 'heroPlayButton';
      this.button.className = CONFIG.playButton.className;
      this.button.setAttribute('aria-label', 'Reproduzir vídeo');
      this.button.innerHTML = '<i class="fas fa-play"></i>';

      // Adicionar ao hero
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.appendChild(this.button);
        elements.set(CONFIG.playButton.selector, this.button);
      }
    },

    attachEventListener() {
      if (!this.button) return;

      this.button.addEventListener('click', async (e) => {
        e.preventDefault();
        utils.log('Botão de play clicado');

        // Feedback visual imediato
        this.button.style.transform = 'translate(-50%, -50%) scale(0.95)';
        setTimeout(() => {
          this.button.style.transform = '';
        }, 150);

        try {
          const success = await VideoManager.play();
          if (success) {
            state.userInteracted = true;
          }
        } catch (error) {
          utils.log(`Erro ao reproduzir via botão: ${error.message}`, 'error');
        }
      });
    },

    show() {
      if (this.button) {
        utils.animateElement(this.button, 'visible', true);
        utils.log('Botão de play mostrado');
      }
    },

    hide() {
      if (this.button) {
        utils.animateElement(this.button, 'visible', false);
        utils.log('Botão de play oculto');
      }
    }
  };

  // Gerenciador de intersecção (lazy loading)
  const IntersectionManager = {
    observer: null,

    init() {
      if (!('IntersectionObserver' in window)) {
        utils.log('IntersectionObserver não suportado, carregando imediatamente', 'warn');
        this.loadVideo();
        return;
      }

      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          root: null,
          rootMargin: CONFIG.intersection.rootMargin,
          threshold: CONFIG.intersection.threshold
        }
      );

      const video = VideoManager.video;
      if (video) {
        this.observer.observe(video);
        utils.log('IntersectionObserver configurado');
      }
    },

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !state.intersectionTriggered) {
          utils.log('Vídeo entrou na viewport, iniciando carregamento...', 'success');
          state.intersectionTriggered = true;
          this.loadVideo();
          this.observer.disconnect();
        }
      });
    },

    async loadVideo() {
      try {
        await VideoManager.load();

        // Decidir se deve tentar autoplay
        const shouldAutoplay = this.shouldAttemptAutoplay();

        if (shouldAutoplay) {
          setTimeout(async () => {
            const success = await VideoManager.play();
            if (!success) {
              PlayButtonManager.show();
            }
          }, CONFIG.video.autoplayDelay);
        } else {
          PlayButtonManager.show();
        }
      } catch (error) {
        utils.log(`Erro no carregamento via intersecção: ${error.message}`, 'error');
        VideoManager.handleError();
      }
    },

    shouldAttemptAutoplay() {
      // Não tentar autoplay em mobile para economizar dados
      if (state.isMobile) {
        utils.log('Mobile detectado, mostrando botão de play');
        return false;
      }

      // Respeitar preferências de movimento reduzido
      if (state.reducedMotion) {
        utils.log('Movimento reduzido detectado, mostrando botão de play');
        return false;
      }

      // Verificar se conexão é lenta
      if ('connection' in navigator) {
        const conn = navigator.connection;
        if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
          utils.log('Conexão lenta detectada, mostrando botão de play');
          return false;
        }
      }

      return true;
    }
  };

  // Gerenciador de eventos globais
  const EventManager = {
    init() {
      this.setupUserInteractionHandlers();
      this.setupVisibilityHandlers();
      this.setupResizeHandlers();
      utils.log('EventManager inicializado');
    },

    setupUserInteractionHandlers() {
      const events = ['click', 'touchstart', 'keydown'];
      const handler = () => {
        state.userInteracted = true;

        // Tentar reproduzir vídeo após primeira interação
        if (state.videoLoaded && !state.videoPlaying) {
          VideoManager.play();
        }

        // Remover listeners após primeira interação
        events.forEach(event => {
          document.removeEventListener(event, handler);
        });

        utils.log('Primeira interação do usuário detectada');
      };

      events.forEach(event => {
        document.addEventListener(event, handler, { passive: true, once: true });
      });
    },

    setupVisibilityHandlers() {
      // Pausar vídeo quando página não está visível (economizar recursos)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && state.videoPlaying) {
          VideoManager.pause();
          utils.log('Página oculta, vídeo pausado');
        } else if (!document.hidden && state.userInteracted && state.videoLoaded) {
          VideoManager.play();
          utils.log('Página visível, retomando vídeo');
        }
      });
    },

    setupResizeHandlers() {
      const debouncedResize = utils.debounce(() => {
        const wasMobile = state.isMobile;
        utils.checkMobile();

        // Se mudou de desktop para mobile durante reprodução
        if (!wasMobile && state.isMobile && state.videoPlaying) {
          VideoManager.pause();
          PlayButtonManager.show();
          utils.log('Mudança para mobile detectada, pausando vídeo');
        }
      }, 250);

      window.addEventListener('resize', debouncedResize, { passive: true });
    }
  };

  // Gerenciador de performance
  const PerformanceManager = {
    startTime: performance.now(),

    init() {
      this.monitorCoreWebVitals();
      this.logInitializationTime();
    },

    logInitializationTime() {
      const initTime = performance.now() - this.startTime;
      utils.log(`Inicialização completada em ${initTime.toFixed(2)}ms`);
    },

    monitorCoreWebVitals() {
      // Monitorar CLS (Cumulative Layout Shift)
      if ('PerformanceObserver' in window) {
        try {
          new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                utils.log(`Layout Shift detectado: ${entry.value.toFixed(4)}`);
              }
            });
          }).observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
          // PerformanceObserver não suportado completamente
        }
      }

      // Monitorar tempo de carregamento total
      window.addEventListener('load', () => {
        setTimeout(() => {
          if ('performance' in window && performance.getEntriesByType) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
              const loadTime = perfData.loadEventEnd - perfData.fetchStart;
              utils.log(`Página carregada em ${loadTime.toFixed(0)}ms`, 'success');
            }
          }
        }, 0);
      });
    }
  };

  // Inicialização principal
  function initialize() {
    utils.log('Iniciando Hero Video Manager...');

    // Verificar estados iniciais
    utils.checkMobile();
    utils.checkReducedMotion();

    // Inicializar gerenciadores na ordem correta
    PerformanceManager.init();

    if (VideoManager.init()) {
      PlayButtonManager.init();
      IntersectionManager.init();
      EventManager.init();

      utils.log('Todos os gerenciadores inicializados com sucesso', 'success');
    } else {
      utils.log('Falha na inicialização do VideoManager', 'error');
    }
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Expor API pública para debug (apenas em desenvolvimento)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.HeroVideoDebug = {
      VideoManager,
      PlayButtonManager,
      state,
      utils
    };
    utils.log('Debug API exposta em window.HeroVideoDebug');
  }

})();