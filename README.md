# github-search-app

The app has been built with the following versions:
 - Node 8.11.3
 - NPM 5.6.0

A Docker container with app installed and running can be built and run with:

`docker build -t github-search-app .` and ` & docker run -p 8080:8080 github-search-app`

Alternatively, the app can be tested and run as follows:
 - `npm install`
 - `npm run test:unit`
 - `npm run test:integration`
 - `npm start`

The app will then be accessible at [http://localhost:8080/]
