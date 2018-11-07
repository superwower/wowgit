# wowgit
[![wercker status](https://app.wercker.com/status/ef3f7acb774a5673007c012a30f40065/s/master "wercker status")](https://app.wercker.com/project/byKey/ef3f7acb774a5673007c012a30f40065)
[![codecov](https://codecov.io/gh/superwower/wowgit/branch/master/graph/badge.svg)](https://codecov.io/gh/superwower/wowgit)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Git web client that wows you

## Requirements

- [Docker](https://www.docker.com/)
- [GnuWin32](http://gnuwin32.sourceforge.net/) (Windows only)
  - [GetGnuWin32 – Maintaining a Gnuwin32 Package archive](http://getgnuwin32.sourceforge.net/)
    or the set of following packages
      - [Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm)
      / [Grep for Windows](http://gnuwin32.sourceforge.net/packages/grep.htm)
      / [sed for Windows](http://gnuwin32.sourceforge.net/packages/sed.htm)
      / [FindUtils for Windows](http://gnuwin32.sourceforge.net/packages/findutils.htm)

## Installation

```bash
git clone https://github.com/superwower/wowgit.git
cd wowgit
make prod
```

By default the server will run on port 3000.

## Development

### How to start development

First time, type the following instead of `npm install`.  
(Usually, you only need to run this for the first time)

```bash
make install
```

To start development, type the following instead of `npm start`.

```bash
make dev
```

By default the server will run on port 3000.

### Used technologies

- Languages: HTML, Typescript, SCSS
- Frontend
  - [Next.js](https://nextjs.org/): A framework based on React.js
- Backend

  - [Fastify](https://www.fastify.io/): Server framework written in Node.js
  - [GraphQL](https://graphql.org/): A query language for API
  - [isomorphic-git](https://isomorphic-git.org): Node.js library for git operation

## Who are the developers

Created by [Superwower](https://superwower.github.io/) with :heart:

## License

MIT
