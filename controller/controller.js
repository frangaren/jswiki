'use strict';

const path = require('path');

exports.users = require(path.join(__dirname, 'users.js'));
exports.categories = require(path.join(__dirname, 'categories.js'));