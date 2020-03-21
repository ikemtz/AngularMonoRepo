FROM node:lts as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:azc-prod --prod

FROM nginx:stable
COPY --from=node /usr/src/app/dist/apps/imng-az-func-configr/ /usr/share/nginx/html/
COPY /nginx-azconfig /etc/nginx/conf.d/
