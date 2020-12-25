const express = require('express');

//
const router = express.Router();
//
const { verifyToken } = require('../middleware/authUser');
const { addTodoBody, updateTodoBody, deleteTodoBody } = require('../controllers/todobody');


router.post('/todobody/create', verifyToken, addTodoBody);

router.put('/todobody/updatetodobody', verifyToken, updateTodoBody);

router.delete('/todobody/deletetodobody', verifyToken, deleteTodoBody);




module.exports = router