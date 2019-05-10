const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

require('dotenv').config()

/** Connect mongooseDB */
//mongodb+srv://adminQ:Quoc@1996@xedikke-vfhf3.gcp.mongodb.net/test?retryWrites=true
//mongodb://localhost:27017/facebook
mongoose.connect('mongodb+srv://admin123:admin123@xedikke-vfhf3.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(() => console.log('Connected to FB !'))
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

//Redirect to static link
console.log(__dirname + 'public');
app.use(express.static(__dirname + '/public'));

//Enable CORS - Hardcode
//Use npm install http-proxy-middleware --save for react-proxy-tool
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


//Upload FILE
app.use('/uploads',express.static('uploads'))
const port = process.env.PORT
app.listen(port, () =>{
    console.log("Server Connected !!!")
})