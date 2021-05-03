const fs = require("fs");

exports.write = async (timestamp, meta) => {
    fs.writeFileSync(`${__dirname}/${meta}/sync.txt`, JSON.stringify(timestamp), { encoding: 'utf8', flag: 'w' })
}

exports.peek = async (meta) => {
    let timeStamp = fs.readFileSync(`${__dirname}/${meta}/sync.txt`);
    timeStamp = timeStamp.toString();
    return timeStamp;
}