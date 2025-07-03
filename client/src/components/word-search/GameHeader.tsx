import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Target, AlertTriangle } from 'lucide-react';

interface GameHeaderProps {
  level: number;
  phase: number;
  foundWords: number;
  totalWords: number;
  score?: number;
  mistakes?: number;
}

export function GameHeader({ 
  level, 
  phase, 
  foundWords, 
  totalWords, 
  score = 0, 
  mistakes = 0 
}: GameHeaderProps) {
  const progress = (foundWords / totalWords) * 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Caça-Palavras Brasileiro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Level and Phase Info */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Fase {phase} • Nível {level}
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{score.toLocaleString()}</span>
              </div>
              {mistakes > 0 && (
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-red-600">{mistakes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Palavras</span>
              </div>
              <span className="font-medium">
                {foundWords}/{totalWords}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}