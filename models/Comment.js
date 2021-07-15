const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    //Set custom id to avoid confusion with parent comment _id
    replyId:{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },

    replyBody:{
      type: String
    },

    writtenBy: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String
    },

    commentBody: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
      },

    // Use replySchema to validate data for a reply
    replies: [ReplySchema] 
  },

  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    // id: false
  }
);



// Virtual to get total reply count
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});



const Reply = model('Reply', ReplySchema);
const Comment = model('Comment', CommentSchema);

module.exports = Comment, Reply;