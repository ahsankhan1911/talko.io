import { isValidEmail } from '../appUtills'

var validateData = (data, type) =>  {
    var isValid = true
    let errors = document.getElementsByClassName('error')
    for (var i = 0; i < errors.length; i++) {
      errors[i].innerText = ""
    }
    var Id = (id) => document.getElementById(id)

    switch (type) {
      case 'login':
        if (!isValidEmail(data.email)) {
          let d = Id('login-error-email')
          d.innerText = "Invalid Email"
          isValid = false
        }
        if (!data.email) {
          let d = Id('login-error-email')
          d.innerText = "Please enter your email"
          isValid = false
        }

        if (!data.password) {
          let d = Id('login-error-password')
          d.innerText = "Please enter your password"
          isValid = false
        }

        break;

      case 'signup':
        if (!data.name) {
          let d = Id('signup-error-name')
          d.innerText = "Please enter your name"
          isValid = false
        }

        if (!isValidEmail(data.email)) {
          let d = Id('signup-error-email')
          d.innerText = "Invalid Email"
          isValid = false
        }
        if (!data.email) {
          let d = Id('signup-error-email')
          d.innerText = "Please enter your email"
          isValid = false
        }

        if (data.password.length < 8 || data.password.length > 35) {
          let d = Id('signup-error-password')
          d.innerText = "Password should be min 8 and max 35 characters"
          isValid = false
        }

        if (!data.password) {
          let d = Id('signup-error-password')
          d.innerText = "Please enter your password"
          isValid = false
        }

        if (data.password ===! data.confirmPassword) {
          let d = Id('signup-error-confirmPassword')
          d.innerText = "Password does not match"
          isValid = false
        }
        break;

        default: 
        isValid = false
    }

    return isValid;

  }


  
  export {
      validateData
  }