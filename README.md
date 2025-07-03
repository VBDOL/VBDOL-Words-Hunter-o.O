# Caça-Palavras Brasileiro 🇧🇷

Um jogo de caça-palavras em português brasileiro com níveis de dificuldade progressivos.

## 🎮 Como Jogar

- Encontre as palavras escondidas no grid de letras
- Clique e arraste para selecionar palavras
- Complete todos os níveis para avançar nas fases
- 6 fases com dificuldade crescente

## 🚀 Executando Localmente no VS Code

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Visual Studio Code
- Git

### Passos para executar:

1. **Abra o projeto no VS Code**
   ```bash
   code .
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm start
   ```

4. **Acesse o jogo**
   - Abra seu navegador em `http://localhost:3000`
   - O jogo será carregado automaticamente

### Estrutura do Projeto
```
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   └── word-search/  # Componentes do jogo
│   │   └── ...
├── server/               # Backend Express
└── ...
```

## 📦 Deploy no GitHub e Vercel

### 1. Configurar GitHub

1. **Criar repositório no GitHub**
   - Vá para https://github.com
   - Clique em "New repository"
   - Nome: `caca-palavras-brasileiro`
   - Deixe público ou privado conforme preferir

2. **Conectar projeto local ao GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Brazilian word search game"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/caca-palavras-brasileiro.git
   git push -u origin main
   ```

### 2. Deploy no Vercel

1. **Método Via Website (Recomendado)**
   - Vá para https://vercel.com
   - Clique em "Import Project"
   - Conecte sua conta GitHub
   - Selecione o repositório `caca-palavras-brasileiro`
   - Configure as seguintes opções:
     - **Framework Preset**: Other
     - **Root Directory**: deixe vazio (.)
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist/public`
     - **Install Command**: `npm install`

2. **Configurações de Environment (se necessário)**
   - Adicione variáveis de ambiente no painel do Vercel se precisar

### 3. Comandos Úteis

```bash
# Desenvolvimento
npm start              # Inicia servidor de desenvolvimento

# Build
npm run build         # Gera build de produção

# Git
git add .             # Adiciona todos os arquivos
git commit -m "msg"   # Commit com mensagem
git push              # Envia para GitHub
```

### 4. Troubleshooting

**Problema: Erro ao executar `npm start`**
- Verifique se o Node.js está instalado: `node --version`
- Delete `node_modules` e execute `npm install` novamente

**Problema: Página em branco no Vercel**
- Verifique se o build command está correto
- Confirme se o output directory é `dist/public`

**Problema: API não funciona no Vercel**
- Certifique-se de que o arquivo `vercel.json` está configurado corretamente
- Verifique os logs no painel do Vercel

## 🎯 Recursos do Jogo

- **6 Fases**: Iniciante, Fácil, Médio, Difícil, Expert, Mestre
- **Dificuldade Progressiva**: Mais palavras e grids maiores
- **Interface Responsiva**: Funciona em desktop e mobile
- **Palavras Brasileiras**: Dicionário completo em português BR
- **Animações Suaves**: Transições e efeitos visuais

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Backend**: Express.js, Node.js
- **Deployment**: Vercel

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.