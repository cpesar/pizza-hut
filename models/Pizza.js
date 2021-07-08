//IMPORT DEPENDENCIES
const { Schema, model } = require('mongoose');

//Create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

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

//Export the Pizza model
module.exports = Pizza;