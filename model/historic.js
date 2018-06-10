'use strict';

const mongoose = require('mongoose');

const historicSchema = mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    topic: String,
    body: String,
    date: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

historicSchema.path('article').required(true);
historicSchema.path('topic').required(true);
historicSchema.path('body').required(true);
historicSchema.path('date').default(Date.now);
historicSchema.path('author').required(true);

const Historic = mongoose.model('Historic', historicSchema);

module.exports = Historic;