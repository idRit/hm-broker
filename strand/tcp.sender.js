const net = require("net");
const sync = require('./sync').write;

module.exports = async (packet, meta) => {
    const client = net.createConnection({ port: 9898 }, () => {
        client.write(JSON.stringify(packet));
    });

    client.on('data', async data => {
        let jsonData = JSON.parse(data.toString());
        sync(jsonData.timeStamp, meta);
        console.log("TS:" + jsonData.timeStamp);
    });

    client.on('end', async () => {});
}