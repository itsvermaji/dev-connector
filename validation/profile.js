const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";


    if(!validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = 'Handle needs to between 2 and 4 characters';
    }

    if(validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required!';
    }

    if(validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if(validator.isEmpty(data.skills)) {
        errors.skills = 'Status field is required';
    }

    // Validation for website and social medias
    if(!isEmpty(data.website) && !validator.isURL(data.website)) {
        errors.website = 'Not a valid URL';
    }
    if(!isEmpty(data.youtube) && !validator.isURL(data.youtube)) {
        errors.youtube = 'Not a valid URL';
    }
    if(!isEmpty(data.twitter) && !validator.isURL(data.twitter)) {
        errors.twitter = 'Not a valid URL';
    }
    if(!isEmpty(data.facebook) && !validator.isURL(data.facebook)) {
        errors.facebook = 'Not a valid URL';
    }
    if(!isEmpty(data.linkedin) && !validator.isURL(data.linkedin)) {
        errors.linkedin = 'Not a valid URL';
    }
    if(!isEmpty(data.instagram) && !validator.isURL(data.instagram)) {
        errors.instagram = 'Not a valid URL';
    }

    return {    
        errors,             // errors object
        isValid: isEmpty(errors)     // returns true if empty
    }
}