'use strict';

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    topic: String,
    body: String,
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
});

articleSchema.path('topic').required(true);
articleSchema.path('body').required(true);
articleSchema.path('categories').required(true);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;