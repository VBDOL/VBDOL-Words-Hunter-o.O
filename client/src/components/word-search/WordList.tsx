import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordListProps {
  words: string[];
  foundWords: Array<{
    word: string;
    cells: Array<{ row: number; col: number }>;
  }>;
}

export function WordList({ words, foundWords }: WordListProps) {
  const foundWordStrings = foundWords.map(fw => fw.word);

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg">Palavras para Encontrar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto scrollbar-thin">
          {words.map((word, index) => {
            const isFound = foundWordStrings.includes(word);

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between p-2 rounded border transition-all duration-200",
                  {
                    "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200": isFound,
                    "bg-gray-50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600": !isFound,
                  }
                )}
              >
                <span className={cn("font-medium", {
                  "line-through": isFound
                })}>
                  {word.toUpperCase()}
                </span>
                {isFound && (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
