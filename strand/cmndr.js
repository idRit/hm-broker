const util = require('util');
const exec = util.promisify(require('child_process').exec);

const run = async (command) => {
    try {
        let {stderr, stdout} = await exec(
            `${command}`
        ); 
        console.log(stdout);
        return stdout;  
    } catch (err) {
        console.error(err);
        return null;
    };
}

exports.execute = run;