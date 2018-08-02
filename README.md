# GitHub Search App

I have taken this exercise as an opportunity to experiment with a number of technologies which I have not developed with before, including:
 - Node.js
 - Express
 - React
 - Chai for unit testing
 - Google Cloud Build

## Building and running the app

A Docker container with app installed and running can be built and run with:

`docker build -t github-search-app .` and ` & docker run -p 8080:8080 github-search-app`

Alternatively, the app can be run using NPM directly. It has been built using Node 8.11.3 and NPM 5.6.0.
To build and test the app run the following commands:
 - `npm install`
 - `npm run test:unit`
 - `npm run test:integration`
 - `npm start`

With either method the app will be accessible at http://localhost:8080/

## CI/Merge testing

I have created a Docker based build pipeline, using Google Cloud Build. The pipeline is configured in `cloudbuild.yaml`, and a trigger has been configured in GitHub so that every time a pull request is created the pipeline will be run and its status be reported on the pull request.
Outside of pull requests the pipeline can also be run from a developer machine with uncommitted changes by running the following command which will upload the workspace and run the build using the same pipeline configuration.

`gcloud builds submit --config cloudbuild.yaml .` (Google account configuration required)

## Future improvements
 - Implement paging of search results
  - currently up to a maximum of 30 results (default GitHub API page size) are returned and displayed by the client, with no mechanism for viewing more
 - Allow sorting of search results
 - Add error handling within client when performing a search, along with input validation
 - Add unit testing of React components
 - Currently `githubClient.js` within the server component directly writes the response to the client - it would be good for it not to be as tightly coupled
 - The mocking performed for testing `githubClient.js` required defining dependencies with `var` instead of `const`, making the code less robust  - it would be good to avoid having to change the code like this for tests
 - Changing the project configuration so that tests would run on change, rather than having to be manually run

## What would I do differently if I started again?
 - I would not have created the Express server component
  - I initially created this as I thought it would be necessary to authenticate with the GitHub API, and I wanted a means of hiding the authentication token from the client
  - Authentication is not required, so API requests could have been made directly by the client which would have reduced the complexity of the app as a whole
  - Making GitHub API calls directly from the client could also avoid potential future issues with rate limiting by the GitHub API if a large number of users were to use the app
 - I would have created the client as a Node managed project, making it easier to pull in 3rd party React components for building the UI
