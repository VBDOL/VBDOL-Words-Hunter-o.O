import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Home, HelpCircle } from 'lucide-react';
import { GameInstructions } from './GameInstructions';

interface GameControlsProps {
  isPaused: boolean;
  isGameComplete: boolean;
  onPause: () => void;
  onBackToMenu: () => void;
}

export function GameControls({ isPaused, isGameComplete, onPause, onBackToMenu }: GameControlsProps) {
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          onClick={onPause}
          variant="outline"
          size="icon"
          disabled={isGameComplete}
          title={isPaused ? "Continuar" : "Pausar"}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
        
        <Button
          onClick={() => setShowInstructions(true)}
          variant="outline"
          size="icon"
          title="Como Jogar"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={onBackToMenu}
          variant="outline"
          size="icon"
          title="Menu Principal"
        >
          <Home className="h-4 w-4" />
        </Button>
      </div>

      {showInstructions && (
        <GameInstructions onClose={() => setShowInstructions(false)} />
      )}
    </>
  );
}