import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGameContext } from './context/GameContext';
import { X, Lock, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementsPanelProps {
  onClose: () => void;
}

export function AchievementsPanel({ onClose }: AchievementsPanelProps) {
  const { achievements } = useGameContext();
  const [filter, setFilter] = React.useState<'all' | 'unlocked' | 'locked'>('all');
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const filteredAchievements = React.useMemo(() => {
    switch (filter) {
      case 'unlocked':
        return achievements.filter(a => a.unlocked);
      case 'locked':
        return achievements.filter(a => !a.unlocked);
      default:
        return achievements;
    }
  }, [achievements, filter]);

  const categories = React.useMemo(() => {
    const cats = new Map();
    
    // Group achievements by category based on their names/descriptions
    filteredAchievements.forEach(achievement => {
      let category = 'Geral';
      
      if (achievement.name.includes('Velocidade') || achievement.name.includes('Raio') || achievement.name.includes('Sônica')) {
        category = '⚡ Velocidade';
      } else if (achievement.name.includes('Palavra') || achievement.name.includes('Vocabulário') || achievement.name.includes('Léxico')) {
        category = '📚 Palavras';
      } else if (achievement.name.includes('Perfecion') || achievement.name.includes('Impecável') || achievement.name.includes('Erro')) {
        category = '💎 Perfeição';
      } else if (achievement.name.includes('Tempo') || achievement.name.includes('Cronos')) {
        category = '⏰ Tempo';
      } else if (achievement.name.includes('Mestre') || achievement.name.includes('Fase') || achievement.name.includes('Graduado') || achievement.name.includes('Explorador') || achievement.name.includes('Desafiante') || achievement.name.includes('Guerreiro') || achievement.name.includes('Sábio') || achievement.name.includes('Jogador Mestre')) {
        category = '🏆 Progresso';
      } else if (achievement.name.includes('Pontu') || achievement.name.includes('Score') || achievement.name.includes('Campeão') || achievement.name.includes('Lenda')) {
        category = '🎯 Pontuação';
      } else if (achievement.name.includes('Sequência') || achievement.name.includes('Seguidos') || achievement.name.includes('Consecutivos') || achievement.name.includes('Imparável')) {
        category = '🔥 Sequências';
      } else if (achievement.name.includes('Conquist') || achievement.name.includes('Colecion') || achievement.name.includes('Completist')) {
        category = '🏅 Meta';
      } else if (achievement.name.includes('Descobridor') || achievement.name.includes('Tesouro') || achievement.name.includes('Gênio') || achievement.name.includes('Olho de Águia')) {
        category = '🔍 Descoberta';
      } else if (achievement.name.includes('Grid') || achievement.name.includes('Pequeno') || achievement.name.includes('Médio') || achievement.name.includes('Grande')) {
        category = '⬜ Grid';
      } else if (achievement.name.includes('Persistente') || achievement.name.includes('Dedicado') || achievement.name.includes('Maratonista')) {
        category = '📅 Persistência';
      } else if (achievement.name.includes('Fácil') || achievement.name.includes('Difícil') || achievement.name.includes('Expert') && achievement.name.includes('Mestre')) {
        category = '🎮 Dificuldade';
      } else if (achievement.name.includes('Sorte') || achievement.name.includes('Palíndromo') || achievement.name.includes('Sopa') || achievement.name.includes('Coruja') || achievement.name.includes('Madrugador') || achievement.name.includes('Rei')) {
        category = '🎪 Especiais';
      } else if (achievement.name.includes('Primeira') || achievement.name.includes('Veterano') || achievement.name.includes('Centenário')) {
        category = '🌱 Iniciante';
      }
      
      if (!cats.has(category)) {
        cats.set(category, []);
      }
      cats.get(category).push(achievement);
    });
    
    return Array.from(cats.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredAchievements]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[85vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div>
            <CardTitle className="text-2xl">🏆 Conquistas</CardTitle>
            <p className="text-muted-foreground">
              {unlockedCount}/{totalCount} desbloqueadas ({completionPercentage}%)
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Filter buttons */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              <Filter className="w-4 h-4 mr-2" />
              Todas ({totalCount})
            </Button>
            <Button
              variant={filter === 'unlocked' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unlocked')}
            >
              ✅ Desbloqueadas ({unlockedCount})
            </Button>
            <Button
              variant={filter === 'locked' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('locked')}
            >
              🔒 Bloqueadas ({totalCount - unlockedCount})
            </Button>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progresso Total</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Achievements by category */}
          <div className="space-y-6 overflow-y-auto max-h-96">
            {categories.map(([categoryName, categoryAchievements]) => (
              <div key={categoryName}>
                <h3 className="text-lg font-semibold mb-3 text-primary">{categoryName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-md",
                        achievement.unlocked 
                          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
                          : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                      )}
                    >
                      <div className="text-2xl">
                        {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6 text-gray-400" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={cn(
                          "font-semibold text-sm",
                          achievement.unlocked ? "text-green-800 dark:text-green-200" : "text-gray-500"
                        )}>
                          {achievement.name}
                        </h4>
                        <p className={cn(
                          "text-xs",
                          achievement.unlocked ? "text-green-600 dark:text-green-400" : "text-gray-400"
                        )}>
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {achievement.unlockedAt.toLocaleDateString('pt-BR')}
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
                </div>
              </div>
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma conquista encontrada para este filtro</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}