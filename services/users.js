"use strict";
const userDao = require('../dao/userDao');
const sessionDao = require('../dao/sessionDao')
const utils = require('../utils/utils');
const error = require('../constants/error');

const createUser = async(userdata) => {
    let userData;
    return new Promise((resolve, reject) => {
        utils.encryptedPassword(userdata.password)
        .then((password) => {
            userdata.password = password;
            return userDao.createUser(userdata);
        })
        .then((data) => {
            // create user accesstoken and store it in session
            userData = data;
            const token = utils.generateAccessToken(data);
            const session = {
                accessToken: token,
                userId: data._id,
                isDelete: false
            };
            return sessionDao.createSession(session);
        })
        .then(data => {
            userData.accessToken = data.accessToken;
            delete data.password;
            resolve(data);
        })
        .catch(e => {
            reject(e);
        });
    });
};

const getUser = async({id}) => {
    try {
        const users = await userDao.getUser(id);
        return users;
    } catch (e) {
        return e;
    }
}

const loginUser = async ({email, password}) => {
    const user = await userDao.loginUser(email);

    if (!user) throw new Error (error.USER_NOT_FOUND);
    // compare password
    const userPassword = await utils.comparePassword(password, user.password);
    if (!userPassword) throw new Error (error.MISMATCH_PASSWORD);
    // if (!user) return await utils.throwError('User not found.')
    return user;
}

module.exports = {
    createUser,
    getUser,
    loginUser
}