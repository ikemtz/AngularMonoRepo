FROM bitnami/nginx:latest
COPY /dist/apps/adventure-works/ /app
COPY /apps/adventure-works/nginx.conf /opt/bitnami/nginx/conf/server_blocks/nginx.conf
