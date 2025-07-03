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
  {
    id: 'first_game',
    name: 'Primeira Partida',
    description: 'Complete seu primeiro jogo',
    icon: '🎮',
    unlocked: false,
  },
  {
    id: 'speed_demon',
    name: 'Demônio da Velocidade',
    description: 'Complete um nível em menos de 30 segundos',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'word_hunter',
    name: 'Caçador de Palavras',
    description: 'Encontre 5 palavras bônus em uma partida',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Complete um nível sem erros',
    icon: '💎',
    unlocked: false,
  },
  {
    id: 'master_player',
    name: 'Jogador Mestre',
    description: 'Alcance a fase Mestre',
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'time_master',
    name: 'Mestre do Tempo',
    description: 'Acumule mais de 60 segundos de tempo bônus',
    icon: '⏰',
    unlocked: false,
  },
];

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = React.useState<GameState>('menu');
  const [difficulty, setDifficulty] = React.useState<Difficulty>('easy');
  const [achievements, setAchievements] = React.useState<Achievement[]>(() => {
    const saved = localStorage.getItem('wordSearchAchievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
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