const moment = require('moment');



module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()
            //se a data for informada, date recebe a data informada, senão, recebe a data atual
        app.db('tasks')
        //acessa a tabela tasks
            .where({ userId: req.user.id })
            //onde o id do usuário for igual ao id do usuário logado
            .where('estimateAt', '<=', date)
            //onde a data estimada for menor ou igual à data informada
            .orderBy('estimateAt')
            //ordena pela data estimada
            .then(tasks => res.json(tasks))
            //retorna as tarefas
            .catch(err => res.status(500).json(err))
            //em caso de erro, retorna o status 500 e o erro
    }
    const save = (req, res) => {
        if (!req.body.desc.trim()) {
            //se a descrição não for informada
            return res.status(400).send('Descrição é um campo obrigatório')
            //retorna o status 400 e a mensagem de erro
        }
        req.body.userId = req.user.id
        //o id do usuário recebe o id do usuário logado
        app.db('tasks')
        //acessa a tabela tasks
            .insert(req.body)
            //insere os dados informados
            .then(_ => res.status(204).send())
            //retorna o status 204
            .catch(err => res.status(400).json(err))
            //em caso de erro, retorna o status 400 e o erro
    }
    const remove = (req, res) => {
        app.db('tasks')
        //acessa a tabela tasks
            .where({ id: req.params.id, userId: req.user.id })
            //onde o id for igual ao id informado e o id do usuário for igual ao id do usuário logado
            .del()
            //deleta
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    //se houver mais de uma linha deletada
                    res.status(204).send()
                    //retorna o status 204
                } else {
                    const msg = `Não foi encontrada task com id ${req.params.id}.`
                    //retorna o status 400
                    res.status(400).send()
                }
            })
            .catch(err => res.status(400).json(err))
            //em caso de erro, retorna o status 400 e o erro
    }
    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks')
        //acessa a tabela tasks
            .where({ id: req.params.id, userId: req.user.id })
            //onde o id for igual ao id informado e o id do usuário for igual ao id do usuário logado
            .update({ doneAt })
            //atualiza
            .then(_ => res.status(204).send())
            //retorna o status 204
            .catch(err => res.status(400).json(err))
            //em caso de erro, retorna o status 400 e o erro
    } 
    const toggleTask = (req, res) => {
        app.db('tasks')
        //acessa a tabela tasks
            .where({ id: req.params.id, userId: req.user.id })
            //onde o id for igual ao id informado e o id do usuário for igual ao id do usuário logado
            .first()
            //retorna o primeiro resultado
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    //retorna o status 400
                    return res.status(400).send()
                }
                const doneAt = task.doneAt ? null : new Date()
                //se a tarefa foi concluída, doneAt recebe null, senão, recebe a data atual
                updateTaskDoneAt(req, res, doneAt)
                //chama a função updateTaskDoneAt
            })
            .catch(err => res.status(400).json(err))
            //em caso de erro, retorna o status 400 e o erro
    }
    return { getTasks, save, remove, toggleTask }
    //retorna as funções getTasks, save, remove e toggleTask

}