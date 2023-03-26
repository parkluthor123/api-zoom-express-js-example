const express = require('express')
const route = express.Router();

route.get('/', (req, res) => {
    return res.json({
        message: 'Hello World'
    })
})

module.exports = route;