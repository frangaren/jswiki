const path = require('path');

const controller = require(path.join(__dirname, '..', 'controller', 'controller.js'));

const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL || 'mongodb://localhost/db';
const dbAuth = 'DB_AUTH' in process.env;
const dbAuthSource = (dbAuth) ? process.env.DB_AUTH_SOURCE : undefined;
const dbUser = (dbAuth) ? process.env.DB_USER : undefined;
const dbPassword = (dbAuth) ? process.env.DB_PASSWORD : undefined;
const connectionSettings = {
    user: dbUser,
    pass: dbPassword,
    authSource: dbAuthSource
};
mongoose.connect(dbUrl, connectionSettings);

mongoose.connection.on('error', console.error.bind(console, 'DB error: '));
mongoose.connection.once('open', function () {
    process.on('message', function (msg) {
        let cursor = controller;
        for (let i = 0; i < msg.path.length; i++) {
            if (msg.path[i] in cursor) {
                cursor = cursor[msg.path[i]];
            } else {
                process.send({
                    success: false,
                    path: msg.path,
                    error: `Object ${msg.path.slice(0, i)} doesn't contain ${msg.path[i]}`
                });
                return;
            }
        }
        cursor.apply(null, msg.args)
            .then((reply) => {
                process.send({
                    success: true,
                    path: msg.path,
                    reply: reply
                });
            })
            .catch((error) => {
                process.send({
                    success: false,
                    path: msg.path,
                    error: error.message
                });
            });
    });
});