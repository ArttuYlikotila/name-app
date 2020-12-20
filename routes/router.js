'use strict'
const express = require('express');
const api = express.Router();
const controller = require('../controllers/controller.js');

// Returns the default JSON-data if there are no query parameters
// Returns the JSON-data sorted by given parameter if query parameters are given
// @param {key} sort {value} 'name' or 'sort'
api.get('/names', controller.allNames, controller.sortByParam);

// Returns the total amount of the names in the JSON data
api.get('/names/total-amount', controller.totalAmount);

// Returns the name and amount of the name given as a parameter
// @param {String} the name of the amount retrieved
api.get('/names/:name', controller.nameAmount);

module.exports = api;