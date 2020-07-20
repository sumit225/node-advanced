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
        const user = await User.findOne({_id: id}, {password: 0}, {lean: true});
        return user;
    } catch (e) {
        return e;
    }
}

const loginUser = async(email) => {
    try {
        const userData = await User.findOne({email: email}, {}, {lean: true});
        return userData;
    } catch (e) {
        return e;
    }
}

const updateUser = async(_id, data) => {
    const userData = User.findOneAndUpdate({_id}, {$set: data}, {runValidators: true,new: true});
    return userData;
}

module.exports = { 
    createUser,
    getUser,
    loginUser,
    updateUser
};
