'use strict';

const path = require('path');

const Category = require(path.join(__dirname, '..', 'model', 'category.js'));
const Article = require(path.join(__dirname, '..', 'model', 'article.js'));

exports.list = async function () {
    const categories = await Category.find().sort('name').exec();
    return categories;
}

exports.listChildren = async function (parent) {
    const categories = await Category.find({parent: parent}).sort('name')
        .exec();
    return categories;
}

exports.create = async function (name, parent) {
    let category = new Category();
    category.name = name;
    category.parent = (parent === 'root') ? null : parent;
    category = await category.save();
    return category;
}

exports.retrieve = async function (id) {
    const category = await Category.findById(id).exec();
    return category;
}

exports.retrieveArticles = async function (id) {
    const articles = await Article.find({categories: id}).exec();
    return articles;
}

exports.update = async function (id, newValues) {
    let category = await Category.findById(id).exec();
    category.name = newValues.name || category.name;
    if (newValues.parent !== 'root') {
        category.parent = newValues.parent || category.parent;
    } else {
        category.parent = null;
    }
    category = await category.save();
    return category;
}

exports.delete = async function (id) {
    const category = await Category.findByIdAndRemove(id).exec();
    return category;
}