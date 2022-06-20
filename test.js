const yup = require('yup');
const crypto = require('crypto')
const {userModel} = require('./src/model/userModel')
const dbController = require('./src/database/db')

let u = crypto.randomUUID();

let obj = {
    id : u,
    name : "Genivaldo",
    email : "aaaa@b.com",
    telefone : "88 98888-8888"
}

// console.log(Object.keys(ob))

// if( Object.keys(ob).length !== 0){
//     console.log("Hello World!")
// }

try{
    let err = userModel.validateSync(obj);
    if(err){
        console.log(err)
    }
}catch(e){
    console.log(e);
}

function iteration(val, i, comp){
    console.log(`${i} : ${val}`)
}

const db = new dbController();

// express helmet morgan yup
