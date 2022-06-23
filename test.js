// const express = require('express');
// const dbController = require('./src/database/db');
// const crypto = require('crypto');

// const db = new dbController();

// const app = express();

// db.readFullAnimalData('animaisEncontrados').then(
//     (data)=>console.log(data),
//     (err)=>console.log(err)
// )

let obj = {
    nome : "Genivaldo",
    idade : 22
}

let {nome, idade} = obj;

let obj1 = {nome};
let obj2 = {idade};

console.log(obj1, obj2)