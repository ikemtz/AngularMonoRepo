FROM nginx:stable
COPY /apps/nurser-ui/ /usr/share/nginx/html/
COPY /CiCd/nur/default.conf /etc/nginx/conf.d/
