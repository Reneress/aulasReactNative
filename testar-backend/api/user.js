const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const obterHash = (password, callback) => {
        //função que recebe a senha e um callback
        bcrypt.genSalt(10, (err, salt) => {
            //função que gera um salt para a senha
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
            //função que gera um hash para a senha
        })
    }

    const save = (req, res) => {
        //função que salva um usuário
        obterHash(req.body.password, hash => {
            //recebe a senha e um callback
            const password = hash
            //password recebe o hash
            app.db('users')
                .insert({ name: req.body.name, email: req.body.email, password })
                //insere o nome, email e senha na tabela users
                .then(_ => res.status(204).send())
                //retorna o status 204
                .catch(err => res.status(400).json(err))
                //retorna o status 400 e o erro
        })
    }

    

    return { save }
    //retorna a função save

    
}