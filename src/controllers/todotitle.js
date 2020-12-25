const TodoLabel = require('../models/todolabel');

//this end point is to add new  label  for users
exports.addTodoTitle = (req, res) => {
    const { user, title, note, pin, hide } = req.body

    TodoLabel.find({ "user.userid": req.user._id }).exec((err, exisitingtitle) => {
        const todoTitle = exisitingtitle.find(todo => todo.title === title);
        //console.log(todoTitle)
        if (err) {
            console.log(err)
        }
        if (todoTitle) {
            res.status(400).json('exist')
        }
        else {


            const todolabel = new TodoLabel({
                userId: req.user._id,
                user: [
                    {
                        ...user,
                        userid: req.user._id,
                        email: req.user.email,
                        authorization: 'admin',
                        approved: true
                    }],
                title,
                pin,
                hide
            })
            if (note) {
                TodoLabel.note = note
            }
            todolabel.save((err, addTodoTitle) => {
                if (err) {
                    console.log(err)
                }
                if (addTodoTitle) {
                    res.status(201).json({
                        todoLabel: addTodoTitle,
                        message: 'label added successfully....'
                    })
                }
            })
        }

    })

}


exports.updateTodoTitle = (req, res) => {
    const { titleId, title, note } = req.body
    //console.log(titleId)
    TodoLabel.findByIdAndUpdate({ "user.userid": req.user._id, "_id": titleId }, {
        title,
        note
    }).exec((err, exisitingtitle) => {
        if (err) {
            console.log(err)
        }
        if (exisitingtitle) {
            res.status(400).json({ exisitingtitle })
        }
        else {

        }

    })
}



exports.deleteTodoTitle = (req, res) => {
    const { titleId, title, note } = req.body
    //console.log(titleId)
    TodoLabel.findOneAndDelete({ "user.userid": req.user._id, "_id": titleId }, {
        title,
        note
    }).exec((err, deletetitle) => {
        if (err) {
            console.log(err)
        }
        if (deletetitle) {
            res.status(400).json({
                deletetitle,
                message: 'Todo title deleted....'
            })
        }
        else {

        }

    })


}




