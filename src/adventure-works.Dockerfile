FROM node:lts as packages
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM packages as built
WORKDIR /app
COPY . .
RUN npm run build:aw

FROM bitnami/nginx:latest
EXPOSE 8080
COPY --from=built /app/dist/apps/adventure-works/ /app
COPY /apps/adventure-works/nginx.conf /opt/bitnami/nginx/conf/server_blocks/nginx.conf
