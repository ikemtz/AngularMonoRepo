FROM nginx:stable
COPY /apps/nurse-cron/ /usr/share/nginx/html/
COPY /CiCd/nur/default.conf /etc/nginx/conf.d/
