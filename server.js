const express = require('express')

/** Init Server */
const app = express();
const port = process.env.PORT || 5000
app.listen(port, () =>{
    console.log("Server Connected !!!")
})