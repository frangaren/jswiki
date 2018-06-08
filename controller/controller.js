'use strict';

const path = require('path');

exports.users = require(path.join(__dirname, 'users.js'));
exports.categories = require(path.join(__dirname, 'categories.js'));
exports.articles = require(path.join(__dirname, 'articles.js'));
exports.tokens = require(path.join(__dirname, 'tokens.js'));