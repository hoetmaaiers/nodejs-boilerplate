FROM node:10.15.0-alpine
MAINTAINER iCapps <developer@icapps.com>

RUN echo Let\'s get going with Docker

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json yarn.lock /tmp/

# Install yarn dependencies
RUN cd /tmp && \
    yarn

RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

EXPOSE 1337
EXPOSE 5858

CMD ["yarn", "start"]

