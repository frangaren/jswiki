'use strict';

const express = require('express');

const path = require('path');

const logged = require(path.join(__dirname, '..', '..', '..', 'middleware', 'logged.js'));

const router = express.Router();

router.get('/', listArticles);

router.post('/', logged);
router.post('/', createArticle);

router.get('/:id', retrieveArticle);

router.patch('/:id', logged);
router.patch('/:id', updateArticle);

router.delete('/:id', logged);
router.delete('/:id', deleteArticle);

function listArticles(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.list()
        .then(res.json.bind(res))
        .catch(next);
}

function createArticle(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.create(req.body.topic, req.body.body, req.body.categories)
        .then(res.status(201).json.bind(res))
        .catch(next);
}

function retrieveArticle(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.retrieve(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

function updateArticle(req, res, next) {
    const worker = req.app.get('worker');
    const newValues = {
        topic: req.body.topic,
        body: req.body.body,
        categories: req.body.categories
    };
    worker.articles.update(req.params.id, newValues)
        .then(res.json.bind(res))
        .catch(next);
}

function deleteArticle(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.delete(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

module.exports = router;

module.exports = router;