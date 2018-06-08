'use strict';

const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ip: String,
    expirationDate: Date,
    accessToken: String,
    refreshToken: String
});

tokenSchema.path('user').required(true);
tokenSchema.path('ip').required(true);
tokenSchema.path('expirationDate').default(() => Date.now() + 3600000);
tokenSchema.path('accessToken').required(true).unique(true);
tokenSchema.path('refreshToken').required(true).unique(true);

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token