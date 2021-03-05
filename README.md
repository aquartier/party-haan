<h1 align="center">PARTY HAAAANNN</h1>
<div align="center">
A full-stack JS project for SCB 10x code challenge
</div>
</br>
</br>

![Image](./docs/ss-1.png?raw=true)

## Folder Structure
```
app
  migrations
  scripts
  client
  server
  package.json
  README.md
  .env.example
```

## Features
- Frontend (React) - bootstrapped with extended and modified from [create-react-app](https://github.com/facebookincubator/create-react-app)
- Backend (Express) - with [MassiveJS](https://massivejs.org/) for a barely scratching the surface of PostgreSQL ability.
- JWT based authentication - using passport-jwt and passport-local.

## Prerequisites
Before installing, please make sure to have below tools installed
* [node v10 or higher](https://nodejs.org/en/download/)
* [PostgreSQL](https://www.postgresql.org/download/)

## Installation
1. Execute `npm install` or `yarn` to configure the local environment.
2. Create `.env` file and define environmental variables (see `.env.example` for example)
3. Perform DB initialization, migration and seeding with `npm run db:seed`
4. Build the production version `npm run build`
5. Start the server to serve the FE and BE applications `npm run server`

### Sample Users (from seed)

Now, you can play around with the application using the pre-built users from seed data.
```
Email: john@party.haan
Password: password

Email: joe@party.haan
Password: password

Email: jane@party.haan
Password: password
```

## Usage

This application uses npm scripts for testing and development.

* `$ npm run build`: build the production bundle
* `$ npm run server`: run in production mode
* `$ npm run client`: run the development server for FE development
* `$ npm run server:dev`: run the development server for BE development
* `$ npm run db:seed`: perform DB initialization, migration and seeding
* `$ npm run pg-migrate`: alias of `node-pg-migrate` node module
* `$ npm run db:migrate`: run DB migration scripts
* `$ npm run test:client`: run all tests for FE
* `$ npm run test:server`: run all tests for BE


## Backend API Endpoints

### `POST /auth/login`: Authenticate User
This endpoint authenticates a user. An example of the payload (input data) is provided below. The token will be stored in the local storage of the web client for using along with all afterwards API requests:
```
{
    email: String,
    password: String,
}
```
The output returns JWT token and user object:
```
{
    statusCode: 200,
    body: {
        token: String,
        user: Object,
    }
}
```

### `POST /auth/register`: Register new User
This endpoint registers a new user. An example of the payload (input data) is provided below:
```
{
    email: String,
    firstname: String,
    lastname: String,
    password: String,
}
```
The output is the same as from `POST /auth/login`

### `GET /auth/me`: Get current User
This endpoint returns the user object associated with the currently authenticated user. No input data is required. The output is provided is an object with the following structure:
```
{
    statusCode: 200,
    body: {
        id: Number,
        email: String,
        firstname: String,
        lastname: String,
        created_at: Date,
    }
}
```

### `POST /parties`: Create a new Party
This endpoint creates a new Party with current user as one of the party member. An example of the payload (input data) is provided below:
```
body: {
    name: String,
    detail: Text,
    size: Number,
    price: Number,
}
```
The output returns back the provided data with the generated id along with the users data assosiated with this party:
```
response = {
    statusCode: 200,
    body: {
        name: String,
        detail: Text,
        size: Number,
        price: Number,
        users: [ Object ],
    }
}
```

### `GET /parties`: Get all Parties
This endpoint returns the complete set of Parties. No input data is required.
The output is provided in array with each object having the structure described above:
```
response = {
    statusCode: 200,
    body: [
            Party1,
            Party2,
            ...
            PartyN
        ]
    }
```

### `GET /parties/:id`: Get a Party by ID
This endpoint returns a single Party by ID. The ID is provided as a URI parameter. The output is the same as from `POST /parties`

### `POST /parties/:id/join`: Link the User to the Party (join the Party)
This endpoint will create the relatation between a given Party and the authenticated user. The output formats are the same as in `POST /parties`
