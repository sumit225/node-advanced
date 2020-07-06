"use strict";
const userDao = require('../dao/userDao');

const createUser = (userdata) => {
    console.log("2");
    return new Promise((resolve, reject) => {
        userDao.createUser(userdata)
        .then((data) => {
            resolve(data);
        }).catch((e) => {
            console.log('Error 2')
            reject(e);
        })
    });
};

module.exports = {
    createUser
}