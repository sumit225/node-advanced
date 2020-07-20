"use strict";

const {Blog} = require('../models/blogs');

const createBlog = async(blogData) => {
    const newblog = new Blog(blogData);
    const blogs = await newblog.save();
    return blogs;
}

const getBlogs = async(userId) => {
    const blogs = await Blog.find({userId}, {}, {lean: true});
    return blogs;
}

const updateBlog = async({_id, userId}, blogData) => {
    const blog = await Blog.findOneAndUpdate({_id, userId}, {$set: blogData}, {runValidators: true,new: true})
    return blog;
} 

module.exports = {
    createBlog,
    getBlogs,
    updateBlog
}