
# MERN Stack Todo Application

This project aims to create a todo application where you can do  CRUD operations using MongoDB, Express.js, React, and Node.js (MERN) technologies.


## Getting Started
These instructions will help you to clone and run the project on your local machine.

Installation

Clone this project:
```bash 
$ git clone https://github.com/IsmailCanMutlu/mern-todo.git
$ cd mern-todo
```
## .env File Instructions
After downloading the project files and before running the project, you need to create a .env file in the root directory of the project. This file will contain the environment variables required for the project to work. Use the following example structure to create your .env file and insert the appropriate values:
```bash 
PORT=5000
ATLAS_URI=<YOUR_MONGODB_CONNECTION_STRING>
```
Replace the <YOUR_MONGODB_CONNECTION_STRING> field with your own MongoDB Atlas connection string. To do this, go to your MongoDB Atlas account and copy a database connection string created there. Paste this connection string as the ATLAS_URI value in your .env file.

After completing this process, your project should now run properly.

## Backend:
```bash 
$ cd server/
$ npm install && npm start
```

If the specified port is successfully connected by the server, you will see this message:
Server is running on port: 5000

If you have successfully connected to your database you will see this message:
MongoDB database connection established successfully

## Frontend:
```bash 
$ cd client/
$ npm install && npm start
```

## Usage

When you open the app, you can add a new todo on the homepage. All the todos you add will be listed on the main page. Each todo can be viewed with an "Edit" and "Delete" buttons next to it.

## Homapage
<img src="https://github.com/IsmailCanMutlu/mern-todo/blob/main/Homapage.png" alt="homepage" width="450" height="425">

## Testing

Backend and frontend tests were written using Jest and Supertest in this project. You can run the tests using the following command:
npm test
## Contributing

Thank you for your contributions.

@baristure
  
## Lisans

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for more information.

  
 
