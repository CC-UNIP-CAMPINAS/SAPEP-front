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
   * [Resumo 🚀](#resumo-)
   * [Programa em execução 💻](#programa-em-execução-)
   * [Funcionalidades 💡](#funcionalidades-)
   * [Tecnologias 👨‍💻](#tecnologias-)
   * [Como usar 🔧](#como-usar-)
      * [Pré Requisitos](#pré-requisitos)
      * [Para o desenvolvimento](#para-o-desenvolvimento)
      * [Para a produção](#para-a-produção)
   * [Como contribuir? 🤜🤛](#como-contribuir-)
<!--te-->

## Resumo 🚀

Repositório criado como trabalho de conclusão de curso para bacharelado em ciência da computação na Universidade Paulista.
O projeto consiste em um sistema para gerenciamento de prontuários eletrônicos de pacientes utilizando como tecnologia:

-   React
-   Node.JS
-   E Amor 💝

A ideia do projetos era criar um sistema que auxilia-se os profissionais de saúde em seu dia a dia, informatizando toda a parte de gerência dos profissionais e os prontuários dos pacientes, evitando erros e ajudando na saúde mental dos profissionais de saúde.

## Programa em execução 💻

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

## Como usar 🔧

### Pré-requisitos
Antes de prosseguir, clone o repositório de [backend](https://github.com/CC-UNIP-CAMPINAS/SAPEP-back), siga os passos de instalação e volte aqui.

Para as variáveis de ambiente pode ser utilizado um arquivo `.env` com o conteúdo: 

```
REACT_APP_API_HOST=IP_DO_SEU_BACKEND
```

Ou adicionar um valor para o campo `REACT_APP_API_HOST` em sua plataforma de hospedagem.

Clone o repositório e então siga os seguintes passos:

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
