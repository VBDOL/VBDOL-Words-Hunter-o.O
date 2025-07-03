# Guia Completo de Deploy - Caça-Palavras Brasileiro

## 🎯 Passo a Passo Detalhado

### 1. Preparação no VS Code

1. **Abra o Terminal no VS Code**
   - `Ctrl + Shift + \`` (Windows/Linux)
   - `Cmd + Shift + \`` (Mac)

2. **Verifique se tudo está funcionando**
   ```bash
   npm install
   npm start
   ```
   - Aguarde o servidor iniciar
   - Acesse `http://localhost:3000`
   - Teste o jogo para garantir que funciona

### 2. Configuração do Git (se ainda não foi feito)

```bash
# Configure seu usuário (substitua pelos seus dados)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Inicialize o repositório
git init
git add .
git commit -m "Initial commit: Brazilian word search game"
```

### 3. Deploy no GitHub

1. **Crie um novo repositório no GitHub:**
   - Vá para https://github.com
   - Clique no botão "+" → "New repository"
   - Nome: `caca-palavras-brasileiro`
   - Descrição: "Jogo de caça-palavras em português brasileiro"
   - Público ou privado (sua escolha)
   - **NÃO** marque "Initialize with README"
   - Clique "Create repository"

2. **Conecte seu projeto local ao GitHub:**
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/caca-palavras-brasileiro.git
   git branch -M main
   git push -u origin main
   ```

### 4. Deploy no Vercel

#### Opção A: Via Interface Web (Mais Fácil)

1. **Acesse o Vercel:**
   - Vá para https://vercel.com
   - Clique em "Sign Up" ou "Login"
   - Conecte com sua conta GitHub

2. **Importe o Projeto:**
   - Clique em "Add New..." → "Project"
   - Encontre seu repositório `caca-palavras-brasileiro`
   - Clique "Import"

3. **Configure o Deploy:**
   - **Project Name**: `caca-palavras-brasileiro`
   - **Framework Preset**: Other
   - **Root Directory**: `.` (deixe como está)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

4. **Deploy:**
   - Clique "Deploy"
   - Aguarde o processo (2-3 minutos)
   - Sua URL será gerada automaticamente

#### Opção B: Via CLI

```bash
# Instale o Vercel CLI
npm install -g vercel

# Faça login
vercel login

# Deploy
vercel

# Siga as instruções:
# ? Set up and deploy "~/caca-palavras-brasileiro"? [Y/n] y
# ? Which scope do you want to deploy to? Seu usuário
# ? Link to existing project? [y/N] n
# ? What's your project's name? caca-palavras-brasileiro
# ? In which directory is your code located? ./
```

### 5. Configurações Importantes

O arquivo `vercel.json` já está configurado no projeto. Ele garante que:
- As rotas da API funcionem corretamente
- Os arquivos estáticos sejam servidos
- O ambiente de produção seja configurado

### 6. URLs e Acessos

Após o deploy bem-sucedido:

- **GitHub**: `https://github.com/SEU_USUARIO/caca-palavras-brasileiro`
- **Vercel**: `https://caca-palavras-brasileiro-SEU_USUARIO.vercel.app`

### 7. Atualizações Futuras

Para atualizar o jogo:

```bash
# Faça suas alterações no código
# Depois:
git add .
git commit -m "Descrição das mudanças"
git push

# O Vercel automaticamente detecta e faz novo deploy
```

### 8. Monitoramento

- **Logs do Vercel**: Vá ao painel do Vercel → seu projeto → "Functions" tab
- **Analytics**: Ative no painel do Vercel para ver visitantes
- **Domínio personalizado**: Configure no painel se desejar

### 9. Troubleshooting Comum

**Build falha no Vercel:**
```bash
# Teste localmente primeiro:
npm run build

# Se der erro, corrija e faça commit:
git add .
git commit -m "Fix build issues"
git push
```

**Página não carrega:**
- Verifique se o Output Directory está como `dist/public`
- Confirme se o Build Command é `npm run build`

**API não funciona:**
- Verifique se o arquivo `vercel.json` está na raiz
- Veja os logs de função no painel do Vercel

### 10. Comandos de Referência Rápida

```bash
# Desenvolvimento
npm start                 # Servidor dev
npm run build            # Build produção

# Git
git status               # Ver status
git add .                # Adicionar tudo
git commit -m "msg"      # Commit
git push                 # Enviar

# Vercel (se usando CLI)
vercel                   # Deploy
vercel --prod           # Deploy para produção
vercel logs             # Ver logs
```

## ✅ Checklist Final

- [ ] Projeto funciona localmente (`npm start`)
- [ ] Repositório criado no GitHub
- [ ] Código enviado para GitHub (`git push`)
- [ ] Projeto importado no Vercel
- [ ] Configurações corretas no Vercel
- [ ] Deploy realizado com sucesso
- [ ] Site acessível via URL do Vercel
- [ ] Jogo funciona online

**Parabéns! Seu jogo está no ar! 🎉**