FROM node:16-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -i

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "npm", "start" ]