export interface DifficultyLevel {
  phase: number;
  name: string;
  baseWordCount: number;
  gridSize: number;
  minWordLength: number;
  maxWordLength: number;
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    phase: 1,
    name: 'Iniciante',
    baseWordCount: 8,
    gridSize: 10,
    minWordLength: 4,
    maxWordLength: 6,
  },
  {
    phase: 2,
    name: 'Fácil',
    baseWordCount: 10,
    gridSize: 12,
    minWordLength: 4,
    maxWordLength: 7,
  },
  {
    phase: 3,
    name: 'Médio',
    baseWordCount: 12,
    gridSize: 14,
    minWordLength: 5,
    maxWordLength: 8,
  },
  {
    phase: 4,
    name: 'Difícil',
    baseWordCount: 15,
    gridSize: 16,
    minWordLength: 6,
    maxWordLength: 9,
  },
  {
    phase: 5,
    name: 'Expert',
    baseWordCount: 18,
    gridSize: 18,
    minWordLength: 7,
    maxWordLength: 10,
  },
  {
    phase: 6,
    name: 'Mestre',
    baseWordCount: 20,
    gridSize: 20,
    minWordLength: 8,
    maxWordLength: 12,
  },
];