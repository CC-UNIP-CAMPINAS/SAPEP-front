<p align="center" style={bac}>
    <img alt="SAPEP" title="#SAPEP" src="./public/logo.svg" width="200px" />
</p>

<p align="center">🏥 Sistema Aberto de Prontuário Eletrônico do Paciente 🏥</p>

<div align="center">

![GitHub](https://img.shields.io/github/license/CC-UNIP-CAMPINAS/SAPEP-front)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/CC-UNIP-CAMPINAS/SAPEP-front)
![Version](https://img.shields.io/badge/version-1.0.1-green)

</div>

## Resumo

Repositório criado como trabalho de conclusão de curso para bacharelado em ciência da computação na Universidade Paulista.
O projeto consiste em um sistema para gerenciamento de prontuários eletrônicos de pacientes utilizando como tecnologia: 


- React
- Node.JS
- E Amor 💝

## Funcionalidades

- Gerência de usuários (médicos, enfermeiros e administração) por uma interface administrativa;
- Gerência de pacientes e seus prontuários;
- Exportação em PDF dos prontuários;
- Adição de prescrições e relatórios nos prontuários;
- Reset de senha dos usuários;


## Tecnologias

Dillinger uses a number of open source projects to work properly:

- [React](https://pt-br.reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node.JS]
- [Express]
- [Prisma](https://www.prisma.io/)



## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```
