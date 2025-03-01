## Description

This is a RESTful API designed to manage customer data for a banking system. The API provides endpoints for creating, reading, updating, and deleting customer information, following industry best practices and modern architectural patterns like Clean Architecture.

## Overview

The API manages enterprise data, allowing the following operations:

Enterprises CRUD: Create, read, update, and delete (soft delete) enterprise records.
Enterprise Party Management: Add, update, and list parties associated with an enterprise.
Filtering and Pagination: Filter enterprises by type and paginate results.
The application follows RESTful principles and modern software architectural patterns.

## Prerequisites
- [Node 22](https://nodejs.org/es)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project setup

### 1. Clone the Repository

Use the following command to clone the project.

```bash
git clone https://github.com/manuelrojas19/konfio-enterprise-query-service
cd konfio-enterprise-query-service
```

Use the following command to install all required dependencies.

```bash
$ npm install
```

### 2. Start Docker Compose dependencies

This project relies on Docker to start a PostgreSQL database for local developmentent

Use the following commands to start docker containers using Docker Compose.

```bash
cd docker-compose/
docker compose up --build -d
```

### 3. Setup necessaries files

Create a .env.development.local file in the root directory of your project with the following content:

```bash
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=enterprise-command-db
```

This file contains the necessary environment variables for your database setup and development environment matching some dummy values provided on docker compose file. Make sure to add it to your .gitignore file to prevent it from being pushed to your repository.

### 4. Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


### 4. Usage

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 5. API Endpoints CURL Commands

#### Enterprises:

To register a new enterprise, you can use the following `curl` command:

```bash
curl -X POST http://localhost:3000/enterprises \
  -H "Content-Type: application/json" \
  -d '{"name": "My Enterprise", "type": "Enterprise", "taxId": "GODE561231GR8"}'
```

To find all enterprises, you can use the following `curl` command:

```bash
curl -X GET http://localhost:3000/enterprises \
  -H "Content-Type: application/json" 
```

To Find Enterprise by id, you can use the following `curl` command:

```bash
curl -X GET http://localhost:3000/enterprises/1 \
  -H "Content-Type: application/json" 
```

To Update Enterprise by id, you can use the following `curl` command:

```bash
curl -X PUT http://localhost:3000/enterprises/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Tech Corp",
  "type": "Individual",
  "taxId": "TEC900101XYZ"
}'
```

To Find All Enterprises associated to a Party, you can use the following `curl` command:

```bash
curl -X GET http://localhost:3000/enterprises/1/parties \
  -H "Content-Type: application/json"
```

#### Parties:


To Create a Party, you can use the following `curl` command, you must provide an existing Enterprise:

```bash
curl -X POST http://localhost:3000/enterprises/1/parties \
  -H "Content-Type: application/json" \
  -d '{
        "name": "John Doe"
      }'
```

To Find All Parties associated to Enterprise `curl` command, you must provide an existing Enterprise:


```bash
curl -X GET http://localhost:3000/enterprises/1/parties \
  -H "Content-Type: application/json" 
```

## Next Steps

Following Next Steps

- Implement soft delete endpoints.
- Implement proper error handling.
- Add swagger documentation.
- Implement CICD infraestructure.
- Implement possible Infraestructure as a code to release this on AWS.
- Unit Testing.
- Enforce Logging and Monitoring.
- Integration and Perf Test.
- Explit this API in two separated components, one for reading and one for updates to implement CQRS pattern.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
