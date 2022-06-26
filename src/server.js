const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const router = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(express.static(__dirname + '/public'))__dirname + '/public/img/img' + id + '.png';
app.use(express.json());
app.use(express.urlencoded({ extended : true }))
app.use(morgan('dev'));
app.use(helmet());
app.use(router);
app.use(cors())

app.get('/', (req, res)=>{
    res.type('text/plain').status(200);
    res.end('Hello World!');
})


app.listen(3300, ()=> console.log('Servdor aberto na porta 3300...'));



