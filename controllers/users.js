"use strict";
const userService = require('../services/users');

const createUser = (req, res, next) => {
    const userdata = req.body;

    if (!userdata.name) {
        return res.status(400).send('Name required!');
    }
    if (!userdata.email) {
        return res.status(400).send('Email required!');
    }
    if (!userdata.password) {
        return res.status(400).send('Password required!');
    }

    return new Promise((resolve, reject) => {
        console.log("1");
        userService.createUser(userdata).then((user) => {
            resolve(user);
        }).catch((e) => {
            reject(e);
        })
    })

    
}

const getUser = (req, res, next) => {

}

const updateUser = (req, res, next) => {

}

module.exports = {
    createUser,
    getUser,
    updateUser
};