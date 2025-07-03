import * as React from 'react';
import { GameBoard } from './GameBoard';
import { WordList } from './WordList';
import { GameHeader } from './GameHeader';
import { GameComplete } from './GameComplete';
import { useWordSearchGame } from './hooks/useWordSearchGame';
import { Card } from '@/components/ui/card';

export function WordSearchGame() {
  const {
    gameState,
    selectedCells,
    foundWords,
    currentLevel,
    currentPhase,
    isGameComplete,
    handleCellClick,
    handleCellHover,
    nextLevel,
    resetGame,
  } = useWordSearchGame();

  if (isGameComplete) {
    return (
      <GameComplete
        level={currentLevel}
        phase={currentPhase}
        onNextLevel={nextLevel}
        onResetGame={resetGame}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GameHeader
        level={currentLevel}
        phase={currentPhase}
        foundWords={foundWords.length}
        totalWords={gameState.words.length}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <GameBoard
              grid={gameState.grid}
              selectedCells={selectedCells}
              foundWords={foundWords}
              onCellClick={handleCellClick}
              onCellHover={handleCellHover}
            />
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <WordList
            words={gameState.words}
            foundWords={foundWords}
          />
        </div>
      </div>
    </div>
  );
}