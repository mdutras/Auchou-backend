const fs = require('fs');

let arr = Object.values(fs.readFileSync( __dirname + '/images.jpeg'));

console.log(Object.values(arr));
//arr = Object.values(arr);

let buf = Buffer.from(arr);
console.log(buf);

let err = fs.writeFileSync(__dirname + '/images2.jpeg', buf);

console.log(err);
