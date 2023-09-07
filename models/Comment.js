const mongooose = require('mongoose');

const commentSchema = mongooose.Schema({
    title: {
        type: String, 
        required: true
    },
    body: {
        type: String, 
        required: true
    }
})


const Comment = mongooose.model('Comment', commentSchema);


module.exports = Comment;