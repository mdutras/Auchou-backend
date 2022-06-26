const fs = require('fs');

function imgToStr(imgPath){
	let arr = Object.values(fs.readFileSync( __dirname + '/images.jpeg'));
	fs.unlinkSync(imgPath);
	return arr.toString();
}

function strToImg(arr, id){
	let buf = Buffer.from(arr);
	let path = __dirname + '/public/img/img' + id + '.png'
	fs.writeFileSync(path, buf);
	return path;
}

module.export = {imgtoStr, strToImg}
