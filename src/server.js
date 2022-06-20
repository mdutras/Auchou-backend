const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
//const dotenv = require('dontenv')

const app = express();

app.use(morgan('dev'))
app.use(helmet())

app.get('/', (req, res)=>{
    res.type('text/plain').status(200)
    res.end('Hello World!')
})

app.listen(3300, ()=> console.log('Servdor aberto na porta 3300...'))



