# wowgit
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Git web client that wows you

## Requirements

- Docker

## Installation

```
git clone https://github.com/superwower/wowgit.git
cd wowgit
make prod
```

By default the server will run on port 3000.

## Development

### How to start development

First time, type the following instead of `npm install`.
(Usually, you can skip the next time.)

```
make install
```

To start development, type the following instead of `npm start`.

```
make dev
```

By default the server will run on port 3000.

### Used technologies

- Languages: HTML, Typescript, SCSS
- Frontend
  - [Next.js](https://nextjs.org/): A framework based on React.js
- Backend

  - [Fastify](https://www.fastify.io/): Server framework written in Node.js
  - [Graphql](https://graphql.org/): A query language for API
  - [Nodegit](http://www.nodegit.org/): Node.js library for git operation

## Who are the developers

Created by [Superwower](https://superwower.github.io/) with :heart:

## License

MIT
