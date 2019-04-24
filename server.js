const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

require('dotenv').config()

/** Connect mongooseDB */

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(console.log('Connected to FB !'))
    .catch(console.log)
/** Init Server */
const app = express();
/**MiddleWare Parser */
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use('/api/users', require('./routes/api/usersAPI'))



app.use(passport.initialize());
require('./config/passport')(passport)

app.use('/uploads',express.static('uploads'))
const port = process.env.PORT
app.listen(port, () =>{
    console.log("Server Connected !!!")
})