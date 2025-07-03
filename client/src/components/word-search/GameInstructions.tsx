import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MousePointer, Clock, Target, Zap } from 'lucide-react';

interface GameInstructionsProps {
  onClose: () => void;
}

export function GameInstructions({ onClose }: GameInstructionsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Como Jogar</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-6 overflow-y-auto max-h-96">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MousePointer className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Selecionando Palavras</h3>
                  <p className="text-sm text-muted-foreground">
                    Clique na primeira letra da palavra e arraste até a última letra. 
                    As palavras podem estar na horizontal, vertical ou diagonal, 
                    e podem estar escritas de trás para frente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Objetivo</h3>
                  <p className="text-sm text-muted-foreground">
                    Encontre todas as palavras da lista antes que o tempo acabe. 
                    As palavras encontradas ficam riscadas na lista e destacadas no grid.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Palavras Bônus</h3>
                  <p className="text-sm text-muted-foreground">
                    Se você encontrar palavras válidas que não estão na lista 
                    (como "gato", "casa", "amor"), ganhará tempo extra! 
                    Palavras bônus devem ter pelo menos 4 letras.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Sistema de Tempo</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Cada nível tem um tempo limite</p>
                    <p>• Palavras bônus adicionam tempo extra</p>
                    <p>• Dificuldades maiores têm menos tempo</p>
                    <p>• Complete antes do tempo para ganhar pontos bônus</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">💡 Dicas Importantes</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Procure primeiro por palavras menores</li>
                  <li>• Lembre-se que palavras podem estar de trás para frente</li>
                  <li>• Use as diagonais - muitas palavras estão escondidas lá</li>
                  <li>• Preste atenção nas palavras bônus para ganhar tempo</li>
                  <li>• Complete sem erros para pontuação máxima</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">🏆 Sistema de Conquistas</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Desbloqueie mais de 50 conquistas diferentes jogando! 
                  Cada conquista recompensa diferentes estilos de jogo: 
                  velocidade, precisão, persistência e descoberta de palavras.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <Button onClick={onClose} className="w-full">
              Entendi! Vamos Jogar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}