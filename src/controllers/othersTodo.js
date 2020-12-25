const TodoLabel = require('../models/todolabel');
const User = require('../models/user')
// const shortid = require('shortid')
exports.addNewUsertoTodo = (req, res) => {
    //this is to give permission to other users to view your tasks/todos
    const { titleId, email } = req.body;
    User.findOne({ email }, (err, userRegistered) => {
        if (err) {
            console.log(err)
        }
        if (userRegistered) {
            TodoLabel.findOne({ "user.email": email, _id: titleId }, (err, isEmailAdded) => {
                if (err) {
                    console.log(err)
                }
                if (isEmailAdded) {
                    res.status(400).json({
                        message: 'User already added',

                    })
                }
                else {
                    TodoLabel.findByIdAndUpdate({ _id: titleId }, {
                        "$push": {
                            "user": [{
                                email,
                                userid: req.user._id
                            }]
                        }
                    }).exec((err, todoTitle) => {
                        if (err) {
                            console.log(err)
                        }
                        if (todoTitle) {
                            TodoLabel.findById(todoTitle._id, (err, todo) => {
                                res.status(201).json({
                                    todo,
                                    message: 'user added....'
                                })
                            })

                        }
                    })
                }
            })
        }
        else {
            res.status(400).json({
                message: 'User does not exist....'
            })
        }
    })


}


function isUserAuth(otherTodos, email) {
    //this function check if the user is autheticated and authorized befor show the todo lists
    // to see other list the user must be a user and his/her email must be verfied
    const list = [];
    otherTodos.map(todo => {
        todo.user.map(auth => {
            if (auth.email === email
                && auth.authorization === 'user') {
                list.push(todo)
            }
        })
    })

    return list
}


exports.showOthersTodos = (req, res) => {
    //make users see tasks the have been added to
    console.log(req.user)
    TodoLabel.find({ "user.email": req.user.email }).populate('todoBody').exec((err, otherTodos) => {
        if (err) {
            console.log(err)
        }
        if (otherTodos) {

            const checkAuth = isUserAuth(otherTodos, req.user.email);
            if (checkAuth.length > 0) {
                res.status(200).json({
                    otherTodos: checkAuth
                })
            }
            else {
                res.status(200).json({
                    otherTodos: checkAuth,
                    message: '....you are not in anylist yet'
                })
            }

        }
    })
}