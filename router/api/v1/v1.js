'use strict';

const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', function (req, res, next) {
    const worker = req.app.get('worker');
    worker.user.list().then(((reply) => res.json(reply))).catch(next);
});

module.exports = router;