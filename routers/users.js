const express= require('express');
const {createUser, getUser, updateUser } = require('../controllers/users');
const router = new express.Router();

router.post('/users', (req, res, next) => {
    //res.send('Fro a new file');

    createUser(req, res, next)
    .then((data)=> {
        return res.status(200).send(data);
    }).catch(e => {
        return res.status(400).send(e.message);
    });
})

router.get('/users',async  (req, res, next) => {
    //res.send('Fro a new file');
    try {
        const user = await getUser(req, res, next);
        return res.status(200).send(user);
    }
    catch(e) {
        return res.status(400).send(e.message);
    };
})

module.exports = router;