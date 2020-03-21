FROM node:lts as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:stable
COPY --from=node /usr/src/app/dist/apps/nurser/ /usr/share/nginx/html/
COPY /nginx-nurser /etc/nginx/conf.d/
