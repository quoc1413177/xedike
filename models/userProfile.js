const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
    email:          {type:String, required:true},
    password:       {type:String, required:true},
    fullName:       {type:String, required:true},
    userType:       {type:String, required:true},
    phone:          {type:Number, required:true},
    DOB:            {type:Date, required:true},
    registerDate:   {type:Date, required:true},
    numberOfTrips:  {type:Number},
    numberOfKms:    {type:Number},
    avatar:         {type:Boolean},
    isActive:       {type:Boolean, required:true},
})
const UserProfile = mongoose.model('Profile',UserProfileSchema)
module.exports = {
    UserProfile,UserProfileSchema
}