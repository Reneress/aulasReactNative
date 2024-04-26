module.exports = app => {
    app.post('/signup', app.api.user.save)
        //rota que recebe um post e chama a função save
    app.post('/signin', app.api.auth.signin)
        //rota que recebe um post e chama a função signin
    app.route('/tasks')
        .all(app.config.passport.authenticate())
        //rota que recebe todos os métodos e chama o passport
        .get(app.api.task.getTasks)
        //rota que recebe um get e chama a função getTasks
        .post(app.api.task.save)
        //rota que recebe um post e chama a função save
    app.route('/tasks/:id')
        .all(app.config.passport.authenticate())
        //rota que recebe todos os métodos e chama o passport
        .delete(app.api.task.remove)
        //rota que recebe um delete e chama a função remove
    app.route('/tasks/:id/toggle')
        .all(app.config.passport.authenticate())
        //rota que recebe todos os métodos e chama o passport
        .put(app.api.task.toggleTask)
        //rota que recebe um put e chama a função toggleTask

}