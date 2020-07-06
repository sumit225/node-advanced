"use strict";
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    email: {
        type: String, required:true, index:true, unique:true, trim:true, lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {type: String, required: true, minlength: 6}
});

const User = new mongoose.model('User', UserSchema);
module.exports = {User};