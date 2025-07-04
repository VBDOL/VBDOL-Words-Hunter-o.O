import * as React from 'react';
import { GameBoard } from './GameBoard';
import { WordList } from './WordList';
import { GameHeader } from './GameHeader';
import { GameTimer } from './GameTimer';
import { GameControls } from './GameControls';
import { LevelCompleteAnimation } from './LevelCompleteAnimation';
import { useWordSearchGame } from './hooks/useWordSearchGame';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Home } from 'lucide-react';
import { useGameContext } from './context/GameContext';

const DIFFICULTY_TIME_CONFIG = {
  easy: { baseTime: 120, bonusTime: 15 },
  medium: { baseTime: 90, bonusTime: 12 },
  hard: { baseTime: 60, bonusTime: 10 },
  expert: { baseTime: 45, bonusTime: 8 },
};

// Function to get color classes based on word length
const getBonusWordColor = (wordLength: number) => {
  if (wordLength >= 10) {
    return {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-300 dark:border-purple-700',
      text: 'text-purple-800 dark:text-purple-200',
      icon: '💜'
    };
  } else if (wordLength >= 8) {
    return {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-300 dark:border-blue-700',
      text: 'text-blue-800 dark:text-blue-200',
      icon: '💙'
    };
  } else if (wordLength >= 6) {
    return {
      bg: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-300 dark:border-green-700',
      text: 'text-green-800 dark:text-green-200',
      icon: '💚'
    };
  } else if (wordLength >= 5) {
    return {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      border: 'border-yellow-300 dark:border-yellow-700',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: '💛'
    };
  } else {
    return {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-300 dark:border-orange-700',
      text: 'text-orange-800 dark:text-orange-200',
      icon: '🧡'
    };
  }
};

export function WordSearchGame() {
  const { setGameState, difficulty } = useGameContext();
  const {
    gameState,
    selectedCells,
    foundWords,
    bonusWords,
    currentLevel,
    currentPhase,
    isGameComplete,
    timeLeft,
    initialTime,
    isTimerRunning,
    bonusAnimation,
    currentScore,
    mistakes,
    showLevelComplete,
    handleCellClick,
    handleCellHover,
    nextLevel,
    resetGame,
  } = useWordSearchGame();

  const [isPaused, setIsPaused] = React.useState(false);
  const [zoom, setZoom] = React.useState(() => {
    const saved = localStorage.getItem('wordSearchZoom');
    return saved ? parseFloat(saved) : 1;
  });

  React.useEffect(() => {
    localStorage.setItem('wordSearchZoom', zoom.toString());
  }, [zoom]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  if (timeLeft <= 0 && !isGameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900/20">
        <Card className="w-full max-w-md p-8 text-center space-y-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <div className="text-6xl">⏰</div>
          <h2 className="text-2xl font-bold">Tempo Esgotado!</h2>
          <p className="text-muted-foreground">
            Você encontrou {foundWords.length} de {gameState.words.length} palavras
          </p>
          {bonusWords.length > 0 && (
            <p className="text-green-600">
              + {bonusWords.length} palavras bônus encontradas!
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Button onClick={resetGame} className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Menu
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <GameHeader
              level={currentLevel}
              phase={currentPhase}
              foundWords={foundWords.length}
              totalWords={gameState.words.length}
              score={currentScore}
              mistakes={mistakes}
            />
          </div>

          <div className="flex gap-4">
            <GameTimer
              timeLeft={timeLeft}
              initialTime={initialTime}
              isRunning={isTimerRunning && !isPaused}
              bonusAnimation={bonusAnimation}
            />

            <GameControls
              isPaused={isPaused}
              isGameComplete={isGameComplete}
              onPause={handlePause}
              onBackToMenu={handleBackToMenu}
              zoom={zoom}
              onZoomChange={setZoom}
            />
          </div>
        </div>

        {/* Game content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
              {isPaused ? (
                <div className="flex items-center justify-center h-64 text-center">
                  <div className="space-y-4">
                    <div className="text-6xl">⏸️</div>
                    <h3 className="text-xl font-semibold">Jogo Pausado</h3>
                    <p className="text-muted-foreground mb-4">
                      Clique em continuar para retomar o jogo
                    </p>
                    <Button onClick={handlePause}>
                      <Play className="w-4 h-4 mr-2" />
                      Continuar
                    </Button>
                  </div>
                </div>
              ) : (
                <GameBoard
                  grid={gameState.grid}
                  selectedCells={selectedCells}
                  foundWords={foundWords}
                  onCellClick={handleCellClick}
                  onCellHover={handleCellHover}
                  zoom={zoom}
                />
              )}
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <WordList
              words={gameState.words}
              foundWords={foundWords}
            />

            {bonusWords.length > 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                <div className="p-4">
                  <h3 className="font-semibold text-green-600 mb-3 flex items-center">
                    🎯 Palavras Bônus ({bonusWords.length})
                    <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                      +{bonusWords.length * (DIFFICULTY_TIME_CONFIG[difficulty]?.bonusTime || 10)}s
                    </span>
                  </h3>
                  <div className="space-y-2">
                    {bonusWords.map((word, index) => {
                      const colorClass = getBonusWordColor(word.length);
                      return (
                        <div
                          key={index}
                          className={`text-sm ${colorClass.bg} ${colorClass.text} px-3 py-2 rounded-lg border ${colorClass.border} flex justify-between items-center transition-all duration-200 hover:scale-102 shadow-sm`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{colorClass.icon}</span>
                            <span className="font-medium">{word.toUpperCase()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs opacity-75 font-medium">
                              {word.length} letras
                            </span>
                            <span className="text-xs bg-white/50 dark:bg-black/20 px-1.5 py-0.5 rounded">
                              +{DIFFICULTY_TIME_CONFIG[difficulty]?.bonusTime || 10}s
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="font-medium text-blue-700 dark:text-blue-300">
                        💡 Dica: Palavras maiores valem mais tempo!
                      </p>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <span>🧡 4 letras: +{DIFFICULTY_TIME_CONFIG[difficulty]?.bonusTime || 10}s</span>
                        <span>💛 5 letras: +{DIFFICULTY_TIME_CONFIG[difficulty]?.bonusTime || 10}s</span>
                        <span>💚 6-7 letras: +{DIFFICULTY_TIME_CONFIG[difficulty]?.bonusTime || 10}s</span>
                        <span>💙 8-9 letras: +{DIFFICULTY_TIME_CONFIG[difficulty]?.bonusTime || 10}s</span>
                        <span className="col-span-2">💜 10+ letras: +{DIFFICULTY_TIME_CONFIG[difficulty]?.bonusTime || 10}s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <LevelCompleteAnimation
        level={currentLevel}
        phase={currentPhase}
        score={currentScore}
        timeBonus={Math.max(0, timeLeft * 2)}
        bonusWords={bonusWords.length}
        onNextLevel={nextLevel}
        onResetGame={resetGame}
        isVisible={showLevelComplete}
      />
    </div>
  );
}
