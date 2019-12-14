
const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput(data) {

  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name            = !isEmpty(data.name) ? data.name : "";
  data.email           = !isEmpty(data.email) ? data.email : "";
  data.password        = !isEmpty(data.password) ? data.password : "";
  data.repeat_password = !isEmpty(data.repeat_password) ? data.repeat_password : "";

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name     = "User name is required";
  }

// Name checks
if (Validator.isEmpty(data.email)) {
    errors.email    = "Email is required";
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.repeat_password)) {
    errors.repeat_password = "Please re-enter password";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };

}