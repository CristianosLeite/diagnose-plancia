# Diagnose Plancia

## Overview
Diagnose Plancia is a project developed for our client IVECO, which allows, through the registration of activities, to perform a complete checklist of the plant, whether it is a daily, weekly, monthly, or shift-based activity. The system includes user registration and permission levels that can be granted according to the client’s needs, as well as reports on the estimated time and time spent on activity execution and failures.

## Features
- User registration
- Permission levels
- Activity registration
- Checklist
- Reports

## Installation
Ypu can use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install the project.
```bash
npm install

# or

yarn install
```

## Usage
Before running the project, you need to setup your database, for this project we are using [PostgreSQL](https://www.postgresql.org/). You can use the following environment variables to setup your database connection:
```env
USERNAME_DASTABASE = your_username
PASSWORD_DATABASE = your_password
DIALECT_DATABASE = postgres
HOST_DATABASE = your_host
PORT_DATABASE = your_port
DATABASE_NAME = your_database_name
```
Or you can just replace the values in the [database-config.ts](database/database-config.ts) file.

Now we can run the project.

First we need to build the project.
```bash
npm dist

# or

yarn dist
```

Then we can run the project.
```bash
npm electron

# or

yarn electron
```
