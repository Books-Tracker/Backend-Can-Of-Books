const mongoose = require ('mongoose');






//Build a Mongoose 'Book' schema with valid keys for
// `title`, `description`, `status`, and `email` (of the user that added the Book).

const bookSchema= new mongoose.Schema({
  title:{ type: String, unique: true },
  description:{ type: String, unique: true },
  img:{ type: String, unique: true },
  status:{ type: String, unique: true },
});


const userSchema=new mongoose.Schema({
  email:{ type: String, unique: true },
  bookSchema:[bookSchema]
});
const UserModel =mongoose.model('user', userSchema);

//Use your schema to craft a Book model.

// const BookModel =mongoose.model('books', bookSchema);


module.exports = {
  UserModel,

};
