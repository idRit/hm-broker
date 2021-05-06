const Queue = require("../queue.operation");

var assert = require('assert');

describe('Memory Queue', () => {

    let queue = new Queue();

    describe('#enqueue()', () => {
        it('should return true', function () {
            assert.strictEqual(
                queue.enqueue("something"), 
                true
            );
        });
    });

    describe('#dequeue()', () => {
        it('should return something', function () {
            assert.strictEqual(
                queue.dequeue(), 
                "something"
            );
        });
    });

    describe('#dequeue() with nothing inside', () => {
        it('should return false', function () {
            assert.strictEqual(
                queue.dequeue(), 
                false
            );
        });
    });

    describe('#setState() ', () => {
        it('should return Queue type object', function () {
            assert.strictEqual(
                queue.setState([], 0, -1), 
                queue.setState([], 0, -1)
            );
        });
    });

    describe('#getState() ', () => {
        it('should return null', function () {
            assert.strictEqual(
                queue.getState(), 
                null
            );
        });
    });

});

const { execute } = require("../strand/cmndr");

describe("Commander", () => {
    describe('#execute() ', () => {
        it('should return null', async () => {
            await assert.strictEqual(
                typeof (await execute('strand --help')), 
                "string"
            );
        });
    });
});

const sync = require('../strand/sync');

describe("Sync Operation on Strand", () => {
    describe('#write() ', () => {
        it('should return null', async () => {
            assert.strictEqual(
                typeof (await sync.write(1620072468828, "meta")), 
                "undefined"
            );
        });
    });

    describe('#peek() ', () => {
        it('should return previous timeStamp', async () => {
            assert.strictEqual(
                await sync.peek("meta"), 
                "1620072468828"
            );
        });
    });
});

