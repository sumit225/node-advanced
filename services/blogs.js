"use strict";

const blogDao = require('../dao/blogDao');

const createBlogService = async (blogData) => {
    const blog = await blogDao.createBlog(blogData);
    return blog;
}

const getBlogService = async ({userId}) => {
    const blogs = await blogDao.getBlogs(userId);
    return blogs;
}

const updateBlog = async(data, blogData) => {
    const updatedBlog = await blogDao.updateBlog(data, blogData);
    return updatedBlog;
}
module.exports = {
    createBlogService,
    getBlogService,
    updateBlog
}