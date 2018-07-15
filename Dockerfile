FROM node:8.11.3-alpine

ENV NPM_VERSION 6.2.0
ENV APP_DIR /opt/wowgit

RUN npm config set unsafe-perm true && npm i -g npm@${NPM_VERSION} && mkdir ${APP_DIR}

COPY . ${APP_DIR}/
WORKDIR ${APP_DIR}
RUN npm install && npm run build
EXPOSE 3000

CMD ["npm", "start"]
