# Discord Backend

Discord Clone using React, ReactQuery, Tailwindcss, Redux, Socket IO, NodeJS, Express, MongoDB and Redis.

<br/>
<br/>

## Setup Backend

To run backend API, follow these steps:

inside backend directory

Install the dependencies:

```bash
yarn install
```

<br/>
If you already have MongoDB and Redis installed on your system
you can skip this step, otherwise you can run below command to install and run MongoDB and Redis
using Docker.

```bash
# run MongoDB and Redis containers
yarn docker:dev
```

<br/>
Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

now backend will be running on `http://localhost:4000`
<br/>
<br/>

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=4000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/discord-clone

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# redis url and port
REDIS_PORT=6379
REDIS_HOST=localhost
```
