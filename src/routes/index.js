const {Router} = require('express');
const dbController = require('./database/db');

const db = new dbController();

const router = Router();

router
    .get('/')
    .get('/encontrados', (req, res)=>{
        if(Object.keys(req.query == 0)){
            db.readData('animaisEncontrados').then(
                (data)=>{},
                (err)=>{}
            )
        }else{
            db.readData('animaisEncontrados', req.query).then(
                (data)=>{},
                (err)=>{}
            )
        }
        
    })
    .get('/adote')
    .get('/user')
    .get('/user/registrarDesaparecimento', (req, res)=>{
        
    })
    .get('/user/acompanhamento')

export { router };

