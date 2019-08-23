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

To run the application please run following commands:

```bash
docker-compose up web
docker-compose up api
```

## Database

This project uses PostgreSQL database, in development, the api service will automatically migrate database when running the image. If you do not want it to migrate please remove

```bash
rake db:migrate &&
```

from execution command

## How it works

Web:
  - This web application must be authenticated before using its functionality. 
  - User must authenticate with their G-mail account or register a new account directly through the site.
  - On Home page there is a upload section that can upload .csv file that contain keywords (1-100 keywords).
  - All keywords data will be displayed on the page.
  
API:
  - When .csv file is uploaded to API it will be stored to database but not be searched immediately.
  - There is a scheduler-job that running every 1 minute for checking keyword that is not searched yet. In addition, a keyword will be scrapped by using Nokogiri library.
  
## Features

This project make it easy to get:
  - Total Adwords
  - Total Links
  - Total Results
  - HTML Code
  
from searching a keyword

## Note

- Ideally, this project will use separate Firebase key from development, staging, production, so it's ok to keep Firebase development to docker-compose file.
- Ideally, GOOGLE_API_KEY, must be encrypted with encryption tool.
- Only total results will be searched by using Google API. This is because I cannot find a way to get total results from Google. `So, it can only search 100 query a day`
