'use strict';

const path = require('path');

const User = require(path.join(__dirname, '..', 'model', 'user.js'));

exports.list = async function () {
    const users = await User.find().sort('username').exec();
    return users;
}

exports.create = async function (username, email, name, password) {
    let user = new User();
    user.username = username;
    user.email = email;
    user.name = name;
    user.password = password;
    user = await user.save();
    return user;
}