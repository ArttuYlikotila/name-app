# Name application

Simple responsive SPA-application that shows data of names and their amounts from predefined JSON-data.

The data can be organized in three different ways. There is also an option to show the total amount of names and to search the amount of a single name.

Back-end is made with Node and Express. Back-end offers a simple RESTful API that provides data for the React front-end.

Front-end is made using Create React App. Front-end is only responsible for fetching data and showing the results.

Styling is made with Bootstrap 4 and custom CSS.

## Link to app
Deployed version of the app running in Heroku:

https://simple-name-app.herokuapp.com/

## Installation

### Pre-requisites:

You need Node and NPM installed on your computer.

### Procedure:


1. Clone or download this repository

2. Open a terminal in the root directory of the repository and run command `npm install`

3. Open another terminal in the folder "/client" and run command `npm install`

4. To start local server, run command `node server.js` in the first terminal at the root directory of the repository

5. To start the front-end, run command `npm start` in the second terminal at the folder "client"

A local version of the application should start running in your web browser
