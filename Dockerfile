FROM node:alpine
WORKDIR /app
ADD . .
RUN npm ci
RUN npm run build