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

exports.listFavorites = async function (id) {
    const user = await User.findById(id).populate('favorites').exec();
    return user.favorites;
}

exports.containsFavorite = async function (id, article) {
    let user = await User.findById(id).exec();
    return {
        'is-favorite': user.favorites.indexOf(article) !== -1
    };
}

exports.addFavorite = async function (id, article) {
    let user = await User.findById(id).exec();
    user.favorites.push(article);
    user = await user.save();
    return user;
}

exports.deleteFavorite = async function (id, article) {
    let user = await User.findById(id).exec();
    user.favorites = user.favorites.filter(it => it._id != article);
    user = await user.save();
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

exports.delete = async function (id) {
    const user = await User.findByIdAndRemove(id).exec();
    await Historic.find({ author: id }).remove().exec();
    return user;
}

exports.exists = async function (id) {
    try {
        const user = await User.findById(id).exec();
        return user !== null;
    } catch {
        return false;
    } 
}