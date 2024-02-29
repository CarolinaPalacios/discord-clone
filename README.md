<p align="center">
  <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord" width="150" height="150" style="margin: auto;">
</p>

# Discord Clone

**Developed with:**

[![Nx](https://img.shields.io/badge/Nx-gray?style=for-the-badge&logo=nx&logoColor=lightblue)](https://nx.dev) [![NestJS](https://img.shields.io/badge/NestJS-gray?style=for-the-badge&logo=nestjs&logoColor=e0234e)](https://nestjs.com/) [![Docker](https://img.shields.io/badge/Docker-gray?style=for-the-badge&logo=docker&logoColor=007acc)](https://www.docker.com) [![Redis](https://img.shields.io/badge/Redis-gray?style=for-the-badge&logo=redis&logoColor=red)](https://redis.io) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-gray?style=for-the-badge&logo=postgresql&logoColor=007acc)](https://www.postgresql.org) [![GraphQL](https://img.shields.io/badge/GraphQL-gray?style=for-the-badge&logo=graphql&logoColor=f6009c)](https://graphql.org) [![Prisma](https://img.shields.io/badge/Prisma-gray?style=for-the-badge&logo=prisma&logoColor=00c2cb)](https://prisma.io) [![TypeScript](https://img.shields.io/badge/TypeScript-gray?style=for-the-badge&logo=typescript&logoColor=007acc)](https://www.typescriptlang.org) [![Apollo](https://img.shields.io/badge/Apollo-gray?style=for-the-badge&logo=apollographql&logoColor=pink)](https://www.apollographql.com) [![WebSocket](https://img.shields.io/badge/WebSocket-gray?style=for-the-badge&logo=Socket.io&logoColor=007acc)](https://www.npmjs.com/package/websocket) [![Vite](https://img.shields.io/badge/Vite-gray?style=for-the-badge&logo=vite&logoColor=yellow)](https://vitejs.dev) [![React](https://img.shields.io/badge/React-gray?style=for-the-badge&logo=react&logoColor=61dafb)](https://reactjs.org)

![Maintained](https://img.shields.io/badge/maintained-yes-indigo)
![Last commit](https://img.shields.io/github/last-commit/CarolinaPalacios/discord-clone/main)
![Issues](https://img.shields.io/github/issues/CarolinaPalacios/discord-clone)
![Forks](https://img.shields.io/github/forks/CarolinaPalacios/discord-clone)
![Stars](https://img.shields.io/github/stars/CarolinaPalacios/discord-clone)
![Website](https://img.shields.io/badge/website-down-red)

<div style="display: flex; margin-left: 10px;">
  <img src="./discord-chat-image.png" alt="Discord Chat Image" style="width: 48%;">
  
  <img src="./discord-server-menu.png" alt="Another Image" style="width: 48%; margin-left: 10px;">
</div>

## Getting started

### Prerequisites

Before getting started, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/): Make sure you have Node.js 20 LTS or later installed. You can download and install it from the official website.

- [Docker](https://docs.docker.com/get-docker/): Make sure you have Docker installed. You can download and install it from the official website.

- [pnpm](https://pnpm.io/): This project uses pnpm as the package manager. Once you have installed Node.js, you can install pnpm globally by running:

```bash
npm install -g pnpm
```

- [NestJS](https://nestjs.com/): NestJS is used as the backend framework for this project. You can install NestJS globally by running:

```bash
npm install -g @nestjs/cli
```

This will install the NestJS command-line interface globally on your machine, allowing you to use it to generate NestJS projects and components.
Alternatively, if you prefer not to install NestJS globally, this project have it already installed as a development dependency in your package.json file. You can use it as well by running `npx nest` instead of `nest`.

## 💾 Installation

[Clone the repository](https://github.com/CarolinaPalacios/discord-clone): Clone, download or fork the repository to your local machine.

```bash
# Clone the repository
$ git clone https://github.com/CarolinaPalacios/discord-clone

# Navigate to the cloned repository
$ cd discord-clone

# Install dependencies
$ pnpm install
```

## 🚀 Backend environment setup

1. [Start the PostgreSQL and Redis servers]():

   - Navigate to the `apps/api` folder inside the repository.
   - Run the following command to start the Docker containers:

```bash
   docker compose up -d
```

This will initialize the Docker container with a PostgreSQL database and a Redis server for subscriptions. Note that PostgreSQL will start on port 5432. If you want to change the port, you can modify the [Dockerfile](https://github.com/CarolinaPalacios/discord-clone/blob/main/apps/api/docker-compose.yml), or if you're on Linux, you can temporarily stop the PostgreSQL service with the following command in the terminal:

```bash
   sudo service postgresql stop
```

Please note that this command stops the PostgreSQL service only temporarily.

If you have any issues, try to delete the Docker containers and start them again, also you can try deleting the `postgres-data` folder in the `apps/api` folder, for this you will need to run the following command with superuser privileges:

```bash
   sudo chmod -R 777 postgres-data
```

After that, you should be able to delete the `postgres-data` folder.

2. [Create a .env file](): Create a `.env` file in the `apps/api` folder. For this file you will need to add the following environment variables:

```javascript
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
   JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----[]-----END PUBLIC KEY-----"
   REFRESH_TOKEN_SECRET="-----BEGIN PUBLIC KEY-----[]-----END PUBLIC KEY-----"
   APP_URL=http://localhost:3000
   JWT_SECRET=
   LK_API_KEY=
   LK_API_SECRET=
```

The `JWT_PUBLIC_KEY` and `REFRESH_TOKEN_SECRET` are the same for now, you can find them on Clerk dashboard, you have to create an account and a project, then you will find them at "API Keys" section and under "Advanced" tab, select "PEM public key". `JWT_SECRET` is in the same section as "Secret keys". [Clerk dashboard](https://dashboard.clerk.com/).

Same for `LK_API_KEY` and `LK_API_SECRET`, you can find them on the LiveKit dashboard, you have to create an account and a project, then navigate to "Settings" section and under "Keys" tab, select "Add new key". [LiveKit dashboard](https://cloud.livekit.io/).

2. [Generate Prisma files]():

   - Once the Docker containers are up and running, generate the Prisma files using the following command:

```bash
   npx prisma generate
```

This generation ensures that the Prisma models and functions are up-to-date and match the structure of the database.

3. [Database Migration]():

   - With the Prisma files generated and the PostgreSQL database container running, execute the Prisma migration.

```bash
   npx prisma migrate dev
```

The migration will update the database structure according to the changes defined in the Prisma schema.

4. [Start the NX server]():
   - Once the Docker containers are up and running, navigate to the root directory of the repository.
   - Execute the following command to start the NestJS server:

```bash
   nx serve api
```

This will initialize the server in development mode using NX in the `api` environment.

5. [Visit the website](): Visit the website at http://localhost:3000, the server should be up and running.

### API documentation

To see the API documentation, with your server running, go to [GraphQL Playground](http://localhost:3000/graphql) and select the `DOCS` tab on the right side of the screen to see all queries, mutations and subscriptions. You can also check and download the [GraphQL Schema](http://localhost:3000/graphql) by selecting the `SCHEMA` tab.

## 🖌️ Frontend environment setup

1. [Create a .env file](): Create a `.env` file in the `apps/client` folder. For this file you will need to add the following environment variables:

```javascript
VITE_CLERK_PUBLISHABLE_KEY=
VITE_LK_SERVER_URL=
VITE_LK_TOKEN=
```

`VITE_CLERK_PUBLISHABLE_KEY` is your Clerk publishable key, you will find them at "API Keys" section as "Publishable key". [Clerk dashboard](https://dashboard.clerk.com/).

`VITE_LK_SERVER_URL` is the URL of the LiveKit server. You can find it on the LiveKit dashboard under "Settings" section and under "Keys" tab, select the project that you've created and copy the URL of "Websocket URL".
For `VITE_LK_TOKEN`, you will click on "Generate token" button. [LiveKit dashboard](https://cloud.livekit.io/).

2. [Start the Vite server](): To start the Vite server, execute the following command in the root directory of the repository:

```bash
   nx serve client
```

This will initialize the Vite server in development mode using NX in the `client` environment.

3. [Visit the website](): Visit the website at http://localhost:4200. The server should be up and running.
