const loki = require('lokijs');
const fs = require('fs');
const { Worker } = require('worker_threads');

const db = new loki("memdb");
const set = db.addCollection('set', { indices: ['key'] });

module.exports = async (syncObject) => {
    if (!inSet(syncObject.key, syncObject.src)) {
        pushToDb(syncObject);
        await linkup(syncObject);
        new Worker(__dirname + '/workers/train.worker.js');

        return (+ new Date());
    }

    return (+ new Date());
}

const pushToDb = (obj) => {
    set.insert(obj);
}

const inSet = (key, src) => {
    let result = set.where(obj => obj.key === key && obj.src === src)[0];
    if (typeof result === "undefined") return false;
    return true;
}

const linkup = async (obj) => {
    let str = `\n${obj.src}, ${obj.key}, ${obj.dst}`;
    fs.appendFileSync(__dirname + '/box/set.csv', str);
}