FROM node:8.11.3-alpine AS dev
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
RUN npm ci --production && npm run build
EXPOSE 3000


FROM node:8.11.3-alpine AS production

ENV NPM_VERSION 6.3.0
ENV APP_DIR /opt/wowgit
ENV NEXT_DIR ${APP_DIR}/.next

COPY --from=dev ${APP_DIR} ${APP_DIR}
WORKDIR ${APP_DIR}
COPY --from=dev /usr/lib/libcurl-gnutls.so.4 /usr/lib
COPY --from=dev /usr/lib/libssh2.so.1 /usr/lib

RUN npm config set unsafe-perm true && \
    npm i -g npm@${NPM_VERSION}

EXPOSE 3000
CMD ["npm", "start"]
