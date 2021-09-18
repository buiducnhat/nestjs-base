<div align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <h1>NestJS Base Code by Gerpann</h1>
</div>


## Description
Base code for developing RESTful Api Web server quickly using [NestJS](https://nestjs.com/) framework as the main tech.


## Intergrating
* [NestJS](https://nestjs.com) (totaly writing with Typescript)
* [TypeORM](https://typeorm.io/)
* [Mysql](https://www.mysql.com/) (also support various of [RDMS](https://en.wikipedia.org/wiki/RDMS))
* Logger
* [Swagger](https://swagger.io/) (OpenAPI) for Api documents
* Health check for server status


## Getting started
* Install yarn at global scope (recommended)
```bash
$ npm install -g yarn
```
* Then just run this command for install dependencies
```bash
$ yarn
```
* Before the app can run, remember to create `.env` file for store environment variables (it has the same structure with the `.env.example` file availble).
For quickly:
```bash
cp .env.example .env
```


## Setup Database
This project has already integrated with [TypeORM](https://typeorm.io/) and Mysql database.<br/>
But you can easily config your database type you want in `ormconfig.ts` and in the `database.module.ts` file.<br/>
*Note that your database can have some different configurations like Mysql)*
* If you see any files in the `src/database/migrations/` folder, you should remove all of them first.
* Add your entities for your project (in each module in `src/modules` folder).
* Make sure that your database is already created and clean. Then generate query for make tables base on your entities you wrote. *Note that you can define file name in the `package.json` file*
```bash
yarn migration:generate
```
* Usually, you have to use the above command only when you want to change your database (TypeORM realize the different in your `entities` and the database you connected). When you want to apply changes to the database. Run command:
```bash
yarn migration:run
```
And the rest scripts is availble in `package.json` file! 


## Running the app

```bash
# development
$ yarn start

# development with spec (like nodemon)
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

* Author - [Gerpan](https://github.com/gerpann)
* Facebook - [Gerpan](https://www.facebook.com/gerpan.4701)