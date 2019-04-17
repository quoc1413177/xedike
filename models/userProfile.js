const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
    email:          {type:String, required:true},
    password:       {type:String, required:true},
    fullName:       {type:String, required:true},
    userType:       {type:String, required:true},
    phone:          {type:String, required:true},
    DOB:            {type:String,  },
    registerDate:   {type:Date,   default:Date.now() },
    numberOfTrips:  {type:Number},
    numberOfKms:    {type:Number},
    avatar:         {type:Boolean},
    isActive:       {type:Boolean, default: true},
})
const UserProfile = mongoose.model('Profile',UserProfileSchema)
module.exports = {
    UserProfile,UserProfileSchema
}