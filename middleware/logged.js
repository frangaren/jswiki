function logged (req, res, next) {
    const worker = req.app.get('worker');
    worker.tokens.check(req.query.access_token,
        req.connection.remoteAddress)
        .then(reply => {
            if (reply.valid) { // Good credentials
                req.body.authId = reply._id;
                next();
            } else { // Wrong credentials
                const error = {
                    error: 'invalid_grant',
                    error_description: 'Invalid token.'
                };
                res.status(400).json(error);
            }
        })
        .catch(next);
}

module.exports = logged;