# Bun MongoDB Atlas App

A simple Bun app that connects to MongoDB Atlas and exposes basic REST endpoints.

## Setup

1. Install Bun dependencies:
   ```bash
   cd bun-mongodb-atlas-app
   bun install
   ```

2. Copy and set environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your MongoDB Atlas connection string.

4. Start the app:
   ```bash
   bun run dev
   ```

## Endpoints

- `GET /users` - list all users
- `POST /users` - create a new user

## Environment variables

- `MONGODB_URI` - MongoDB Atlas connection string
- `MONGODB_DB_NAME` - database name
- `PORT` - server port
