const { compareSync } = require('bcryptjs');
const TodoLabel = require('../models/todolabel');
const TodoBody = require('../models/todolbody')
//const User = require('../models/user');
function isUserAuth(otherTodos, email) {
    //this function check if the user is autheticated and authorized befor show the todo lists
    // to see other list the user must be a user and his/her email must be verfied
    // console.log(otherTodos, userId)
    //send back users details since i will need to know whhat exisiting approve status is and index 
    //to chnage it in db using $set 
    const auth = otherTodos.find(user => user.email == email && user.authorization === 'user')
    const no = otherTodos.findIndex(user => user.email == email && user.authorization === 'user')
    // console.log(index)
    // console.log(auth)
    const check = { auth, no }
    return check

    // return list
}


exports.AproveUser = (req, res) => {
    const { userId, labelId, email } = req.body
    //console.log("linked", req.user._id)
    TodoLabel.findById(labelId, (err, myTodo) => {
        if (err) {
            console.log(err)
        }
        if (myTodo) {
            const Auth = isUserAuth(myTodo.user, email)
            // console.log(Auth)
            if (Auth.auth) {
                //console.log(Auth)
                const autho = !Auth.auth.approved;
                const approvedName = Auth.no
                //console.log(autho)

                TodoLabel.findOneAndUpdate({ "_id": labelId }, {
                    //have figure it out
                    $set: { [`user.${approvedName}.approved`]: autho }
                }, (err, see) => {
                    if (err) {
                        console.log(err)
                    }
                    if (see) {
                        res.status(200).json({
                            approved: see,
                            message: autho ? 'users have been authorized....' : 'users have been unauthorized.....'

                        })
                    }
                })

            }
            else {
                res.status(400).json({
                    message: 'Something went wrong....'
                })
            }

        }
    })

}

function Admin(data, adminId) {
    const isAdmin = data.user.find(user => user.authorization == 'admin' && user.userid == adminId)
    if (isAdmin) {
        return data
    }
    return {}
}
exports.PinLabel = (req, res) => {
    const { labelId } = req.body;
    TodoLabel.findById(labelId, (err, findUser) => {
        if (err) {
            console.log(err)
        }
        if (findUser) {
            const isAdmin = Admin(findUser, req.user._id)
            console.log(isAdmin)
            if (isAdmin) {
                const pin = !isAdmin.pin;
                //console.log(pin)
                TodoLabel.findByIdAndUpdate(labelId, {
                    $set: {
                        "pin": pin
                    }
                }, (err, updatePin) => {
                    if (err) {
                        console.log(err)
                    }
                    if (updatePin) {
                        res.status(200).json({
                            updatePin
                        })
                    }
                })
            }
            else {
                res.status(400).json({
                    message: 'Admin not authorized'
                })
            }

        }
    })

}

exports.HideLabel = (req, res) => {
    const { labelId } = req.body;
    TodoLabel.findById(labelId, (err, findUser) => {
        if (err) {
            console.log(err)
        }
        if (findUser) {
            const isAdmin = Admin(findUser, req.user._id)
            // console.log(isAdmin)
            if (isAdmin) {
                const hide = !isAdmin.hide;
                //console.log(pin)
                TodoLabel.findByIdAndUpdate(labelId, {
                    $set: {
                        "hide": hide
                    }
                }, (err, updateHide) => {
                    if (err) {
                        console.log(err)
                    }
                    if (updateHide) {
                        res.status(200).json({
                            updateHide
                        })
                        //console.log(updateHide)
                    }
                })
            }
            else {
                res.status(400).json({
                    message: 'Admin not authorized'
                })
            }
        }
    })

}

// function isUserInput(users, userEmail) {
//     const isUser = users.user.find(user => user.email == userEmail);
//     const no = users.user.findIndex(user => user.email == userEmail);
//     //console.log(isUser)


//     if (isUser) {
//         const todoBody = users.todoBody
//         return { todoBody, no }
//     }
//     else {
//         return false;
//     }
// }

exports.todoCompleteToggle = (req, res) => {
    const { todolabelId, todobodyId } = req.body
    TodoBody.findById(todobodyId, (err, todobody) => {
        if (err) {
            console.log(err)
        }
        if (todobody) {
            const complete = !todobody.complete
            TodoBody.findByIdAndUpdate(todobodyId, {
                $set: {
                    "complete": complete
                }
            }, (err, updateComplete) => {
                if (err) {
                    console.log(err)
                }
                if (updateComplete) {
                    res.status(200).json({
                        updateComplete,
                        message: 'done'
                    })
                }
                else {
                    res.status(400).json({
                        message: 'Something went wrong.....'
                    })
                }
            })
        }
    })
    // TodoLabel.findById(todolabelId)
    //     .populate({ path: 'todoBody', select: '_id complete' })
    //     .exec((err, todolables) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         if (todolables) {
    //             const userFind = isUserInput(todolables, req.user.email);
    //             if (userFind) {
    //                 const complete = userFind
    //                 console.log(complete)
    //                 // TodoBody.findByIdAndUpdate(todobodyId, {
    //                 //     $set: {
    //                 //         "complete":
    //                 //     }
    //                 // })
    //             }
    //             else {
    //                 console.log('User not authorized....')
    //             }
    //             res.status(200).json({
    //                 todolables
    //             })
    //         }
    //     })

}