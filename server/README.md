# todo | server

NodeJS **API** built with Node.js, Express, Typescript, and MongoDB.

**Features include** JWT Authentication, queues, and authorization.

**Credits and thanks** to [Jason Merrett](https://github.com/JasonMerrett/nodejs-api-from-scratch/tree/master/src).

## Table of Contents

- [todo | server](#todo--server)
  - [Table of Contents](#table-of-contents)
  - [Troubleshoot](#troubleshoot)
    - [tsc not foumd](#tsc-not-foumd)
  - [API](#api)
    - [Endpoints](#endpoints)
      - [`users`](#users)
      - [`posts`](#posts)
  - [Structure](#structure)
    - [Framework Setup in root/src/](#framework-setup-in-rootsrc)
    - [Post-Framework File Setup](#post-framework-file-setup)
      - [Setup src/resources](#setup-srcresources)
  - [Project Setup (for developers)](#project-setup-for-developers)
    - [Installation](#installation)
      - [Typescript Setup](#typescript-setup)
      - [Dependencies](#dependencies)
      - [DevDependencies](#devdependencies)
        - [Plugins: Linting \& Formatiing](#plugins-linting--formatiing)
        - [Types](#types)
  - [Credits](#credits)

## Troubleshoot

### tsc not foumd

- <https://community.render.com/t/typescript-support/377/6>
  - To fix that error you need to change the build command to this:

    ```shell
    yarn; yarn build
    ```

## API

### Endpoints

#### `users`

- TODO

|  Endpoint  | Method |   Description   |
| :--------: | :----: | :-------------: |
| /api/users | `POST` | Create new user |

#### `posts`

|  Endpoint  | Method |  Description  |
| :--------: | :----: | :-----------: |
| /api/posts | `GET`  | Get all posts |
| /api/posts | `POST` | Create posts  |

## Structure

### Framework Setup in root/src/

```shell
.
├── app.ts                            # Application setup.
├── index.ts                          # Entrypoint for application.
├── middleware
│   └── error.middleware.ts           # Handle http exceptions.
├── resources
└── utils
    ├── exceptions
    │   └── http.exception.ts         # Create error specific to http exceptions.
    ├── interfaces
    │   └── controller.interface.t    # Path, and router interface for express app to use.s
    └── validateEnv.ts                # Validates the environment variables.

```

### Post-Framework File Setup

<!-- TODO make `post` as todo or project later on. -->
#### Setup src/resources

```shell
touch post.{controller,interface,model,service,validation}.ts 
```

```shell
.
├── post.controller.ts
├── post.interface.ts                 # Access all methods associated with mongoose Document
├── post.model.ts                     # MongoDB Schema for Post.
├── post.service.ts
└── post.validation.ts
```

## Project Setup (for developers)

### Installation

#### Typescript Setup

```shell
npx tsc --init
```

#### Dependencies

```shell
npm i compression                     # Compress response bodies for all request that traverse through the middleware.
npm i cors                            # Node.js CORS middleware.
npm i dotenv                          # Loads environment variables from .env file to use in process.env.
npm i envalid                         # Validate env variables from .env
npm i express                         # Web framework routing engine.
npm i helmet                          # Help secure Express/Connect apps with various HTTP headers.
npm i module-alias                    # Create aliases of directories and register custom module paths in NodeJS like a boss!
npm i mongoose                        # A MongoDB Object modelling tool for async environmnet.
npm i morgan                          # HTTP request logger middleware for Node.js.
npm i joi                             # Validation library similar to Zod.
```

#### DevDependencies

```shell
npm i -D eslint                       # An AST-based pattern checker for JavaScript.
npm i -D prettier                     # Prettier is an opinionated code formatter.
npm i -D tsc-watch                    # Similar to nodemon for uninterrupted watch mode while file changes.
npm i -D typescript                   # TypeScript is a language for application scale JavaScript development.
```

##### Plugins: Linting & Formatiing

```shell
npm i -D eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

##### Types

```shell
npm i -D @types/node @types/express @types/compression @types/cors @types/morgan @types/module-alias
```

## Credits

- [Jason Merrett](https://github.com/JasonMerrett/nodejs-api-from-scratch/tree/master/src).
