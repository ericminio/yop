const fs = require('fs');
const path = require('path');

const content = (file)=> fs.readFileSync(path.join(__dirname, '..', file)).toString()
const code = (file, name)=> (new Function(`${content(file)}; return ${name};`))()

module.exports = {
    code: code
};