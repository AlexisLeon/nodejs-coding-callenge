# Mati coding callenge

## Requirements

  - Node.js
  - Yarn
  - MongoDB

## Installation
  - Clone the project: `git clone https://github.com/AlexisLeon/nodejs-coding-callenge.git mati`
  - Install dependencies: `cd mati && yarn install`
  - Set mysql credentials in `src/config/config.json` or add them as environment variables

## Run
  - Start server: `yarn start`
  - Open [localhost:3000](https://localhost:3000)
  - Import Postman collection at `/docs`
  - Play with the endpoints 😎

## Other commands
  - Production: `yarn start`
  - Staging: `yarn run stage`
  - Development: `yarn run dev`
  - Test: `yarn test`
  - Sync DB: `yarn run db:sync`

## Environment variables (stage, production)
  - `PORT`: Service port (stage, production, test)
  - `ENCRYPTION_KEY`: Encryption key used for authentication
  - `MONGO_DB_NAME`: Database name (default to `matidev`)
  - `MONGO_USERNAME`: MongoDB username
  - `MONGO_PASSWORD`: MongoDB password
  - `MONGO_HOSTNAME`: MongoDB host
  - `MONGO_PORT`: MongoDB port
