import React, { Component } from 'react';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                email: '',
                password: ''
            }
        }

    }

    validateData = (data, type) => {
        var isValid = true
        let errors = document.getElementsByClassName('error')
        for (var i = 0; i < errors.length; i++) {
          errors[i].innerText = ""
        }
        var Id = (id) => document.getElementById(id)
    
        switch (type) {
          case 'login':
            // if (!isValidEmail(data.email)) {
            //   let d = Id('login-error-email')
            //   d.innerText = "Invalid Email"
            //   isValid = false
            // }
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
    
            // if (!isValidEmail(data.email)) {
            //   let d = Id('signup-error-email')
            //   d.innerText = "Invalid Email"
            //   isValid = false
            // }
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
    
            if (data.password = !data.confirmPassword) {
              let d = Id('signup-error-confirmPassword')
              d.innerText = "Password does not match"
              isValid = false
            }
    
            break;
    
    
        }
        return isValid;
    
      }

    handleChangeLogin = (e) => {
        let data = this.state.loginData

        data[e.target.name] = e.target.value


        this.setState({
            loginData: data
        }, () => {
            console.log(this.state.loginData)
        })
    }

    // handleSignupClick = () => {
    //     document.getElementById('login').style.display = "none"
    //     document.getElementById('signup').style.display = "block"
    // }


render() {

        return (
            <div style={{display: this.props.display}}>
                <input type="text" name="email" onChange={this.handleChangeLogin} />   <br /> <span id="login-error-email" className="error"> </span>  <br />
                <input type="password" name="password" onChange={this.handleChangeLogin} />   <br /> <span id="login-error-password" className="error"></span> <br />

                <button onClick={() => this.props.handleBtn(this.state.loginData, 'login')}>login</button>
                <p>Dont have an account ? <a href="javascript:void(0)" onClick={() => this.props.handleSignupClick()}>Sign up</a></p>
            </div>
        )
    }
}

export default Login;