const express= require('express');
const {createUser, getUser, updateUser, loginUser } = require('../controllers/users');
const router = new express.Router();
const errorConstant = require('../constants/error');
const success = require('../constants/success');
const constant = require('../constants/constant');
const auth  = require('../middleware/auth');
const utils = require('../utils/utils');


router.post('/users', (req, res, next) => {
    const callback = (data) => {
        if (data && data.status === constant.ERROR) return res.status(data.code).send(data)
        if (data && data.status === constant.SUCCESS) return res.status(data.code).send(data)
        return res.status(500).send(error.INTERAL_SERVER_ERROR);
    }

    createUser(req, res, next)
    .then((data)=> {
        return callback(success.create(data));
    })
    .catch(e => {
        if (e.code && e.code === 11000) {
            const message = e.message.split('"');
            errorConstant.GENERIC_ERROR.message = `${message[1]} exists`;
            return callback(errorConstant.GENERIC_ERROR);

        }
        return callback(e.message);
    });
})

router.get('/users', auth, async(req, res, next) => {
    try {
        const user = await getUser(req, res, next);
        return res.status(200).send(user);
    } catch(e) {
        return res.status(400).send(e.message);
    };
})

router.post('/login', async(req, res, next) => {
    const callback = (data) => {
        if (data && data.status === constant.ERROR) return res.status(data.code).send(data)
        if (data && data.status === constant.SUCCESS) return res.status(data.code).send(data)
        return res.status(500).send(error.INTERAL_SERVER_ERROR);
    }
    
    try {
        const userData = await loginUser(req, res, next);
        return callback(success.create(userData));
    } catch (e) {
        try {
            e.message = JSON.parse(e.message);
        } catch (e) {
            return callback(e.message);
        }
        
    }
})

router.put('/users', auth, async (req, res, next) => {
    const callback = (data) => {
        if (data && data.status === constant.ERROR) return res.status(data.code).send(data)
        if (data && data.status === constant.SUCCESS) return res.status(data.code).send(data)
        return res.status(500).send(errorConstant.INTERAL_SERVER_ERROR);
    }
    try {
        const user = await updateUser(req, res, next);
        return callback(success.create(user));
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