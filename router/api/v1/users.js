'use strict';

const express = require('express');

const router = express.Router();

router.get('/', listUsers);

router.post('/', createUser);

router.get('/:id', retrieveUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

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

function updateUser(req, res, next) {
    const worker = req.app.get('worker');
    const newValues = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    };
    worker.users.update(req.params.id, newValues)
        .then(res.json.bind(res))
        .catch(next);
}

function deleteUser(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.delete(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

module.exports = router;