FROM nginx:stable
COPY /apps/nurse-cron/ /usr/share/nginx/html/
COPY /default.conf /etc/nginx/conf.d/
