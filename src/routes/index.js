const express = require('express');
const dbController = require('../database/db');
const multer = require('multer');
const upload = multer({dist : __dirname + '/public/img'})

const db = new dbController();

const router = express.Router();

router.get('/adote', (req, res) => {
	db.readData('animaisEncontrados', {paraAdocao : 'S'}).then(
        (data) => res.json(data).send(),
        (err) => console.log(err)
    )
})

router.get('/encontrados', (req, res)=>{
	db.readFullAnimalData('animaisEncontrados', {paraAdocao : 'N'}).then(
        (data) => res.json(data).send(),
			(err) => console.log(err)
	)
})

router.get('/adote', (req, res)=>{
    db.readFullAnimalData('descricoesPerdidos', req.query).then(
        (data) => res.json(data).send(),
        (err) => console.log(err)
    )
})

router.post('/user/registrarDesaparecimento', upload.array('files'), (req, res)=>{
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
    let idAnimal;
	let idRequisition = crypto.randomUUID()
	db.readData('cachorros', {
		raca,
        porte,
        corPelo,
		tamanhoPelo,
        sexo,
        estagio
	})
		.then((data)=>{
			if(data.length == 0){
				idAnimal = crypto.randomUUID();
				db.addData('cachorros', {
        			id : id.animal,
					raca,
        			porte,
	    			corPelo,
		        	tamanhoPelo,
					sexo,
        			estagio
    			})
			}else{
				id.animal = data[0].id;
			}
		})
	for(file of req.files){
		fs.rename(file.path, __dirname + '/public/img/req' + id['requisition'] + '.png');
	}        
	db.addData('descricoesPerdidos', {
        id : idRequisition,
		idRequisitante : idUsuario,
        idAnimal : id.animal,
        dataPerdido,
		horarioPerdido, 
        caracteristicasUnicas
    })
})

router.post('/user/registrarEncontrado', (req, res)=>{
	let {
        raca,
        porte,
		corPelo,
        tamanhoPelo,
        sexo,
		estagio,
        dataEncontrado,
        horarioEncontrado, 
		idOrganizacao,
	    caracteristicasUnicas,
		paraAdocao
	} = req.data
	let idEncontrado = crypto.randomUUID();
	let idAnimal;
   	db.readData('cachorros', {
		raca,
        porte,
        corPelo,
		tamanhoPelo,
        sexo,
        estagio
	})
		.then((data)=>{
			if(data.length == 0){
				idAnimal = crypto.randomUUID();
				db.addData('cachorros', {
        			id : idAnimal,
					raca,
	            	porte,
		        	corPelo,
	    	        tamanhoPelo,
        		    sexo,
    	    		estagio
				})
			}else{
				idAnimal = data[0].id;
			}
		})
	for(file of req.files){
		fs.rename(file.path, __dirname + '/public/img/enc' + idEncontrado + '.png');
	}
	db.addData('animaisEncontrados', {
		id : idEncontrado,
        idOrganizacao,
        idAnimal : idAnimal,
		dataEncontrado,
        horarioEncontrado, 
        caracteristicasUnicas,
		paraAdocao
    })
})

router.get('/user/acompanhamento', (req, res)=>{
	let {idUsuario} = req.body;
    db.readData('animaisRequisitados', {criadoEm, idUsuario}).then(
		(data) => {
            res.json(data);
            res.send();
		},
        (err) => console.error(err)
    )        
})

module.exports = router;
