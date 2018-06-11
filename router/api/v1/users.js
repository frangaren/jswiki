'use strict';

const express = require('express');

const path = require('path');

const logged = require(path.join(__dirname, '..', '..', '..', 'middleware', 'logged.js'));

const router = express.Router();

router.get('/', listUsers);

router.post('/', requireUsername);
router.post('/', requirePassword);
router.post('/', requireName);
router.post('/', requireEmail);
router.post('/', validateUsername);
router.post('/', validatePassword);
router.post('/', validateEmail);
router.post('/', createUser);

router.get('/:id', userExists);
router.get('/:id', retrieveUser);

router.get('/:id/favorites', userExists);
router.get('/:id/favorites', retrieveFavorites);

router.post('/:id/favorites', logged);
router.post('/:id/favorites', checkPermission);
router.post('/:id/favorites', userExists);
router.post('/:id/favorites', requireArticle);
router.post('/:id/favorites', validateArticle);
router.post('/:id/favorites', addFavorite);

router.delete('/:id/favorites', logged);
router.delete('/:id/favorites', checkPermission);
router.delete('/:id/favorites', userExists);
router.delete('/:id/favorites', requireArticle);
router.delete('/:id/favorites', validateArticle);
router.delete('/:id/favorites', deleteFavorite);

router.get('/:id/favorites/:article', logged);
router.get('/:id/favorites/:article', userExists);
router.get('/:id/favorites/:article', articleExists);
router.get('/:id/favorites/:article', containsFavorite);

router.patch('/:id', logged);
router.patch('/:id', checkPermission);
router.patch('/:id', userExists);
router.patch('/:id', validateUsername);
router.patch('/:id', validatePassword);
router.patch('/:id', validateEmail);
router.patch('/:id', updateUser);

router.delete('/:id', logged);
router.delete('/:id', checkPermission);
router.delete('/:id', userExists);
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

function retrieveFavorites(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.listFavorites(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
}

function addFavorite(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.addFavorite(req.params.id, req.body.article)
        .then(res.json.bind(res))
        .catch(next);
}

function deleteFavorite(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.deleteFavorite(req.params.id, req.body.article)
        .then(res.json.bind(res))
        .catch(next);
}

function containsFavorite(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.containsFavorite(req.params.id, req.params.article)
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

function checkPermission(req, res, next) {
    if (req.body.currentUser == req.params.id) {
        next();
    } else {
        const error = new Error('You don\'t have permission over this user.');
        error.status = 401;
        next(error);
    }
}

function userExists(req, res, next) {
    const worker = req.app.get('worker');
    worker.users.exists(req.params.id)
        .then(reply => {
            if (reply) {
                next();
            } else {
                let error = new Error('User Not Found');
                error.status = 404;
                next(error);
            }
        })
        .catch(next);
}

function articleExists(req, res, next) {
    const worker = req.app.get('worker');
    worker.articles.exists(req.params.article)
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

function requireUsername(req, res, next) {
    if (!('username' in req.body) || req.body.username.length <= 0) {
        let error = new Error('El usuario es obligatorio.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requireEmail(req, res, next) {
    if (!('email' in req.body) || req.body.email.length <= 0) {
        let error = new Error('El correo es obligatorio.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requireName(req, res, next) {
    if (!('name' in req.body) || req.body.name.length <= 0) {
        let error = new Error('El nombre es obligatorio.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requirePassword(req, res, next) {
    if (!('password' in req.body) || req.body.password.length <= 0) {
        let error = new Error('La contraseña es obligatoria.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requireArticle(req, res, next) {
    if (!('article' in req.body) || req.body.article.length <= 0) {
        let error = new Error('El artículo es obligatorio.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function validateUsername(req, res, next) {
    if (!('username' in req.body)) {
        next();
    } else {
        const worker = req.app.get('worker');
        worker.users.validateUsername(req.body.username)
            .then(reply => {
                if (reply.valid) {
                    next();
                } else {
                    let error = new Error(`Usuario inválido: ${reply.tip}`);
                    error.status = reply.status || 422;
                    next(error);
                }
            })
            .catch(next);
    }
}

function validateEmail(req, res, next) {
    if (!('email' in req.body)) {
        next();
    } else {
        const worker = req.app.get('worker');
        worker.users.validateEmail(req.body.email)
            .then(reply => {
                if (reply.valid) {
                    next();
                } else {
                    let error = new Error(`Correo electrónico inválido: ${reply.tip}`);
                    error.status = reply.status || 422;
                    next(error);
                }
            })
            .catch(next);
    }
}

function validatePassword(req, res, next) {
    if (!('password' in req.body)) {
        next();
    } else {
        const worker = req.app.get('worker');
        worker.users.validatePassword(req.body.password)
            .then(reply => {
                if (reply.valid) {
                    next();
                } else {
                    let error = new Error(`Contraseña inválida: ${reply.tip}`);
                    error.status = reply.status || 422;
                    next(error);
                }
            })
            .catch(next);
    }
}

function validateArticle(req, res, next) {
    if (!('article' in req.body)) {
        next();
    } else {
        const worker = req.app.get('worker');
        worker.articles.exists(req.body.article)
            .then(reply => {
                if (reply) {
                    next();
                } else {
                    let error = new Error('El artículo no existe');
                    error.status = 422;
                    next(error);
                }
            })
            .catch(next);
    }
}

module.exports = router;