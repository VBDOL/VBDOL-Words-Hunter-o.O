import * as React from 'react';
import { generateWordSearchGrid } from '../utils/gridGenerator';
import { DIFFICULTY_LEVELS } from '../utils/difficultyLevels';
import { WORD_DATABASE } from '../utils/wordDatabase';

interface GameState {
  grid: string[][];
  words: string[];
  wordPositions: Array<{
    word: string;
    cells: Array<{ row: number; col: number }>;
  }>;
}

export function useWordSearchGame() {
  const [currentLevel, setCurrentLevel] = React.useState(1);
  const [currentPhase, setCurrentPhase] = React.useState(1);
  const [gameState, setGameState] = React.useState<GameState>({ grid: [], words: [], wordPositions: [] });
  const [selectedCells, setSelectedCells] = React.useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = React.useState<Array<{
    word: string;
    cells: Array<{ row: number; col: number }>;
  }>>([]);
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [selectionStart, setSelectionStart] = React.useState<{ row: number; col: number } | null>(null);

  const isGameComplete = foundWords.length === gameState.words.length && gameState.words.length > 0;

  const generateNewGame = React.useCallback(() => {
    const difficulty = DIFFICULTY_LEVELS[currentPhase - 1];
    const levelInPhase = ((currentLevel - 1) % 5) + 1;
    
    const wordCount = difficulty.baseWordCount + (levelInPhase - 1) * 2;
    const gridSize = difficulty.gridSize + Math.floor((levelInPhase - 1) / 2);
    
    const availableWords = WORD_DATABASE.filter(word => 
      word.length >= difficulty.minWordLength && 
      word.length <= difficulty.maxWordLength
    );
    
    const selectedWords = availableWords
      .sort(() => Math.random() - 0.5)
      .slice(0, wordCount);
    
    const { grid, wordPositions } = generateWordSearchGrid(selectedWords, gridSize);
    
    setGameState({
      grid,
      words: selectedWords,
      wordPositions
    });
    
    setFoundWords([]);
    setSelectedCells(new Set());
  }, [currentLevel, currentPhase]);

  React.useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  const handleCellClick = (row: number, col: number) => {
    if (!isSelecting) {
      setIsSelecting(true);
      setSelectionStart({ row, col });
      setSelectedCells(new Set([`${row}-${col}`]));
    } else {
      setIsSelecting(false);
      checkForWord();
    }
  };

  const handleCellHover = (row: number, col: number) => {
    if (isSelecting && selectionStart) {
      const cells = getLineCells(selectionStart.row, selectionStart.col, row, col);
      setSelectedCells(new Set(cells.map(cell => `${cell.row}-${cell.col}`)));
    }
  };

  const getLineCells = (startRow: number, startCol: number, endRow: number, endCol: number) => {
    const cells = [];
    const deltaRow = endRow - startRow;
    const deltaCol = endCol - startCol;
    
    let dirRow = 0;
    let dirCol = 0;
    
    if (deltaRow !== 0) dirRow = deltaRow / Math.abs(deltaRow);
    if (deltaCol !== 0) dirCol = deltaCol / Math.abs(deltaCol);
    
    if (deltaRow === 0 || deltaCol === 0 || Math.abs(deltaRow) === Math.abs(deltaCol)) {
      const steps = Math.max(Math.abs(deltaRow), Math.abs(deltaCol));
      for (let i = 0; i <= steps; i++) {
        cells.push({
          row: startRow + i * dirRow,
          col: startCol + i * dirCol
        });
      }
    }
    
    return cells;
  };

  const checkForWord = () => {
    const selectedCellsArray = Array.from(selectedCells).map(cellKey => {
      const [row, col] = cellKey.split('-').map(Number);
      return { row, col };
    });
    
    const word = selectedCellsArray
      .map(cell => gameState.grid[cell.row]?.[cell.col])
      .join('');
    
    const reverseWord = word.split('').reverse().join('');
    
    const foundWordPosition = gameState.wordPositions.find(wp => 
      wp.word === word.toLowerCase() || wp.word === reverseWord.toLowerCase()
    );
    
    if (foundWordPosition && !foundWords.some(fw => fw.word === foundWordPosition.word)) {
      setFoundWords(prev => [...prev, foundWordPosition]);
    }
    
    setSelectedCells(new Set());
    setSelectionStart(null);
  };

  const nextLevel = () => {
    const newLevel = currentLevel + 1;
    const newPhase = Math.floor((newLevel - 1) / 5) + 1;
    
    setCurrentLevel(newLevel);
    setCurrentPhase(newPhase);
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setCurrentPhase(1);
  };

  return {
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
  };
}