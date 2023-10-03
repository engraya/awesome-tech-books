const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentControllers');



router.get('/home', commentController.getAbsoluteCommentController )

router.get('/all', commentController.getallCommentsController)

router.get('/create', commentController.createController);

router.post('/', commentController.postAbsoluteCommentController)

router.get('/:id', commentController.getSingleItemCommentController )

router.delete('/:id', commentController.deleteSingleItemCommentController)




module.exports = router;