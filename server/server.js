const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');

const {xss} = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize')

const routes = require('./routes');

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Pass}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoURI);

app.use(bodyParser.json());

app.use(xss());
app.use(mongoSanitize());

app.use('/api', routes);

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})