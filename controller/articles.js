'use strict';

const path = require('path');

const Article = require(path.join(__dirname, '..', 'model', 'article.js'));
const Historic = require(path.join(__dirname, '..', 'model', 'historic.js'));
const User = require(path.join(__dirname, '..', 'model', 'user.js'));

exports.list = async function () {
    const articles = await Article.find().sort('topic').exec();
    return articles;
}

exports.history = async function (article) {
    const history = await Historic.find({article: article}).sort({'date': -1}).exec();
    return history;
}

exports.create = async function (topic, body, categories, author) {
    let article = new Article();
    article.topic = topic;
    article.body = body;
    article.categories = categories;
    article = await article.save();
    let historic = new Historic();
    historic.article = article._id;
    historic.topic = article.topic;
    historic.body = article.body;
    historic.author = author;
    await historic.save();
    return article;
}

exports.retrieve = async function (id) {
    const article = await Article.findById(id).exec();
    return article;
}

exports.update = async function (id, newValues, author) {
    let article = await Article.findById(id).exec();
    article.topic = newValues.topic || article.topic;
    article.body = newValues.body || article.body;
    article.categories = newValues.categories || article.categories;
    article = await article.save();
    if (newValues.topic || newValues.body) {
        let historic = new Historic();
        historic.article = article._id;
        historic.topic = article.topic;
        historic.body = article.body;
        historic.author = author;
        await historic.save();
    }
    return article;
}

exports.delete = async function (id) {
    const article = await Article.findByIdAndRemove(id).exec();
    await Historic.find({article: id}).remove().exec();
    const users = await User.find({favorites: id});
    for (let user of users) {
        user.favorites = user.favorites.filter(favorite => favorite != id);
        user.save();
    }
    return article;
}

exports.exists = async function (id) {
    try {
        const article = await Article.findById(id).exec();
        return article !== null;
    } catch {
        return false;
    }
}