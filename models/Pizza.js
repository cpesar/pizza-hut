

//IMPORT DEPENDENCIES
const { Schema, model } = require('mongoose');



//CREATE THE SCHEMA
const PizzaSchema = new Schema ({

  pizzaName: {
    type: String
  },

  createdBy: {
    type: String
  },

  createdAt: {
    type: Date,
    //If no date is provided, the Date.now function will execute and provide a timestamp
    default: Date.now
  },

  size: {
    type: String,
    default: 'Large'
  },

  toppings: []
  
});

//Create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//Export the Pizza model
module.exports = Pizza;