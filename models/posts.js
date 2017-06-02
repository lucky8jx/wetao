import mongoose from 'mongoose';

const postsSchema = mongoose.Schema({
  posts: { type: Array },
  createdAt: { type: Date, default: Date.now }
});

const Posts = mongoose.model("Posts", postsSchema);

export default Posts;
