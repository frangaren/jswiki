'use strict';

const express = require('express');

const path = require('path');

const logged = require(path.join(__dirname, '..', '..', '..', 'middleware', 'logged.js'));

const router = express.Router();

router.get('/', listArticles);

router.post('/', logged);
router.post('/', createArticle);

router.get('/:id', articleExists);
router.get('/:id', retrieveArticle);

router.get('/:id/history', articleExists);
router.get('/:id/history', retrieveHistory);

router.patch('/:id', logged);
router.patch('/:id', articleExists);
router.patch('/:id', updateArticle);

router.delete('/:id', logged);
router.delete('/:id', articleExists);
router.delete('/:id', deleteArticle);

function listArticles(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.list()
        .then(res.json.bind(res))
        .catch(next);
}

function createArticle(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.create(req.body.topic, req.body.body, req.body.categories,
        req.body.currentUser)
        .then(res.status(201).json.bind(res))
        .catch(next);
}

function retrieveArticle(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.retrieve(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

function retrieveHistory(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.history(req.params.id)
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
    worker.articles.update(req.params.id, newValues, req.body.currentUser)
        .then(res.json.bind(res))
        .catch(next);
}

function deleteArticle(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.delete(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

function articleExists(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.exists(req.params.id)
        .then(reply => {
            if (reply) {
                next();
            } else {
                let error = new Error('Article Not Found');
                error.status = 404;
                next(error);
            }
        })
        .catch(next);
}

module.exports = router;