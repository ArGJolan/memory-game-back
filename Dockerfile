FROM node:12.16.1-alpine

ENV NODE_ENV=production

# Copy app
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json /opt/app
RUN npm install --production
COPY . /opt/app

EXPOSE 1024

CMD ["sh", "-c", "npm start"]