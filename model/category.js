'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

categorySchema.path('name').required(true).unique(true);
categorySchema.path('parent').required(false);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;