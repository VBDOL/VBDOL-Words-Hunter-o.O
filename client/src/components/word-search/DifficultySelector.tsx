import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useGameContext, Difficulty } from './context/GameContext';
import { cn } from '@/lib/utils';

const DIFFICULTY_CONFIG = {
  easy: {
    name: 'Fácil',
    description: 'Palavras simples, mais tempo',
    color: 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200',
    activeColor: 'bg-green-200 border-green-400 dark:bg-green-800 dark:border-green-600',
    icon: '🟢',
    timeLimit: 120,
    bonusTime: 15,
  },
  medium: {
    name: 'Médio',
    description: 'Desafio equilibrado',
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200',
    activeColor: 'bg-yellow-200 border-yellow-400 dark:bg-yellow-800 dark:border-yellow-600',
    icon: '🟡',
    timeLimit: 90,
    bonusTime: 12,
  },
  hard: {
    name: 'Difícil',
    description: 'Para especialistas',
    color: 'bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900 dark:border-orange-700 dark:text-orange-200',
    activeColor: 'bg-orange-200 border-orange-400 dark:bg-orange-800 dark:border-orange-600',
    icon: '🟠',
    timeLimit: 60,
    bonusTime: 10,
  },
  expert: {
    name: 'Expert',
    description: 'Apenas para mestres',
    color: 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200',
    activeColor: 'bg-red-200 border-red-400 dark:bg-red-800 dark:border-red-600',
    icon: '🔴',
    timeLimit: 45,
    bonusTime: 8,
  },
};

export function DifficultySelector() {
  const { difficulty, setDifficulty } = useGameContext();

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => {
        const isSelected = difficulty === key;
        
        return (
          <Card
            key={key}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:scale-105 border-2",
              isSelected ? config.activeColor : config.color
            )}
            onClick={() => handleDifficultyChange(key as Difficulty)}
          >
            <CardContent className="p-4 text-center space-y-3">
              <div className="text-2xl">{config.icon}</div>
              
              <div>
                <h3 className="font-bold text-lg">{config.name}</h3>
                <p className="text-sm opacity-80">{config.description}</p>
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Tempo:</span>
                  <span className="font-semibold">{config.timeLimit}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Bônus:</span>
                  <span className="font-semibold">+{config.bonusTime}s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}