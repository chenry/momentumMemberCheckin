# Developer Documentation

## Requirements
Please be sure to have the following tools installed
- [NodeEnv](https://github.com/nodenv/nodenv) - used to manage the appropriate version of Node.  We are using 12.19.0
- [Node] - 12.19.0
- [Studio 3T](https://studio3t.com/) - GUI for Mongo
- [Docker](https://www.docker.com/?utm_source=google&utm_medium=cpc&utm_campaign=search_emea_brand&utm_term=docker_exact&gclid=CjwKCAjw7p6aBhBiEiwA83fGuk1VSRc6_jWLioHUUCZUmmc-CmuoHBi9_Cxt9S8d6d-IUOz_O0765xoCqmsQAvD_BwE) - used to run containers for supporting software (Mongo, PostgreSQL)
- [Postman](https://www.postman.com/) - used to test API call
- [Knex](https://knexjs.org/) - this is our tool for interacting with the postgres database
## Overall Architecture
This application was developed by a team of engineers during Weekend for Good 2019.  It is written using the [MEAN Stack](https://www.mongodb.com/mean-stack).

## Local Development Environment Setup
Please be sure to install all of the required software from above.  From there, please follow these instructions to get setup appropriately.

### Setup Mongo DB
1. Download the folder `DatabaseBackup` from the Shared Google Drive
1. Unzip the zip file that was downloaded so you have a folder titled `DatabaseBackup`
1. Start Mongo Databse locally: `docker-compose up -d`
1. Open Studio 3T
1. Connect to your locally running Mongo Instance using the following url: `mongodb://root:rootpassword@localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256`
1. Right click on the connection to your local mongo instance in Studio 3T
1. Choose `Import`
1. Choose `BSON - mongodump folder`
1. Click the button titled `Select folder` next to the `Source Folder` text box
1. Choose the `DatabaseBackup` folder and select `Open`
1. Click on the `Run` button that is near the top of the tab that is titled `BSON Folder Import`

### Setup Postman Collection
We are using postman to test the various endpoints in the application and supporting services.  You will find the PostMan collection for this project at the root titled `Momentum.postman_collection.json`.

Please setup an environment in Postman, with the following variables (I will share the values later):
- PUBLIC_API_KEY
- PRIVATE_API_KEY
- CONSTITUENT_ID

### Database Migrations
For the database migrations, process to update the database schema, we are using [Knex](https://knexjs.org/guide/migrations.html).

## Working on this project, you
- [Getting Started with Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)


# Free options for PostGres database
- [Bit.io](http://bit.io)
- [Heroku](https://elements.heroku.com/addons/heroku-postgresql#pricing)
  - Hobby Dev is free but not sure how long
  - Basic is $9/month
