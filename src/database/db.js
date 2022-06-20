const sqlite3 = require('sqlite3');

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
                id INTEGER PRIMARY KEY,
                raca TEXT NOT NULL,
                porte CHAR(25) NOT NULL,
                cor_pelo CHAR(25) NOT NULL,
                tamanho_pelo CHAR(25) NOT NULL, 
                sexo CHAR(2) NOT NULL,
                estágio CHAR(25) NOT NULL)`,
            `CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY,
                nome TEXT NOT NULL,
                telefone VARCHAR(15),
                email TEXT)`,
            `CREATE TABLE IF NOT EXISTS organizacoes (
                id INTEGER PRIMARY KEY,
                nome TEXT NOT NULL,
                endereco TEXT NOT NULL,
                telefone VARCHAR(15),
                email TEXT)`,
            `CREATE TABLE IF NOT EXISTS descricoesPerdidos (
                id INTEGER PRIMARY KEY,
                horarioPerdido VARCHAR(9) NOT NULL,
                dataPerdido VARCHAR(11) NOT NULL,
                horarioDataRequisicao VARCHAR(20) NOT NULL,
                caracteristicasUnicas TEXT,
                CONSTRAINT id_animal FOREIGN KEY(id) REFERENCES cachorros(id),
                CONSTRAINT id_requisitante FOREIGN KEY(id) REFERENCES usuarios(id))`,
            `CREATE TABLE IF NOT EXISTS animaisEncontrados (
                id INTEGER PRIMARY KEY,
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
}

module.exports = databaseController;