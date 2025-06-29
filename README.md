# Mini Chat

## Instalação

```bash
npm install
```

## Como rodar o projeto

```bash
npm run dev
```

## Estrutura
- `src/api/mockApi.ts`: Mock das APIs de mensagens
- `src/components/`: Componentes React do chat
- `src/App.tsx`: Componente principal

## Tecnologias utilizadas
- React + Vite
- TypeScript
- styled-components

## Funcionalidades
- Tela inicial para o usuário definir seu nome (salvo no localStorage)
- Envio de mensagens simulando um chat em tempo real
- Recebimento automático de mensagens de outros usuários simulados
- Indicador de "Fulano está digitando..."
- Rolagem automática para a última mensagem
- Interface responsiva e inspirada no WhatsApp Web
- Possibilidade de trocar o nome do usuário a qualquer momento

## Observações
- Não é necessário backend: todas as mensagens são simuladas no frontend.
- Para redefinir o nome, clique em "Trocar nome" no topo do chat.

---

Projeto desenvolvido como desafio de React.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
