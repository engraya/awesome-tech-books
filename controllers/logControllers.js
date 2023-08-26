const Log = require('../models/log');

const createController =  (request, response) => {
    Log.find()
        .then((result) => {
            response.render('new-log')
        })
        .catch((error) => {
            console.log(error)
        })
}

const getallLogsController = (request, response) => {
    Log.find()
        .then((result) => {
            response.send(result)
        })
        .catch((error) => {
            console.log(error)
        })
}

const getAbsoluteLogsController = (request, response) => {
    Log.find().sort({ createdAt : -1 })
        .then((result) => {
            const context = { logs : result }
            response.render('logs', context)
        })
        .catch((error) => {
            console.log(error);
        })
}

const postAbsoluteLogsController = (request, response) => {
    const log = new Log(request.body)
    log.save()
        .then((result) => {
            response.redirect('/logs')
        })
        .catch((error) => {
            console.log(error)
        })
}


const getSingleItemLogController = (request, response) => {
    const id = request.params.id;
    Log.findById(id)
        .then((result) => {
            const context = { log : result }
            response.render('log-details', context)
        })
        .catch((error) => {
            console.log(error)
        })
}


const deleteSingleItemLogController = (request, response) => {
    const id = request.params.id;
    Log.findByIdAndDelete(id)
        .then((result) => {
            response.json({ redirect : '/logs'})
        })
        .catch((error) => {
            console.log(error)
        })
}


module.exports = { 
    createController,
    getallLogsController,
    getAbsoluteLogsController,
    postAbsoluteLogsController,
    getSingleItemLogController,
    deleteSingleItemLogController
  }