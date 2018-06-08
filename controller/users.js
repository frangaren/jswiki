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

exports.retrieve = async function (id) {
    const user = await User.findById(id).exec();
    return user;
}

exports.update = async function (id, newValues) {
    let user = await User.findById(id).select('+password').exec();
    user.username = newValues.username || user.username;
    user.email = newValues.email || user.email;
    user.name = newValues.name || user.name;
    user.password = newValues.password || user.password;
    user = await user.save();
    return user;
}