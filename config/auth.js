const jwt = require('jsonwebtoken')

const authenticating = (req,res,next)=>{
    const token = req.header('Authorization') || '';
    const finger = req.header('fingerprint') || '';
    console.log('token: ',token);
    console.log('finger: ',finger);

    if(!token) return res.status(400).json({msg:'Token not provided'})
    if(finger){
        try{
            const decoded = jwt.verify(token,'cybersoftA'+finger)
            console.log('verify OK')
            req.user = decoded;
            next();
        }catch(error){
            res.status(400).json({msg:'Token verify error',error})
        }
    }
}
const authorizing = (userType)=>{
    return (req,res,next)=>{
        if(req.user.userType === userType){
            next()
        }else{
            res.json({msg:"You have no Permission"})
        }
    }
}
module.exports={
    authorizing,authenticating
}