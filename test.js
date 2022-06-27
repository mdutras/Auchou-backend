const crypto = require('crypto');
const dbController = require('./src/database/db');

const db = new dbController();

db.addData('animaisEncontrados', {
	id: crypto.randomUUID(),
	idOrganizacao :  crypto.randomUUID(),
	idAnimal: crypto.randomUUID(),
	dataEncontrado:"12/05/2010",
	horarioEncontrado:"12:59",
	paraAdocao:"S"
})
