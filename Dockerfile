FROM node:8

WORKDIR /usr/src/github-search-app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
