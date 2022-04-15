FROM nginx:latest
EXPOSE 8080
COPY apps/adventure-works/ /app
COPY /apps/adventure-works/nginx.conf templates/nginx.conf.template
ENV ODATA=https://awod.ikemtz.com/ \
    WEBAPI=https://awwa.ikemtz.com/
