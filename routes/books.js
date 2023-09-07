const express = require('express');
const router = express.Router();
const multer  = require('multer');
const Book = require('../models/Book');
const fs = require('fs');
const { ensureAuthenticated } = require('../config/authConfig');


//image uploads
var storage = multer.diskStorage({
    destination : function(request, file, callback) {
        callback(null, "./public/")
    },
    filename : function(request, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
})

var upload = multer({
    storage : storage,
}).single('image')


router.get('/new', (request, response) => {
    response.render('newbook')
})



router.get('/booksdashboard', async (request, response) => {
    let query = Book.find()
    if (request.query.name != null && request.query.name != '' ) {
        query = query.regex('name', new RegExp(request.query.name, 'i'))
    } 
    try {
        const books = await query.exec()
        const context = { books : books, searchOptions : request.query, title : "Books Dashboard", username : request.user.name}
        response.render('booksDashboard', context)
    } catch {
        response.render('core')
    }
})



//upload file to Database
router.post('/new', upload,  (request, response) => {
    const book = new Book({
        title : request.body.title,
        description : request.body.description,
        pageCount : request.body.pageCount,
        author : request.body.author,
        tag : request.body.tag,
        image : request.file.filename,
    });
    book.save()
        .then(book => {
            request.session.message = {
                type : 'success',
                message : 'Book Added Successfully...!'
            };
            response.redirect('/books/booksDashboard')
        })
        .catch(error => console.log(error))

})


router.get('/update/:id', (request, response) => {
    let id = request.params.id;
    const book = Book.findById(id)
            .then((book) =>{
                context = { book : book, title : 'Update Book'}
                response.render("editbook", context)
            })
            .catch((error) => {
                response.redirect('/books/booksDashboard')
            })
})

router.post('/update/:id', upload, (request, response) => {
    let id = request.params.id;
    let new_image = ""

    if (request.file) {
        new_image = request.file.filename;
        try {
            fs.unlinkSync("./public" + request.body.old_image)
            
        } catch (error) {
            console.log(error)
        }
    } else {
        new_image = request.body.old_image
    }

    Book.findByIdAndUpdate(id, {
        title : request.body.title,
        description : request.body.description,
        pageCount : request.body.pageCount,
        author : request.body.author,
        tag : request.body.tag,
        image : new_image
    })
    .then(book => {
        request.session.message = {
            type : 'success',
            message : 'Book Updated Successfully...!'
        };
        response.redirect('/books/booksDashboard')
    })
    .catch((error) => console.log(error))

})



router.get('/delete/:id', ensureAuthenticated, (request, response) => {
    let id = request.params.id;
    Book.findOneAndRemove(id)
        .then((result) => {
            if (result.image != '') {
                try {
                    fs.unlinkSync('./public/' + result.image)
                } catch (error) {
                    console.log(error)
                }
            }
            request.session.message = {
                type : 'success',
                message : 'Book Deleted Successfully...!'
            };
            response.redirect('/books/booksDashboard')
        })
        .catch((error) => {
            console.log(error)
        })
})



module.exports = router;