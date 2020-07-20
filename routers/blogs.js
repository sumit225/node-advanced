"use strict";
const express = require('express');
const router = new express.Router();
const errorConstant = require('../constants/error');
const success = require('../constants/success');
const auth = require('../middleware/auth');
const {createBlog, getBlog, updateBlog} = require('../controllers/blogs');
const constant = require('../constants/constant');
const cleanCache = require('../middleware/cleanCache')

router.post('/blogs', auth, cleanCache, async(req, res) => {
    const callback = (data) => {
        if (data && data.status === constant.ERROR) return res.status(data.code).send(data)
        if (data && data.status === constant.SUCCESS) return res.status(data.code).send(data)
        return res.status(500).send(errorConstant.INTERAL_SERVER_ERROR);
    }
    try {
        const blogs = await createBlog(req, res);
        callback(success.create(blogs));
    } catch (e) {
        console.log("error  : ", e)
        callback(e.message)
    }
})

router.get('/blogs', auth, async(req, res, next) => {
    const callback = (data) => {
        if (data && data.status === constant.ERROR) return res.status(data.code).send(data)
        if (data && data.status === constant.SUCCESS) return res.status(data.code).send(data)
        return res.status(500).send(errorConstant.INTERAL_SERVER_ERROR);
    }
    try {
        const blogs = await getBlog(req, res, next);
        return callback(success.create(blogs));
    } catch (e) {
        console.log(e)
        return callback(e.message)
    }
})

router.put('/blogs', auth, async(req, res, next) => {
    const callback = (data) => {
        if (data && data.status === constant.ERROR) return res.status(data.code).send(data)
        if (data && data.status === constant.SUCCESS) return res.status(data.code).send(data)
        return res.status(500).send(errorConstant.INTERAL_SERVER_ERROR);
    }
    try {
        const blogs = await updateBlog(req, res, next);
        return callback(success.create(blogs));
    } catch (e) {
        let error; 
        if (e.errors) {
            error = Object.keys(e.errors);
        }
        if (error && error.length > 0) {
            const errorProperties = e.errors[error[0]].properties;
            errorConstant.GENERIC_ERROR.message = errorProperties.message;
            return callback(errorConstant.GENERIC_ERROR)
        }
        if (e.code && e.code === 11000) {
            const message = e.message.split('"');
            errorConstant.GENERIC_ERROR.message = `${message[1]} exists`;
            return callback(errorConstant.GENERIC_ERROR);
        }
        return callback(e.message)
    }
})

module.exports = router;
