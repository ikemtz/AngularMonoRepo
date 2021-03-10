FROM nginx:latest
COPY /dist/apps/nurse-cron/ /usr/share/nginx/html/
COPY /CiCd/nur/default.conf /etc/nginx/conf.d/
