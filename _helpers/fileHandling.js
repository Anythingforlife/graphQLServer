const fs = require('fs');

module.exports = fileHandling = {
    readSync,
    writeSync,
};

function readSync(path) {
    return JSON.parse(fs.readFileSync(path));
}

function writeSync(path, data) {
    fs.writeFileSync(path, JSON.stringify(data));
}
