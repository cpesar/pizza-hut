

//IMPORT DEPENDENCIES
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



//CREATE THE SCHEMA
const PizzaSchema = new Schema (
{
  pizzaName: {
    type: String,
    // This will require data to be added for this field
    // required: 'You need to provide a pizza name',
    required: true,
    // This will trim the white-space before/after an input
    trim: true
  },

  createdBy: {
    type: String,
    required: true,
    // required: 'You need to tell us who you are',
    trim: true
  },

  createdAt: {
    type: Date,
    //If no date is provided, the Date.now function will execute and provide a timestamp
    default: Date.now,
    // Add a getter
      // Every time we retrieve a pizza, the createdAt field will be formatted by the dateFormat() function
    get: (createdAtVal) => dateFormat(createdAtVal)
  },

  size: {
    type: String,
    required: true,
    // Enumerable: A set of data that can be iterated over, similar to a for loop
    enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
    getters: true
  },
  id: false
}

);

// VIRTUAL
// Get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total +  comment.replies.length + 1,0);
});

//Create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//Export the Pizza model
module.exports = Pizza;