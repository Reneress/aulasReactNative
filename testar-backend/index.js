const express = require('express')
const app = express()
const db = require('./config/db')
//importando o arquivo db.js
const consign = require('consign')
//importando o arquivo consign

//consign é um organizador de código, que permite que você importe arquivos de forma mais organizada

consign()
    .include('./config/passport.js')
    //importando o arquivo passport.js
    .then('./config/middlewares.js')
    //importando o arquivo middlewares.js
    .then('./api')
    //importando a pasta api
    .then('./config/routes.js')
    //importando o arquivo routes.js
    .into(app)
    //passando o app para o consign

app.db = db

app.listen(3000, () => {
    console.log('Backend executando...')
    //quando o servidor estiver rodando, imprime no console a mensagem 'Backend executando...'
})

// const bodyParser = require('body-parser')
// app.use(Mjson())
// function Mjson() {
//     return (req, res, next) => {
//     console.log('Antes de tudo')
//     next()
//     }
// }
// app.get('/blabla/:valor',(req, res,next) => {
//     console.log('func0')
//     next()
// })

// //criando uma requisão e sua resposta
// app.get('/blabla/:valor', (req, res, next) => {
//     console.log('func1')
//     //quando a requisição for feita
//     res.status(200).send('Meu BackEnd = ' + req.params.valor)
//     //retorna o status 200 e a mensagem 'Meu BackEnd!'
//     next()
// })

// app.get('/blabla/:valor', (req, res) => {
//     console.log('func3')
//     //quando a requisição for feita
// })
