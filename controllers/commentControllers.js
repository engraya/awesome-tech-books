const Book = require('../models/Book');


const landingPageController = (request, response) => {
    response.render('landingPage')
}

const getallCommentsController = (request, response) => {
    Book.find()
        .then((result) => {
            response.send(result)
        })
        .catch((error) => {
            console.log(error)
        })
}

const getAbsoluteCommentController = (request, response) => {
    Book.find().sort({ createdAt : -1 })
        .then((result) => {
            const context = { logs : result }
            response.render('logs', context)
        })
        .catch((error) => {
            console.log(error);
        })
}

const createController =  (request, response) => {
    response.render('new-log')
}

const postAbsoluteCommentController = (request, response) => {
    const book = new Book(request.body)
    book.save()
        .then((result) => {
            response.redirect('/logs')
        })
        .catch((error) => {
            console.log(error)
        })
}


const getSingleItemCommentController = (request, response) => {
    const id = request.params.id;
    Book.findById(id)
        .then((result) => {
            const context = { log : result }
            response.render('log-details', context)
        })
        .catch((error) => {
            console.log(error)
        })
}


const deleteSingleItemCommentController = (request, response) => {
    const id = request.params.id;
    Book.findByIdAndDelete(id)
        .then((result) => {
            response.json({ redirect : '/logs'})
        })
        .catch((error) => {
            console.log(error)
        })
}




module.exports = { 
    createController,
    getallCommentController,
    getAbsoluteCommentController,
    postAbsoluteCommentController,
    getSingleItemCommentController,
    deleteSingleItemCommentController,
    landingPageController,
  }