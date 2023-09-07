const mongooose = require('mongoose');

const tagSchema = mongooose.Schema({
    name: {
        type: String, 
        required: true
    }
})


const Tag = mongooose.model('Tag', tagSchema);


module.exports = Tag;