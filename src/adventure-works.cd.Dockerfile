FROM nginx:latest
EXPOSE 8080
EXPOSE 80
COPY apps/adventure-works/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
ENV ODATA=https://awod.ikemtz.com/ \
    WEBAPI=https://awwa.ikemtz.com/ \
    NGINX_PORT=80
