FROM node:lts as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:azc-prod --prod

FROM bitnami/nginx:latest
COPY --from=node /usr/src/app/dist/apps/imng-inventory/ /usr/share/nginx/html/

