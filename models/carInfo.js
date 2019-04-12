const mongoose = require('mongoose')

const CarInfoSchema = new mongoose.Schema({
    brand:          {type:String, required:true},
    model:          {type:String, required:true},
    manuYear:       {type:Number, required:true},
    licensePlate:   {type:String, required:true},
    NoOfSeat:       {type:Number, required:true},
    carImg:         {type:String, required:true},
})
const CarInfo = mongoose.model('Profile',CarInfoSchema)
module.exports = {CarInfo,CarInfoSchema}