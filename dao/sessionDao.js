"use strict";
const {Session} = require('../models/sessions')

const createSession = (data) => {
    return new Promise((resolve, reject) => {
        const session = new Session(data);
        session.save()
        .then(data => {
            resolve(data);
        })
        .catch(e => {
            reject(e);
        })
    })
}

module.exports = {
    createSession
}