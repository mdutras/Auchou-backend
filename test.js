const yup = require('yup');
const crypto = require('crypto')
const userModel = require('./src/model/userModel')
const dbController = require('./src/database/db')

// let u = crypto.randomUUID();

// let obj = {
//     id : u,
//     nome : "Genivaldo",
//     email : "aaaa@b.com",
//     telefone : "88 98888-8888"
// }

// try{
//     let err = userModel.validateSync(obj);
//     if(err){
//         console.log(err)
//     }
// }catch(err){
//     console.log(err);
//     for(let e in err){
//         console.log(`${e} : ${err[e]}`)
//     }
//     // console.log("Hello World!");
// }

// function iteration({name, age}){
//     console.log(name, age)
// }

// let ob = {
//     name:"Genivaldo",
//     age: 22,
//     nationality: "Canada"
// }

// let str = ""

const db = new dbController();
// console.log(db.addData('usuarios', obj))
db.readData('usuarios', {id:'547cf8da-0e58-4365-af43-bf6da9a1f338'})

// Object.keys(ob).forEach((key, i)=>{
//     str += `${key} = ${ob[key]}`
//     if(i + 1 < Object.keys(ob).length){
//         str += ", "
//     }
// })

// // express helmet morgan yup
// console.log(str)