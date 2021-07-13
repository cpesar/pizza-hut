const { Pizza } = require('../models');

const pizzaController = {

  // Get all pizzas
  getAllPizza(req, res){
    Pizza.find({})
    // This will allow the data to be returned, not just the comment id
    .populate({
      path: 'comments',
      select: '-__v'
    })
    .select('-__v')
    // Sort in DESC order by the _id value
    .sort({ _id: -1 })
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },



  // Get one pizza by id
  getPizzaById({ params }, res){
    Pizza.findOne({ _id: params.id })
    .populate({
      path: 'comments',
      select: '-__v'
    })
    .select('-__v')
    .then(dbPizzaData => {
      if(!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },



  // Create a Pizza
  createPizza({ body }, res) {
    Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.status(400).json(err));
  },



  // Update Pizza by id
  updatePizza({ params, body }, res){
    //Mongoose finds a single document we want to update and returns the updated document
      // By instructing { new: true }, we are telling Mongoose to return a new version of the document
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbPizzaData => {
        if(!dbPizzaData){
          res.status(404).json({ message: 'No pizza found with this id'});
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },



  // Delete Pizza
  deletePizza({ params }, res){
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if(!dbPizzaData){
          res.status(404).json({ message: 'No pizza found with this id '});
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }



}

module.exports = pizzaController;