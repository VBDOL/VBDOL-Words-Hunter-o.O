import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameTimerProps {
  timeLeft: number;
  initialTime: number;
  isRunning: boolean;
  bonusAnimation?: boolean;
}

export function GameTimer({ timeLeft, initialTime, isRunning, bonusAnimation }: GameTimerProps) {
  const percentage = (timeLeft / initialTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const isLowTime = timeLeft <= 30;
  const isCriticalTime = timeLeft <= 10;

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      bonusAnimation && "animate-pulse border-green-400 shadow-lg shadow-green-200",
      isCriticalTime && "border-red-400 shadow-lg shadow-red-200",
      isLowTime && !isCriticalTime && "border-yellow-400 shadow-lg shadow-yellow-200"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className={cn(
              "w-5 h-5",
              isCriticalTime && "text-red-500 animate-pulse",
              isLowTime && !isCriticalTime && "text-yellow-500"
            )} />
            <span className="text-sm font-medium">Tempo</span>
          </div>
          
          {bonusAnimation && (
            <div className="flex items-center text-green-600 animate-bounce">
              <Plus className="w-4 h-4" />
              <span className="text-xs font-bold">BÔNUS!</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "text-2xl font-bold font-mono text-center mb-2",
          isCriticalTime && "text-red-500 animate-pulse",
          isLowTime && !isCriticalTime && "text-yellow-600"
        )}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <Progress 
          value={percentage} 
          className={cn(
            "h-2",
            isCriticalTime && "[&>div]:bg-red-500",
            isLowTime && !isCriticalTime && "[&>div]:bg-yellow-500"
          )}
        />
      </CardContent>
      
      {bonusAnimation && (
        <div className="absolute inset-0 bg-green-400/10 animate-ping rounded-lg" />
      )}
    </Card>
  );
}