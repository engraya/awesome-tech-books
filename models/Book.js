const mongoose = require('mongoose');
const Schema = mongoose.Schema


const bookSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type: String
      },
    pageCount: {
        type: Number,
        required: true
      },
    author: {
        type:String,
        reuired:true
    },
    image: {
        type: String,
        required: true
      },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tag'
      }
}, { timestamps : true });


const Book = mongoose.model('Book', bookSchema)

module.exports = Book;