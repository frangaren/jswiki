'use strict';

const express = require('express');

const router = express.Router();

router.get('/', listCategories);

router.get('/:parent/children', listChildren);

router.post('/', createCategory);

router.get('/:id', retrieveCategory);

router.get('/:id/articles', retrieveArticles);

router.patch('/:id', updateCategory);

router.delete('/:id', deleteCategory);

function listCategories(req, res, next) {
    const worker = req.app.get('worker');
    worker.categories.list()
        .then(res.json.bind(res))
        .catch(next);
}

function listChildren(req, res, next) {
    const worker = req.app.get('worker');
    const parent = (req.params.parent === 'root') ? null : req.params.parent;
    worker.categories.listChildren(parent)
        .then(res.json.bind(res))
        .catch(next);
}

function createCategory(req, res, next) {
    const worker = req.app.get('worker');
    worker.categories.create(req.body.name, req.body.parent)
        .then(res.status(201).json.bind(res))
        .catch(next);
}

function retrieveCategory(req, res, next) {
    const worker = req.app.get('worker');
    worker.categories.retrieve(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

function retrieveArticles(req, res, next) {
    const worker = req.app.get('worker');
    worker.categories.retrieveArticles(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

function updateCategory(req, res, next) {
    const worker = req.app.get('worker');
    const newValues = {
        name: req.body.name,
        parent: req.body.parent
    };
    worker.categories.update(req.params.id, newValues)
        .then(res.json.bind(res))
        .catch(next);
}

function deleteCategory(req, res, next) {
    const worker = req.app.get('worker');
    worker.categories.delete(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

module.exports = router;

module.exports = router;