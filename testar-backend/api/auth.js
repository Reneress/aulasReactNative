const { authSecret } = require('../.env')
//importando a chave de autenticação
const jwt = require('jwt-simple')
//importando o jwt
const bcrypt = require('bcrypt-nodejs')
//importando o bcrypt

module.exports = app => {
    const signin = async (req, res) => {
        //função que faz o login
        if (!req.body.email || !req.body.password) {
            //se o email ou a senha não forem informados
            return res.status(400).send('Informe usuário e senha')
            //retorna o status 400 e a mensagem 'Informe usuário e senha'
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()
        //user recebe o primeiro usuário com o email informado

        if(user){
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                //compara a senha informada com a senha do usuário
                if(err || !isMatch){
                    //se houver erro ou não houver correspondência
                    return res.status(401).send()
                    //retorna o status 401
                }
                const payload = { id: user.id }
                //payload recebe o id do usuário

                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSecret)
                })
                //retorna o nome, email e o token do usuário
            })
        }
        else{
            res.status(400).send('Usuário não cadastrado!')
            //retorna o status 400 e a mensagem 'Usuário não cadastrado!'
        }
    }
    return { signin }
}