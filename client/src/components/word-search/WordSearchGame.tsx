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
                    {bonusWords.map((word, index) => (
                      <div
                        key={index}
                        className="text-sm bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-2 py-1 rounded border border-green-200 dark:border-green-800 flex justify-between items-center"
                      >
                        <span>{word.toUpperCase()}</span>
                        <span className="text-xs opacity-75">{word.length} letras</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    💡 Continue procurando palavras que não estão na lista para ganhar mais tempo!
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
