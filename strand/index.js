#!/usr/bin/env node

const peek = require("./sync").peek;
const send = require("./tcp.sender");
const deqcmd = require('./tcp.listener');

const argv = require('yargs')
    .command('adjure', 'Send Commands.', () => { }, async (argv) => {
        const meta = argv.meta ? argv.meta : "meta";
        const natural = argv.nl;
        const config = require(`./${meta}/config.json`);

        let peekData = await peek(meta);

        if (peekData == "") {
            console.log("Broker has not recognised this client yet!");
            return;
        } 

        let packet = {
            scene: 0,
            sync: {
                src: config.src,
                key: config.key
            },
            command: argv.cmd
        };

        if (natural) packet.nl = true;

        await send(packet, meta);
    })
    .command('heed', 'Listen for Incomming Commands.', () => { }, async argv => {
        const meta = argv.meta ? argv.meta : "meta";
        const config = require(`./${meta}/config.json`);
        
        let packet = {
            scene: 1,
            sync: {
                src: config.src
            }
        };

        await deqcmd(packet, meta);
    })
    .command('recog', 'Synchronise with Broker.', () => { }, async argv => {
        const meta = argv.meta ? argv.meta : "meta";
        const config = require(`./${meta}/config.json`);
        
        let packet = {
            sync: {
                src: config.src,
                key: config.key,
                dst: config.dst
            }
        };

        await send(packet, meta);
    })
    .argv;