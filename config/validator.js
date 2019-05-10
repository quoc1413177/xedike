const _ = require('lodash')
const validator = require('validator')

const validateRegisterInput = (data) =>{
    let errors = {}
    var {email, password,password2,fullName,phone,DOB} = data;
    if(!email) email = ""
    if(!password) password = ""
    if(!password2) password2 = ""

    if(validator.isEmpty(email)){
        errors.email = "Email is required"
    }
    // if(!validator.isEmpty(email)){
    //     errors.email = "Email is invalid"
    // }

    if(validator.isEmpty(password)){
        errors.password = "password is required"
    }
    if(validator.isEmpty(password2)){
        errors.password2 = "password2 is required"
    }
    if(validator.isEmpty(fullName)){
        errors.fullName = "fullName is required"
    }
    if(validator.isEmpty(phone)){
        errors.phone = "phone is required"
    }
    

    return{
        errors,
        isValid: _.isEmpty(errors)
    }
}

module.exports = validateRegisterInput