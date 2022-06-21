const express = require('express');
const dbController = require('./src/database/db');

const app = express();

app.get('/', (req, res)=>{
    console.log(req.query);
    if(Object.keys(req.query).length == 0){
        console.log("Está vazio :D");
    }
    res
        .type('text/plain');
    res.send('Hello World!');
})

app.listen(3300, ()=>{console.log("Servidor aberto na porta 3300...")});