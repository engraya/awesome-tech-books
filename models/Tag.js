const mongooose = require('mongoose');
const Book = require('./Book')

const tagSchema = mongooose.Schema({
    name: {
        type: String, 
        required: true
    }
})

tagSchema.pre('remove', function(next) {
    Book.find({ tag: this.id }, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length > 0) {
            next(new Error('This Tag has books still'))
        } else {
            next()
        }
    })
} )


const Tag = mongooose.model('Tag', tagSchema);


module.exports = Tag;