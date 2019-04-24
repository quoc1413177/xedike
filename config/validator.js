const _ = require('lodash')
const validator = require('validator')

const validateRegisterInput = (data) =>{
    let errors = {}
    const {email, password,password2,fullName,phone,DOB} = data;
    if(!email) email = ""
    if(!password) password = ""
    if(!password2) password2 = ""

    if(validator.isEmpty(email)){
        errors.email = "Email is required"
    }
    if(!validator.isEmpty(email)){
        errors.email = "Email is invalid"
    }

    if(validator.isEmpty(password)){
        errors.email = "password is required"
    }
    if(validator.isEmpty(password2)){
        errors.email = "password2 is invalid"
    }

    

    return{
        errors,
        isValid: _.isEmpty(errors)
    }
}

module.exports = validateRegisterInput