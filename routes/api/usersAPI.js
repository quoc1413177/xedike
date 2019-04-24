const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const multer = require('multer')

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
    
    const {isValid,errors} = validateRegisterInput(req.body)
    if(!isValid) return res.status(400).json(errors)
    
    UserProfile.findOne(
        {$or: [{email},{phone}]}
        )
    .then(user =>{
        /**Handle Error FindOne */
        if(user) {
            if (user.email == email) errors.email = "Email existed"
            if (user.password == password) errors.password = "Password existed"
            return res.status(400).json(errors)
        }

        /**User Not Existed */
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

/**
 * api:     /api/users/upload-img
 * desc:    uploadIMG
 * access:  public
 */
const storage = multer.diskStorage({
    destination:function(req,file,callback1){
        callback1(null,'./uploads/')
    },
    filename: function(req, file, callback2){
        let type = "";
        if(file.mimetype === "application/octet-stream") type=".jpg"
        callback2(null, new Date().getTime()+ "-" + file.originalname + type)
    }
})

const upload = multer({storage})
router.post('/upload-img',
    passport.authenticate('jwt',{session: false}),
    upload.single('avatar'),
    (req,res) =>{
        console.log("file upload: ",req.file)
        UserProfile.findById(req.user.id)
        .then(user =>{
            user.avatar = req.file.path
            return user.save()
        })
        .then(user=> res.status(200).json(user))
        .catch(err=> res.status(400).json(err))
    }
    )

/**
 * api:     /api/users/alluser
 * desc:    get all User
 * access:  public
 */
router.get('/alluser',(req,res)=>{
    UserProfile.find({})
        .then(user=>{
            return res.status(200).json(user)
        })
        .catch(err => res.status(400).json(err))
        
})
/**
 * api:     /api/users/:userID
 * desc:    get all User
 * access:  public
 */
router.get("/:id",(req,res)=>{
    let id = req.param("id")
    UserProfile.findOne({
        _id: id
    })
        .then(user=>{
            return res.status(200).json(user)
        })
        .catch(err => 
            res.status(400).json(err))        
}
)
/**
 * api:     /api/users/update
 * desc:    Update User
 * access:  public
 */

router.post("/update/:id",
    passport.authenticate('jwt',{session: false}),
    (req,res) => {
        let id = req.params["id"]
        var {registerDate,isActive,email,password,fullName,phone,DOB,userType} = req.body;
       
        bcrypt.genSalt(10, (err,salt)=>{
            /**Handle Error genSalt */
            if(err) return res.status(err)
            
            bcrypt.hash(password,salt,(err,hash)=>{
                /**Handle Hash Error */
                if(err) return res.status(err);
                password = hash;
            })
        })
        UserProfile.updateOne({ _id: id }, {
                $set: {
                    fullName: fullName,
                    password: password,
                    phone: phone,
                    isActive:isActive,
                    DOB:DOB
                }
            })
        .then(ok =>{
            if(email || registerDate || userType){
               return res.status(200).json({
                    msg1:"Data updated!!",
                    msg2:"You are not allow to update email, registerdate and userType"
                })
            }
            res.status(200).json({msg1:"Data updated!!"})
            
            })
        .catch(err => {
            return res.status(400).json({msg:"Error Update Data"})})
            
})
module.exports = router;