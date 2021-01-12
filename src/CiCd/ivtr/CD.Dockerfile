FROM nginx:stable
COPY /apps/imng-inventory/ /usr/share/nginx/html/
COPY /default.conf /etc/nginx/conf.d/
