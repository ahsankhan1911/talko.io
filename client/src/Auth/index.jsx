import React, { Component } from 'react';
import '../App.css';
import { isValidEmail } from '../appUtills'
import service from '../services'
import Login from './components/Login'
import Signup from './components/Signup'
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:8000/5cb5dd88178d6adb7b25e026');



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       loginDisplay: 'block',
       signupDisplay: 'none'
    }

  }

  componentDidMount() {
  }


  handleSignupClick = () => {
   this.setState({
     loginDisplay:'none',
     signupDisplay: 'block' 
   })
  }

  validateData (data, type) {
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

        if (data.password =! data.confirmPassword) {
          let d = Id('signup-error-confirmPassword')
          d.innerText = "Password does not match"
          isValid = false
        }

        break;


    }
    return isValid;

  }


  handleBtn = (data, type) =>  { 
    
    if (this.validateData(data, type)) {
      let errors = document.getElementsByClassName('error')
      for (var i = 0; i < errors.length; i++) {
        errors[i].innerText = ""
      }
      if (type === 'login') {
        service.loginAPI(data)
      }
      if(type === 'signup') {
        console.log("DATe >>>" , data)
        service.signupAPI(data)
      }
    }
  }




  render() {
    return (
      <div className="App">
        <div>
          {/* <h2>Talko.io</h2> */}
          <Login  handleBtn = { this.handleBtn } display={this.state.loginDisplay} handleSignupClick= { this.handleSignupClick}/>
        </div>
      
        <Signup  handleBtn = { this.handleBtn } display={this.state.signupDisplay}/>
       

      </div>
    );
  }
}

export default App;
