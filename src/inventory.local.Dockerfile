FROM bitnami/nginx:latest
COPY /dist/apps/imng-inventory/ /usr/share/nginx/html/
COPY /CiCd/ivr/default.conf /etc/nginx/conf.d/
