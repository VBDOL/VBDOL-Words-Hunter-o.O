import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MousePointer, Clock, Target, Zap, ZoomIn, Sun, Trophy, Eye } from 'lucide-react';

interface GameInstructionsProps {
  onClose: () => void;
}

export function GameInstructions({ onClose }: GameInstructionsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[85vh] overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Como Jogar - Guia Completo</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-96 scrollbar-thin">
            <div className="space-y-6">
              {/* Objetivo Principal */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Target className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1 text-blue-800 dark:text-blue-200">🎯 Objetivo Principal</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Encontre todas as palavras da lista antes que o tempo acabe.
                      As palavras podem estar na horizontal, vertical ou diagonal,
                      e podem estar escritas de trás para frente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Como Jogar */}
              <div className="flex items-start space-x-3">
                <MousePointer className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">🎮 Como Selecionar Palavras</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• <strong>Clique</strong> na primeira letra da palavra</p>
                    <p>• <strong>Arraste</strong> até a última letra (ou clique na última)</p>
                    <p>• As palavras ficam destacadas quando encontradas</p>
                    <p>• Palavras podem estar em <strong>qualquer direção</strong>: →, ↓, ↗, ↘, ←, ↑, ↖, ↙</p>
                    <p>• Palavras podem estar <strong>de trás para frente</strong></p>
                  </div>
                </div>
              </div>

              {/* Sistema de Zoom */}
              <div className="flex items-start space-x-3">
                <ZoomIn className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">🔍 Controle de Zoom</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Use os controles de zoom para ajustar o tamanho da grade</p>
                    <p>• <strong>9 níveis de zoom:</strong> 70% até 200%</p>
                    <p>• Perfeito para usuários com dificuldades visuais</p>
                    <p>• O zoom é salvo automaticamente para suas próximas partidas</p>
                    <p>• Botão de reset para voltar ao tamanho padrão (100%)</p>
                  </div>
                </div>
              </div>

              {/* Sistema de Temas */}
              <div className="flex items-start space-x-3">
                <Sun className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">🌓 Temas Visuais</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• <strong>Tema Claro:</strong> Fundo suave e cores confortáveis</p>
                    <p>• <strong>Tema Escuro:</strong> Ideal para jogar à noite</p>
                    <p>• <strong>Tema do Sistema:</strong> Segue as preferências do seu dispositivo</p>
                    <p>• Clique no ícone do sol/lua para alternar entre temas</p>
                    <p>• Sua preferência é salva automaticamente</p>
                  </div>
                </div>
              </div>

              {/* Palavras Bônus Coloridas */}
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">🌈 Sistema de Palavras Bônus Coloridas</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Encontre palavras válidas que não estão na lista para ganhar tempo extra!
                    As cores indicam o valor e raridade da palavra:
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center space-x-3 p-2 bg-orange-100 dark:bg-orange-900/30 rounded border border-orange-300 dark:border-orange-700">
                      <span className="text-lg">🧡</span>
                      <div>
                        <span className="font-semibold text-orange-800 dark:text-orange-200">4 letras</span>
                        <span className="text-orange-600 dark:text-orange-400 ml-2">- Palavras básicas (+tempo)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded border border-yellow-300 dark:border-yellow-700">
                      <span className="text-lg">💛</span>
                      <div>
                        <span className="font-semibold text-yellow-800 dark:text-yellow-200">5 letras</span>
                        <span className="text-yellow-600 dark:text-yellow-400 ml-2">- Palavras comuns (+tempo)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-green-100 dark:bg-green-900/30 rounded border border-green-300 dark:border-green-700">
                      <span className="text-lg">💚</span>
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">6-7 letras</span>
                        <span className="text-green-600 dark:text-green-400 ml-2">- Palavras médias (+tempo)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300 dark:border-blue-700">
                      <span className="text-lg">💙</span>
                      <div>
                        <span className="font-semibold text-blue-800 dark:text-blue-200">8-9 letras</span>
                        <span className="text-blue-600 dark:text-blue-400 ml-2">- Palavras longas (+tempo)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-purple-100 dark:bg-purple-900/30 rounded border border-purple-300 dark:border-purple-700">
                      <span className="text-lg">💜</span>
                      <div>
                        <span className="font-semibold text-purple-800 dark:text-purple-200">10+ letras</span>
                        <span className="text-purple-600 dark:text-purple-400 ml-2">- Palavras épicas! (+tempo)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded border">
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      💡 <strong>Dica Especial:</strong> Nosso banco de dados contém mais de 1.000 palavras brasileiras!
                      Quanto maior a palavra bônus, mais tempo você ganha. Procure por palavras técnicas,
                      profissões, lugares, e até mesmo palavras muito longas!
                    </p>
                  </div>
                </div>
              </div>

              {/* Sistema de Tempo */}
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">⏰ Sistema de Tempo</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Cada nível tem um tempo limite que diminui com a dificuldade</p>
                    <p>• <strong>Palavras bônus adicionam tempo extra</strong> baseado no tamanho</p>
                    <p>• Timer fica amarelo quando restam 30 segundos</p>
                    <p>• Timer fica vermelho e pisca quando restam 10 segundos</p>
                    <p>• Complete antes do tempo para ganhar pontos de bônus temporal</p>
                    <p>• Use a pausa estrategicamente para planejar suas próximas jogadas</p>
                  </div>
                </div>
              </div>

              {/* Sistema de Conquistas */}
              <div className="flex items-start space-x-3">
                <Trophy className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">🏆 Sistema de Conquistas</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Mais de 50 conquistas únicas para desbloquear!</strong></p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p>⚡ <strong>Velocidade:</strong> Complete níveis rapidamente</p>
                        <p>📚 <strong>Palavras:</strong> Encontre muitas palavras bônus</p>
                        <p>💎 <strong>Perfeição:</strong> Jogue sem erros</p>
                        <p>⏰ <strong>Tempo:</strong> Acumule tempo bônus</p>
                      </div>
                      <div>
                        <p>🎯 <strong>Pontuação:</strong> Alcance altas pontuações</p>
                        <p>🔥 <strong>Sequências:</strong> Complete níveis consecutivos</p>
                        <p>🔍 <strong>Descoberta:</strong> Encontre palavras especiais</p>
                        <p>🎪 <strong>Especiais:</strong> Conquistas únicas e divertidas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controles do Jogo */}
              <div className="flex items-start space-x-3">
                <Eye className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">🎛️ Controles do Jogo</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• <strong>Pausar/Continuar:</strong> Pause o timer quando necessário</p>
                    <p>• <strong>Menu Principal:</strong> Volte ao menu a qualquer momento</p>
                    <p>• <strong>Como Jogar:</strong> Acesse este guia durante o jogo</p>
                    <p>• <strong>Controles de Zoom:</strong> Ajuste o tamanho da grade</p>
                    <p>• <strong>Alternador de Tema:</strong> Mude entre claro/escuro</p>
                  </div>
                </div>
              </div>

              {/* Dicas Estratégicas */}
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">💡 Dicas Estratégicas Avançadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700 dark:text-green-300">
                  <div>
                    <p>• <strong>Comece pelas bordas:</strong> Palavras nas bordas são mais fáceis de ver</p>
                    <p>• <strong>Procure por letras raras:</strong> Q, X, Z são mais fáceis de rastrear</p>
                    <p>• <strong>Use o padrão diagonal:</strong> Muitas palavras estão escondidas nas diagonais</p>
                    <p>• <strong>Palavras de trás para frente:</strong> Sempre verifique ambas direções</p>
                  </div>
                  <div>
                    <p>• <strong>Pense em sinônimos:</strong> Para palavras bônus, pense em variações</p>
                    <p>• <strong>Palavras técnicas:</strong> Profissões, ciências, tecnologia rendem bônus</p>
                    <p>• <strong>Palavras compostas:</strong> Procure por palavras longas e complexas</p>
                    <p>• <strong>Gerencie o tempo:</strong> Use pausas estratégicas para planejar</p>
                  </div>
                </div>
              </div>

              {/* Sistema de Dificuldades */}
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-orange-800 dark:text-orange-200">🎮 Níveis de Dificuldade</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    <div className="text-lg mb-1">🟢</div>
                    <div className="font-semibold text-green-800 dark:text-green-200">Fácil</div>
                    <div className="text-xs text-green-600 dark:text-green-400">120s, +15s bônus</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                    <div className="text-lg mb-1">🟡</div>
                    <div className="font-semibold text-yellow-800 dark:text-yellow-200">Médio</div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400">90s, +12s bônus</div>
                  </div>
                  <div className="text-center p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                    <div className="text-lg mb-1">🟠</div>
                    <div className="font-semibold text-orange-800 dark:text-orange-200">Difícil</div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">60s, +10s bônus</div>
                  </div>
                  <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                    <div className="text-lg mb-1">🔴</div>
                    <div className="font-semibold text-red-800 dark:text-red-200">Expert</div>
                    <div className="text-xs text-red-600 dark:text-red-400">45s, +8s bônus</div>
                  </div>
                </div>
              </div>

              {/* Sistema de Pontuação */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">🎯 Sistema de Pontuação</h3>
                <div className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p>• <strong>Palavra encontrada:</strong> 100 pontos</p>
                      <p>• <strong>Palavra bônus:</strong> 50 pontos</p>
                      <p>• <strong>Bônus de tempo:</strong> 2 pontos por segundo restante</p>
                    </div>
                    <div>
                      <p>• <strong>Jogo perfeito:</strong> +200 pontos</p>
                      <p>• <strong>Nível rápido:</strong> Bônus por velocidade</p>
                      <p>• <strong>Conquistas:</strong> Pontos extras especiais</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <Button onClick={onClose} className="w-full text-lg py-3">
              🎮 Entendi! Vamos Jogar!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
