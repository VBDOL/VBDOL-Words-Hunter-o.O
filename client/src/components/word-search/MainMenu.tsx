import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DifficultySelector } from './DifficultySelector';
import { AchievementsPanel } from './AchievementsPanel';
import { ThemeToggle } from './ThemeToggle';
import { useGameContext } from './context/GameContext';
import { Trophy, Play, Award } from 'lucide-react';

export function MainMenu() {
  const { setGameState, totalScore, gamesPlayed } = useGameContext();
  const [showAchievements, setShowAchievements] = React.useState(false);

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleShowAchievements = () => {
    setShowAchievements(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header with theme toggle */}
        <div className="flex justify-between items-start">
          <div className="text-center space-y-4 flex-1">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Caça-Palavras Brasileiro
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encontre palavras escondidas no grid e teste suas habilidades em português brasileiro!
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{totalScore.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Pontuação Total</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Play className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{gamesPlayed}</div>
              <div className="text-sm text-muted-foreground">Jogos Completados</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Menu Card */}
        <Card className="border-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Escolha sua Dificuldade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DifficultySelector />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartGame}
                size="lg"
                className="flex-1 text-lg py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar Jogo
              </Button>

              <Button
                onClick={handleShowAchievements}
                variant="outline"
                size="lg"
                className="flex-1 text-lg py-6"
              >
                <Award className="w-5 h-5 mr-2" />
                Conquistas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Game Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-2xl">⏱️</div>
            <h3 className="font-semibold">Contrarrelógio</h3>
            <p className="text-sm text-muted-foreground">Complete os níveis antes do tempo acabar</p>
          </div>

          <div className="space-y-2">
            <div className="text-2xl">🎯</div>
            <h3 className="font-semibold">Palavras Bônus</h3>
            <p className="text-sm text-muted-foreground">Encontre palavras extras para ganhar tempo</p>
          </div>

          <div className="space-y-2">
            <div className="text-2xl">🏆</div>
            <h3 className="font-semibold">Conquistas</h3>
            <p className="text-sm text-muted-foreground">Desbloqueie troféus especiais</p>
          </div>
        </div>
      </div>

      {showAchievements && (
        <AchievementsPanel onClose={() => setShowAchievements(false)} />
      )}
    </div>
  );
}
