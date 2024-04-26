const bodyParser = require('body-parser')
const cors = require('cors')

//middleware que permite que a aplicação seja acessada por qualquer aplicação
//module.exports é um objeto que contém todas as funções que serão exportadas
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors({
        origin: '*'
    }))
}