const express = require('express')
const app = express()
const port = 5000
const cookieParser = require('cookie-parser')


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


// app.use('/api/users', require('./routes/users'));

// app.use('/uploads', express.static('uploads'));


app.get('/', (req,res) => res.send("Hello word"))




app.listen(port, () => console.log(`app listening on port ${port}`))
