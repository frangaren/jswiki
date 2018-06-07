const path = require('path');

const controller = require(path.join(__dirname, '..', 'controller', 'controller.js'));

process.on('message', function (msg) {
    let cursor = controller;
    for (let i = 0; i < msg.path.length; i++) {
        if (msg.path[i] in cursor) {
            cursor = cursor[msg.path[i]];
        } else {
            process.send({
                success: false,
                path: msg.path,
                error: 'Invalid method'
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