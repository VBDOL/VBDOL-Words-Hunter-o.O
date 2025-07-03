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
  zoom?: number;
}

export function GameBoard({
  grid,
  selectedCells,
  foundWords,
  onCellClick,
  onCellHover,
  zoom = 1
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

  // Calculate cell size based on zoom
  const baseCellSize = 40; // Base size in pixels
  const cellSize = Math.round(baseCellSize * zoom);

  return (
    <div className="flex justify-center overflow-auto p-4">
      <div
        className="grid gap-1 select-none transition-all duration-200"
        style={{
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, ${cellSize}px)`,
          transform: `scale(${zoom})`,
          transformOrigin: 'center'
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
                  "border border-border font-mono font-semibold transition-all duration-200 hover:scale-110 rounded-sm",
                  {
                    "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100": isSelected && !isFound,
                    "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100": isFound,
                    "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700": !isSelected && !isFound,
                  }
                )}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  fontSize: `${Math.max(12, cellSize * 0.35)}px`
                }}
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
