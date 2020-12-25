const express = require('express');

//
const router = express.Router();
//
const { addTodoTitle, updateTodoTitle, deleteTodoTitle } = require('../controllers/todotitle')
const { verifyToken } = require('../middleware/authUser')

//create new Label
router.post('/todotitle/create', verifyToken, addTodoTitle)

router.put('/todotitle/update', verifyToken, updateTodoTitle)

//i have not test this
router.delete('/todotitle/delete', verifyToken, deleteTodoTitle)







//end
module.exports = router