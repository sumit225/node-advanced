"use strict";

const mongoose = require('mongoose');
const validator = require('validator');

const BlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required'],
        index: true
    },
    blog: {
        type: String,
        required: [true, 'Blog is required'],
        minlength: [20, 'Blog should be atleast twenty characters.'],
        maxlength: [1000, 'Blog can\'t be greater than 1000 characters.'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Blog title is required.'],
        minlength: [5, 'Blog title should be atleast 5 characters.'],
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const Blog = new mongoose.model('Blog', BlogSchema);
module.exports = {Blog};