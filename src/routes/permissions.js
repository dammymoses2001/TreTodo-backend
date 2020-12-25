const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authUser')
const { AproveUser, PinLabel, HideLabel, todoCompleteToggle } = require('../controllers/permission')


router.put('/todolabel/approveduser', verifyToken, AproveUser);

router.put('/todolabel/pin', verifyToken, PinLabel);

router.put('/todolabel/hide', verifyToken, HideLabel);

router.post('/todolabel/todocompletetoggle', verifyToken, todoCompleteToggle)

module.exports = router