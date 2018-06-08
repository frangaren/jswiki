'use strict';

const express = require('express');
const path = require('path');

const router = express.Router();

const usersRouter = require(path.join(__dirname, 'users.js'));
router.use('/users/', usersRouter);

module.exports = router;