const fs = require('fs');
const path = require('path');

function getVersion() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '/../../package.json'), 'utf8')).version;
}

module.exports = {
  version: getVersion(),
};
