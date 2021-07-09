const express = require('express')
const app = express()
const port = 8000
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
app.use('/api/video', require('./routes/video'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/blog', require('./routes/blog'));

app.use('/uploads', express.static('uploads'));


app.get('/api/hello', (req, res) => res.send("Hello word"))





app.listen(port, () => console.log(`app listening on port ${port}`))
