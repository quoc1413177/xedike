const mongoose = require('mongoose')

const CarInfoSchema = new mongoose.Schema({
    brand: String,
    model: String,
    manuYear: Number,
    licensePlate: String,
    NoOfSeat: Number,
    carImg: String
})
const CarInfo = mongoose.model('Profile',CarInfoSchema)
module.exports = {CarInfo,CarInfoSchema}