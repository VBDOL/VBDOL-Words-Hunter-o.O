import * as React from 'react';
import { generateWordSearchGrid } from '../utils/gridGenerator';
import { DIFFICULTY_LEVELS } from '../utils/difficultyLevels';
import { WORD_DATABASE } from '../utils/wordDatabase';
import { useGameContext } from '../context/GameContext';

interface GameState {
  grid: string[][];
  words: string[];
  wordPositions: Array<{
    word: string;
    cells: Array<{ row: number; col: number }>;
  }>;
}

const DIFFICULTY_TIME_CONFIG = {
  easy: { baseTime: 120, bonusTime: 15 },
  medium: { baseTime: 90, bonusTime: 12 },
  hard: { baseTime: 60, bonusTime: 10 },
  expert: { baseTime: 45, bonusTime: 8 },
};

export function useWordSearchGame() {
  const { 
    difficulty, 
    unlockAchievement, 
    addScore, 
    incrementGamesPlayed,
    setGameState 
  } = useGameContext();
  
  const [currentLevel, setCurrentLevel] = React.useState(1);
  const [currentPhase, setCurrentPhase] = React.useState(1);
  const [gameState, setInternalGameState] = React.useState<GameState>({ 
    grid: [], 
    words: [], 
    wordPositions: [] 
  });
  const [selectedCells, setSelectedCells] = React.useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = React.useState<Array<{
    word: string;
    cells: Array<{ row: number; col: number }>;
  }>>([]);
  const [bonusWords, setBonusWords] = React.useState<string[]>([]);
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [selectionStart, setSelectionStart] = React.useState<{ row: number; col: number } | null>(null);
  
  // Timer state
  const [timeLeft, setTimeLeft] = React.useState(DIFFICULTY_TIME_CONFIG[difficulty].baseTime);
  const [initialTime, setInitialTime] = React.useState(DIFFICULTY_TIME_CONFIG[difficulty].baseTime);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [bonusAnimation, setBonusAnimation] = React.useState(false);
  
  // Game progress
  const [currentScore, setCurrentScore] = React.useState(0);
  const [showLevelComplete, setShowLevelComplete] = React.useState(false);
  const [mistakes, setMistakes] = React.useState(0);
  const [totalBonusTime, setTotalBonusTime] = React.useState(0);

  const isGameComplete = foundWords.length === gameState.words.length && gameState.words.length > 0;
  const isTimeUp = timeLeft <= 0 && isTimerRunning;

  // Timer effect
  React.useEffect(() => {
    if (isTimerRunning && timeLeft > 0 && !isGameComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isTimerRunning, timeLeft, isGameComplete]);

  // Game completion effect
  React.useEffect(() => {
    if (isGameComplete && !showLevelComplete) {
      setIsTimerRunning(false);
      setShowLevelComplete(true);
      
      // Calculate score
      const baseScore = foundWords.length * 100;
      const timeBonus = Math.max(0, timeLeft * 2);
      const bonusWordScore = bonusWords.length * 50;
      const perfectBonus = mistakes === 0 ? 200 : 0;
      const totalScore = baseScore + timeBonus + bonusWordScore + perfectBonus;
      
      setCurrentScore(totalScore);
      addScore(totalScore);
      
      // Check achievements
      if (currentLevel === 1 && currentPhase === 1) {
        unlockAchievement('first_game');
      }
      
      if (timeLeft >= 90) {
        unlockAchievement('speed_demon');
      }
      
      if (bonusWords.length >= 5) {
        unlockAchievement('word_hunter');
      }
      
      if (mistakes === 0) {
        unlockAchievement('perfectionist');
      }
      
      if (currentPhase >= 6) {
        unlockAchievement('master_player');
      }
      
      if (totalBonusTime >= 60) {
        unlockAchievement('time_master');
      }
      
      incrementGamesPlayed();
    }
  }, [isGameComplete, showLevelComplete, foundWords.length, timeLeft, bonusWords.length, mistakes, currentPhase, currentLevel, totalBonusTime, unlockAchievement, addScore, incrementGamesPlayed]);

  // Time up effect
  React.useEffect(() => {
    if (isTimeUp) {
      setIsTimerRunning(false);
      // Could show game over screen here
    }
  }, [isTimeUp]);

  const generateNewGame = React.useCallback(() => {
    const difficultyLevel = DIFFICULTY_LEVELS[Math.min(currentPhase - 1, DIFFICULTY_LEVELS.length - 1)];
    const levelInPhase = ((currentLevel - 1) % 5) + 1;
    
    const wordCount = difficultyLevel.baseWordCount + (levelInPhase - 1) * 2;
    const gridSize = difficultyLevel.gridSize + Math.floor((levelInPhase - 1) / 2);
    
    const availableWords = WORD_DATABASE.filter(word => 
      word.length >= difficultyLevel.minWordLength && 
      word.length <= difficultyLevel.maxWordLength
    );
    
    const selectedWords = availableWords
      .sort(() => Math.random() - 0.5)
      .slice(0, wordCount);
    
    const { grid, wordPositions } = generateWordSearchGrid(selectedWords, gridSize);
    
    setInternalGameState({
      grid,
      words: selectedWords,
      wordPositions
    });
    
    setFoundWords([]);
    setBonusWords([]);
    setSelectedCells(new Set());
    setMistakes(0);
    setCurrentScore(0);
    setShowLevelComplete(false);
    
    // Set timer based on difficulty and level
    const timeConfig = DIFFICULTY_TIME_CONFIG[difficulty];
    const baseTime = timeConfig.baseTime - (currentPhase - 1) * 10; // Reduce time each phase
    const levelTime = Math.max(30, baseTime); // Minimum 30 seconds
    
    setTimeLeft(levelTime);
    setInitialTime(levelTime);
    setIsTimerRunning(true);
  }, [currentLevel, currentPhase, difficulty]);

  React.useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  const addBonusTime = React.useCallback((seconds: number) => {
    setTimeLeft(prev => prev + seconds);
    setTotalBonusTime(prev => prev + seconds);
    setBonusAnimation(true);
    setTimeout(() => setBonusAnimation(false), 1000);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (!isTimerRunning || isGameComplete) return;
    
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
    
    // Check if it's a target word
    const foundWordPosition = gameState.wordPositions.find(wp => 
      wp.word === word.toLowerCase() || wp.word === reverseWord.toLowerCase()
    );
    
    if (foundWordPosition && !foundWords.some(fw => fw.word === foundWordPosition.word)) {
      setFoundWords(prev => [...prev, foundWordPosition]);
    } else {
      // Check if it's a bonus word (valid Portuguese word not in target list)
      const lowerWord = word.toLowerCase();
      const isValidBonusWord = WORD_DATABASE.includes(lowerWord) && 
                               !gameState.words.includes(lowerWord) &&
                               !bonusWords.includes(lowerWord) &&
                               lowerWord.length >= 4;
      
      if (isValidBonusWord) {
        setBonusWords(prev => [...prev, lowerWord]);
        const bonusTime = DIFFICULTY_TIME_CONFIG[difficulty].bonusTime;
        addBonusTime(bonusTime);
      } else if (selectedCellsArray.length >= 3) {
        // Count as mistake only for attempts of 3+ letters
        setMistakes(prev => prev + 1);
      }
    }
    
    setSelectedCells(new Set());
    setSelectionStart(null);
  };

  const nextLevel = () => {
    const newLevel = currentLevel + 1;
    const newPhase = Math.floor((newLevel - 1) / 5) + 1;
    
    setCurrentLevel(newLevel);
    setCurrentPhase(newPhase);
    setShowLevelComplete(false);
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentLevel(1);
    setCurrentPhase(1);
    setIsTimerRunning(false);
  };

  return {
    gameState: gameState,
    selectedCells,
    foundWords,
    bonusWords,
    currentLevel,
    currentPhase,
    isGameComplete: isGameComplete || isTimeUp,
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
  };
}