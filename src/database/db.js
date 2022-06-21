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
                id TEXT PRIMARY KEY,
                raca TEXT NOT NULL,
                porte CHAR(25) NOT NULL,
                cor_pelo CHAR(25) NOT NULL,
                tamanho_pelo CHAR(25) NOT NULL, 
                sexo CHAR(2) NOT NULL,
                estágio CHAR(25) NOT NULL)`,
            `CREATE TABLE IF NOT EXISTS usuarios (
                id STRING PRIMARY KEY,
                nome TEXT NOT NULL,
                telefone VARCHAR(15),
                email TEXT)`,
            `CREATE TABLE IF NOT EXISTS organizacoes (
                id STRING PRIMARY KEY,
                nome TEXT NOT NULL,
                endereco TEXT NOT NULL,
                telefone VARCHAR(15),
                email TEXT)`,
            `CREATE TABLE IF NOT EXISTS descricoesPerdidos (
                id STRING PRIMARY KEY,
                horarioPerdido VARCHAR(9) NOT NULL,
                dataPerdido VARCHAR(11) NOT NULL,
                horarioDataRequisicao VARCHAR(20) NOT NULL,
                caracteristicasUnicas TEXT,
                CONSTRAINT id_animal FOREIGN KEY(id) REFERENCES cachorros(id),
                CONSTRAINT id_requisitante FOREIGN KEY(id) REFERENCES usuarios(id))`,
            `CREATE TABLE IF NOT EXISTS animaisEncontrados (
                id STRING PRIMARY KEY,
                horarioEncontrado VARCHAR(9) NOT NULL,
                dataEncontrado VARCHAR(11) NOT NULL,
                caracteristicasUnicas TEXT,
                CONSTRAINT id_animal FOREIGN KEY(id) REFERENCES cachorros(id),
                CONSTRAINT id_organizacao FOREIGN KEY(id) REFERENCES oganizacoes(id))`
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

    databaseValidation(database){
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
                err = new Error("Banco de dados solicitado não encontrado.")
                break;
        }
        return [db, err]
    }

    addData(database, values){
        let [db, err] = this.databaseValidation(database);
        if(err){
            return err;
        }else{
            let str = "";
            try{
                err = db.validateSync(values);
                if(err){
                    console.log(err);
                    return err;
                }
            }catch(err){
                return err;
            }
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

    readData(database, values){
        let str = "";
        Object.keys(values).forEach((key, i)=>{
            str += `${key} = "${values[key]}"`
            if(i + 1 < Object.keys(values).length){
                str += " AND "
            }
        })
        let query = `SELECT * FROM ${database} WHERE ${str};`;
        this.db.all(query, (err, data)=>{
            if(err){
                console.log(err);
                return err;
            }
            return data
        })
    }

    removeData(database, id){
        let db, err = this.databaseValidation(database);
        if(err){
            return err;
        }else{
            let query = `DELETE FROM ${database} WHERE id = ${id})`;
            this.db.run(query, (err)=>{
                if(err){
                    console.log(err);
                    return err;
                }
            })
            return null;
        }
    }

    //TODO: Ajeitar a questão da validação dos valores
    updateData(database, id, values){
        let db, err = this.databaseValidation(database);
        if(err){
            return err;
        }else{
            try{
                err = db.validateSync(values);
                if(err){
                    console.log(err);
                    return err;
                }
            }catch(err){
                return err;
            }
            str = "";
            Object.keys(values).forEach((key, i)=>{
                str += `${key} = ${values[key]}`
                if(i + 1 < Object.keys(values).length){
                    str += ", "
                }
            })
            let query = `UPDATE FROM ${database} 
                SET (${str})
                WHERE id = ${id})`;
            this.db.run(query, (err)=>{
                if(err){
                    console.log(err);
                    return err;
                }
            })
            return null;
        }
    }
}

module.exports = databaseController;