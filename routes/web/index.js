const express = require('express')
const route = express.Router();

route.get('/', (req, res) => {
    res.render('home');
})

route.get('/room/:signature/:sdkKey/:meetingNumber/:passWord/:userName/:userEmail/:tk/:zak', (req, res) => {
    console.log(req.params)
    res.render('room');
})

module.exports = route;