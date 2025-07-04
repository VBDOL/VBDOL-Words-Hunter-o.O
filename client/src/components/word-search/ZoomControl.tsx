import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

const ZOOM_LEVELS = [0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2];

export function ZoomControl({ zoom, onZoomChange }: ZoomControlProps) {
  const currentIndex = ZOOM_LEVELS.findIndex(level => Math.abs(level - zoom) < 0.01);
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : ZOOM_LEVELS.findIndex(level => level === 1);

  const handleZoomIn = () => {
    const nextIndex = Math.min(safeCurrentIndex + 1, ZOOM_LEVELS.length - 1);
    onZoomChange(ZOOM_LEVELS[nextIndex]);
  };

  const handleZoomOut = () => {
    const prevIndex = Math.max(safeCurrentIndex - 1, 0);
    onZoomChange(ZOOM_LEVELS[prevIndex]);
  };

  const handleReset = () => {
    onZoomChange(1);
  };

  const canZoomIn = safeCurrentIndex < ZOOM_LEVELS.length - 1;
  const canZoomOut = safeCurrentIndex > 0;

  return (
    <div className="flex items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleZoomOut}
        disabled={!canZoomOut}
        title="Diminuir Zoom"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      <div className="text-sm font-medium min-w-[3.5rem] text-center">
        {Math.round(zoom * 100)}%
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleZoomIn}
        disabled={!canZoomIn}
        title="Aumentar Zoom"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        title="Resetar Zoom (100%)"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}
