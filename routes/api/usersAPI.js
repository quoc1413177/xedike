const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()
const {UserProfile} = require('../../models/userProfile')
const {authorizing} = require('../../config/auth')
/**
 * api:     /api/users/register
 * desc:    registeration API
 * access:  public
 */

router.post('/register', (req,res)=>{
    //console.log(UserProfile)
    //console.log(req.body)
    const {email, password, fullName, phone, userType,registerDate,DOB} = req.body;
    UserProfile.findOne(
        {$or: [{email},{phone}]}
        )
    .then(user =>{
        /**Handle Error FindOne */
        if(user) return res.status(400).json({
            errors: "Email or Phone Existed"
        })
        const newUser = new UserProfile({email, password, fullName, phone,userType,registerDate, DOB})
        bcrypt.genSalt(10, (err,salt)=>{
            /**Handle Error genSalt */
            if(err) return res.status(err)
            
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                /**Handle Hash Error */
                if(err) return res.status(err);
                
                newUser.password = hash;
                newUser.save()
                .then(user =>{
                    res.status(200).json(user)
                })/**Handle Error Cannot save to DB */
                .catch(err => res.status(400).json(err))
            })
        })
    })
    
})
/**
 * api:     /api/users/login
 * desc:    Login API
 * access:  public
 */

router.post('/login',(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    UserProfile.findOne({
        email: email
    })
        .then(user =>{
            if(!user) return res.status(400).json({
                errors: "Email or Not Existed"
            })
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(!isMatch) return res.status(400).json({
                        errors: "Password Not Macth"
                    })
                    //res.status(200).json(user)
                    const payload = {
                        id: user._id,
                        email: user.email,
                        usertype: user.userType,
                        fullname: user.fullName
                    }
                    jwt.sign(
                        payload,
                        "cybersoftA",
                        (err,token) =>{
                            if(err) return res.status(400).json(err)
                            res.status(200).json({
                                msg:"Login Success",
                                token:"Bearer" + token
                            })
                        }
                    )
                })
                .catch(err => res.status(400).json(err))
        })
})
//Cơ bản của passport
router.post('/test',
    (req,res,next)=>{
        console.log("1st round")
        next()
    },
    (req,res,next)=>{
        console.log("2nd round")
        next()
    },
    (req,res)=>{
        console.log("final round")
        res.status(400).json({msg:"Done Stage"})
    }      
)

router.post('/test-private',
    passport.authenticate('jwt',{session:false}),
    // (req,res,next)=>{
    //     if(req.user.userType === "driver"){
    //         next()
    //     }else{
    //         res.json({msg:'You have no permisson'})
    //     }
    // },
    authorizing('admin'),
    (req,res)=>{
        res.json({msg:"Success"})
    }
    )
module.exports = router;