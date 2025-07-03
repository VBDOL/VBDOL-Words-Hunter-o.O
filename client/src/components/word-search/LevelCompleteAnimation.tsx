import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Clock, Target, ArrowRight, RotateCcw } from 'lucide-react';

interface LevelCompleteAnimationProps {
  level: number;
  phase: number;
  score: number;
  timeBonus: number;
  bonusWords: number;
  onNextLevel: () => void;
  onResetGame: () => void;
  isVisible: boolean;
}

export function LevelCompleteAnimation({
  level,
  phase,
  score,
  timeBonus,
  bonusWords,
  onNextLevel,
  onResetGame,
  isVisible,
}: LevelCompleteAnimationProps) {
  const [animationStep, setAnimationStep] = React.useState(0);

  React.useEffect(() => {
    if (isVisible) {
      setAnimationStep(0);
      const timer = setTimeout(() => setAnimationStep(1), 300);
      const timer2 = setTimeout(() => setAnimationStep(2), 800);
      const timer3 = setTimeout(() => setAnimationStep(3), 1300);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative">
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>

        <Card className="w-full max-w-md transform transition-all duration-500 animate-in zoom-in-95">
          <CardContent className="p-8 text-center space-y-6">
            {/* Trophy Animation */}
            <div 
              className={`transition-all duration-500 ${
                animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <Trophy className="w-20 h-20 mx-auto text-yellow-500 animate-bounce" />
              <h2 className="text-3xl font-bold mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Nível Completo!
              </h2>
              <p className="text-lg text-muted-foreground">
                Fase {phase} • Nível {level}
              </p>
            </div>

            {/* Stats Animation */}
            <div 
              className={`space-y-4 transition-all duration-500 delay-300 ${
                animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Star className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-bold">{score}</div>
                    <div className="text-xs text-muted-foreground">Pontos</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-bold">+{timeBonus}s</div>
                    <div className="text-xs text-muted-foreground">Tempo</div>
                  </div>
                </div>
              </div>
              
              {bonusWords > 0 && (
                <div className="flex items-center justify-center space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Target className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="font-bold">{bonusWords}</div>
                    <div className="text-xs text-muted-foreground">Palavras Bônus</div>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons Animation */}
            <div 
              className={`flex flex-col gap-3 transition-all duration-500 delay-500 ${
                animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <Button 
                onClick={onNextLevel}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Próximo Nível
              </Button>
              
              <Button 
                onClick={onResetGame}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Menu Principal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}