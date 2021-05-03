const net = require("net");

const server = net.createServer();

server.on('connection', async socket => {
    let dataHandler = await require('./data.handler')(socket);
    socket.on('data', dataHandler);

    socket.on('close', () => {
        socket.end();
    });
});

server.on('close', err => {
    console.log('Close command executed. Exiting now...');
    process.exit();
});

server.on('error', err => {
    console.log(err);
});

server.listen(9898, () => {
    console.log('opened server on', server.address().port);
});