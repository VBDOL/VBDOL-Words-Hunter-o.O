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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Palavras para Encontrar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {words.map((word, index) => {
            const isFound = foundWordStrings.includes(word);
            
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between p-2 rounded border transition-all duration-200",
                  {
                    "bg-green-50 border-green-200 text-green-800": isFound,
                    "bg-background border-border": !isFound,
                  }
                )}
              >
                <span className={cn("font-medium", {
                  "line-through": isFound
                })}>
                  {word.toUpperCase()}
                </span>
                {isFound && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}