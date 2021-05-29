const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    
    // Email Validation
    if(validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if(!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password Validation
    if(validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    } 

    return {    
        errors,             // errors object
        isValid: isEmpty(errors)     // returns true if empty
    }
}