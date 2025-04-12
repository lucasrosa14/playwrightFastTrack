# 🎭 playwrightFastTrack

Projeto de automação de testes com [Playwright](https://playwright.dev), voltado para aprendizado rápido e boas práticas em testes end-to-end.

## 🧰 Tecnologias

- [Playwright](https://playwright.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Node.js](https://nodejs.org)
- [Allure Report](https://docs.qameta.io/allure/)

## ✅ Pré-requisitos

- Node.js 16 ou superior
- npm ou yarn
- Git
- Java (necessário para abrir o Allure Report)

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/lucasrosa14/playwrightFastTrack.git
cd playwrightFastTrack
npm install
```

## ▶️ Executando os testes

Execute todos os testes com o seguinte comando:

```bash
npx playwright test
```

### 🧾 Gerando relatório com Allure

1. Execute os testes com o reporter do Allure:

```bash
npm run test; npm run report
```

> Certifique-se de ter o Allure instalado globalmente:  
> `npm install -g allure-commandline --save-dev`

## 🧪 Estrutura dos testes

- Os testes estão organizados no diretório `tests/`
- Fixtures e helpers estão em `tests/fixtures/` ou configurados em `playwright.config.ts`
- Testes adicionais:
  - `tests/skipped-tests.spec.ts`: contém três testes marcados para serem pulados
  - `tests/failing-tests.spec.ts`: contém dois testes configurados para falhar

## 📊 Relatórios

Os relatórios são gerados com o **Allure**, oferecendo uma visualização interativa e detalhada dos testes executados, incluindo:

- Testes bem-sucedidos ✅
- Testes com falhas ❌
- Testes ignorados ⚠️
- Prints de tela em caso de erro 📸

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Faça um fork do projeto
2. Crie uma nova branch com sua feature: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Minha nova feature'`
4. Faça push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.