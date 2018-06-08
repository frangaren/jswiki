'use strict';

const path = require('path');
const crypto = require('crypto');

const User = require(path.join(__dirname, '..', 'model', 'user.js'));
const Token = require(path.join(__dirname, '..', 'model', 'token.js'));

exports.issue = async function (id, ip) {
    let entry = await Token.findOne({ user: id, ip: ip }).exec();
    if (!entry) {
        entry = new Token();
        entry.user = id;
        entry.ip = ip;
    }
    const accessToken = await _generateAccessToken();
    const refreshToken = await _generateRefreshToken();
    entry.accessToken = accessToken;
    entry.refreshToken = refreshToken;
    entry.expirationDate = Date.now() + 36000000;
    entry = await entry.save();
    return {
        _id: entry.user,
        access_token: accessToken,
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: refreshToken
    };
}

async function _generateRefreshToken() {
    let found = true;
    let token = "";
    do {
        token = await _generateToken(128);
        let entry = await Token.findOne({ refreshToken: token }).exec();
        if (entry && entry.expirationDate > Date.now()) {
            found = false;
            entry.remove();
        } else if (!entry) {
            found = false;
        }
    } while (found);
    return token;
}

async function _generateAccessToken() {
    let found = true;
    let token = "";
    do {
        token = await _generateToken(128);
        let entry = await Token.findOne({ accessToken: token }).exec();
        if (entry && entry.expirationDate > Date.now()) {
            found = false;
            entry.remove();
        } else if (!entry) {
            found = false;
        }
    } while (found);
    return token;
}

async function _generateToken(size) {
    const tokenBytes = await crypto.randomBytes(size);
    const token = tokenBytes.toString('base64');
    return token;
}

exports.authenticate = async function (username, password) {
    if (!username || !password) {
        return {
            valid: false
        };
    }
    const user = await User.findOne({ username: username })
        .select('+password').exec();
    if (user == null) {
        return {
            valid: false
        };
    }
    const result = password == user.password;
    if (result) {
        return {
            valid: true,
            _id: user._id
        };
    } else {
        return {
            valid: false
        };
    }
}

exports.refresh = async function (refreshToken, ip) {
    if (!refreshToken) {
        return {
            valid: false
        };
    }
    const entry = await Token.findOne({ refreshToken: refreshToken })
        .exec();
    if (entry != null && entry.expirationDate < Date.now()) {
        entry.remove();
        return {
            valid: false
        };
    }
    if (entry == null || entry.ip !== ip) {
        return {
            valid: false
        };
    }
    return {
        valid: true,
        _id: entry.user
    };
}

exports.check = async function (accessToken, ip) {
    const entry = await Token.findOne({ accessToken: accessToken })
        .exec();
    if (entry != null && entry.expirationDate < Date.now()) {
        entry.remove();
        return {
            valid: false
        };
    }
    if (entry == null || entry.ip !== ip) {
        return {
            valid: false
        };
    }
    return {
        valid: true,
        _id: entry.user
    };
}