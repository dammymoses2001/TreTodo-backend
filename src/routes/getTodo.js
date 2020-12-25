const express = require('express');
const TodoLabel = require('../models/todolabel')
//
const router = express.Router();
//
const { verifyToken } = require('../middleware/authUser');


router.get('/getusertodos', verifyToken, (req, res) => {
    // console.log(req.user._id)
    //"user.userid": req.user._id 

    TodoLabel.find({ "user.userid": req.user._id }).populate('todoBody').exec((err, todolist) => {
        if (err) {
            console.log(err)
        }
        if (todolist) {
            res.status(200).json({
                todolist
            })
        }
    })

});
router.get('/taskusers', verifyToken, (req, res) => {
    // console.log(req.user._id)
    //"user.userid": req.user._id 

    TodoLabel.find({ "user.userid": req.user._id, "user.authorization": "user" }).populate('todoBody').exec((err, todolist) => {
        if (err) {
            console.log(err)
        }
        if (todolist) {
            res.status(200).json({
                todolist
            })
        }
    })

});


module.exports = router