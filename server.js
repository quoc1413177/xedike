const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

require('dotenv').config()

/** Connect mongooseDB */

mongoose.connect('mongodb+srv://adminQ:Quoc@1996@xedikke-vfhf3.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(console.log('Connected to FB !'))
    .catch(console.log)
/** Init Server */
const app = express();
/**MiddleWare Parser */
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use('/api/users', require('./routes/api/usersAPI'))
//passport
app.use(passport.initialize());
require('./config/passport')(passport)

console.log(__dirname + 'public');
app.use(express.static(__dirname + '/public'));

//Upload FILE
app.use('/uploads',express.static('uploads'))
const port = process.env.PORT
app.listen(port, () =>{
    console.log("Server Connected !!!")
})