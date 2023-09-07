const Tag = require('../models/Tag');
const express = require('express')
const router = express.Router()



router.get('/new', (request, response) => {
    response.render('tag/new_tag', { tag : new Tag() })
})


// Create Author Route
router.post('/new', async (request, response) => {
    const tag = new Tag({
        name: request.body.name
    })

    try {
        //response.redirect(`authors/${newAuthor.id}`)
        const newtag = await tag.save()
        response.redirect('tags')
    } catch {
        const context = { tag : tag, errorMessage : "Error Creating Tag"}
        response.render('tag/new_tag', context)
        
    }
})



// All Authors
router.get('/all', async (request, response) => {
    let searchOptions = {}
    let queryNameString = request.query.name
    if (queryNameString != null && queryNameString !== '') {
        searchOptions.name = new RegExp(queryNameString, 'i')
    }
    try {
        const authors = await Tag.find(searchOptions)
        const context = { tags : tags, searchOptions : request.query }
        response.render('tag/index', context)
    } catch {
        response.redirect('/books/booksDashboard')
    }

})


// New Author Route





module.exports = router