import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/vbdol.dev/',
      color: 'hover:text-pink-500',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/victor-b-o-leme-dev',
      color: 'hover:text-blue-600',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/VBDOL',
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
  ];

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium">
              Criado por <span className="font-bold text-primary">VBDOL.DEV</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Caça-Palavras Brasileiro © 2024
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className={`transition-colors ${link.color}`}
                  onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                  title={link.name}
                >
                  <IconComponent className="h-5 w-5" />
                </Button>
              );
            })}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            Desenvolvido com React, TypeScript e Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}