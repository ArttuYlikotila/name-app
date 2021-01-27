'use strict'
const { body, validationResult } = require('express-validator');
const data = require('../data/names.json');

// Function that returns the default JSON data if there are no query parameters
exports.allNames = function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    res.status(200).json(data);
  }
  else {
    next();
  }
}

// Function that returns a copy of the JSON data sorted by the given query parameters
// @query {key} 'sort' {value} 'name' or 'amount'
exports.sortByParam = function (req, res) {
  // Return error if the parameter is invalid
  if (req.query.sort !== 'name' && req.query.sort !== 'amount') {
    return res.status(400).json({ error: 'Invalid parameter given' });
  }

  // compareFunction for sorting the JSON data
  const compareData = (prop) => (a, b) => a[prop] > b[prop] ? 1 : -1;

  // Make a deep copy of the data
  const sortedData = JSON.parse(JSON.stringify(data));

  // Sort the copy of the data with the given parameter
  sortedData.names.sort(compareData(req.query.sort));

  if (req.query.sort === 'amount') {
    sortedData.names.reverse();
  }

  res.status(200).json(sortedData);
}

// Function that returns the total amount of all the names in the JSON data
exports.totalAmount = function (req, res) { 
  // Reducer function to sum the values from JSON data
  const countTotal = (total, item) => total + item.amount;

  // Count the total amount of all the names in data with reducer function
  const amount = data.names.reduce(countTotal, 0);

  res.status(200).json({ 'namesTotal' : amount });
}

// Function that returns the name and amount of the names given as a parameter
// @param {String} the name of the amount retrieved
exports.nameAmount = function (req, res) {
  // Search the data with the name given as a parameter
  const name = data.names.filter(item => item.name === req.params.name);

  // Return an error if the name is not found
  if (name.length === 0) {
    return res.status(404).json({ error: 'Name not found' });
  }

  res.status(200).json(name[0]);
}

// Function that updates the name and the amount of a name given as a parameter
// @param {String} the name of the amount to be updated
// @body {JSON-obj} 'name', 'amount'
exports.updateName = function (req, res) {
  function findName(item) {
    if (item.name === req.params.name) {
      item.name = req.body.name;
      item.amount = req.body.amount;
      return item;
    }
  }

  // Try to find and update the data of the given name
  const updatedName = data.names.find(findName);

  if (updatedName === undefined) {
    res.status(404).json({ error: 'Name not found' });
  }
  else {
    res.status(200).json(updatedName);
  }
}

// Function that deletes one name and its amount from the data
// @param {String} the name to be deleted
exports.deleteName = function (req, res) {
  const rowAmount = data.names.length;

  // Try to remove the given name and its amount from the data
  data.names = data.names.filter((item) => item.name != req.params.name);

  if (rowAmount === data.names.length) {
    res.status(404).json({ error: 'Name not found' });
  }
  else {
    res.sendStatus(205);
  }
}

// Function that adds one new name and its amount to the data
// @body {JSON-obj} 'name', 'amount'
exports.addName = function (req, res) {
  // Check if the name exists in the data
  const name = data.names.find((item) => item.name === req.body.name);

  // Add the new name only if it is not in the data already
  if (name != undefined) {
    res.status(403).json({ error: 'Name is already in the data' });
  }
  else {
    data.names.push({ 'name': req.body.name, 'amount': req.body.amount });

    res.sendStatus(201);
  }
}

// Funcion that validates and sanitizes the body of the incoming input
exports.validateInput = [
  body('name').trim().escape().notEmpty().withMessage('Name can not be empty'),
  body('amount').trim().escape().isInt({ min: 1 }).toInt().withMessage('Amount must be positive number'),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];