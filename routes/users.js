const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const User = require('../models/user');

router.get('/register', (request, response) => {
    response.render('register')
})


router.post('/register', (request, response) => {
    const name =  request.body.name
    const username =  request.body.username
    const email =  request.body.email
    const password =  request.body.password
    const password2=  request.body.password2

    request.checkBody('Name', 'Name is Required').notEmpty()
    request.checkBody('Username', 'Username is Required').notEmpty()
    request.checkBody('Email', 'Email is Required').notEmpty()
    request.checkBody('Password', 'Password is Required').notEmpty()
    request.checkBody('Password2', 'Password Do not Match').equals(request.body.password1)


    let errors = request.validationErrors();

    if(erors) {
        response.render('register', { errors :errors })
    } else {
        let newUser = new User({
            name:name,
            username:username,
            email:email,
            password:password
        });

        bcrypt.getSalt(10, (error, salt) => {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if(error) {
                    console.log(error)
                } else{
                    newUser.password1 = hash;
                    newUser.save((error) => {
                        if(error) {
                            console.log(error)
                            return;
                        } else {
                            request.flash('Registration Successful', 'You are now Registered and can log into your Account!')
                            response.redirect('/users/login')
                        }
                    })
                }
            })
        })
    }



})

router.get('/login', (request, response) => {
    response.render('login');
})

module.exports = router;