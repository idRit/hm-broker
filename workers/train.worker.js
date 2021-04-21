const { trainDataSet } = require('../neural.switch');
const { parentPort } = require('worker_threads');

trainDataSet()
    .then(result => {
        parentPort.postMessage(true);
    })
    .catch(err => {
        parentPort.postMessage(false);
    });