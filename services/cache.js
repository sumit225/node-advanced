"use strict";

const mongoose = require('mongoose');
const redis = require('redis');
const redisUrl = process.env.REDIS_URI;
const client = redis.createClient(redisUrl);
const util = require('util');
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }
    let key = Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    });
    key = JSON.stringify(key)
    console.log("key: ",key);

    const cachedValue = await client.hget(this.hashKey, key);

    if (cachedValue) {
        //const doc = new this.model(JSON.parse(cachedValue));
        const doc = JSON.parse(cachedValue);
        return Array.isArray(doc) 
            ? doc.map(d => new this.model(d))
            : new this.model(doc) 
    }

    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
    return result;
};

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
};