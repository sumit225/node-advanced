// "use strict";

const {User} = require("../models/users");

const createUser = (userData) => {
    const user = new User(userData);
    console.log("3");
    //const registeredUser = await user.save();
    return new Promise((resolve, reject) => {
        user.save().then((data) => {
            resolve(data);
        }).catch((e) => {
            console.log(`Error is ${e}`)
            reject(e);
        })
    });
}

module.exports ={
    createUser
};
