FROM node:8.11.3-alpine

ENV NPM_VERSION 6.3.0
ENV APP_DIR /opt/wowgit

RUN apk --no-cache add --virtual .build-deps g++ make python && \
    apk --no-cache add libressl-dev curl-dev && \
    ln -s /usr/lib/libcurl.so.4 /usr/lib/libcurl-gnutls.so.4 && \
    npm config set unsafe-perm true && \
    npm i -g npm@${NPM_VERSION} && \
    mkdir ${APP_DIR}

COPY . ${APP_DIR}/
WORKDIR ${APP_DIR}
RUN npm ci --production && npm run build && apk del .build-deps
EXPOSE 3000

CMD ["npm", "start"]
