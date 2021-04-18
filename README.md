# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Make sure to run the GraphQL server to get data

### `node server/apollo-graphql-server.js`

Runs the GraphQL server on 'http://localhost:4000'

- Will need to set the `hibp-api-key` header with an API key in order for requests to work - key purposefully left out

### `node server/server.js`

Runs the express server on 'http://localhost:4200'
- Early iterations used this to fetch data, App no longer hooked up to use
