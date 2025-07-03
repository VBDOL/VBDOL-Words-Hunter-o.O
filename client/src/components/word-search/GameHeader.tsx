import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GameHeaderProps {
  level: number;
  phase: number;
  foundWords: number;
  totalWords: number;
}

export function GameHeader({ level, phase, foundWords, totalWords }: GameHeaderProps) {
  const progress = (foundWords / totalWords) * 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Caça-Palavras Brasileiro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            Fase {phase} • Nível {level}
          </div>
          <div className="text-sm font-medium">
            {foundWords}/{totalWords} palavras encontradas
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
    </Card>
  );
}