"use strict";

const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Name is required'], 
        minlength: [3, 'Name should be atleast three characters.'],
        maxlength: [50, 'Name can\'t be greater than 50 characters'], 
        trim: true
    },
    email: {
        type: String, 
        required:true, 
        index:true, 
        unique:true, 
        trim:true, 
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String, 
        required: true, 
        minlength: 6,
        validate: {
            validator: validator.isJWT,
            message: '{VALUE} is not properly encrypted.'
        }
    }
});

const User = new mongoose.model('User', UserSchema);
module.exports = {User};