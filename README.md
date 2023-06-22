<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# install package.
$ yarn install
```

## Config the app

create a database with postgresql and edit file .env you can see file .env.example as an example.
```bash
# DATABASE CONFIG
DB_CONNECTION=""
DB_HOST=""
DB_PORT=""
DB_USERNAME=""
DB_PASSWORD=""
DB_DATABASE=""
DB_SYNCHRONIZE=false
DB_DROP_SCHEMA=false
DB_MIGRATIONS_RUN=false

# APP CONFIG
SERVICE_PORT=""
SERVICE_PREFIX=""
```

```bash
# This command is used to generate and compile application code.
$ yarn build
```

```bash
# create entity from migrations file.
$ yarn migration:run
```

## Running the app

```bash
# development.
$ yarn start

# watch mode.
$ yarn start:dev
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

The app will start running at http://localhost:3000

## Swagger - API Documentation
Cilck [here](https://swagger.io/) to know more about Swagger.

> **_NOTE:_**  
The endpoints of "product", "order" and "user" are restricted. To access those endpoints, use the token which is generated after login as the value of the Bearer in the Authorization header as follows:
**"Authorization: Bearer Token_id"**

## Sample Request Body

### Auth - Register
```bash
  {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "0123456478",
    "email": "test@gmail.com",
    "username": "test",
    "password": "test123"
  }
```

### Auth - Login
```bash
  {
    "username": "test",
    "password": "test123"
  }
```

### Product
```bash
  {
    "productName": "Product-A",
    "description": "test",
    "price": 150.50
  }
```

### Order
```bash
  {
    "quantity": 3,
    "orderStatus": true,
    "productId": 1
  }
```
