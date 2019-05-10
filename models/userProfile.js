const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
    email:          {type:String},
    password:       {type:String},
    fullName:       {type:String},
    userType:       {type:String},
    phone:          {type:String},
    DOB:            {type:String,  },
    registerDate:   {type:Date,   default:Date.now() },
    numberOfTrips:  {type:Number},
    numberOfKms:    {type:Number},
    avatar:         {type:String},
    isActive:       {type:Boolean},
})
const UserProfile = mongoose.model('Profile',UserProfileSchema)
module.exports = {
    UserProfile,UserProfileSchema
}