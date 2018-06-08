'use strict';

const express = require('express');

const router = express.Router();

router.get('/', listUsers);

router.post('/', createUser);

router.get('/:id', retrieveUser);

function listUsers(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.list()
        .then(res.json.bind(res))
        .catch(next);
}

function createUser(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.create(req.body.username, req.body.email, req.body.name, 
        req.body.password)
        .then(res.status(201).json.bind(res))
        .catch(next);
}

function retrieveUser(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.retrieve(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

module.exports = router;