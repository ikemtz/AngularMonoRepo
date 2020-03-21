FROM nginx:stable
COPY /apps/imng-az-func-configr/ /usr/share/nginx/html/
COPY /CiCd/azc/default.conf /etc/nginx/conf.d/
