FROM node:lts as packages
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM packages as built
WORKDIR /app
COPY . .
RUN npm run build:nur-prod

FROM nginx:latest
COPY --from=built /app/dist/apps/nurse-cron/ /usr/share/nginx/html/
COPY /CiCd/nur/default.conf /etc/nginx/conf.d/
