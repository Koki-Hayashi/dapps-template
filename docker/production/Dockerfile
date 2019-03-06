FROM node:8.12.0

RUN npm install -g --no-progress yarn@1.9.4

ENV APP_HOME /dapps-template
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY . $APP_HOME

RUN yarn install
RUN yarn webpack-prod

EXPOSE 3000

