'use strict';

const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', function (req, res) {
    res.json({reply: 'Hello World'});
});

module.exports = router;