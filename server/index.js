const express = require('express')
const app = express()
const port = 5000
const cookieParser = require('cookie-parser')
const { User } = require("./models/User")

const mongoose = require('mongoose')

const config = require('./config/key')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use('/api/users', require('./routes/users'));

// app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => res.send("Hello word"))





app.listen(port, () => console.log(`app listening on port ${port}`))
