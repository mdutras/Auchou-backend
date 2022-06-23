const {Router} = require('express');
const dbController = require('./database/db');

const db = new dbController();

const router = Router();

router
    .get('/')
    .get('/encontrados', (req, res)=>{
        db.readFullAnimalData('animaisEncontrados', req.query).then(
            (data)=>{return res.json(data)},
            (err)=>{console.log(err)}
        )
    })
    .get('/adote', (req, res)=>{
        db.readFullAnimalData('descricoesPerdidos', req.query).then(
            (data)=>{return res.json(data)},
            (err)=>{console.log(err)}
        )
    })
    .get('/user')
    .put('/user/registrarDesaparecimento', (req, res)=>{
        //TODO: Checar os valores que tem que ser retornados 
        let {
            raca,
            porte,
            corPelo,
            tamanhoPelo,
            sexo,
            estagio,
            dataPerdido,
            horarioPerdido, 
            idUsuario,
            caracteristicasUnicas
        } = req.data
        id = {
            animal : crypto.randomUUID(),
            requisition : crypto.randomUUID()
        }
        db.addData('cachorros', {
            id : id.animal,
            raca,
            porte,
            corPelo,
            tamanhoPelo,
            sexo,
            estagio
        })

        db.addData('descricoesPerdidos', {
            id : id.requisition,
            idRequisitante : idUsuario,
            idAnimal : id.animal,
            dataPerdido,
            horarioPerdido, 
            caracteristicasUnicas
        })

    })
    .get('/user/acompanhamento', (req, res)=>{
        let {criadoEm, id} = req.body;
        //TODO: Colocar os campos a serem retornados
        db.readData('animaisRequisitados', {criadoEm, idUsuario}).then(
            (data) => {
                res.json(data);
                res.send();
            },
            (err) => console.error(err)
        )
        
    })

export { router };

