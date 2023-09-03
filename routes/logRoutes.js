const express = require('express');
const router = express.Router();
const logController = require('../controllers/logControllers');



router.get('/home', logController.getAbsoluteLogsController )

router.get('/all', logController.getallLogsController)


router.get('/create', logController.createController);

router.post('/', logController.postAbsoluteLogsController)


router.get('/:id', logController.getSingleItemLogController )

router.delete('/:id', logController.deleteSingleItemLogController)




module.exports = router;