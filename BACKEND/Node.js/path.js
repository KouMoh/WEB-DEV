const path = require('path')

console.log(path.sep);

const filePath = path.join('/content', 'subfolder', 'test.txt')

console.log("The relative path is: "+filePath);

const base = path.basename(filePath)
console.log("The base path is: "+base);

const absolute = path.resolve(__dirname, '/content', 'subfolder', 'test.txt')

console.log("The absolute path is: "+absolute);