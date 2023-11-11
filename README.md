
# Medical-Vitals-Management

This project is a Node.js application built with TypeScript, MongoDB, Mongoose, npm, Nodemon, Yup, and Express to create a RESTful API for managing user vitals and providing insights.

### **Features of the system**

1. **User Management**
    - Create a user with a unique username, age, gender, and an optional list of medical conditions.
    - Retrieve user's information using their username.
2. **Vital Management**
    - Insert a vital record for a user. Each vital record should have a vital ID, value, and timestamp.
    - Edit an existing vital for a user using the vital ID and timestamp.
    - Delete a vital record for a user using the vital ID and timestamp.
    - Retrieve vitals for a user over a specified period.
3. **Aggregation & Insights**
    - Retrieve average values of specific vitals (or all vitals) for a user over a specified period.
    - Compare a user's vitals against the population and provide percentile standings.

## Table of Contents
- Pseudo Code
- Tech Stack
- Files and Folders
- Getting Started
- API Endpoints
- Request & Response

## Pseudo Code

FUNCTION main():
    inputJSON = READ_JSON("test_cases.json")

    # Prepare empty database for users, 
		# use maps/dictionaries, list, queues like data structure to store the 
		# information. For example here we are using dictionary to store users.
    userDB = {}

    # Loop through commands and process each one
    FOR commandObject IN inputJSON:
        commandType = commandObject["command"]

        IF commandType == "create_user":
            result = CREATE_USER(commandObject)
            PRINT(result)

        ELIF commandType == "insert_vital":
            result = INSERT_VITAL(commandObject, userDB)
            PRINT(result)

        ELIF commandType == "aggregate":
            result = AGGREGATE(commandObject, userDB)
            PRINT(result)

        ELIF commandType == "population_insight":
            result = POPULATION_INSIGHT(commandObject, userDB)
            PRINT(result)

        ELSE:
            PRINT("Invalid command type: ", commandType)

## Tech Stack
- **Node.js**: A JavaScript runtime for executing server-side code.
- **TypeScript**: A superset of JavaScript that adds static typing and other features to enhance developer productivity.
- **MongoDB**: A NoSQL database that uses a document-oriented data model.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **npm**: The package manager for Node.js, facilitating the installation and management of dependencies.
- **Nodemon**: A utility that automatically restarts the Node.js application when changes are detected.
- **Yup**: A JavaScript schema validation library for defining and validating data shapes.
- **Express**: A minimal and flexible Node.js web application framework.
- **Body Parser**: Middleware for parsing incoming request bodies in Express applications.

## Files and Folders

The project structure is organized as follows:

- **app.ts**: Main application file.
- **package-lock.json**: NPM package lock file.
- **tsconfig.ts**: TypeScript configuration file.
- **node_modules/**: Folder containing project dependencies.
- **README.md**: Project documentation.
- **package.json**: NPM package configuration file.
- **src/**: Source code folder.

  - **config/**
    - **db.ts**: MongoDB configuration file.
    - **server.ts**: Express server configuration file.

  - **constants/**
    - **endPoints.ts**: API endpoint constants.

  - **helper/**
    - **response.ts**: Helper functions for handling responses.

  - **routers/**
    - **index.ts**: Main router file.
    - **user.ts**: Router for user-related endpoints.
    - **vital.ts**: Router for vital-related endpoints.
    - **insights.ts**: Router for insights-related endpoints.

  - **services/**
    - **aggregate.ts**: Service for aggregating vital data.

  - **controllers/**
    - **users.ts**: Controller for user-related logic.
    - **vital.ts**: Controller for vital-related logic.
    - **insights.ts**: Controller for insights-related logic.

  - **models/**
    - **user.ts**: MongoDB model for user data.
    - **vital.ts**: MongoDB model for vital data.

  - **validations/**
    - **validation.ts**: Validation schemas using Yup.

## Installation & Run Steps

### Install Node

If you haven't already, you need to install Node.js. You mentioned that you are using Node.js version v18.17.1.

You can download and install Node.js from the official website:

[Node.js Official Website](https://nodejs.org/en)

Also, you need to add the package manager `NPM`. You can install NPM from its official website:

[NPM Official Website](https://www.npmjs.com/)

Make sure Node.js is properly installed and added to your system's PATH.

## Set up your Node module

You mentioned that your project is hosted on GitHub at [https://github.com/ankitdmon/Medical-Vitals-Management](https://github.com/ankitdmon/Medical-Vitals-Management). To work with your project, set up your Node module as follows:

```bash
git clone https://github.com/ankitdmon/Medical-Vitals-Management
```
This will create all the files in your directory.

## Install Project Dependencies

Your Node file lists the project dependencies. To install these dependencies, run:

```bash
yarn
# OR
npm install
```

This command will download and install the necessary dependencies for your project.

### Create **.ENV** file
- Define ***PORT***
```
    PORT=8080
```
- Define ***DB_URI***

Here you need to add your mongoDB URL. Which you can get from mongodb Atlas server. [MongoDB Official Website](https://www.mongodb.com/)

```
    DB_URI="mongodb+srv://USERNAME:*****@cluster0.ma9cd2w.mongodb.net/"
```

## Verify Installation
To verify that all dependencies are installed successfully, you can run:
```
npm start
# or
yarn start
```
This will display a list of all the installed Node modules and their versions.

## API Endpoints

All APIs utilize the POST method for enhanced security, requiring data to be transmitted through the request payload.

### User-related Endpoints:

- **POST user/createUser:** Create a new user.  
    ``` http://localhost:8080/user/createUser ```

- **POST user/getUser :** Get user details by username.
    ``` http://localhost:8080/user/getUser ```

### Vital-related Endpoints:

- **POST vital/insertVital :** Insert vital data.

    ``` http://localhost:8080/vital/insertVital ```

- **POST vital/getVital :** Get vitals for a specific user.

    ``` http://localhost:8080/vital/getVital ```

- **POST vital/updateVital :** Edit vital data.

    ``` http://localhost:8080/vital/updateVital ```

- **POST vital/removeVital :** Delete vital data.

    ``` http://localhost:8080/vital/removeVital ```

### Insights-related Endpoints:

- **POST /insight/aggregate:** Aggregate vital data.

    ``` http://localhost:8080/insight/aggregate ```

- **POST /insight/population:** Get population insights.

    ``` http://localhost:8080/insight/populate ```


## Request & Response

- **POST /user/createUser:** Create a new user. 
    ``` http://localhost:8080/user/createUser ```
### Request
    
    {
        "command": "create_user",
        "userName": "JohnDoee",
        "age": 23,
        "gender": "Male"
    }
### Success Response
    {
        "status": "success",
        "data": "User JohnDe created.",
        "message": "Success"
    }

### Fail Response
    {
        "status": "failure",
        "data": null,
        "message": "Failure",
        "errorData": "UserName JohnDe is already taken.",
        "extra": {}
    }

### Error Response 
If command is wrong
    {
        "status": "failure",
        "data": null,
        "message": "Failure",
        "errorData": "Validation error",
        "extra": {}
    }

- **POST /user/getUser :** Get user details by username.
    ``` http://localhost:8080/user/getUser ```
### Request
    
    {
        "command":"get_user",
        "userName":"JohnDoe1"
    }
### Success Response
    {
        "status": "success",
        "data": {
            "_id": "654dfe018cfaab2f373df53b",
            "userName": "JohnDoe1",
            "age": 25,
            "gender": "Male",
            "medicalConditions": []
        },
        "message": "User JohnDoe1."
    }

### Fail Response
    {
        "status": "failure",
        "data": null,
        "message": "Failure",
        "errorData": "Validation error",
        "extra": {}
    }


- **POST /vital/insertVital :** Insert vital data.
    ``` http://localhost:8080/vital/insertVital ```
### Request
    
    {
        "command": "insert_vital",
        "userName": "JohnDoe",
        "vitalID": "HEART_RATE",
        "value": 105,
        "timestamp": "2023-10-04 10:00:00"
    }
### Response
    {
        "status": "success",
        "data": "Vital inserted for JohnDoe",
        "message": "Success"
    }

- **POST /vital/getVital :** Get vitals for a specific user.
    ``` http://localhost:8080/vital/getVital ```
### Request
    
    {
        "command": "get_vitals",
        "userName": "JohnDoe",
        "period": ["2023-10-04", "2023-10-07"]
    }
### Response
    {
        "status": "success",
        "data": [
            {
                "_id": "654dfe6f8cfaab2f373df55e",
                "vitalID": "Temperature",
                "value": 98,
                "timestamp": "2023-10-05T04:30:00.000Z"
            },
            {
                "_id": "654dfe888cfaab2f373df563",
                "vitalID": "HEART_RATE",
                "value": 98,
                "timestamp": "2023-10-05T04:30:00.000Z"
            },
            {
                "_id": "654e5e27acb882968bafdd6b",
                "vitalID": "HEART_RATE",
                "value": 110,
                "timestamp": "2023-10-04T04:30:00.000Z"
            },
            {
                "_id": "654e5e982fa898a35952d676",
                "vitalID": "HEART_RATE",
                "value": 105,
                "timestamp": "2023-10-04T04:30:00.000Z"
            },
            {
                "_id": "654e641ec90a091e1e7363b6",
                "vitalID": "HEART_RATE",
                "value": 105,
                "timestamp": "2023-10-04T04:30:00.000Z"
            },
            {
                "_id": "654e6795a6a8fe919f797680",
                "vitalID": "HEART_RATE",
                "value": 105,
                "timestamp": "2023-10-04T04:30:00.000Z"
            }
        ],
        "message": "All vitals for JohnDoe"
    }

- **POST /vital/updateVital :** Edit vital data.
    ``` http://localhost:8080/vital/updateVital ```
### Request
    {
        "command": "edit_vital",
        "userName": "JohnDoe",
        "vitalID": "HEART_RATE",
        "timestamp": "2023-10-14T04:30:00.000Z",
        "newValue": 120
    }
### Response
    {
        "status": "success",
        "data": "Vital for JohnDoe updated successfully.",
        "message": "Success"
    }

- **POST /vital/removeVital :** Delete vital data.
    ``` http://localhost:8080/vital/removeVital ```
### Request
    {
        "command": "delete_vitals",
        "userName": "JohnDoe",
        "vitalID": "HEART_RATE",
        "timestamp": "2023-10-04 10:00:00"
    }
### Response
    {
        "status": "success",
        "data": "Vital deleted for JohnDoe.",
        "message": "Success"
    }

- **POST /insight/aggregate:** Aggregate vital data.
    ``` http://localhost:8080/insight/aggregate ```
### Request
    {
        "command": "aggregate",
        "username": "JohnDoe",
        "vital_ids": ["HEART_RATE", "Temperature"],
        "start_timestamp": "2023-10-01T00:00:00Z",
        "end_timestamp": "2023-10-31T23:59:59Z"
    }
### Response
    {
        "status": "success",
        "data": {
            "username": "JohnDoe",
            "aggregates": {
                "HEART_RATE": 105.11111111111111,
                "Temperature": 100.16666666666667
            },
            "start_timestamp": "2023-10-01T00:00:00.000Z",
            "end_timestamp": "2023-10-31T23:59:59.000Z"
        },
        "message": "Success"
    }

- **POST /insight/population:** Get population insights.
    ``` http://localhost:8080/insight/populate ```
### Request
    {
        "command": "population_insight",
        "username": "JohnDoe",
        "vital_id": "Temperature",
        "start_timestamp": "2023-10-04",
        "end_timestamp": "2023-10-31T23:59:59Z"
    }
### Response
    {
        "status": "success",
        "data": {
            "username": "JohnDoe",
            "vital_id": "Temperature",
            "start_timestamp": "2023-10-03T18:30:00.000Z",
            "end_timestamp": "2023-10-31T23:59:59.000Z",
            "insight": "Your Temperature is in the 66.66666666666666th percentile."
        },
        "message": "Success"
    }
