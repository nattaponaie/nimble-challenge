![Logo of the project](https://raw.githubusercontent.com/nattaponaie/nimble-challenge/master/web/static/favicon.png)

# Nimble Challenge

Nimble Challenge is a project that will extract large amounts of data from the Google search results page.

## Prerequisite

```bash
Docker
Docker Compose
```

## Installation

Use the Docker Compose to install this project.

```bash
docker-compose build web
docker-compose build api
```

If you want to run scheduler job separately then remove scheduler-job from api service and then

```bash
docker-compose build scheduler-job
```

## How it works

Web:
  - Go to home page then upload .csv file that contain keywords (1-100 keywords).
  - All keywords data will be displayed on the page.
  
API:
  - When .csv file is uploaded to API it will be stored to database.
  - There is a scheduler-job that checking every 1 minute for a key that is not searched yet. In addition, a keyword will be searched by using Nokogiri.
  - Only total results will be searched by Google API. This is because I cannot find a way to get total results from specific keyword.
  
## Features

This project make it easy to get:
  - Total Adwords
  - Total Links
  - Total Results
  - HTML Code
