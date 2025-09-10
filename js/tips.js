document.addEventListener('DOMContentLoaded', function () {

  // ---------- Conteúdos das dicas (conteúdo de qualidade para SEO) ----------
  const tipsContent = {
    'agachamento': {
      title: 'Como executar o agachamento perfeito - Técnica completa',
      category: 'treino',
      content: `
        <p><strong>O agachamento é considerado o "rei dos exercícios"</strong> por trabalhar grandes grupos musculares e oferecer benefícios únicos para força, hipertrofia e funcionalidade. Dominar sua técnica é fundamental para resultados seguros e eficazes.</p>
        
        <h3>🎯 Músculos Trabalhados</h3>
        <ul>
          <li><strong>Primários:</strong> Quadríceps, glúteos, isquiotibiais</li>
          <li><strong>Secundários:</strong> Core, panturrilhas, eretores da coluna</li>
          <li><strong>Estabilizadores:</strong> Músculos do tornozelo e quadril</li>
        </ul>

        <h3>📋 Execução Passo a Passo</h3>
        <ol>
          <li><strong>Posição inicial:</strong> Pés na largura dos ombros, pontas ligeiramente voltadas para fora (15-30°)</li>
          <li><strong>Postura:</strong> Peito erguido, olhar para frente, ombros para trás</li>
          <li><strong>Descida:</strong> Inicie o movimento empurrando o quadril para trás, como se fosse sentar numa cadeira</li>
          <li><strong>Joelhos:</strong> Mantenha-os alinhados com os pés, sem deixar "cair para dentro"</li>
          <li><strong>Profundidade:</strong> Desça até que as coxas atinjam paralelo ao chão (ou máximo da sua mobilidade)</li>
          <li><strong>Subida:</strong> Empurre o chão com os calcanhares, mantendo o tronco estável</li>
        </ol>

        <h3>⚠️ Erros Mais Comuns</h3>
        <ul>
          <li>Joelhos colapsando para dentro (valgo dinâmico)</li>
          <li>Inclinar excessivamente o tronco para frente</li>
          <li>Não ativar adequadamente o core</li>
          <li>Forçar profundidade sem mobilidade adequada</li>
          <li>Transferir peso para os dedos dos pés</li>
        </ul>

        <h3>🔄 Progressões por Nível</h3>
        <p><strong>Iniciante:</strong> Agachamento no banco → Agachamento livre corpo</p>
        <p><strong>Intermediário:</strong> Agachamento com halteres → Agachamento goblet</p>
        <p><strong>Avançado:</strong> Agachamento com barra → Front squat → Overhead squat</p>

        <h3>💡 Dicas de Respiração</h3>
        <ul>
          <li>Inspire profundamente no topo, segure durante a descida</li>
          <li>Mantenha a respiração na parte inferior</li>
          <li>Expire durante a subida, após passar o ponto mais difícil</li>
        </ul>

        <h3>🎯 Benefícios do Agachamento</h3>
        <ul>
          <li>Melhora força funcional para atividades diárias</li>
          <li>Aumenta densidade óssea</li>
          <li>Desenvolve estabilidade do core</li>
          <li>Alto gasto calórico</li>
          <li>Melhora mobilidade de quadril e tornozelo</li>
        </ul>
      `
    },

    'flexao': {
      title: '5 Variações de Flexão para Todos os Níveis - Guia Completo',
      category: 'treino',
      content: `
        <p><strong>A flexão é um exercício fundamental</strong> que trabalha peitoral, ombros, tríceps e core. Suas variações permitem progressão contínua e adaptação a diferentes níveis de condicionamento.</p>
        
        <h3>🎯 Músculos Trabalhados</h3>
        <ul>
          <li><strong>Primários:</strong> Peitoral maior, tríceps braquial, deltoides anterior</li>
          <li><strong>Secundários:</strong> Core, serrátil anterior, deltoides posterior</li>
          <li><strong>Estabilizadores:</strong> Músculos das costas e pernas</li>
        </ul>

        <h3>📈 5 Variações Progressivas</h3>
        
        <h4>1. Flexão no Joelho (Iniciante)</h4>
        <ul>
          <li>Apoie joelhos no chão, mantenha linha reta do joelho à cabeça</li>
          <li>Ideal para desenvolver força inicial</li>
          <li>Meta: 3 séries de 8-12 repetições</li>
        </ul>

        <h4>2. Flexão Inclinada (Iniciante-Intermediário)</h4>
        <ul>
          <li>Mãos apoiadas em superfície elevada (banco, parede)</li>
          <li>Quanto mais alto, mais fácil</li>
          <li>Permite progressão gradual diminuindo a altura</li>
        </ul>

        <h4>3. Flexão Padrão (Intermediário)</h4>
        <ul>
          <li>Corpo em prancha, linha reta dos calcanhares à cabeça</li>
          <li>Mãos na largura dos ombros</li>
          <li>Descer até quase tocar o peito no chão</li>
        </ul>

        <h4>4. Flexão Diamante (Intermediário-Avançado)</h4>
        <ul>
          <li>Mãos formam diamante com dedos indicadores e polegares</li>
          <li>Maior ativação do tríceps</li>
          <li>Mais desafiadora que a flexão padrão</li>
        </ul>

        <h4>5. Flexão Declinada (Avançado)</h4>
        <ul>
          <li>Pés elevados em superfície alta</li>
          <li>Maior ativação da porção superior do peitoral</li>
          <li>Aumenta significativamente a dificuldade</li>
        </ul>

        <h3>📋 Protocolo de Progressão</h3>
        <p><strong>Frequência:</strong> 3x por semana (dias alternados)</p>
        <p><strong>Volume:</strong> 3 séries de 8-12 repetições</p>
        <p><strong>Progressão:</strong> Quando conseguir 3x12 com técnica perfeita, avance para próxima variação</p>

        <h3>⚠️ Erros Comuns</h3>
        <ul>
          <li>Quadril muito alto ou muito baixo</li>
          <li>Não descer completamente</li>
          <li>Subir apenas com os braços (não ativar core)</li>
          <li>Respiração inadequada</li>
        </ul>

        <h3>💡 Dicas Para Maximizar Resultados</h3>
        <ul>
          <li>Controle a descida (2-3 segundos)</li>
          <li>Pause 1 segundo embaixo</li>
          <li>Subida explosiva</li>
          <li>Mantenha core sempre ativado</li>
          <li>Variação na largura das mãos trabalha músculos diferentes</li>
        </ul>
      `
    },

    'proteina': {
      title: 'Quantas Proteínas Consumir Por Dia - Guia Científico Completo',
      category: 'nutricao',
      content: `
        <p><strong>A proteína é o macronutriente mais importante</strong> para quem pratica exercícios, sendo essencial para recuperação muscular, síntese proteica e manutenção da massa magra.</p>
        
        <h3>🎯 Recomendações Por Objetivo</h3>
        
        <h4>Sedentários</h4>
        <ul>
          <li><strong>0,8-1g/kg de peso corporal</strong></li>
          <li>Manutenção básica das funções corporais</li>
          <li>Exemplo: 70kg = 56-70g de proteína/dia</li>
        </ul>

        <h4>Atividade Física Moderada</h4>
        <ul>
          <li><strong>1,2-1,6g/kg de peso corporal</strong></li>
          <li>Para praticantes regulares de exercícios</li>
          <li>Exemplo: 70kg = 84-112g de proteína/dia</li>
        </ul>

        <h4>Hipertrofia Muscular</h4>
        <ul>
          <li><strong>1,6-2,2g/kg de peso corporal</strong></li>
          <li>Máxima síntese proteica e ganho de massa</li>
          <li>Exemplo: 70kg = 112-154g de proteína/dia</li>
        </ul>

        <h4>Perda de Peso</h4>
        <ul>
          <li><strong>2,0-2,4g/kg de peso corporal</strong></li>
          <li>Preserva massa muscular em déficit calórico</li>
          <li>Maior saciedade</li>
        </ul>

        <h3>🥩 Melhores Fontes de Proteína</h3>
        
        <h4>Fontes Animais (Proteínas Completas)</h4>
        <ul>
          <li><strong>Carnes magras:</strong> frango, peixe, carne vermelha magra</li>
          <li><strong>Ovos:</strong> proteína de alto valor biológico</li>
          <li><strong>Laticínios:</strong> iogurte grego, queijo cottage, leite</li>
          <li><strong>Whey protein:</strong> rápida absorção</li>
        </ul>

        <h4>Fontes Vegetais</h4>
        <ul>
          <li><strong>Leguminosas:</strong> feijão, lentilha, grão-de-bico</li>
          <li><strong>Oleaginosas:</strong> castanhas, amendoim, amêndoas</li>
          <li><strong>Cereais:</strong> quinoa, aveia, arroz integral</li>
          <li><strong>Proteína vegetal:</strong> soja, ervilha, hemp</li>
        </ul>

        <h3>⏰ Timing da Proteína</h3>
        
        <h4>Distribuição Ideal</h4>
        <ul>
          <li><strong>20-40g por refeição</strong> para otimizar síntese proteica</li>
          <li><strong>3-4 refeições</strong> ao longo do dia</li>
          <li><strong>Intervalo de 3-4 horas</strong> entre as doses</li>
        </ul>

        <h4>Pré e Pós-Treino</h4>
        <ul>
          <li><strong>Pré-treino:</strong> 15-20g (não obrigatório)</li>
          <li><strong>Pós-treino:</strong> 20-40g dentro de 2 horas</li>
          <li><strong>Antes de dormir:</strong> caseína ou proteína de digestão lenta</li>
        </ul>

        <h3>📊 Exemplo Prático (70kg, hipertrofia)</h3>
        <p><strong>Meta diária:</strong> 140g de proteína</p>
        <ul>
          <li><strong>Café da manhã:</strong> 3 ovos + iogurte grego = 35g</li>
          <li><strong>Almoço:</strong> 150g frango grelhado = 35g</li>
          <li><strong>Lanche:</strong> Whey protein = 30g</li>
          <li><strong>Jantar:</strong> 150g salmão = 35g</li>
          <li><strong>Ceia:</strong> Queijo cottage = 15g</li>
        </ul>

        <h3>💡 Dicas Importantes</h3>
        <ul>
          <li>Qualidade da proteína importa mais que quantidade excessiva</li>
          <li>Varie as fontes para obter aminoácidos diferentes</li>
          <li>Hidrate-se adequadamente (proteína aumenta necessidade de água)</li>
          <li>Combine com carboidratos pós-treino para melhor recuperação</li>
        </ul>
      `
    },

    'motivacao': {
      title: 'Como Manter a Motivação em Dias Difíceis - Estratégias Psicológicas',
      category: 'motivacao',
      content: `
        <p><strong>A motivação é como o clima: muda constantemente.</strong> O segredo não é esperar pela motivação perfeita, mas desenvolver sistemas e estratégias que funcionem mesmo nos dias mais desafiadores.</p>
        
        <h3>🧠 Entendendo a Psicologia da Motivação</h3>
        
        <h4>Tipos de Motivação</h4>
        <ul>
          <li><strong>Motivação Intrínseca:</strong> vem de dentro, mais duradoura</li>
          <li><strong>Motivação Extrínseca:</strong> vem de fatores externos, mais instável</li>
          <li><strong>Disciplina:</strong> ação independente do sentimento</li>
        </ul>

        <h3>🎯 Estratégias Para Dias Difíceis</h3>
        
        <h4>1. Regra dos 10 Minutos</h4>
        <ul>
          <li>Comprometa-se com apenas 10 minutos de exercício</li>
          <li>90% das vezes você continuará após começar</li>
          <li>Remove a resistência inicial</li>
        </ul>

        <h4>2. Prepare o Ambiente</h4>
        <ul>
          <li>Deixe roupas de treino separadas na noite anterior</li>
          <li>Tenha um playlist motivacional pronto</li>
          <li>Elimine barreiras e facilite o início</li>
        </ul>

        <h4>3. Lembre-se do "Porquê"</h4>
        <ul>
          <li>Escreva seus objetivos e releia regularmente</li>
          <li>Tenha fotos ou lembretes visuais dos seus sonhos</li>
          <li>Conecte-se com motivações profundas (saúde, família, autoestima)</li>
        </ul>

        <h4>4. Sistema de Recompensas</h4>
        <ul>
          <li>Celebre pequenas vitórias diariamente</li>
          <li>Tenha recompensas semanais por consistência</li>
          <li>Use aplicativos ou calendários para marcar progresso</li>
        </ul>

        <h3>🔄 Construindo Hábitos Duradouros</h3>
        
        <h4>O Poder da Consistência</h4>
        <ul>
          <li><strong>Não perca dois dias seguidos:</strong> uma regra simples mas poderosa</li>
          <li><strong>Foque na frequência, não na perfeição</strong></li>
          <li><strong>21 dias para formar hábito</strong> é mito - pode levar 66 dias ou mais</li>
        </ul>

        <h4>Ancoragem de Hábitos</h4>
        <ul>
          <li>Conecte o treino a um hábito já estabelecido</li>
          <li>"Depois de tomar café, eu me exercito"</li>
          <li>Use gatilhos ambientais e temporais</li>
        </ul>

        <h3>😤 Lidando com Preguiça e Resistência</h3>
        
        <h4>Identifique os Sabotadores</h4>
        <ul>
          <li><strong>Perfeccionismo:</strong> "se não posso fazer perfeito, não faço"</li>
          <li><strong>Pensamento tudo-ou-nada:</strong> "perdi um dia, já era"</li>
          <li><strong>Comparação:</strong> focar nos outros ao invés do próprio progresso</li>
        </ul>

        <h4>Técnicas de Superação</h4>
        <ul>
          <li><strong>Visualization:</strong> imagine-se completando o treino</li>
          <li><strong>Autoconversa positiva:</strong> substitua "tenho que" por "escolho"</li>
          <li><strong>Foque no presente:</strong> só o treino de hoje importa</li>
        </ul>

        <h3>👥 Apoio Social e Accountability</h3>
        <ul>
          <li><strong>Parceiro de treino:</strong> compromisso mútuo</li>
          <li><strong>Grupos/comunidades:</strong> compartilhe jornada e desafios</li>
          <li><strong>Personal trainer:</strong> orientação profissional e motivação externa</li>
          <li><strong>Familiares:</strong> comunique seus objetivos e peça apoio</li>
        </ul>

        <h3>📱 Ferramentas Práticas</h3>
        <ul>
          <li><strong>Apps de hábito:</strong> Habitica, Streaks, Way of Life</li>
          <li><strong>Calendário visual:</strong> marque X nos dias de treino</li>
          <li><strong>Journal:</strong> anote como se sente antes e depois</li>
          <li><strong>Fotos de progresso:</strong> evidência visual das mudanças</li>
        </ul>

        <h3>💪 Mudança de Mindset</h3>
        <ul>
          <li>Exercício não é punição, é autocuidado</li>
          <li>Foco no processo, não apenas no resultado</li>
          <li>Cada dia é uma nova oportunidade</li>
          <li>Progresso não é linear - altos e baixos são normais</li>
        </ul>
      `
    },

    'creatina': {
      title: 'Creatina: Guia Completo de Como Usar Corretamente',
      category: 'suplementos',
      content: `
        <p><strong>A creatina é o suplemento mais estudado e comprovado cientificamente</strong> para melhora de performance em exercícios de alta intensidade. Com mais de 1000 estudos publicados, seus benefícios são indiscutíveis.</p>
        
        <h3>🧪 O Que É Creatina</h3>
        <ul>
          <li>Composto natural produzido pelo corpo (fígado, rins, pâncreas)</li>
          <li>Armazenada principalmente nos músculos (95%)</li>
          <li>Essencial para regeneração rápida de ATP (energia celular)</li>
          <li>Encontrada em carnes vermelhas e peixes</li>
        </ul>

        <h3>💪 Benefícios Comprovados</h3>
        
        <h4>Performance Física</h4>
        <ul>
          <li><strong>Aumento de força:</strong> 5-15% em exercícios de alta intensidade</li>
          <li><strong>Melhora da potência:</strong> especialmente em séries múltiplas</li>
          <li><strong>Redução da fadiga:</strong> recuperação mais rápida entre séries</li>
          <li><strong>Maior volume de treino:</strong> possibilita mais repetições</li>
        </ul>

        <h4>Composição Corporal</h4>
        <ul>
          <li><strong>Ganho de massa magra:</strong> 0,9-2,2kg em 4-6 semanas</li>
          <li><strong>Retenção hídrica intramuscular:</strong> músculos mais volumosos</li>
          <li><strong>Síntese proteica:</strong> ambiente anabólico otimizado</li>
        </ul>

        <h3>💊 Como Usar Corretamente</h3>
        
        <h4>Dosagem Recomendada</h4>
        <ul>
          <li><strong>Dose diária:</strong> 3-5g por dia</li>
          <li><strong>Peso corporal:</strong> 0,04-0,07g por kg</li>
          <li><strong>Exemplo:</strong> pessoa de 70kg = 3-5g diários</li>
        </ul>

        <h4>Protocolos de Suplementação</h4>
        
        <p><strong>Protocolo 1: Saturação Rápida</strong></p>
        <ul>
          <li><strong>Fase de carga:</strong> 20g/dia por 5-7 dias (dividir em 4 doses)</li>
          <li><strong>Fase de manutenção:</strong> 3-5g/dia</li>
          <li><strong>Resultados:</strong> em 5-7 dias</li>
        </ul>

        <p><strong>Protocolo 2: Saturação Gradual (Recomendado)</strong></p>
        <ul>
          <li><strong>Dose única:</strong> 3-5g diários desde o início</li>
          <li><strong>Sem fase de carga</strong></li>
          <li><strong>Resultados:</strong> em 3-4 semanas</li>
          <li><strong>Vantagem:</strong> sem desconforto gastrointestinal</li>
        </ul>

        <h3>⏰ Melhor Horário Para Tomar</h3>
        <ul>
          <li><strong>Timing não é crítico:</strong> o importante é a consistência diária</li>
          <li><strong>Pós-treino:</strong> ligeiramente superior devido ao aumento do fluxo sanguíneo</li>
          <li><strong>Com carboidratos:</strong> melhora absorção (opcional)</li>
          <li><strong>Sempre no mesmo horário:</strong> facilita formação do hábito</li>
        </ul>

        <h3>🥤 Como Tomar</h3>
        <ul>
          <li><strong>Dissolva em água:</strong> 200-300ml</li>
          <li><strong>Pode ser com suco</strong> (carboidratos ajudam absorção)</li>
          <li><strong>Temperatura ambiente</strong> dissolve melhor</li>
          <li><strong>Mexa bem</strong> até dissolver completamente</li>
        </ul>

        <h3>🔄 Ciclos e Paradas</h3>
        <ul>
          <li><strong>Não precisa fazer ciclos:</strong> pode usar continuamente</li>
          <li><strong>Segura a longo prazo:</strong> estudos de até 5 anos</li>
          <li><strong>Se parar:</strong> níveis voltam ao normal em 4-6 semanas</li>
          <li><strong>Não causa dependência</strong></li>
        </ul>

        <h3>⚠️ Efeitos Colaterais e Precauções</h3>
        
        <h4>Efeitos Comuns</h4>
        <ul>
          <li><strong>Ganho de peso:</strong> 0,6-1,8kg (retenção hídrica muscular)</li>
          <li><strong>Sede aumentada:</strong> beba mais água</li>
          <li><strong>Desconforto gastrointestinal:</strong> apenas com doses altas</li>
        </ul>

        <h4>Contraindicações</h4>
        <ul>
          <li>Problemas renais pré-existentes</li>
          <li>Consulte médico se tiver doenças crônicas</li>
          <li>Grávidas e lactantes devem evitar</li>
        </ul>

        <h3>🛒 Qual Creatina Escolher</h3>
        
        <h4>Creatina Monohidratada</h4>
        <ul>
          <li><strong>Mais estudada e comprovada</strong></li>
          <li><strong>Melhor custo-benefício</strong></li>
          <li><strong>99% de pureza</strong> em marcas confiáveis</li>
          <li><strong>Creapure®</strong> é o padrão ouro alemão</li>
        </ul>

        <h4>Outras Formas</h4>
        <ul>
          <li><strong>Creatina HCL:</strong> teoricamente melhor solubilidade</li>
          <li><strong>Creatina Alcalina:</strong> marketing > ciência</li>
          <li><strong>Recomendação:</strong> monohidratada é suficiente</li>
        </ul>

        <h3>📊 Quem Mais Se Beneficia</h3>
        <ul>
          <li><strong>Esportes de alta intensidade:</strong> musculação, sprints, lutas</li>
          <li><strong>Vegetarianos:</strong> menores estoques naturais</li>
          <li><strong>Pessoas acima de 50 anos:</strong> benefícios cognitivos e musculares</li>
          <li><strong>Atletas de força:</strong> powerlifting, strongman</li>
        </ul>

        <h3>💡 Dicas Importantes</h3>
        <ul>
          <li>Mantenha-se bem hidratado (pelo menos 35ml/kg/dia)</li>
          <li>Seja paciente - resultados aparecem gradualmente</li>
          <li>Combine com treino adequado para máximos benefícios</li>
          <li>Guarde em local seco e arejado</li>
        </ul>
      `
    },

    'sono': {
      title: 'A Importância do Sono Para Resultados - Guia do Descanso Otimizado',
      category: 'recuperacao',
      content: `
        <p><strong>O sono é quando a mágica acontece.</strong> Enquanto você dorme, seu corpo repara músculos, libera hormônios anabólicos e consolida memórias motoras. Sem sono adequado, seus resultados ficam comprometidos.</p>
        
        <h3>🧬 O Que Acontece Durante o Sono</h3>
        
        <h4>Fases do Sono</h4>
        <ul>
          <li><strong>Sono Leve (N1-N2):</strong> transição, recuperação inicial</li>
          <li><strong>Sono Profundo (N3):</strong> liberação do hormônio do crescimento, reparo tecidual</li>
          <li><strong>Sono REM:</strong> recuperação mental, consolidação de aprendizado motor</li>
        </ul>

        <h4>Processos de Recuperação</h4>
        <ul>
          <li><strong>Síntese proteica:</strong> construção e reparo muscular</li>
          <li><strong>Remoção de toxinas:</strong> sistema glinfático ativo</li>
          <li><strong>Regulação hormonal:</strong> GH, testosterona, cortisol</li>
          <li><strong>Consolidação da memória motora:</strong> melhora da técnica</li>
        </ul>

        <h3>💪 Como o Sono Afeta Seus Resultados</h3>
        
        <h4>Hipertrofia Muscular</h4>
        <ul>
          <li><strong>Hormônio do crescimento:</strong> pico durante sono profundo</li>
          <li><strong>IGF-1:</strong> essencial para crescimento muscular</li>
          <li><strong>Testosterona:</strong> reduz 15% com apenas 1 semana de sono ruim</li>
          <li><strong>Síntese proteica:</strong> otimizada durante o descanso</li>
        </ul>

        <h4>Perda de Gordura</h4>
        <ul>
          <li><strong>Leptina:</strong> hormônio da saciedade diminui com sono ruim</li>
          <li><strong>Grelina:</strong> hormônio da fome aumenta</li>
          <li><strong>Cortisol:</strong> elevado cronicamente favorece acúmulo de gordura</li>
          <li><strong>Metabolismo:</strong> taxa metabólica reduzida</li>
        </ul>

        <h4>Performance</h4>
        <ul>
          <li><strong>Força:</strong> redução de 10-30% com privação de sono</li>
          <li><strong>Tempo de reação:</strong> piora significativa</li>
          <li><strong>Coordenação:</strong> movimentos menos precisos</li>
          <li><strong>Motivação:</strong> percepção de esforço aumentada</li>
        </ul>

        <h3>😴 Quantas Horas Dormir</h3>
        
        <h4>Recomendações Por Idade</h4>
        <ul>
          <li><strong>18-25 anos:</strong> 7-9 horas</li>
          <li><strong>26-64 anos:</strong> 7-9 horas</li>
          <li><strong>65+ anos:</strong> 7-8 horas</li>
        </ul>

        <h4>Para Atletas e Praticantes Intensos</h4>
        <ul>
          <li><strong>Mínimo:</strong> 8 horas por noite</li>
          <li><strong>Ideal:</strong> 9-10 horas durante períodos de treino intenso</li>
          <li><strong>Recuperação:</strong> sono extra após competições ou treinos pesados</li>
        </ul>

        <h3>🌙 Higiene do Sono</h3>
        
        <h4>Ambiente Ideal</h4>
        <ul>
          <li><strong>Temperatura:</strong> 18-22°C (ambiente fresco)</li>
          <li><strong>Escuridão:</strong> cortinas blackout ou máscara</li>
          <li><strong>Silêncio:</strong> protetores auriculares se necessário</li>
          <li><strong>Colchão e travesseiro:</strong> confortáveis e adequados</li>
        </ul>

        <h4>Rotina Pré-Sono</h4>
        <ul>
          <li><strong>2-3 horas antes:</strong> pare de comer refeições pesadas</li>
          <li><strong>1-2 horas antes:</strong> desligue telas (luz azul interfere na melatonina)</li>
          <li><strong>30-60 min antes:</strong> atividades relaxantes (leitura, meditação)</li>
          <li><strong>Mesmo horário:</strong> deite e levante no mesmo horário todos os dias</li>
        </ul>

        <h3>☕ Substâncias Que Afetam o Sono</h3>
        
        <h4>Evitar Antes de Dormir</h4>
        <ul>
          <li><strong>Cafeína:</strong> pare até 8 horas antes (meia-vida de 6h)</li>
          <li><strong>Álcool:</strong> fragmenta o sono, reduz sono REM</li>
          <li><strong>Nicotina:</strong> estimulante, evite 4 horas antes</li>
          <li><strong>Líquidos excessivos:</strong> evite acordar para ir ao banheiro</li>
        </ul>

        <h4>Suplementos Naturais</h4>
        <ul>
          <li><strong>Melatonina:</strong> 0,5-3mg, 30-60min antes de dormir</li>
          <li><strong>Magnésio:</strong> 200-400mg, relaxante muscular</li>
          <li><strong>Valeriana:</strong> 300-600mg, efeito calmante</li>
          <li><strong>Chá de camomila:</strong> alternativa natural</li>
        </ul>

        <h3>📱 Tecnologia e Sono</h3>
        
        <h4>Impacto da Luz Azul</h4>
        <ul>
          <li>Suprime produção de melatonina</li>
          <li>Atrasa o ritmo circadiano</li>
          <li>Use filtros blue light ou óculos especiais</li>
          <li>Apps: f.lux, Night Shift, filtro azul</li>
        </ul>

        <h4>Apps Úteis</h4>
        <ul>
          <li><strong>Sleep Cycle:</strong> monitora fases do sono</li>
          <li><strong>Calm/Headspace:</strong> meditação e sons relaxantes</li>
          <li><strong>White noise apps:</strong> mascarar ruídos</li>
        </ul>

        <h3>🏃‍♂️ Exercício e Sono</h3>
        
        <h4>Timing do Treino</h4>
        <ul>
          <li><strong>Manhã:</strong> melhora qualidade do sono noturno</li>
          <li><strong>Tarde:</strong> ideal para performance</li>
          <li><strong>Noite:</strong> termine pelo menos 3h antes de dormir</li>
          <li><strong>Exercício intenso tardio:</strong> pode atrapalhar o adormecer</li>
        </ul>

        <h3>😴 Cochilos Estratégicos</h3>
        
        <h4>Power Nap</h4>
        <ul>
          <li><strong>Duração:</strong> 10-20 minutos</li>
          <li><strong>Horário:</strong> entre 13h-15h</li>
          <li><strong>Benefícios:</strong> melhora alerta e performance</li>
          <li><strong>Evite:</strong> cochilos após 16h ou superiores a 30min</li>
        </ul>

        <h3>⚠️ Sinais de Sono Inadequado</h3>
        
        <h4>Sintomas Físicos</h4>
        <ul>
          <li>Fadiga constante mesmo após treino</li>
          <li>Recuperação lenta entre sessões</li>
          <li>Maior propensão a lesões</li>
          <li>Sistema imune comprometido</li>
        </ul>

        <h4>Sintomas Mentais</h4>
        <ul>
          <li>Irritabilidade e mudanças de humor</li>
          <li>Dificuldade de concentração</li>
          <li>Motivação reduzida para treinar</li>
          <li>Ansiedade e estresse elevados</li>
        </ul>

        <h3>🎯 Protocolo de Recuperação do Sono</h3>
        
        <h4>Se Dormiu Mal (Estratégias de Emergência)</h4>
        <ul>
          <li><strong>Manhã:</strong> luz solar por 10-15 minutos</li>
          <li><strong>Cafeína:</strong> uma dose moderada (não tarde)</li>
          <li><strong>Treino:</strong> reduza intensidade em 10-20%</li>
          <li><strong>Cochilo:</strong> máximo 20 minutos se possível</li>
        </ul>

        <h4>Recuperação Semanal</h4>
        <ul>
          <li>Não é possível "recuperar" sono perdido completamente</li>
          <li>Foque em consistência, não em "maratonas de sono"</li>
          <li>Priorize qualidade sobre quantidade extra</li>
        </ul>

        <h3>💡 Dicas Avançadas</h3>
        <ul>
          <li><strong>Controle da respiração:</strong> técnica 4-7-8 para relaxar</li>
          <li><strong>Temperatura corporal:</strong> banho morno 90min antes de dormir</li>
          <li><strong>Mindfulness:</strong> meditação reduz ansiedade pré-sono</li>
          <li><strong>Diário do sono:</strong> monitore padrões e identifique problemas</li>
          <li><strong>Fins de semana:</strong> máximo 1h de diferença no horário</li>
        </ul>
      `
    },

    'cardio': {
      title: 'HIIT vs Cardio Tradicional: Qual Escolher Para Seus Objetivos',
      category: 'treino',
      content: `
        <p><strong>Cardio é essencial para saúde cardiovascular</strong>, mas escolher entre HIIT e cardio tradicional pode definir seus resultados. Cada modalidade tem benefícios únicos e aplicações específicas.</p>
        
        <h3>🏃‍♂️ Cardio Tradicional (LISS - Low Intensity Steady State)</h3>
        
        <h4>Características</h4>
        <ul>
          <li><strong>Intensidade:</strong> 60-70% da FCmáx</li>
          <li><strong>Duração:</strong> 30-60+ minutos</li>
          <li><strong>Ritmo:</strong> constante e sustentável</li>
          <li><strong>Exemplos:</strong> caminhada rápida, corrida leve, bicicleta</li>
        </ul>

        <h4>Benefícios</h4>
        <ul>
          <li><strong>Queima de gordura direta:</strong> usa gordura como combustível principal</li>
          <li><strong>Baixo impacto:</strong> menos estresse articular</li>
          <li><strong>Fácil recuperação:</strong> pode ser feito diariamente</li>
          <li><strong>Melhora capacidade aeróbica:</strong> fortalece sistema cardiovascular</li>
          <li><strong>Reduz stress:</strong> efeito relaxante e meditativo</li>
        </ul>

        <h4>Desvantagens</h4>
        <ul>
          <li>Consome muito tempo</li>
          <li>Pode ser monótono</li>
          <li>Menor EPOC (queima pós-exercício)</li>
          <li>Não preserva tanto a massa muscular</li>
        </ul>

        <h3>🔥 HIIT (High Intensity Interval Training)</h3>
        
        <h4>Características</h4>
        <ul>
          <li><strong>Intensidade:</strong> 80-95% da FCmáx (intervalos intensos)</li>
          <li><strong>Duração:</strong> 10-30 minutos total</li>
          <li><strong>Estrutura:</strong> alternância entre alta e baixa intensidade</li>
          <li><strong>Exemplos:</strong> sprints, burpees, bike intervals</li>
        </ul>

        <h4>Benefícios</h4>
        <ul>
          <li><strong>Eficiência temporal:</strong> resultados em menos tempo</li>
          <li><strong>EPOC elevado:</strong> queima calorias até 24h pós-treino</li>
          <li><strong>Preserva massa muscular:</strong> menos catabólico</li>
          <li><strong>Melhora VO2 máx:</strong> capacidade cardiovascular superior</li>
          <li><strong>Acelera metabolismo:</strong> efeito termogênico prolongado</li>
        </ul>

        <h4>Desvantagens</h4>
        <ul>
          <li>Maior desgaste físico</li>
          <li>Precisa de mais recuperação</li>
          <li>Não indicado para iniciantes</li>
          <li>Risco maior de lesões se mal executado</li>
        </ul>

        <h3>🎯 Qual Escolher Para Seu Objetivo</h3>
        
        <h4>Perda de Peso</h4>
        <p><strong>Vencedor: HIIT (com ressalvas)</strong></p>
        <ul>
          <li><strong>HIIT:</strong> maior queima total de calorias em menos tempo</li>
          <li><strong>LISS:</strong> melhor para grandes volumes, menos desgaste</li>
          <li><strong>Combinação ideal:</strong> 2-3x HIIT + 2-3x LISS por semana</li>
        </ul>

        <h4>Saúde Cardiovascular</h4>
        <p><strong>Vencedor: Ambos (com focos diferentes)</strong></p>
        <ul>
          <li><strong>HIIT:</strong> melhora capacidade máxima (VO2)</li>
          <li><strong>LISS:</strong> fortalece coração, reduz pressão arterial</li>
          <li><strong>Recomendação:</strong> combine ambos para saúde completa</li>
        </ul>

        <h4>Condicionamento Para Esportes</h4>
        <p><strong>Vencedor: HIIT</strong></p>
        <ul>
          <li>Simula demandas esportivas</li>
          <li>Melhora potência e explosão</li>
          <li>Desenvolve tolerância ao lactato</li>
        </ul>

        <h4>Recuperação Ativa</h4>
        <p><strong>Vencedor: LISS</strong></p>
        <ul>
          <li>Promove circulação sem desgaste</li>
          <li>Ajuda na remoção de metabólitos</li>
          <li>Reduz dores musculares (DOMS)</li>
        </ul>

        <h3>📊 Protocolos Práticos</h3>
        
        <h4>HIIT Para Iniciantes</h4>
        <ul>
          <li><strong>Aquecimento:</strong> 5 minutos leve</li>
          <li><strong>Trabalho:</strong> 30 seg intenso</li>
          <li><strong>Descanso:</strong> 90 seg leve</li>
          <li><strong>Repetições:</strong> 8-10 ciclos</li>
          <li><strong>Frequência:</strong> 2-3x por semana</li>
        </ul>

        <h4>HIIT Avançado</h4>
        <ul>
          <li><strong>Aquecimento:</strong> 5 minutos</li>
          <li><strong>Trabalho:</strong> 45 seg máximo</li>
          <li><strong>Descanso:</strong> 15 seg (protocolo Tabata)</li>
          <li><strong>Repetições:</strong> 12-20 ciclos</li>
          <li><strong>Frequência:</strong> 3-4x por semana</li>
        </ul>

        <h4>LISS Eficiente</h4>
        <ul>
          <li><strong>Intensidade:</strong> consegue manter conversa</li>
          <li><strong>Duração:</strong> 30-45 minutos</li>
          <li><strong>Frequência:</strong> 4-6x por semana</li>
          <li><strong>Variações:</strong> caminhada inclinada, natação, ciclismo</li>
        </ul>

        <h3>⚖️ Comparação Direta</h3>
        
        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Aspecto</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">HIIT</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">LISS</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Tempo por sessão</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">15-30 min</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">45-60 min</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Queima durante</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">Alta</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">Moderada</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Queima pós-exercício</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">Muito alta</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">Baixa</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Preservação muscular</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">Alta</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">Moderada</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Estresse/Fadiga</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">Alto</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">Baixo</td>
          </tr>
        </table>

        <h3>🗓️ Programa Combinado (Recomendado)</h3>
        
        <h4>Semana Tipo</h4>
        <ul>
          <li><strong>Segunda:</strong> HIIT 20 min</li>
          <li><strong>Terça:</strong> LISS 40 min</li>
          <li><strong>Quarta:</strong> HIIT 25 min</li>
          <li><strong>Quinta:</strong> LISS 35 min (recuperação ativa)</li>
          <li><strong>Sexta:</strong> HIIT 20 min</li>
          <li><strong>Sábado:</strong> LISS longo 50-60 min</li>
          <li><strong>Domingo:</strong> Descanso ou caminhada leve</li>
        </ul>

        <h3>💡 Dicas Para Maximizar Resultados</h3>
        <ul>
          <li><strong>Periodização:</strong> alterne fases com foco em cada modalidade</li>
          <li><strong>Progressão:</strong> aumente intensidade/duração gradualmente</li>
          <li><strong>Nutrição:</strong> ajuste carboidratos conforme intensidade</li>
          <li><strong>Hidratação:</strong> fundamental especialmente no HIIT</li>
          <li><strong>Recuperação:</strong> durma bem e gerencie stress</li>
          <li><strong>Variação:</strong> mude exercícios para evitar monotonia</li>
        </ul>
      `
    },

    'hidratacao': {
      title: 'Hidratação: Além da Água Comum - Estratégias Para Performance',
      category: 'nutricao',
      content: `
        <p><strong>A hidratação vai muito além de beber água.</strong> Para atletas e praticantes de exercícios, uma estratégia inteligente de hidratação pode ser a diferença entre performance medíocre e excepcional.</p>
        
        <h3>💧 Por Que a Hidratação É Crítica</h3>
        
        <h4>Funções da Água no Corpo</h4>
        <ul>
          <li><strong>Regulação térmica:</strong> suor e vasodilatação</li>
          <li><strong>Transporte de nutrientes:</strong> sangue é 55% água</li>
          <li><strong>Remoção de toxinas:</strong> urina e respiração</li>
          <li><strong>Lubrificação articular:</strong> líquido sinovial</li>
          <li><strong>Pressão osmótica:</strong> equilíbrio celular</li>
        </ul>

        <h4>Impacto na Performance</h4>
        <ul>
          <li><strong>2% desidratação:</strong> queda de 10-15% na performance</li>
          <li><strong>3-4% desidratação:</strong> fadiga significativa, câimbras</li>
          <li><strong>5%+ desidratação:</strong> risco de exaustão por calor</li>
        </ul>

        <h3>📊 Quanto Água Você Precisa</h3>
        
        <h4>Necessidades Básicas</h4>
        <ul>
          <li><strong>Sedentários:</strong> 35ml/kg peso corporal</li>
          <li><strong>Ativos:</strong> 40-50ml/kg peso corporal</li>
          <li><strong>Atletas:</strong> 50-60ml/kg + perdas por suor</li>
          <li><strong>Exemplo:</strong> 70kg ativo = 2,8-3,5L por dia</li>
        </ul>

        <h4>Fatores Que Aumentam Necessidades</h4>
        <ul>
          <li>Temperatura ambiente elevada</li>
          <li>Altitude (acima de 2500m)</li>
          <li>Ar condicionado/aquecimento</li>
          <li>Consumo de cafeína/álcool</li>
          <li>Febre ou doenças</li>
        </ul>

        <h3>⚡ Eletrólitos: Os Minerais Essenciais</h3>
        
        <h4>Principais Eletrólitos</h4>
        <ul>
          <li><strong>Sódio (Na+):</strong> retenção hídrica, contração muscular</li>
          <li><strong>Potássio (K+):</strong> função celular, previne câimbras</li>
          <li><strong>Magnésio (Mg2+):</strong> relaxamento muscular, energia</li>
          <li><strong>Cálcio (Ca2+):</strong> contração muscular, transmissão nervosa</li>
          <li><strong>Cloro (Cl-):</strong> equilíbrio ácido-base</li>
        </ul>

        <h4>Perdas Pelo Suor</h4>
        <ul>
          <li><strong>Sódio:</strong> 200-2000mg/L de suor</li>
          <li><strong>Potássio:</strong> 150-300mg/L de suor</li>
          <li><strong>Variação individual:</strong> genética, aclimatação, dieta</li>
        </ul>

        <h3>🥤 Repositores Hidroeletrolíticos Naturais</h3>
        
        <h4>Opções Caseiras</h4>
        <ul>
          <li><strong>Água de coco:</strong> rica em potássio, baixo sódio</li>
          <li><strong>Suco de frutas diluído:</strong> 50% água + pitada de sal</li>
          <li><strong>Água com limão e sal:</strong> 500ml + 1/4 colher chá sal</li>
          <li><strong>Chá gelado com mel:</strong> carboidratos + eletrólitos</li>
        </ul>

        <h4>Receita Caseira Completa</h4>
        <p><strong>Repositor Natural (500ml):</strong></p>
        <ul>
          <li>400ml de água</li>
          <li>100ml de suco natural (laranja/limão)</li>
          <li>1/4 colher de chá de sal marinho</li>
          <li>1 colher de sopa de mel</li>
          <li>Pitada de sal light (potássio)</li>
        </ul>

        <h3>⏰ Estratégias de Hidratação Por Momento</h3>
        
        <h4>Pré-Treino (2-3 horas antes)</h4>
        <ul>
          <li><strong>500-600ml de água</strong> com eletrólitos</li>
          <li><strong>Monitore urina:</strong> deve estar clara</li>
          <li><strong>Evite excesso:</strong> para não precisar parar durante treino</li>
        </ul>

        <h4>Durante o Treino</h4>
        <ul>
          <li><strong>Até 1 hora:</strong> água pura é suficiente</li>
          <li><strong>Mais de 1 hora:</strong> repositor com 6-8% carboidrato</li>
          <li><strong>150-250ml a cada 15-20min</strong></li>
          <li><strong>Temperatura:</strong> 10-15°C (absorção otimizada)</li>
        </ul>

        <h4>Pós-Treino (primeiras 2 horas)</h4>
        <ul>
          <li><strong>150% do peso perdido</strong> (1kg perdido = 1,5L reposição)</li>
          <li><strong>Incluir sódio:</strong> melhora retenção hídrica</li>
          <li><strong>Carboidratos simples:</strong> facilitam absorção</li>
        </ul>

        <h3>🌡️ Hidratação em Condições Especiais</h3>
        
        <h4>Clima Quente</h4>
        <ul>
          <li>Inicie hidratação 2-3 dias antes</li>
          <li>Aumente concentração de sódio</li>
          <li>Evite roupas escuras</li>
          <li>Procure sombra nos intervalos</li>
        </ul>

        <h4>Exercícios Prolongados (2+ horas)</h4>
        <ul>
          <li>Varie sabores para evitar enjoo</li>
          <li>Combine líquidos e sólidos</li>
          <li>Monitore sinais de hiponatremia</li>
          <li>Planeje pontos de abastecimento</li>
        </ul>

        <h4>Altitude Elevada</h4>
        <ul>
          <li>Aumente ingestão em 20-30%</li>
          <li>Respiração aumentada = mais perda</li>
          <li>Umidade relativa menor</li>
        </ul>

        <h3>⚠️ Sinais de Desidratação</h3>
        
        <h4>Leves (1-2%)</h4>
        <ul>
          <li>Sede, urina amarela</li>
          <li>Leve fadiga</li>
          <li>Redução no suor</li>
        </ul>

        <h4>Moderados (3-5%)</h4>
        <ul>
          <li>Urina escura, pouco volume</li>
          <li>Dor de cabeça, irritabilidade</li>
          <li>Câimbras musculares</li>
          <li>Performance reduzida</li>
        </ul>

        <h4>Graves (6%+)</h4>
        <ul>
          <li>Tontura, confusão mental</li>
          <li>Náusea, vômito</li>
          <li>Ausência de suor</li>
          <li><strong>Emergência médica!</strong></li>
        </ul>

        <h3>💊 Suplementos Para Hidratação</h3>
        
        <h4>Quando Considerar</h4>
        <ul>
          <li>Treinos > 90 minutos</li>
          <li>Múltiplas sessões no dia</li>
          <li>Suor excessivo</li>
          <li>Clima quente/úmido</li>
        </ul>

        <h4>Opções Comerciais</h4>
        <ul>
          <li><strong>Isotônicos:</strong> mesma concentração do sangue</li>
          <li><strong>Hipotônicos:</strong> absorção mais rápida</li>
          <li><strong>Hipertônicos:</strong> maior concentração de carboidratos</li>
        </ul>

        <h3>🚫 Hidratação Excessiva (Hiponatremia)</h3>
        
        <h4>Causas</h4>
        <ul>
          <li>Beber água demais sem eletrólitos</li>
          <li>Exercícios ultraendurance</li>
          <li>Medicações que afetam equilíbrio</li>
        </ul>

        <h4>Sintomas</h4>
        <ul>
          <li>Náusea, vômito</li>
          <li>Dor de cabeça, confusão</li>
          <li>Inchaço (mãos, pés)</li>
          <li>Em casos graves: convulsões</li>
        </ul>

        <h3>📱 Ferramentas Para Monitoramento</h3>
        <ul>
          <li><strong>Apps:</strong> WaterLlama, MyWater, Hydro Coach</li>
          <li><strong>Teste da urina:</strong> cor e frequência</li>
          <li><strong>Peso corporal:</strong> antes/depois do treino</li>
          <li><strong>Sede:</strong> indicador tardio, não confie apenas nela</li>
        </ul>

        <h3>💡 Dicas Práticas</h3>
        <ul>
          <li><strong>Garrafa personalizada:</strong> marque horários de consumo</li>
          <li><strong>Alarmes:</strong> lembre-se de beber regularmente</li>
          <li><strong>Varie sabores:</strong> infusões de frutas/ervas</li>
          <li><strong>Temperatura ideal:</strong> fresco, mas não gelado demais</li>
          <li><strong>Comece cedo:</strong> hidratação ao acordar</li>
          <li><strong>Monitore cor da urina:</strong> amarelo claro é ideal</li>
        </ul>
      `
    },
    'alongamento': {
      title: 'Alongamento: Antes ou Depois do Treino? Guia Completo',
      category: 'treino',
      content: `
    <p><strong>O alongamento é essencial para saúde muscular e articular</strong>, mas existe muita dúvida sobre o momento certo de aplicá-lo. Antes ou depois do treino? Vamos esclarecer com base em evidências científicas.</p>

    <h3>🤸 Tipos de Alongamento</h3>
    <ul>
      <li><strong>Estático:</strong> Manter posição por 20-60 segundos (ideal pós-treino)</li>
      <li><strong>Dinâmico:</strong> Movimentos controlados que aumentam amplitude (ideal pré-treino)</li>
      <li><strong>Balístico:</strong> Movimentos rápidos com impulso (não recomendado para iniciantes)</li>
    </ul>

    <h3>📋 Quando Alongar</h3>
    <ul>
      <li><strong>Pré-treino:</strong> Prefira <em>alongamento dinâmico</em> para preparar músculos e articulações</li>
      <li><strong>Pós-treino:</strong> Utilize <em>alongamento estático</em> para relaxamento e flexibilidade</li>
      <li><strong>Durante o dia:</strong> Alongamentos leves reduzem tensão e melhoram postura</li>
    </ul>

    <h3>⚠️ Erros Comuns</h3>
    <ul>
      <li>Alongar de forma intensa antes do treino de força</li>
      <li>Rebater o movimento em vez de mantê-lo estável</li>
      <li>Prender a respiração durante o alongamento</li>
      <li>Ignorar dor aguda (risco de lesão)</li>
    </ul>

    <h3>🎯 Benefícios Comprovados</h3>
    <ul>
      <li>Aumenta a amplitude de movimento</li>
      <li>Reduz rigidez muscular</li>
      <li>Previne desequilíbrios posturais</li>
      <li>Ajuda na recuperação após treinos intensos</li>
    </ul>

    <h3>💡 Dicas Práticas</h3>
    <ul>
      <li>Respire fundo e relaxe durante cada alongamento</li>
      <li>Inclua 5-10 minutos no pós-treino</li>
      <li>Combine com mobilidade para ganhos maiores</li>
    </ul>
  `
    },

    // Dica Pré-treino
    'pre-treino': {
      title: 'O Que Comer Antes do Treino: Guia de Nutrição Estratégica',
      category: 'nutricao',
      content: `
    <p><strong>A alimentação pré-treino é determinante</strong> para ter energia, foco e desempenho máximo durante os exercícios. A combinação certa de nutrientes evita fadiga precoce e melhora seus resultados.</p>

    <h3>🍎 Macronutrientes Ideais</h3>
    <ul>
      <li><strong>Carboidratos:</strong> principal fonte de energia (batata-doce, aveia, frutas)</li>
      <li><strong>Proteínas:</strong> preservam massa muscular (ovos, frango, whey)</li>
      <li><strong>Gorduras boas:</strong> em pequena quantidade para saciedade (abacate, castanhas)</li>
    </ul>

    <h3>⏰ Melhor Horário</h3>
    <ul>
      <li><strong>2-3 horas antes:</strong> refeição completa (carboidrato + proteína + pouca gordura)</li>
      <li><strong>30-60 min antes:</strong> opções leves e rápidas de digerir (fruta + whey, pão integral com geleia)</li>
    </ul>

    <h3>🥗 Exemplos Práticos</h3>
    <ul>
      <li>Batata-doce + frango grelhado (2-3h antes)</li>
      <li>Arroz integral + ovo mexido (2h antes)</li>
      <li>Banana + whey protein (30min antes)</li>
      <li>Pão integral + pasta de amendoim + mel (1h antes)</li>
    </ul>

    <h3>⚠️ Evite</h3>
    <ul>
      <li>Refeições muito gordurosas (demoram a digerir)</li>
      <li>Alimentos ricos em fibras em excesso (podem causar desconforto)</li>
      <li>Jejum prolongado sem adaptação (queda de performance)</li>
    </ul>

    <h3>🎯 Benefícios de uma Boa Estratégia</h3>
    <ul>
      <li>Mais energia durante o treino</li>
      <li>Melhora da performance e foco</li>
      <li>Menor risco de catabolismo muscular</li>
      <li>Maior disposição pós-treino</li>
    </ul>

    <h3>💡 Dicas Extras</h3>
    <ul>
      <li>Prefira alimentos que você já esteja acostumado</li>
      <li>Hidrate-se bem antes de treinar</li>
      <li>Ajuste quantidades conforme objetivo (hipertrofia, emagrecimento, resistência)</li>
    </ul>
  `
    },
    //adicionar mais conteudo
  };

  // ---------- Category filtering ----------
  const categoryBtns = document.querySelectorAll('.category-btn');
  const tipCards = document.querySelectorAll('.tip-card, .featured-tip');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

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

  // ---------- Modal: abrir com conteúdo dinâmico ----------
  const readBtns = document.querySelectorAll('[data-tip]');
  const modal = document.getElementById('tipModal');
  const modalBody = modal.querySelector('.modal-body');

  function openModal(contentHtml, title) {
    modalBody.innerHTML = `
    <div class="modal-header">
      <h3>${title}</h3>
      <button class="modal-close" aria-label="Fechar modal">&times;</button>
    </div>
    <div class="modal-content-body">${contentHtml}</div>
  `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // evitar scroll no body

    // garantir que abre sempre do início
    modalBody.scrollTop = 0;
    document.querySelector('#tipModal .modal-content').scrollTop = 0;

    // foco no botão de fechar para acessibilidade
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.focus();

    // evento para fechar no clique do botão
    closeBtn.addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
  }

  readBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.tip;
      if (!key) return;
      const tip = tipsContent[key];
      if (!tip) {
        // fallback caso não exista conteúdo
        openModal('<p>Conteúdo em desenvolvimento. Em breve teremos uma dica completa aqui.</p>', 'Em breve');
        return;
      }
      openModal(tip.content, tip.title);
    });
  });

  // fechar clicando fora do conteúdo (overlay)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
  // ---------- Load more (simples) ----------
  const loadMoreBtn = document.querySelector('.load-more-tips');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // sem dicas extras → apenas some com o botão
      loadMoreBtn.style.display = 'none';
    });
  }


  // ---------- Video play functionality (simples) ----------
  const videoItems = document.querySelectorAll('.video-item');
  videoItems.forEach(item => {
    item.addEventListener('click', () => {
      const videoTitle = item.querySelector('h3') ? item.querySelector('h3').textContent : 'Vídeo';
      alert(`Função de vídeo será implementada: ${videoTitle}`);
    });
  });

  // ---------- Animate tips on scroll ----------
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

  document.querySelectorAll('.tip-card, .quick-tip, .video-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    tipsObserver.observe(item);
  });

});

// Smooth scrolling for category navigation
function scrollToTips() {
  const target = document.querySelector('.tips-grid-section');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Search functionality (if needed)
function searchTips(query) {
  const tips = document.querySelectorAll('.tip-card');
  const searchTerm = (query || '').toLowerCase();

  tips.forEach(tip => {
    const titleEl = tip.querySelector('h3');
    const pEl = tip.querySelector('p');
    const title = titleEl ? titleEl.textContent.toLowerCase() : '';
    const content = pEl ? pEl.textContent.toLowerCase() : '';

    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      tip.style.display = 'block';
    } else {
      tip.style.display = 'none';
    }
  });
}
