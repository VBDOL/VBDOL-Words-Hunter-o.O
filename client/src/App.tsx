import * as React from 'react';
import { MainMenu } from './components/word-search/MainMenu';
import { WordSearchGame } from './components/word-search/WordSearchGame';
import { GameProvider, useGameContext } from './components/word-search/context/GameContext';
import { ThemeProvider } from './components/word-search/context/ThemeContext';
import { Footer } from './components/word-search/Footer';

function AppContent() {
  const { gameState } = useGameContext();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {gameState === 'menu' ? <MainMenu /> : <WordSearchGame />}
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
