const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')

const {Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('JWT')
    }
    //Estratégia de autenticação

    const strategy = new Strategy(params, (payload, done) => {
        //payload é o token que foi enviado
        //done é a função que será chamada no final do processo
        app.db('users')
        //acessando o banco de dados
            .where({id: payload.id})
            //procurando um usuário com o id que foi passado no token
            .first()
            .then(user => {
                if (user) {
                    done(null, {id: user.id, email: user.email})
                    //se o usuário for encontrado, retorna o payload
                    //o payload é o id e o email do usuário
                } else {
                    done(null, false)
                }
            
            })
            //se o usuário for encontrado, retorna o payload
            .catch(err => done(err, false))
            //se houver erro, retorna falso
    })

    passport.use(strategy)
    //usando a estratégia de autenticação

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('local', {session: false})
    }
}