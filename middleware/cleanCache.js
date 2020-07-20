
module.exports = async (req, res, next) => {
    await next();
    clearHash(req.USER_DETAIL._id)
}