'use strict';

const express = require('express');

const path = require('path');

const logged = require(path.join(__dirname, '..', '..', '..', 'middleware', 'logged.js'));

const router = express.Router();

router.get('/', listCategories);

router.get('/:id/children', categoryExists);
router.get('/:id/children', listChildren);

router.post('/', logged);
router.post('/', requireName);
router.post('/', requireParent);
router.post('/', validateName);
router.post('/', validateParent);
router.post('/', createCategory);

router.get('/:id', categoryExists);
router.get('/:id', retrieveCategory);

router.get('/:id/articles', categoryExists);
router.get('/:id/articles', retrieveArticles);

router.patch('/:id', logged);
router.patch('/:id', categoryExists);
router.patch('/:id', validateName);
router.patch('/:id', validateParent);
router.patch('/:id', updateCategory);

router.delete('/:id', logged);
router.delete('/:id', categoryExists);
router.delete('/:id', deleteCategory);

function listCategories(req, res, next) {
    const worker = req.app.get('worker');
    worker.categories.list()
        .then(res.json.bind(res))
        .catch(next);
}

function listChildren(req, res, next) {
    const worker = req.app.get('worker');
    const parent = (req.params.id === 'root') ? null : req.params.id;
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

function categoryExists(req, res, next) {
    const worker = req.app.get('worker');
    if (req.params.id === 'root') {
        next();
        return;
    }
    worker.categories.exists(req.params.id)
        .then(reply => {
            if (reply) {
                next();
            } else {
                let error = new Error('La categoría no existe.');
                error.status = 404;
                next(error);
            }
        })
        .catch(next);
}

function requireName(req, res, next) {
    if (!('name' in req.body)) {
        let error = new Error('El nombre es obligatorio.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requireParent(req, res, next) {
    if (!('parent' in req.body)) {
        let error = new Error('La categoría padre es obligatoria.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function validateParent(req, res, next) {
    if (!('parent' in req.body)) {
        next();
    } else {
        const worker = req.app.get('worker');
        if (req.body.parent === 'root') {
            next();
            return;
        }
        worker.categories.exists(req.body.parent)
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

function validateName(req, res, next) {
    if (!('name' in req.body)) {
        next();
    } else {
        const worker = req.app.get('worker');
        worker.categories.validateName(req.body.name)
            .then(reply => {
                if (reply.valid) {
                    next();
                } else {
                    let error = new Error(`Nombre inválido: ${reply.tip}`);
                    error.status = reply.status || 422;
                    next(error);
                }
            })
            .catch(next);
    }
}

module.exports = router;