const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authUser');
const { addNewUsertoTodo, showOthersTodos } = require('../controllers/othersTodo')

router.post('/addnewusertolabel', verifyToken, addNewUsertoTodo)


router.get('/otherstodos', verifyToken, showOthersTodos)

module.exports = router