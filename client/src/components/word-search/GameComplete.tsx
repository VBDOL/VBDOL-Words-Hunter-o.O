import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, ArrowRight } from 'lucide-react';

interface GameCompleteProps {
  level: number;
  phase: number;
  onNextLevel: () => void;
  onResetGame: () => void;
}

export function GameComplete({ level, phase, onNextLevel, onResetGame }: GameCompleteProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Parabéns!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-semibold">
              Fase {phase} • Nível {level} Completo!
            </p>
            <p className="text-muted-foreground mt-2">
              Você encontrou todas as palavras!
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={onNextLevel}
              className="w-full"
              size="lg"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Próximo Nível
            </Button>
            
            <Button 
              onClick={onResetGame}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Recomeçar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}