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

const getUser = async({_id}) => {
    try {
        const users = await userDao.getUser(_id);
        return users;
    } catch (e) {
        return e;
    }
}

const updateUser = async(userData) => {
    const userId = userData._id;
    delete userData._id;
    const updateUserData = await userDao.updateUser(userId, userData);
    return updateUserData;

}

const loginUser = async ({email, password}) => {
    const user = await userDao.loginUser(email);
    if (!user) return utils.throwError(error.USER_NOT_FOUND);
    const userPassword = await utils.comparePassword(password, user.password);
    if (!userPassword) return utils.throwError(error.MISMATCH_PASSWORD);
    const token = utils.generateAccessToken(user);
    const session = {
        accessToken: token,
        userId: user._id,
        isDelete: false
    };
    const sessionData = await sessionDao.createSession(session);
    user.accessToken = sessionData.accessToken;
    delete user.password;
    return user;
}

module.exports = {
    createUser,
    getUser,
    loginUser,
    updateUser
}