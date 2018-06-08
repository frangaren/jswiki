'use strict';

const path = require('path');

const Category = require(path.join(__dirname, '..', 'model', 'category.js'));

exports.list = async function () {
    const categorys = await Category.find().sort('name').exec();
    return categorys;
}

exports.create = async function (name, parent) {
    let category = new Category();
    category.name = name;
    category.parent = parent;
    category = await category.save();
    return category;
}

exports.retrieve = async function (id) {
    const category = await Category.findById(id).exec();
    return category;
}

exports.update = async function (id, newValues) {
    let category = await Category.findById(id).exec();
    category.name = newValues.name || category.name;
    category.parent = newValues.parent || category.parent;
    category = await category.save();
    return category;
}

exports.delete = async function (id) {
    const category = await Category.findByIdAndRemove(id).exec();
    return category;
}