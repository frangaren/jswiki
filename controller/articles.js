'use strict';

const path = require('path');

const Article = require(path.join(__dirname, '..', 'model', 'article.js'));

exports.list = async function () {
    const articles = await Article.find().sort('topic').exec();
    return articles;
}

exports.create = async function (topic, body, categories) {
    let article = new Article();
    article.topic = topic;
    article.body = body;
    article.categories = categories;
    article = await article.save();
    return article;
}

exports.retrieve = async function (id) {
    const article = await Article.findById(id).exec();
    return article;
}

exports.update = async function (id, newValues) {
    let article = await Article.findById(id).exec();
    article.topic = newValues.topic || article.topic;
    article.body = newValues.body || article.body;
    article.categories = newValues.categories || article.categories;
    article = await article.save();
    return article;
}

exports.delete = async function (id) {
    const article = await Article.findByIdAndRemove(id).exec();
    return article;
}