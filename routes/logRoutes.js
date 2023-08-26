const express = require('express');
const router = express.Router();
const logController = require('../controllers/logControllers');


router.get('/create', logController.createController);

router.get('/all', logController.getallLogsController)

router.get('/', logController.getAbsoluteLogsController )

router.post('/', logController.postAbsoluteLogsController)

router.get('/:id', logController.getSingleItemLogController )

router.delete('/:id', logController.deleteSingleItemLogController)


module.exports = router;