"use strict";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encryptedPassword = password => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 8).then(function(hash) {
            resolve(hash);
        });
    })
}

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash).then(result => {
            resolve(result);
        })
    })
}

const throwError = (error) => {
    throw new Error(JSON.stringify(error));
}

const generateAccessToken = ({email}) => {
    const payload = { user: email };
    const options = { issuer: 'https://nodestarterkit.io' };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, options);
    console.log(`Token is: ${token}`)
    return token;

}

module.exports = {
    encryptedPassword,
    comparePassword,
    throwError,
    generateAccessToken
}