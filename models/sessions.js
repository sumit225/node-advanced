"use strinct";
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, ref:'User', required: true, index: true},
    accessToken: {type: String, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, default: new Date()},
    expiredTime: {type: Date, required:true}
});

const Session = new mongoose.model('Session', sessionSchema);
module.exports = {Session};