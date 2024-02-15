#!/bin/sh

# Create a .env file in /app directory with contents of PUBLIC_POCKETBASE_URL environment variable
echo "PUBLIC_POCKETBASE_URL=$PUBLIC_POCKETBASE_URL" > /app/.env
