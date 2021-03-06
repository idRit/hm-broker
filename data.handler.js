const loki = require('lokijs');

const syncOperation = require('./sync.operation');
const memoryQueue = require('./queue.operation');
const { route } = require('./neural.switch');
const interpreter = require('./gpt.interpreter');

let skt, timeStamp;

const db = new loki('memdb');
const queueSet = db.addCollection('queue', { indices: ['dst'] });

module.exports = async (socket) => {
    skt = socket;
    return callback;
}

const callback = async (data) => {
    let packet = JSON.parse(data.toString());
    return await handler(packet);
}

const handler = async (packet) => {
    switch (packet.scene) {
        case 0:
            const dst = await getDst(packet.sync);
            const memQueue = getQueue(dst);

            if (packet.nl)
                packet.command = await interpreter(packet.command);

            memQueue.enqueue(packet.command);
            setQueue({
                dst,
                q: memQueue.getState(),
                h: memQueue.head,
                t: memQueue.tail
            });

            timeStamp = await syncOperation(packet.sync);

            skt.write(JSON.stringify({ timeStamp }));
            skt.end();

            break;

        case 1:
            const commands = getCommands(packet.sync.src);

            timeStamp = await syncOperation(packet.sync, packet.bypass);

            skt.write(JSON.stringify({ timeStamp, commands }));
            skt.end();

            break;

        default:
            timeStamp = await syncOperation(packet.sync);
            console.log(timeStamp);

            skt.write(JSON.stringify({ timeStamp }));
            skt.end();

            break;
    }
}

const getDst = async (config) => {
    const dst = await route(config);
    return dst;
}

const getQueue = (dst) => {
    let result = queueSet.where(obj => obj.dst === dst)[0]
    if (typeof result === "undefined") return new memoryQueue();
    return new memoryQueue().setState(result.q, result.t, result.h);
}

const getCommands = (src, multi = false) => {
    let result = queueSet.where(obj => obj.dst === src)[0];
    let memQueue = new memoryQueue().setState(result.q, result.t, result.h);

    if (multi) {
        let commands = [], el = null;
        do {
            el = memQueue.dequeue();
            commands.push(el)
        } while (el);

        setQueue({
            dst: src,
            q: memQueue.getState(),
            h: memQueue.head,
            t: memQueue.tail
        });

        return commands;
    }

    let command = memQueue.dequeue();

    setQueue({
        dst: src,
        q: memQueue.getState(),
        h: memQueue.head,
        t: memQueue.tail
    });

    return {
        command,
        commandsLeft: memQueue.getState() ? (memQueue.head - memQueue.tail) + 1 : 0,
    };
}

const setQueue = (obj) => {
    try {
        queueSet.update(obj);
    } catch (error) {
        queueSet.insert(obj);
    }
}