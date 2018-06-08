'use strict';

const express = require('express');

const router = express.Router();

router.post('/grant', authenticate);
router.post('/grant', issue);

router.post('/refresh', refresh);
router.post('/refresh', issue);

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
                    error_description: 'Invalid username and password.'
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
                    error_description: 'Invalid refresh token.'
                };
                res.status(400).json(error);
            }
        })
        .catch(next);
}

module.exports = router;