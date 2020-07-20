"use strict";

const {createBlogService, getBlogService, updateBlogService} = require('../services/blogs');
const utils = require('../utils/utils');
const errorConstants = require('../constants/error');

const createBlog = async(req, res) => {
    const data = {};
    const userId = req.USER_DETAIL;

    if (!userId._id) return errorConstants.USER_ID_REQUIRED
    if (!req.body.blog) return errorConstants.BLOG_REQUIRED
    if (!req.body.title) return errorConstants.BLOG_TITLE_REQUIRED

    data.userId = userId._id;
    data.blog = req.body.blog.trim();
    data.title = req.body.title.trim();
    const blogData = await createBlogService(data);
    return blogData;
}

const getBlog = async(req, res, next) => {
    const data = {};
    const userId = req.USER_DETAIL;

    if (!userId._id) return errorConstants.USER_ID_REQUIRED

    data.userId = userId._id;
    const blogData = await getBlogService(data);
    return blogData;
}

const updateBlog = async(req, res, next) => {
    const data = {};
    const DATA = {};
    const userId = req.USER_DETAIL;

    if (!userId._id) return errorConstants.USER_ID_REQUIRED
    if (!req.body.blogId) return errorConstants.BLOG_ID_REQUIRED

    if (req.body.blog) {
        DATA.blog = req.body.blog.trim();
    }
    data._id = req.body.blogId;
    data.userId = userId._id;
    const blogData = await updateBlogService(data, DATA);
    return blogData;
}

module.exports = {
    createBlog,
    getBlog,
    updateBlog
}