const {Router} = require('express');
const dbController = require('./database/db');
const multer = require('multer');
const upload = multer({dist : __dirname + '/public/img'})

const db = new dbController();

const router = Router();

router
    .get('/')
	.get('/adote', (req, res)=>{
        db.readFullAnimalData('animaisEncontrados', {paraAdocao : 'Y'}).then(
            (data)=>{return res.json(data)},
            (err)=>{console.log(err)}
        )
    })

    .get('/encontrados', (req, res)=>{
        db.readFullAnimalData('animaisEncontrados', {paraAdocao : 'N'}).then(
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
    .post('/user/registrarDesaparecimento', upload.array('files'), (req, res)=>{
		let imgs = []
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
            animal : "",
            requisition : crypto.randomUUID()
        }
		db.readData('cachorros', {
            id : id.animal,
            raca,
            porte,
            corPelo,
            tamanhoPelo,
            sexo,
            estagio
        })
			.then((data)=>{
				if(data.length == 0){
					id.animal = crypto.randomUUID();
				}else{
					id.animal = data[0].id;
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
			})

		for(file of req.files){
			fs.rename(file.path, __dirname + '/public/img/req' + id['requisition'] + '.png');
		}
        
        db.addData('descricoesPerdidos', {
            id : id.requisition,
            idRequisitante : idUsuario,
            idAnimal : id.animal,
            dataPerdido,
            horarioPerdido, 
            caracteristicasUnicas
        })

    })
	.post('/user/registrarEncontrado', (req, res)=>{
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
            			id : id.animal,
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
		db.addData('descricoesPerdidos', {
            id : idEncontrado,
            idOrganizacao,
            idAnimal : idAnimal,
            dataEncontrado,
            horarioEncontrado, 
            caracteristicasUnicas,
			paraAdocao
        })

	})
    .get('/user/acompanhamento', (req, res)=>{
        let {idUsuario} = req.body;
        db.readData('animaisRequisitados', {criadoEm, idUsuario}).then(
            (data) => {
                res.json(data);
                res.send();
            },
            (err) => console.error(err)
        )
        
    })

export { router };

