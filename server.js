const express = require('express')
const mongoose = require('mongoose')

/** Connect mongooseDB */
const MONGO_URI = 'mongodb://localhost:27017/xedike'
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log('Connected to FB !'))
    .catch(console.log)
/** Init Server */
const app = express();
app.use('/api/users', require('./routes/api/usersAPI'))
/**MiddleWare Parser */
app.use(express.urlencoded({extended:false}));
app.use(express.json())

const port = process.env.PORT || 5000
app.listen(port, () =>{
    console.log("Server Connected !!!")
})