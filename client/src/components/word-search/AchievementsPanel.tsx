import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGameContext } from './context/GameContext';
import { X, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementsPanelProps {
  onClose: () => void;
}

export function AchievementsPanel({ onClose }: AchievementsPanelProps) {
  const { achievements } = useGameContext();
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Conquistas</CardTitle>
            <p className="text-muted-foreground">
              {unlockedCount}/{totalCount} desbloqueadas ({completionPercentage}%)
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4 overflow-y-auto max-h-96">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200",
                achievement.unlocked 
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
                  : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              )}
            >
              <div className="text-3xl">
                {achievement.unlocked ? achievement.icon : <Lock className="h-8 w-8 text-gray-400" />}
              </div>
              
              <div className="flex-1">
                <h3 className={cn(
                  "font-semibold",
                  achievement.unlocked ? "text-green-800 dark:text-green-200" : "text-gray-500"
                )}>
                  {achievement.name}
                </h3>
                <p className={cn(
                  "text-sm",
                  achievement.unlocked ? "text-green-600 dark:text-green-400" : "text-gray-400"
                )}>
                  {achievement.description}
                </p>
                {achievement.unlocked && achievement.unlockedAt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Desbloqueada em {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
              
              {achievement.unlocked && (
                <div className="text-green-600 dark:text-green-400">
                  ✓
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}