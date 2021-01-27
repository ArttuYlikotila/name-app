'use strict'
const express = require('express');
const api = express.Router();
const controller = require('../controllers/controller.js');

// Returns the default JSON-data if there are no query parameters
// Returns the JSON-data sorted by given parameter if query parameters are given
// @query {key} sort {value} 'name' or 'sort'
api.get('/names', controller.allNames, controller.sortByParam);

// Returns the total amount of the names in the JSON data
api.get('/names/total-amount', controller.totalAmount);

// Returns the name and amount of the name given as a parameter
// @param {String} the name of the amount retrieved
api.get('/names/:name', controller.nameAmount);

// Adds a new name and its amount to the data
// @body {JSON-obj} 'name', 'amount'
api.post('/names', controller.validateInput, controller.addName);

// Updates data of one name
// @param {String} the name to be updated
// @body {JSON-obj} 'name', 'amount'
api.put('/names/:name', controller.validateInput, controller.updateName);

// Deletes a name and its amount based on the name given as a parameter
// @param {String} the name to be deleted
api.delete('/names/:name', controller.deleteName);

module.exports = api;