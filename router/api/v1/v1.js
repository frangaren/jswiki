'use strict';

const express = require('express');
const path = require('path');

const router = express.Router();

const usersRouter = require(path.join(__dirname, 'users.js'));
router.use('/users/', usersRouter);

const categoriesRouter = require(path.join(__dirname, 'categories.js'));
router.use('/categories/', categoriesRouter);

const articlesRouter = require(path.join(__dirname, 'articles.js'));
router.use('/articles/', articlesRouter);

const tokensRouter = require(path.join(__dirname, 'tokens.js'));
router.use('/tokens/', tokensRouter);

module.exports = router;