const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {UserProfile} =  require('../models/userProfile');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'cybersoftA'

module.exports = (passport) =>{
    passport.use( new JwtStrategy(opts, function(jwt_payload,done){
        console.log("parse jwt_payload: ",jwt_payload)
        UserProfile.findOne({ _id: jwt_payload.id },function(err,user){
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                
                return done(null,false)
            }
        })
    }))
}