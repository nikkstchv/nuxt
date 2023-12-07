FROM node:18.12-alpine as build-stage

ARG MODE
ARG DOMAIN
ARG CDN_URL
ARG URL_RESIZER

ENV APP_HOME=/usr/src/app

RUN mkdir -p $APP_HOME

COPY . $APP_HOME

RUN echo "MODE=${MODE}" >> $APP_HOME/.env && \
    echo "DOMAIN=${DOMAIN}" >> $APP_HOME/.env && \
    echo "CDN_URL=${CDN_URL}" >> $APP_HOME/.env && \
    echo "HOST_API=${HOST_API}" >> $APP_HOME/.env && \
    echo "ENDPOINT=${ENDPOINT}" >> $APP_HOME/.env

RUN cd $APP_HOME && yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive

WORKDIR $APP_HOME

RUN yarn build --standalone

# Production Stage
FROM node:18.12-alpine as production-stage

ENV APP_HOME=/usr/src/app
WORKDIR /opt
COPY --from=build-stage $APP_HOME /opt

EXPOSE 80
ENV HOST=0.0.0.0
ENV MODE=${MODE}
ENV DOMAIN=${DOMAIN}
ENV CDN_URL=${CDN_URL}
ENV HOST_API=${HOST_API}
ENV ENDPOINT=${ENDPOINT}

ENTRYPOINT [ "node", ".output/server/index.mjs" ]
