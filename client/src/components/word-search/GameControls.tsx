import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Home, HelpCircle } from 'lucide-react';
import { GameInstructions } from './GameInstructions';
import { ThemeToggle } from './ThemeToggle';
import { ZoomControl } from './ZoomControl';

interface GameControlsProps {
  isPaused: boolean;
  isGameComplete: boolean;
  onPause: () => void;
  onBackToMenu: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export function GameControls({
  isPaused,
  isGameComplete,
  onPause,
  onBackToMenu,
  zoom,
  onZoomChange
}: GameControlsProps) {
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main controls */}
        <div className="flex gap-2">
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

          <ThemeToggle />
        </div>

        {/* Zoom control */}
        <ZoomControl zoom={zoom} onZoomChange={onZoomChange} />
      </div>

      {showInstructions && (
        <GameInstructions onClose={() => setShowInstructions(false)} />
      )}
    </>
  );
}
