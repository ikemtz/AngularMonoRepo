FROM node:8.11.2-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx
COPY --from=node /usr/src/app/dist/apps/nurser/ /usr/share/nginx/html/
COPY /nginx /etc/nginx/conf.d/
