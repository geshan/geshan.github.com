FROM node:20-alpine

WORKDIR /app

EXPOSE 8080
COPY . /app
RUN npm install

CMD ["npx eleventy --serve"]
