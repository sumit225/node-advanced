"use strict";
const userService = require('../services/users');
const utils = require('../utils/utils');
const error = require('../constants/error')

const createUser = (req, res, next) => {
    const userdata = req.body;

    return new Promise((resolve, reject) => {
        if (!userdata.name) {
            return reject(error.NAME_REQUIRED);
        }
        if (!userdata.email) {
            return reject(error.EMAIL_REQUIRED);
        }
        if (!userdata.password) {
            return reject(error.PASSWORD_REQUIRED);
        }

        userService.createUser(userdata).then((user) => {
            resolve(user);
        }).catch((e) => {
            reject(e);
        })
    })

    
}

const getUser = async(req, res, next) => {
    const userId = req.USER_DETAIL;

    if (!userId._id) {
        return error.USER_ID_REQUIRED;
    }

    try {
        const users = await userService.getUser(userId);
        return users;
    } catch (e) {
        return e;
    }
}

const updateUser = async (req, res, next) => {
    const userId = req.USER_DETAIL;
    if (!userId._id) return error.USER_ID_REQUIRED

    const data = {};
    if (req.body.name) {
        data.name = req.body.name;
    }
    if (req.body.email) {
        data.email = req.body.email;
    }
    data._id = userId._id;

    const userData = await userService.updateUser(data);
    return userData;
}

const loginUser = async(req, res, next) => {
    const credential = req.body;
    if (!credential.email) {
        return utils.throwError(error.EMAIL_REQUIRED);
    }
    if (!credential.password) {
        return utils.throwError(error.PASSWORD_REQUIRED);
    }
    const userData = await userService.loginUser(credential);
    return userData;
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    loginUser
};