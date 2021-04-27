# eslint-plugin-nestjs-framework

Static & syntactic AST checker for Nest.js framework.

## Why?

Just developing for my team.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-nestjs-framework`:

```
$ npm install eslint-plugin-nestjs-framework --save-dev
```

## Usage

Add `nestjs-framework` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["nestjs-framework"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "nest-js/rule-name": 2
  }
}
```

## Supported Rules

- [use-api-operation](docs/rules/use-api-operation.md): Recommend API endpoints to use `@APIOperation` annotation describes how this API works on nestjs/swagger.

## Special Thanks to

https://ts-ast-viewer.com/
