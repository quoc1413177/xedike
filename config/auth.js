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
    authorizing
}