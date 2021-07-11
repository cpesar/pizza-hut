

//IMPORT DEPENDENCIES
const { Schema, model } = require('mongoose');



//CREATE THE SCHEMA
const PizzaSchema = new Schema (
{
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

  toppings: [],

  // Associate the Pizza and Comment Models
  comments: [
    {
      // Tell Mongoose to expect an ObjectId
      type: Schema.Types.ObjectId,
      // Tell Mongoose that the data will come from the Comment Model
      ref: 'Comment'
    }
  ]
},
// Tell the schema it can use virtuals
{
  toJSON: {
    virtuals: true,
  },
  id: false
}

);

// VIRTUAL
// Get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

//Create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//Export the Pizza model
module.exports = Pizza;