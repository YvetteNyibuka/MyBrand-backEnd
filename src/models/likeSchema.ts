import mongoose, { Schema } from 'mongoose';

const likeSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  isLiked: {
    type: Boolean,
    default: false 
  }
});

const Like = mongoose.model('Like', likeSchema);

export default Like;
