import * as mongooseDef from 'mongoose'
let mongoose = mongooseDef.default

var postSchema = mongoose.Schema({
  name: String,
  img: String,
  category: String,
  details: String,
  faculty: String,
  date: String,
  time: String,
  id: { type: String, unique: true, required: true },
  link: String,
  liked: Boolean,
});

// compile the schema into a model, or a class that we can do things on.
let Post = mongoose.model('Post', postSchema, 'posts')

export default Post
