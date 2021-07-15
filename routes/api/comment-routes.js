

const router = require('express').Router();
// Import from controller comment-controller
const { 
  addComment, 
  removeComment, 
  addReply, 
  removeReply 
} = require('../../controllers/comment-controller');


// api/comments/:pizzaId
router.route('/:pizzaId').post(addComment);


// api/comments/:pizzaId/:commentId
router
  .route('/:pizzaId/:commentId')
  .put(addReply) 
  .delete(removeComment)

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;