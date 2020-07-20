"use strict";

const sessionDao = require('../dao/sessionDao');
const userDao = require('../dao/userDao')

module.exports = async (req, res, next) => {
    let authentication = req.headers.authorization;
    authentication = authentication.split("Bearer")[1];
    if (!authentication) return res.status(400).send('Authentication required!') 
    try {
        const userSession = await sessionDao.getSession(authentication.trim());
        
        const userDetails = await userDao.getUser(userSession.userId);
        req.USER_DETAIL = userDetails;
        return next();
    } catch(e) {
        console.log(e)
        return res.status(401).send('Authentication is not valid.')
    }
}