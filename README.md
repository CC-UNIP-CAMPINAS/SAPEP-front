<p align="center">
    <img alt="SAPEP" title="#SAPEP" src="./public/logo.svg" width="250px" />
</p>

<p align="center">🏥 Sistema Aberto de Prontuário Eletrônico do Paciente 🏥</p>

<div align="center">

![GitHub](https://img.shields.io/github/license/CC-UNIP-CAMPINAS/SAPEP-front)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/CC-UNIP-CAMPINAS/SAPEP-front)
![Version](https://img.shields.io/badge/version-1.0.1-green)

</div>

## Sumário

<!--ts-->
   * [Resumo 🚀](#resumo)
   * [Tabela de Conteudo](#tabela-de-conteudo)
   * [Instalação](#instalacao)
   * [Como usar](#como-usar)
      * [Pre Requisitos](#pre-requisitos)
      * [Local files](#local-files)
      * [Remote files](#remote-files)
      * [Multiple files](#multiple-files)
      * [Combo](#combo)
   * [Tests](#testes)
   * [Tecnologias](#tecnologias)
<!--te-->

## Resumo 🚀

Repositório criado como trabalho de conclusão de curso para bacharelado em ciência da computação na Universidade Paulista.
O projeto consiste em um sistema para gerenciamento de prontuários eletrônicos de pacientes utilizando como tecnologia:

-   React
-   Node.JS
-   E Amor 💝

## Programa em execução

🚧 Em construção...

## Funcionalidades 💡

-   Gerência de usuários (médicos, enfermeiros e administração) por uma interface administrativa;
-   Gerência de pacientes e seus prontuários;
-   Exportação em PDF dos prontuários;
-   Adição de prescrições e relatórios nos prontuários;
-   Reset de senha dos usuários;

## Tecnologias 👨‍💻

Todas as bibliotecas estão listadas no `package.json`, porém essas são as principais tecnologias utilizadas:

-   [React](https://pt-br.reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [SASS](https://sass-lang.com/)

## Instalação 🔧

### Backend
Antes de prosseguir, clone o repositório de [backend](https://github.com/CC-UNIP-CAMPINAS/SAPEP-back), siga os passos de instalação e volte aqui.

Clone o repositório e então siga os seguintes passos:

###  Variáveis de ambiente

Para as variáveis de ambiente pode ser utilizado um arquivo `.env` com o conteúdo: 

```
REACT_APP_API_HOST=IP_DO_SEU_BACKEND
```

Ou adicionar um valor para o campo `REACT_APP_API_HOST` em sua plataforma de hospedagem.

### Para o desenvolvimento

#### Usando yarn:

```sh
cd SAPEP-FRONT
yarn
yarn start
```

#### Usando npm:

```sh
cd SAPEP-FRONT
npm i
npm start
```

### Para a produção

#### Usando yarn:

```sh
cd SAPEP-FRONT
yarn
yarn build
```

#### Usando npm:

```sh
cd SAPEP-FRONT
npm i
npm run build
```

Após rodar os comandos acima a pasta build conterá os arquivos que podem ser utilizados para a hospedagem da aplicação React.

## Como contribuir? 🤜🤛

O sistema foi pensado para ser gratuito e de livre modificação, fique livre para adaptar o sistema e disponibiliza-lo ao público! 😁
