import React, { Component } from 'react';
import '../App.css';
import { isValidEmail, isValidPassword, setCookie } from '../utills'
import service from '../services'
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:8000/5cb5dd88178d6adb7b25e026');



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: {
        email: '',
        password: ''
      },
      signupData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }

    }

  }

  componentDidMount() {
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

  handleChangeSignup = (e) => {
    let data = this.state.signupData

    data[e.target.name] = e.target.value


    this.setState({
      signupData: data
    }, () => {
      console.log(this.state.signupData)
    })
  }

  handleSignupClick = () => {
    document.getElementById('login').style.display = "none"
    document.getElementById('signup').style.display = "block"
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

        if (data.password = !data.confirmPassword) {
          let d = Id('signup-error-confirmPassword')
          d.innerText = "Password does not match"
          isValid = false
        }

        break;


    }
    return isValid;

  }


  handleBtn(data, type) {
    if (this.validateData(data, type)) {
      let errors = document.getElementsByClassName('error')
      for (var i = 0; i < errors.length; i++) {
        errors[i].innerText = ""
      }
      if (type === 'login') {
        service.loginAPI(data)
      }
      if(type === 'signup') {
        service.signupAPI(data)
      }
    }
  }




  render() {
    return (
      <div className="App">
        <div>
          {/* <h2>Talko.io</h2> */}
        </div>
        <div id="login">
          <input type="text" name="email" onChange={this.handleChangeLogin} />   <br /> <span id="login-error-email" className="error"> </span>  <br />
          <input type="password" name="password" onChange={this.handleChangeLogin} />   <br /> <span id="login-error-password" className="error"></span> <br />

          <button onClick={() => this.handleBtn(this.state.loginData, 'login')}>login</button>
          <p>Dont have an account ? <a href="javascript:void(0)" onClick={this.handleSignupClick}>Sign up</a></p>
        </div>

        <div id="signup" style={{ display: "none" }}>

          <input type="text" placeholder="name" name="name" onChange={this.handleChangeSignup} /> <br /> <span id="signup-error-name" className="error"></span>  <br />
          <input type="text" placeholder="email" name="email" onChange={this.handleChangeSignup} />  <br /> <span id="signup-error-email" className="error"></span>  <br />
          <input type="text" placeholder="password" name="password" onChange={this.handleChangeSignup} />  <br /> <span id="signup-error-password" className="error"></span> <br />
          <input type="text" placeholder="confirm password" name="confirmPassword" onChange={this.handleChangeSignup} />  <br />  <span id="signup-error-confirmPassword" className="error"></span> <br />

          <button onClick={() => this.handleBtn(this.state.signupData, 'signup')}>signup</button>
        </div>

      </div>
    );
  }
}

export default App;
