import * as React from 'react';
import { GameBoard } from './GameBoard';
import { WordList } from './WordList';
import { GameHeader } from './GameHeader';
import { GameTimer } from './GameTimer';
import { LevelCompleteAnimation } from './LevelCompleteAnimation';
import { useWordSearchGame } from './hooks/useWordSearchGame';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pause, Play, Home } from 'lucide-react';
import { useGameContext } from './context/GameContext';

export function WordSearchGame() {
  const { setGameState } = useGameContext();
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

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  if (timeLeft <= 0 && !isGameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
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
    <>
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
            
            <div className="flex flex-col gap-2">
              <Button
                onClick={handlePause}
                variant="outline"
                size="icon"
                disabled={isGameComplete}
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              
              <Button
                onClick={handleBackToMenu}
                variant="outline"
                size="icon"
              >
                <Home className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Game content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              {isPaused ? (
                <div className="flex items-center justify-center h-64 text-center">
                  <div className="space-y-4">
                    <Pause className="w-16 h-16 mx-auto text-muted-foreground" />
                    <h3 className="text-xl font-semibold">Jogo Pausado</h3>
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
              <Card>
                <div className="p-4">
                  <h3 className="font-semibold text-green-600 mb-3 flex items-center">
                    🎯 Palavras Bônus ({bonusWords.length})
                  </h3>
                  <div className="space-y-2">
                    {bonusWords.map((word, index) => (
                      <div
                        key={index}
                        className="text-sm bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-2 py-1 rounded border border-green-200 dark:border-green-800"
                      >
                        {word.toUpperCase()}
                      </div>
                    ))}
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
    </>
  );
}