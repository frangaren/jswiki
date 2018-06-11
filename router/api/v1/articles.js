'use strict';

const express = require('express');

const path = require('path');

const logged = require(path.join(__dirname, '..', '..', '..', 'middleware', 'logged.js'));

const router = express.Router();

router.get('/', listArticles);

router.post('/', logged);
router.post('/', requireTopic);
router.post('/', requireBody);
router.post('/', requireCategories);
router.post('/', validateCategories);
router.post('/', createArticle);

router.get('/:id', articleExists);
router.get('/:id', retrieveArticle);

router.get('/:id/history', articleExists);
router.get('/:id/history', retrieveHistory);

router.patch('/:id', logged);
router.patch('/:id', articleExists);
router.patch('/:id', validateCategories);
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

function requireTopic(req, res, next) {
    if (!('topic' in req.body)) {
        let error = new Error('Topic Not Provided');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requireBody(req, res, next) {
    if (!('body' in req.body)) {
        let error = new Error('Body Not Provided');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requireCategories(req, res, next) {
    if (!('categories' in req.body)) {
        let error = new Error('Categories Not Provided');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function validateCategories(req, res, next) {
    if (!('categories' in req.body)) {
        next();
    } else {
        const worker = req.app.get('worker');
        async function _validate() {
            for (let category of req.body.categories) {
                let reply = await worker.categories.exists(category);
                if (!reply) {
                    return false;
                }
            }
            return true;
        }
        _validate()
            .then(reply => {
                if (reply) {
                    next();
                } else {
                    let error = new Error('La categoría padre no existe.');
                    error.status = 422;
                    next(error);
                }
            })
            .catch(next);
    }
}

module.exports = router;