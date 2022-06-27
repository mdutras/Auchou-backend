const sqlite3 = require('sqlite3');
const animalModel = require('../model/animalModel');
const foundModel = require('../model/foundModel');
const orgModel = require('../model/orgModel');
const descriptonModel = require('../model/descriptionModel');
const userModel = require('../model/userModel');

class databaseController{
    constructor(){
        this.db = new sqlite3.Database('./src/database/database.db', (err)=>{
            if(err){
                console.log("Falha na conexão com o banco de dados!");
            }else{
                console.log("Conexão com banco de dados estabelecida com sucesso!");
            }
        })
        this.createTables()
    }

    createTables(){
        let querys = [
            `CREATE TABLE IF NOT EXISTS cachorros (
                id VARCHAR(50) PRIMARY KEY NOT NULL,
                raca TEXT NOT NULL,
                porte CHAR(25) NOT NULL,
                corPelo CHAR(25) NOT NULL,
                tamanhoPelo CHAR(25) NOT NULL, 
                sexo CHAR(2) NOT NULL,
                estagio CHAR(25) NOT NULL)`,
            `CREATE TABLE IF NOT EXISTS usuarios (
                id VARCHAR(50) PRIMARY KEY NOT NULL,
                nome TEXT NOT NULL,
                senha TEXT NOT NULL,
                telefone VARCHAR(15) NOT NULL)`,
            `CREATE TABLE IF NOT EXISTS organizacoes (
                id VARCHAR(50) PRIMARY KEY NOT NULL,
                nome TEXT NOT NULL,
                endereco TEXT NOT NULL,
                telefone VARCHAR(15))`,
            `CREATE TABLE IF NOT EXISTS descricoesPerdidos (
                id VARCHAR(50) PRIMARY KEY NOT NULL,
                horarioPerdido VARCHAR(9) NOT NULL,
                dataPerdido VARCHAR(11) NOT NULL,
                caracteristicasUnicas TEXT,
                idAnimal VARCHAR(30) NOT NULL,
                idRequisitante VARCHAR(30) NOT NULL,
                criadoEm VARCHAR(20) NOT NULL)`,
            `CREATE TABLE IF NOT EXISTS animaisEncontrados (
                id VARCHAR(50) PRIMARY KEY NOT NULL,
                horarioEncontrado VARCHAR(9) NOT NULL,
                dataEncontrado VARCHAR(11) NOT NULL,
                caracteristicasUnicas TEXT,
                idAnimal VARCHAR(30) NOT NULL,
                idOrganizacao VARCHAR(30) NOT NULL,
				paraAdocao VARCHAR(2) NOT NULL)`
        ]
        querys.forEach(val => {
            this.db.run(val, (err)=>{
                if(err){
                    console.log(`Ocorreu erro na query ${val}`)
                    console.log(err)
                }
            });
        });
    }

    modelValidation(database, values){
        let db, err = null;
        switch(database){
            case 'cachorros':
                db = animalModel;
                break;

            case 'usuarios':
                db = userModel;
                break;

            case 'organizacoes':
                db = orgModel;
                break;

            case 'descricoesPerdidos':
                db = descriptonModel;
                break;

            case 'animaisEncontrados':
                db = foundModel;
                break;
            
            default:
                console.log('default')
                err = new Error("Banco de dados solicitado não encontrado.")
                break;
        }
        try{
            db.validateSync(values);
        }catch(err){
            console.log(err);
            return err.errors;
        }
    }

    addData(database, values){
        let err = this.modelValidation(database, values);
        if(err){
            return err;
        }else{
            let str = "";
            Object.keys(values).forEach((key, i)=>{
                str += `"${values[key]}"`
                if(i + 1 < Object.keys(values).length){
                    str += ", "
                }
            })

            let query = `INSERT INTO ${database}(${Object.keys(values)}) VALUES( ${str} )`;
            this.db.run(query, (err)=>{
                if(err){
                    console.log(err);
                    return err;
                }
            })
        }
    }

    readData(database, values = {}){
        let str = "", query;
        if(Object.keys(values) == 0){
            query = `SELECT * FROM ${database};`
        }else{
            Object.keys(values).forEach((key, i)=>{
                str += `${key} = "${values[key]}"`
                if(i + 1 < Object.keys(values).length){
                    str += " AND "
                }
            })
            query = `SELECT * FROM ${database} WHERE ${str};`;
        }
        
        return new Promise((resolve, reject)=>{
            this.db.all(query, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
        
    }

    removeData(database, id){
        let query = `DELETE FROM ${database} WHERE id = ${id})`;
        this.db.run(query, (err)=>{
            if(err){
                console.log(err);
                return err;
            }
        })
        return null;
    }

    updateData(database, id, values){
        this.readData(database, { id : id }).then(
            (row)=>{
                for(let val in values){
                    row[val] = values[val];
                }
                let err = this.modelValidation(database, row)

                let str = "";
                Object.keys(values).forEach((key, i)=>{
                    str += `${key} = "${values[key]}"`
                    if(i + 1 < Object.keys(values).length){
                        str += ", "
                    }
                })
                let query = `UPDATE ${database} 
                    SET ${str}
                    WHERE id = "${id}"`;
                this.db.run(query, (err)=>{
                    if(err){
                        console.log(err);
                        return err;
                    }
                })
            },
            (err)=>console.log(`Erro : ${err}`)
        )
    }

    readFullAnimalData(database, values = {}){
        let str = "";
        let query = `SELECT *
            FROM ${database}
            INNER JOIN cachorros ON ${database}.idAnimal = cachorros.id`
        switch(database){
            case 'descricoesPerdidos':
                query += ` INNER JOIN organizacoes ON ${database}.idRequisitante = usuarios.id`;
                break;
            case 'animaisEncontrados':
                query += ` INNER JOIN organizacoes ON ${database}.idOrganizacao = organizacoes.id`;
                break;
        }
        if(Object.keys(values) != 0){
            Object.keys(values).forEach((key, i)=>{
                str += `${key} = "${values[key]}"`
                if(i + 1 < Object.keys(values).length){
                    str += " AND "
                }
            })
            query += " WHERE " + str;
        }
        
        return new Promise((resolve, reject)=>{
            this.db.all(query, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

module.exports = databaseController;
