FROM nginx:latest
COPY /apps/imng-az-func-configr/ /usr/share/nginx/html/
COPY /default.conf /etc/nginx/conf.d/
