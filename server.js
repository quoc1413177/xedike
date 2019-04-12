const express = require('express')
const mongoose = require('mongoose')

/**Connect DB */
const MONGO_URI = 'mongodb://localhost:27017/xedike'
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log('Connected to FB !'))
    .catch(console.log)

/** Init Server */
const app = express();
const port = process.env.PORT || 5000
app.listen(port, () =>{
    console.log("Server Connected !!!")
})