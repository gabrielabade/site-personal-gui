// Tips page functionality
document.addEventListener('DOMContentLoaded', function () {

  // Category filtering
  const categoryBtns = document.querySelectorAll('.category-btn');
  const tipCards = document.querySelectorAll('.tip-card, .featured-tip');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      // Filter tips
      tipCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Read tip functionality
  const readBtns = document.querySelectorAll('[data-tip]');
  const modal = document.getElementById('tipModal');
  const modalBody = modal.querySelector('.modal-body');
  const closeModal = modal.querySelector('.modal-close');

  // Tip content database
  const tipContent = {
    'agachamento': {
      title: 'Como fazer o agachamento perfeito',
      category: 'Treino',
      content: `
                <h2>Como fazer o agachamento perfeito</h2>
                <img src="images/agachamento-completo.jpg" alt="Agachamento passo a passo" style="width: 100%; border-radius: 10px; margin-bottom: 2rem;">
                
                <h3>🎯 Por que o agachamento é fundamental?</h3>
                <p>O agachamento é considerado o "rei dos exercícios" porque:</p>
                <ul>
                    <li>✅ Trabalha grandes grupos musculares (quadríceps, glúteos, posterior)</li>
                    <li>✅ Melhora a mobilidade de quadril e tornozelo</li>
                    <li>✅ Fortalece o core naturalmente</li>
                    <li>✅ Movimentação funcional do dia a dia</li>
                </ul>
                
                <h3>🏋️ Técnica correta passo a passo</h3>
                <ol>
                    <li><strong>Posicionamento dos pés:</strong> Largura dos ombros, pés levemente para fora</li>
                    <li><strong>Postura:</strong> Peito aberto, olhar à frente, core ativado</li>
                    <li><strong>Descida:</strong> Empurre o quadril para trás, joelhos seguem a linha dos pés</li>
                    <li><strong>Profundidade:</strong> Desça até o quadril ficar abaixo da linha dos joelhos</li>
                    <li><strong>Subida:</strong> Empurre o chão com os pés, quadril à frente</li>
                </ol>
                
                <h3>❌ Erros mais comuns</h3>
                <div style="background: #fef2f2; padding: 1.5rem; border-radius: 10px; margin: 1rem 0;">
                    <ul>
                        <li>🚫 Joelhos para dentro (valgo)</li>
                        <li>🚫 Peso na ponta dos pés</li>
                        <li>🚫 Perder a curvatura lombar</li>
                        <li>🚫 Não descer o suficiente</li>
                        <li>🚫 Subir primeiro o quadril</li>
                    </ul>
                </div>
                
                <h3>📈 Progressões</h3>
                <p><strong>Iniciante:</strong> Agachamento no banco → Agachamento livre</p>
                <p><strong>Intermediário:</strong> Adicionar peso (halteres, kettlebell)</p>
                <p><strong>Avançado:</strong> Barra livre, agachamento búlgaro, pistol squat</p>
                
                <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 10px; margin-top: 2rem;">
                    <h4>💡 Dica do Guilherme:</h4>
                    <p>"Pratique primeiro sem peso até dominar completamente a técnica. Um agachamento perfeito sem peso vale mais que um agachamento mal feito com carga!"</p>
                </div>
            `
    },
    'flexao': {
      title: '5 variações de flexão para todos os níveis',
      category: 'Treino',
      content: `
                <h2>5 variações de flexão para todos os níveis</h2>
                <img src="images/flexoes-variacoes.jpg" alt="Variações de flexão" style="width: 100%; border-radius: 10px; margin-bottom: 2rem;">
                
                <p>A flexão é um dos exercícios mais versáteis que existem. Aqui estão 5 variações organizadas por dificuldade:</p>
                
                <h3>1️⃣ Flexão Inclinada (Iniciante)</h3>
                <p><strong>Como fazer:</strong> Mãos apoiadas em banco, escada ou parede</p>
                <ul>
                    <li>Quanto mais alto o apoio, mais fácil</li>
                    <li>Mantenha o corpo alinhado</li>
                    <li>3 séries de 8-15 repetições</li>
                </ul>
                
                <h3>2️⃣ Flexão de Joelhos (Iniciante/Intermediário)</h3>
                <p><strong>Como fazer:</strong> Apoie os joelhos no chão</p>
                <ul>
                    <li>Mantenha quadril, tronco e cabeça alinhados</li>
                    <li>Descida controlada até o peito quase tocar o chão</li>
                    <li>3 séries de 10-20 repetições</li>
                </ul>
                
                <h3>3️⃣ Flexão Tradicional (Intermediário)</h3>
                <p><strong>Como fazer:</strong> Posição de prancha, descer e subir</p>
                <ul>
                    <li>Mãos na linha dos ombros</li>
                    <li>Core bem ativado</li>
                    <li>3 séries de 8-20 repetições</li>
                </ul>
                
                <h3>4️⃣ Flexão Declinada (Intermediário/Avançado)</h3>
                <p><strong>Como fazer:</strong> Pés elevados em banco ou step</p>
                <ul>
                    <li>Maior ativação do peitoral superior</li>
                    <li>Movimento mais desafiador</li>
                    <li>3 séries de 6-15 repetições</li>
                </ul>
                
                <h3>5️⃣ Flexão Diamante (Avançado)</h3>
                <p><strong>Como fazer:</strong> Mãos formando um diamante</p>
                <ul>
                    <li>Foco maior no tríceps</li>
                    <li>Requer mais força e estabilidade</li>
                    <li>3 séries de 5-12 repetições</li>
                </ul>
                
                <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 10px; margin-top: 2rem;">
                    <h4>🎯 Programa de Progressão:</h4>
                    <p><strong>Semana 1-2:</strong> Flexão inclinada<br>
                    <strong>Semana 3-4:</strong> Flexão de joelhos<br>
                    <strong>Semana 5-6:</strong> Flexão tradicional<br>
                    <strong>Semana 7+:</strong> Variações avançadas</p>
                </div>
            `
    },
    'proteina': {
      title: 'Quantas proteínas consumir por dia?',
      category: 'Nutrição',
      content: `
                <h2>Quantas proteínas consumir por dia?</h2>
                <img src="images/proteinas-alimentos.jpg" alt="Fontes de proteína" style="width: 100%; border-radius: 10px; margin-bottom: 2rem;">
                
                <h3>🎯 Quantidade recomendada por objetivo:</h3>
                
                <div style="display: grid; gap: 1rem; margin: 2rem 0;">
                    <div style="background: #f8fafc; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #3b82f6;">
                        <h4>💪 Ganho de massa muscular</h4>
                        <p><strong>1,6 a 2,2g por kg de peso corporal</strong></p>
                        <p>Exemplo: Pessoa de 70kg = 112g a 154g de proteína/dia</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #10b981;">
                        <h4>🔥 Perda de gordura</h4>
                        <p><strong>1,8 a 2,5g por kg de peso corporal</strong></p>
                        <p>Maior quantidade ajuda a preservar massa muscular em déficit calórico</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #f59e0b;">
                        <h4>🏃 Manutenção/Saúde geral</h4>
                        <p><strong>1,2 a 1,6g por kg de peso corporal</strong></p>
                        <p>Suficiente para manter massa muscular e saúde</p>
                    </div>
                </div>
                
                <h3>🥩 Melhores fontes de proteína:</h3>
                
                <h4>Proteínas animais (completas):</h4>
                <ul>
                    <li>🐔 Frango: 25g por 100g</li>
                    <li>🥩 Carne vermelha magra: 26g por 100g</li>
                    <li>🐟 Peixes: 20-25g por 100g</li>
                    <li>🥚 Ovos: 13g por 2 unidades grandes</li>
                    <li>🥛 Whey protein: 20-30g por dose</li>
                </ul>
                
                <h4>Proteínas vegetais:</h4>
                <ul>
                    <li>🫘 Feijão: 6g por 100g cozido</li>
                    <li>🌰 Lentilha: 9g por 100g cozida</li>
                    <li>🥜 Amendoim: 26g por 100g</li>
                    <li>🌱 Quinoa: 4,4g por 100g cozida</li>
                    <li>🧀 Tofu: 8g por 100g</li>
                </ul>
                
                <h3>⏰ Distribuição ao longo do dia:</h3>
                <p>Idealmente, distribua em 4-5 refeições com 20-40g por refeição para otimizar a síntese proteica.</p>
                
                <div style="background: #fef3c7; padding: 1.5rem; border-radius: 10px; margin-top: 2rem;">
                    <h4>⚠️ Atenção:</h4>
                    <p>Essas são diretrizes gerais. Para um plano personalizado considerando suas particularidades, agende uma consultoria nutricional!</p>
                </div>
            `
    }
    // Adicione mais conteúdos conforme necessário
  };

  readBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tipId = btn.dataset.tip;
      const content = tipContent[tipId];

      if (content) {
        modalBody.innerHTML = content.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Load more tips functionality
  const loadMoreBtn = document.querySelector('.load-more-tips');
  let currentTipCount = 9; // Initial number of visible tips

  loadMoreBtn.addEventListener('click', () => {
    // Simulate loading more tips
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';

    setTimeout(() => {
      // Add more tips here (you can fetch from server or add statically)
      currentTipCount += 6;

      loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Carregar mais dicas';

      // Hide button if no more tips
      if (currentTipCount >= 20) {
        loadMoreBtn.style.display = 'none';
      }
    }, 1000);
  });

  // Video play functionality
  const videoItems = document.querySelectorAll('.video-item');

  videoItems.forEach(item => {
    item.addEventListener('click', () => {
      // You can implement video modal or redirect to video page
      const videoTitle = item.querySelector('h3').textContent;
      alert(`Função de vídeo será implementada: ${videoTitle}`);
    });
  });

  // Animate tips on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const tipsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.tip-card, .quick-tip, .video-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    tipsObserver.observe(item);
  });
});

// Smooth scrolling for category navigation
function scrollToTips() {
  document.querySelector('.tips-grid-section').scrollIntoView({
    behavior: 'smooth'
  });
}

// Search functionality (if you want to add a search bar)
function searchTips(query) {
  const tips = document.querySelectorAll('.tip-card');
  const searchTerm = query.toLowerCase();

  tips.forEach(tip => {
    const title = tip.querySelector('h3').textContent.toLowerCase();
    const content = tip.querySelector('p').textContent.toLowerCase();

    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      tip.style.display = 'block';
    } else {
      tip.style.display = 'none';
    }
  });
}
