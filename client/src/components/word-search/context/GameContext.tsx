import * as React from 'react';

export type GameState = 'menu' | 'playing' | 'paused';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface GameContextType {
  gameState: GameState;
  difficulty: Difficulty;
  achievements: Achievement[];
  totalScore: number;
  gamesPlayed: number;
  setGameState: (state: GameState) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  unlockAchievement: (achievementId: string) => void;
  addScore: (points: number) => void;
  incrementGamesPlayed: () => void;
}

const GameContext = React.createContext<GameContextType | undefined>(undefined);

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // Beginner Achievements
  {
    id: 'first_game',
    name: 'Primeira Partida',
    description: 'Complete seu primeiro jogo',
    icon: '🎮',
    unlocked: false,
  },
  {
    id: 'first_word',
    name: 'Primeira Palavra',
    description: 'Encontre sua primeira palavra',
    icon: '🔤',
    unlocked: false,
  },
  {
    id: 'ten_games',
    name: 'Veterano',
    description: 'Complete 10 jogos',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'hundred_games',
    name: 'Centenário',
    description: 'Complete 100 jogos',
    icon: '💯',
    unlocked: false,
  },

  // Speed Achievements
  {
    id: 'speed_demon',
    name: 'Demônio da Velocidade',
    description: 'Complete um nível em menos de 30 segundos',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'lightning_fast',
    name: 'Raio',
    description: 'Complete um nível em menos de 15 segundos',
    icon: '🌩️',
    unlocked: false,
  },
  {
    id: 'sonic_speed',
    name: 'Velocidade Sônica',
    description: 'Complete um nível em menos de 10 segundos',
    icon: '💨',
    unlocked: false,
  },

  // Word Finding Achievements
  {
    id: 'word_hunter',
    name: 'Caçador de Palavras',
    description: 'Encontre 5 palavras bônus em uma partida',
    icon: '🏹',
    unlocked: false,
  },
  {
    id: 'word_master',
    name: 'Mestre das Palavras',
    description: 'Encontre 15 palavras bônus em uma partida',
    icon: '📚',
    unlocked: false,
  },
  {
    id: 'vocabulary_expert',
    name: 'Expert em Vocabulário',
    description: 'Encontre 50 palavras bônus no total',
    icon: '🎓',
    unlocked: false,
  },
  {
    id: 'lexicon_legend',
    name: 'Lenda do Léxico',
    description: 'Encontre 200 palavras bônus no total',
    icon: '📖',
    unlocked: false,
  },

  // Perfection Achievements
  {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Complete um nível sem erros',
    icon: '💎',
    unlocked: false,
  },
  {
    id: 'flawless_series',
    name: 'Série Impecável',
    description: 'Complete 5 níveis seguidos sem erros',
    icon: '✨',
    unlocked: false,
  },
  {
    id: 'error_free_champion',
    name: 'Campeão Sem Erros',
    description: 'Complete 10 níveis seguidos sem erros',
    icon: '🏆',
    unlocked: false,
  },

  // Time Management Achievements
  {
    id: 'time_master',
    name: 'Mestre do Tempo',
    description: 'Acumule mais de 60 segundos de tempo bônus',
    icon: '⏰',
    unlocked: false,
  },
  {
    id: 'time_banker',
    name: 'Banqueiro do Tempo',
    description: 'Acumule mais de 300 segundos de tempo bônus',
    icon: '⏳',
    unlocked: false,
  },
  {
    id: 'chronos_gift',
    name: 'Dádiva de Cronos',
    description: 'Acumule mais de 600 segundos de tempo bônus',
    icon: '🕰️',
    unlocked: false,
  },

  // Phase/Level Achievements
  {
    id: 'beginner_graduate',
    name: 'Graduado Iniciante',
    description: 'Complete a fase Iniciante',
    icon: '🎓',
    unlocked: false,
  },
  {
    id: 'easy_explorer',
    name: 'Explorador Fácil',
    description: 'Complete a fase Fácil',
    icon: '🗺️',
    unlocked: false,
  },
  {
    id: 'medium_challenger',
    name: 'Desafiante Médio',
    description: 'Complete a fase Médio',
    icon: '⚔️',
    unlocked: false,
  },
  {
    id: 'hard_warrior',
    name: 'Guerreiro Difícil',
    description: 'Complete a fase Difícil',
    icon: '🛡️',
    unlocked: false,
  },
  {
    id: 'expert_sage',
    name: 'Sábio Expert',
    description: 'Complete a fase Expert',
    icon: '🧙',
    unlocked: false,
  },
  {
    id: 'master_player',
    name: 'Jogador Mestre',
    description: 'Alcance a fase Mestre',
    icon: '👑',
    unlocked: false,
  },

  // Score Achievements
  {
    id: 'high_scorer',
    name: 'Pontuador',
    description: 'Alcance 10.000 pontos totais',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'score_champion',
    name: 'Campeão da Pontuação',
    description: 'Alcance 50.000 pontos totais',
    icon: '🏅',
    unlocked: false,
  },
  {
    id: 'score_legend',
    name: 'Lenda da Pontuação',
    description: 'Alcance 100.000 pontos totais',
    icon: '🌟',
    unlocked: false,
  },

  // Special Achievements
  {
    id: 'comeback_king',
    name: 'Rei do Retorno',
    description: 'Complete um nível com menos de 5 segundos restantes',
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'eagle_eye',
    name: 'Olho de Águia',
    description: 'Encontre uma palavra em menos de 3 segundos',
    icon: '🦅',
    unlocked: false,
  },
  {
    id: 'night_owl',
    name: 'Coruja Noturna',
    description: 'Jogue às 2h da manhã',
    icon: '🦉',
    unlocked: false,
  },
  {
    id: 'early_bird',
    name: 'Madrugador',
    description: 'Jogue às 6h da manhã',
    icon: '🐦',
    unlocked: false,
  },

  // Streak Achievements
  {
    id: 'three_in_row',
    name: 'Três Seguidos',
    description: 'Complete 3 níveis consecutivos',
    icon: '3️⃣',
    unlocked: false,
  },
  {
    id: 'five_streak',
    name: 'Sequência de Cinco',
    description: 'Complete 5 níveis consecutivos',
    icon: '5️⃣',
    unlocked: false,
  },
  {
    id: 'ten_streak',
    name: 'Sequência de Dez',
    description: 'Complete 10 níveis consecutivos',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'unstoppable',
    name: 'Imparável',
    description: 'Complete 20 níveis consecutivos',
    icon: '🚀',
    unlocked: false,
  },

  // Discovery Achievements
  {
    id: 'word_discoverer',
    name: 'Descobridor',
    description: 'Encontre uma palavra de 8+ letras como bônus',
    icon: '🔍',
    unlocked: false,
  },
  {
    id: 'hidden_treasure',
    name: 'Tesouro Escondido',
    description: 'Encontre uma palavra de 10+ letras como bônus',
    icon: '💰',
    unlocked: false,
  },
  {
    id: 'linguistic_genius',
    name: 'Gênio Linguístico',
    description: 'Encontre uma palavra de 12+ letras como bônus',
    icon: '🧠',
    unlocked: false,
  },

  // Grid Mastery Achievements
  {
    id: 'small_grid_master',
    name: 'Mestre do Grid Pequeno',
    description: 'Complete 50 grids de 10x10',
    icon: '⬜',
    unlocked: false,
  },
  {
    id: 'medium_grid_expert',
    name: 'Expert do Grid Médio',
    description: 'Complete 30 grids de 15x15',
    icon: '◻️',
    unlocked: false,
  },
  {
    id: 'large_grid_champion',
    name: 'Campeão do Grid Grande',
    description: 'Complete 20 grids de 20x20',
    icon: '🔲',
    unlocked: false,
  },

  // Persistence Achievements
  {
    id: 'persistent_player',
    name: 'Jogador Persistente',
    description: 'Jogue por 7 dias consecutivos',
    icon: '📅',
    unlocked: false,
  },
  {
    id: 'dedicated_seeker',
    name: 'Buscador Dedicado',
    description: 'Jogue por 30 dias no total',
    icon: '📆',
    unlocked: false,
  },
  {
    id: 'marathon_runner',
    name: 'Maratonista',
    description: 'Jogue por 100 dias no total',
    icon: '🏃',
    unlocked: false,
  },

  // Difficulty Mastery
  {
    id: 'easy_master',
    name: 'Mestre Fácil',
    description: 'Complete 50 níveis na dificuldade Fácil',
    icon: '🟢',
    unlocked: false,
  },
  {
    id: 'medium_master',
    name: 'Mestre Médio',
    description: 'Complete 30 níveis na dificuldade Médio',
    icon: '🟡',
    unlocked: false,
  },
  {
    id: 'hard_master',
    name: 'Mestre Difícil',
    description: 'Complete 20 níveis na dificuldade Difícil',
    icon: '🟠',
    unlocked: false,
  },
  {
    id: 'expert_master',
    name: 'Mestre Expert',
    description: 'Complete 10 níveis na dificuldade Expert',
    icon: '🔴',
    unlocked: false,
  },

  // Fun Achievements
  {
    id: 'lucky_seven',
    name: 'Sete da Sorte',
    description: 'Complete exatamente 7 palavras em um nível',
    icon: '🍀',
    unlocked: false,
  },
  {
    id: 'palindrome_finder',
    name: 'Caçador de Palíndromos',
    description: 'Encontre uma palavra que se lê igual de trás para frente',
    icon: '🔄',
    unlocked: false,
  },
  {
    id: 'alphabet_soup',
    name: 'Sopa de Letrinhas',
    description: 'Encontre palavras que começam com A, B e C no mesmo nível',
    icon: '🍜',
    unlocked: false,
  },

  // Achievement Hunter Meta
  {
    id: 'achievement_hunter',
    name: 'Caçador de Conquistas',
    description: 'Desbloqueie 10 conquistas',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'collection_master',
    name: 'Mestre Colecionador',
    description: 'Desbloqueie 25 conquistas',
    icon: '🎖️',
    unlocked: false,
  },
  {
    id: 'completionist',
    name: 'Completista',
    description: 'Desbloqueie 50 conquistas',
    icon: '👑',
    unlocked: false,
  },

  // Legendary Achievements
  {
    id: 'word_search_legend',
    name: 'Lenda do Caça-Palavras',
    description: 'Desbloqueie todas as outras conquistas',
    icon: '🌟',
    unlocked: false,
  },
];

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = React.useState<GameState>('menu');
  const [difficulty, setDifficulty] = React.useState<Difficulty>('easy');
  const [achievements, setAchievements] = React.useState<Achievement[]>(() => {
    const saved = localStorage.getItem('wordSearchAchievements');
    if (saved) {
      try {
        const parsedAchievements = JSON.parse(saved);
        // Convert unlockedAt strings back to Date objects
        return parsedAchievements.map((achievement: any) => ({
          ...achievement,
          unlockedAt: achievement.unlockedAt ? new Date(achievement.unlockedAt) : undefined
        }));
      } catch (error) {
        console.error('Error parsing achievements from localStorage:', error);
        return INITIAL_ACHIEVEMENTS;
      }
    }
    return INITIAL_ACHIEVEMENTS;
  });
  const [totalScore, setTotalScore] = React.useState(() => {
    const saved = localStorage.getItem('wordSearchTotalScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gamesPlayed, setGamesPlayed] = React.useState(() => {
    const saved = localStorage.getItem('wordSearchGamesPlayed');
    return saved ? parseInt(saved, 10) : 0;
  });

  React.useEffect(() => {
    localStorage.setItem('wordSearchAchievements', JSON.stringify(achievements));
  }, [achievements]);

  React.useEffect(() => {
    localStorage.setItem('wordSearchTotalScore', totalScore.toString());
  }, [totalScore]);

  React.useEffect(() => {
    localStorage.setItem('wordSearchGamesPlayed', gamesPlayed.toString());
  }, [gamesPlayed]);

  const unlockAchievement = React.useCallback((achievementId: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      )
    );
  }, []);

  const addScore = React.useCallback((points: number) => {
    setTotalScore(prev => prev + points);
  }, []);

  const incrementGamesPlayed = React.useCallback(() => {
    setGamesPlayed(prev => prev + 1);
  }, []);

  const value = {
    gameState,
    difficulty,
    achievements,
    totalScore,
    gamesPlayed,
    setGameState,
    setDifficulty,
    unlockAchievement,
    addScore,
    incrementGamesPlayed,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}