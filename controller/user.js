'use strict';

const path = require('path');

const User = require(path.join(__dirname, '..', 'model', 'user.js'));

exports.list = async function () {
    const users = await User.find().sort('username').exec();
    return users;
}