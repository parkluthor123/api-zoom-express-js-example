import 'dotenv/config';
const express = require('express');
const app = express();
const exphb = require('express-handlebars');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
app.use(express.urlencoded({extended:false}));

// Environment Variables Setup
const dotenv = require('dotenv');
dotenv.config();

//PORT Setup
const port = process.env.PORT || 2999;

//Handlebars Setup
app.use(express.static('public'));
app.engine('handlebars', exphb.engine());
app.set('view engine', 'handlebars');

//Routes Setup
app.use('/', webRoutes);
app.use('/api/', apiRoutes);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})

module.exports = app