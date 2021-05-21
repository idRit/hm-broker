const net = require("net");
const fs = require("fs");
const commander = require('./cmndr');
const sync = require('./sync').write;

module.exports = async (packet, meta, x) => {
    const client = net.createConnection({ port: 9898 }, () => {
        client.write(JSON.stringify(packet));
    });

    client.on('data', async data => {
        jsonData = JSON.parse(data.toString());
        console.log("ENQED:" + jsonData.commands.commandsLeft);
        if (jsonData.commands.commandsLeft > 0) {
            fs.appendFileSync(`${__dirname}/${meta}/cmds.sh`, jsonData.commands.command + "\n");
            sync(jsonData.timeStamp, meta);
        }
        console.log("TS:" + jsonData.timeStamp);
    });

    client.on('end', async () => {
        let commands = fs.readFileSync(__dirname + `/${meta}/cmds.sh`);
        commands = commands.toString().split("\n");
        let command = commands[commands.length - 2];
        
        if (command && x) commander.execute(command);
        else console.log("DQED: ", command);
    });
}