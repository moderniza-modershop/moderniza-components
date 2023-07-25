# Moderniza Components

Repositório de componentes da moderniza.

Node: 14 LTS

## Documentação

- [Documentação dos componentes](/docs/index.md)

### TODO

- [ ] Aceitar arquivos de estilo (.scss)
- [ ] Minificar os estilos (.css) do build

### Compatibilidade

Algumas funcionalidade podem não estar inclusas no projeto. Então verifique a compatibilidade abaixo:

- O compilador da livraria só builda arquivos (.js) e (.css)
- Não é suportado `<></>`. Utilize `''`, ou, `<React.Fragment>`
- Não é suportado [Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) `objeto?.propriedade?.outra`

## Instalação da livraria

1. Execute o comando ```npm install moderniza-components@latest``` para instalar a livraria. Em algumas versões mais antigas do Node e NPM é necessário utilizar o parametro `--legacy-peer-deps` para normalizar a arvore de dependencias
2. Importe os estilos da moderniza `import 'moderniza-components/dist/index.css'`

**Tenha instalado no respositório que receberá o `moderniza-components`**

- "reactstrap": "9.0.1" <- (package.json)
- "primeicons": "^6.0.1" <- (package.json)
- "primereact": "^9.5.0" <- (package.json)
- "react-scripts": "4.0.2" <- (package.json)
- "react-dom": "^18.1.0" <- (package.json)
- "react": "^18.1.0" <- (package.json)

## Utilização da livraria

Utilize a livraria desta maneira:

```js
/*
 * Caso esteja faltando estilos do reactstrap, importe o css como especificado em:
 * https://reactstrap.github.io/?path=/docs/home-installation--page
*/

// Importação de estilos de outras dependencias relacionadas
import "primereact/resources/primereact.min.css" // primereact base
import 'primeicons/primeicons.css' // icones primereact
import "primereact/resources/themes/lara-light-indigo/theme.css" // tema prime react

// Moderniza components abaixo
import 'moderniza-components/dist/index.css' // CSS
import { Dataview, Dumb } from 'moderniza-components' // Componentes
```

## Instalando em modo pre-visualização

Caso esteja tudo correto após finalizar a instalação principal será iniciada a instalação do preview.

```bash
npm install
cd preview
npm install
```

## Executando o modo pre-visualização

Abra dois terminais, um deles para o bundle e o outro para a visualização.

```bash
npm start #terminal (1) - compilação do bundle
npm run preview #terminal (2) - execução do modo preview
```

Explore o código no [CodeSandBox.io]([aaa](https://codesandbox.io/p/github/lucas-neitzke-moderniza/moderniza-components/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clkidato0024l356pwrq1ulco%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clkidato0024i356pl0zifcqc%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clkidato0024k356p5gwnv6mx%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clkidato0024j356ph8zew1nb%2522%257D%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clkidato0024i356pl0zifcqc%2522%253A%257B%2522id%2522%253A%2522clkidato0024i356pl0zifcqc%2522%252C%2522activeTabId%2522%253A%2522clkidhfxb02eq356ppqyv9klx%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clkic3okg000b356p0g2ity74%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpreview%252Fpackage.json%2522%252C%2522id%2522%253A%2522clkidhfxb02eq356ppqyv9klx%2522%252C%2522mode%2522%253A%2522temporary%2522%257D%255D%257D%252C%2522clkidato0024j356ph8zew1nb%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clkidato0024j356ph8zew1nb%2522%257D%252C%2522clkidato0024k356p5gwnv6mx%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clkidapvn023g356pkbaphcmu%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clkidatpu002rhherbdh24u84%2522%257D%255D%252C%2522id%2522%253A%2522clkidato0024k356p5gwnv6mx%2522%252C%2522activeTabId%2522%253A%2522clkidapvn023g356pkbaphcmu%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D))

## Estrutura dos componentes

Estrutura de pasta aceita para livraria

### Estrutura básica

- **src/[nome-componente]**
  - index.js (arquivo principal do componente)
  - [nome-componente].css (arquivo principal de estilos)

### Estrutura avançada

- **src/[nome-componente]**
  - index.js (arquivo principal do componente)
  - [nome-componente].css (arquivo principal de estilos) <- import {view/components/*}
  - **src/[nome-componente]/model**
    - src/[nome-componente]/model/a.js <- export {a}
    - src/[nome-componente]/model/b.js <- export {b}
  - **src/[nome-componente]/view**
    - src/[nome-componente]/view/index.js <- export {view}
    - src/[nome-componente]/view/components/a.js <- export {a}
    - src/[nome-componente]/view/components/a.css
  - **src/[nome-componente]/controller**
    - src/[nome-componente]/controller/a.js <- export {a}
    - src/[nome-componente]/controller/b.js <- export {b}
