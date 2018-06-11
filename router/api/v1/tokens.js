'use strict';

const express = require('express');

const router = express.Router();

router.post('/grant', requireUsername);
router.post('/grant', requirePassword);
router.post('/grant', authenticate);
router.post('/grant', issue);

router.post('/grant', requireRefreshToken);
router.post('/refresh', refresh);
router.post('/refresh', issue);

router.post('/grant', requireAccessToken);
router.post('/check', check);

function issue(req, res, next) {
    const worker = req.app.get('worker');
    worker.tokens.issue(req.body._id, req.connection.remoteAddress)
        .then(res.json.bind(res))
        .catch(next);
}

function authenticate(req, res, next) {
    const worker = req.app.get('worker');
    worker.tokens.authenticate(req.body.username, req.body.password)
        .then(reply => {
            if (reply.valid) { // Good credentials
                req.body._id = reply._id;
                next();
            } else { // Wrong credentials
                const error = {
                    error: 'invalid_grant',
                    message: 'Usuario o contraseña inválido.'
                };
                res.status(400).json(error);
            }
        })
        .catch(next);
}

function refresh(req, res, next) {
    const worker = req.app.get('worker');
    worker.tokens.refresh(req.body.refresh_token, 
        req.connection.remoteAddress)
        .then(reply => {
            if (reply.valid) { // Good credentials
                req.body._id = reply._id;
                next();
            } else { // Wrong credentials
                const error = {
                    error: 'invalid_grant',
                    message: 'Token de refresco inválido.'
                };
                res.status(400).json(error);
            }
        })
        .catch(next);
}

function check(req, res, next) {
    const worker = req.app.get('worker');
    worker.tokens.check(req.body.access_token,
        req.connection.remoteAddress)
        .then(reply => {
            if (reply.valid) { // Good credentials
                req.body._id = reply._id;
                res.status(200).json(reply);
            } else { // Wrong credentials
                const error = {
                    error: 'invalid_grant',
                    message: 'Token inválido.'
                };
                res.status(400).json(error);
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

function requirePassword(req, res, next) {
    if (!('password' in req.body) || req.body.password.length <= 0) {
        let error = new Error('La contraseña es obligatoria.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requireAccessToken(req, res, next) {
    if (!('access_token' in req.body) || req.body.access_token.length <= 0) {
        let error = new Error('El token de acceso es obligatorio.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

function requireRefreshToken(req, res, next) {
    if (!('refresh_token' in req.body) || req.body.refresh_token <= 0) {
        let error = new Error('El token de refresco es obligatorio.');
        error.status = 422;
        next(error);
    } else {
        next();
    }
}

module.exports = router;