// "use strict";

const {User} = require("../models/users");

const createUser = (userData) => {
    const user = new User(userData);
    return new Promise((resolve, reject) => {
        user.save().then((data) => {
            resolve(data);
        }).catch((e) => {
            reject(e);
        })
    });
}


const getUser = async(id) => {
    try {
        const user = await User.find({});
        return user;
    } catch (e) {
        return e;
    }
}

const loginUser = async(email) => {
    try {
        const userData = await User.findOne({email: email});
        return userData;
    } catch (e) {
        return e;
    }
}

module.exports = { 
    createUser,
    getUser,
    loginUser
};
