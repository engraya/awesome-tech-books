const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentControllers');



router.get('/home', commentController.getAbsoluteLogsController )

router.get('/all', commentController.getallLogsController)


router.get('/create', commentController.createController);

router.post('/', commentController.postAbsoluteLogsController)


router.get('/:id', commentController.getSingleItemLogController )

router.delete('/:id', commentController.deleteSingleItemLogController)




module.exports = router;