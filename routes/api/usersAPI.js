const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    console.log("Hello User")
    res.status(200).json({
        message:"My 1st API"
    })
})

module.exports = router;