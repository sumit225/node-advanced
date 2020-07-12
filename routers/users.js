const express= require('express');
const {createUser, getUser, updateUser, loginUser } = require('../controllers/users');
const router = new express.Router();
const error = require('../constants/error');
const success = require('../constants/success');
const constant = require('../constants/constant');


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
            const errorMessage = `${message[1]} exists`;
            return callback({status: 'error', code: 400, message: errorMessage});

        }
        return callback(e.message);
    });
})

router.get('/users', async(req, res, next) => {
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
        console.log(userData)
        return callback(success.create(userData));
    } catch (e) {
        e.message = JSON.parse(e.message);
        return callback(e.message);
    }
})

module.exports = router;