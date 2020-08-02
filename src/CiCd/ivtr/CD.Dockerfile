FROM nginx:stable
COPY /apps/imng-inventory/ /usr/share/nginx/html/
COPY /CiCd/ivtr/default.conf /etc/nginx/conf.d/
