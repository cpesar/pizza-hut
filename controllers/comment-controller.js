// Import the Comment & Pizza Models
const { Comment, Pizza } = require('../models');


const commentController = {
  // Method to add a comment
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } },
          // This indicates that we will be getting back the pizza with the new comment
          { new: true }
        );
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },



  // Method to remove comment
  // 1. Finds and deletes a comment by the id
  // 2. Returns the data
  // 3. Uses the $pull operation to remove the comment from the associated pizza
  // 4. Return the updated pizza data
  removeComment({ params }, res) {
    Comment.findOneAndDelete ({ _id: params.commentId })
      .then(deletedComment => {
        if(!deletedComment){
          return res.status(404).json({ message: 'No comment with this id' })
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId }},
          { new: True }
        );
      })
      .then(dbPizzaData => {
        if(!dbPizzaData){
          res.status(404).json({ message: 'No pizza found with this id' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = commentController;