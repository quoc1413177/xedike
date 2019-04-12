const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()
const {UserProfile} = require('../../models/userProfile')
/**
 * api:     /api/users/register
 * desc:    registeration API
 * access:  public
 */

router.post('/register', (req,res)=>{
    const {email, password, fullName, phone, DOB} = req.body;
    UserProfile.findOne(
        {$or: [{email},{phone}]}
        )
    .then(user =>{
        if(user) return res.status(400).json({
            errors: "Email or Phone Existed"
        })
        const newUser = new UserProfile({email, password, fullName, phone, DOB})
        bcrypt.genSalt(10, (err,salt)=>{
            if(err) return res.status(err)
            
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) return res.status(err);
                
                newUser.password = hash;
                newUser.save()
                .then(user =>{
                    res.status(200).json(user)
                })
                .catch(err => res.status(400).json(err))
            })
        })
    })
    
})
module.exports = router;