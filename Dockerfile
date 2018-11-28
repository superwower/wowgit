FROM node:8.13.0-alpine
ENV APP_DIR /opt/wowgit

RUN mkdir ${APP_DIR}
COPY . ${APP_DIR}/
WORKDIR ${APP_DIR}
RUN npm ci --production && npm run build

EXPOSE 3000

CMD ["npm", "start"]
