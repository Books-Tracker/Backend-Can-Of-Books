const mongoose = require ('mongoose')




TODO://Build a Mongoose 'Book' schema with valid keys for
// `title`, `description`, `status`, and `email` (of the user that added the Book).

const bookSchema= new mongoose.Schema({
    title:{ type: String, unique: true },
    description:{ type: String, unique: true },
    img:{ type: String, unique: true },
    status:{ type: String, unique: true },
    email:{ type: String, unique: true },
})


TODO://Use your schema to craft a Book model.

const bookModel =mongoose.model('books', bookSchema)


module.exports = {
    bookModel,
    bookSchema,
  }
