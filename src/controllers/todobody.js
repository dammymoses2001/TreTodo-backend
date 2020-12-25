const TodoBody = require('../models/todolbody');
const TodoLabel = require('../models/todolabel')

//use to add todo list under todo body / title
exports.addTodoBody = (req, res) => {
    const { todo, parentId, complete, labelId } = req.body
    TodoBody.create({
        todo,
        complete,
        titleId: labelId,
        date: new Date().toString()
    }, (err, newTodobody) => {
        if (err) {
            console.log(err)
        }
        if (newTodobody) {
            TodoLabel.findOne({ _id: labelId })
                .exec((err, todoTitle) => {
                    if (err) {
                        console.log(err)
                    }
                    if (todoTitle) {

                        todoTitle.todoBody.push(newTodobody);
                        todoTitle.save((err, addTodo) => {
                            if (err) {
                                console.log(err)
                            }
                            if (addTodo) {
                                res.status(201).json({
                                    newTodobody,
                                    titleId: todoTitle._id,
                                    message: 'added succesfully'
                                })
                            }
                        })

                    }
                })
        }
    })

}

exports.updateTodoBody = (req, res) => {
    const { todo, complete, todotitleId, todobodyId } = req.body
    //check if the user is in the todotitle list
    TodoLabel.findOne({ _id: todotitleId })
        .populate('todoBody').exec((err, todobody) => {
            if (err) {
                console.log(err)
            }
            if (todobody) {
                const userIsAuthenciate = todobody.user.find(user => user.email === req.user.email)
                if (userIsAuthenciate) {
                    TodoBody.findByIdAndUpdate(todobodyId, {
                        todo, complete,
                    }, (err, updateTodoBody) => {
                        if (err) {
                            console.log(err)
                        }
                        if (updateTodoBody) {
                            res.status(201).json({
                                updateTodoBody
                            })
                        }
                    })
                }
                else {
                    res.status(201).json({
                        message: 'User is not authenticated'
                    })
                }
            }

        })

}
exports.deleteTodoBody = (req, res) => {
    const { todotitleId, todobodyId } = req.body
    console.log(req.body)
    //check if the user is in the todotitle list
    TodoLabel.findOne({ _id: todotitleId })
        .populate('todoBody').exec((err, todobody) => {
            if (err) {
                console.log(err)
            }
            if (todobody) {
                const userIsAuthenciate = todobody.user.find(user => user.email === req.user.email)
                if (userIsAuthenciate) {
                    TodoBody.findByIdAndDelete(todobodyId, (err, deleteTodoBody) => {
                        if (err) {
                            console.log(err)
                        }
                        if (deleteTodoBody) {
                            res.status(200).json({
                                bodyId: deleteTodoBody._id,
                                titleId: todobody._id,
                                message: 'Todo deleted.....'
                            })
                        }
                    })
                }
                else {
                    res.status(201).json({
                        message: 'User is not authenticated'
                    })
                }
            }

        })

}