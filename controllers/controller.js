'use strict'
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
// @param {key} 'sort' {value} 'name' or 'amount'
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
