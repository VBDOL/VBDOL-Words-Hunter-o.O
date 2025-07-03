import * as React from 'react';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  grid: string[][];
  selectedCells: Set<string>;
  foundWords: Array<{
    word: string;
    cells: Array<{ row: number; col: number }>;
  }>;
  onCellClick: (row: number, col: number) => void;
  onCellHover: (row: number, col: number) => void;
}

export function GameBoard({ 
  grid, 
  selectedCells, 
  foundWords, 
  onCellClick, 
  onCellHover 
}: GameBoardProps) {
  const foundCells = React.useMemo(() => {
    const cells = new Set<string>();
    foundWords.forEach(foundWord => {
      foundWord.cells.forEach(cell => {
        cells.add(`${cell.row}-${cell.col}`);
      });
    });
    return cells;
  }, [foundWords]);

  const handleCellClick = (row: number, col: number) => {
    onCellClick(row, col);
  };

  const handleCellHover = (row: number, col: number) => {
    onCellHover(row, col);
  };

  return (
    <div className="flex justify-center">
      <div 
        className="grid gap-1 select-none"
        style={{
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, minmax(0, 1fr))`
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const cellKey = `${rowIndex}-${colIndex}`;
            const isSelected = selectedCells.has(cellKey);
            const isFound = foundCells.has(cellKey);
            
            return (
              <button
                key={cellKey}
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 border border-border text-sm font-mono font-semibold transition-all duration-200 hover:scale-110",
                  {
                    "bg-blue-200 text-blue-800": isSelected && !isFound,
                    "bg-green-200 text-green-800": isFound,
                    "bg-background hover:bg-muted": !isSelected && !isFound,
                  }
                )}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
              >
                {cell}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}