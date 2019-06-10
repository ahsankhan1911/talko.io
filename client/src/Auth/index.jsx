import React, { Component, Fragment } from 'react';
import '../App.css';
import service from '../services'
import Login from './components/Login'
import Signup from './components/Signup'
import { validateData } from './utils'
import AccountVerification from './components/AccountVerification'


class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDisplay: 'block',
      signupDisplay: 'none',
      showVerification: false,
      responseData: {}
    }

  }

  handleSignupClick = () => {
    this.setState({
      loginDisplay: 'none',
      signupDisplay: 'block'
    })
  }


  handleBtn = (data, type) => {

    if (validateData(data, type)) {
      let errors = document.getElementsByClassName('error')
      for (var i = 0; i < errors.length; i++) {
        errors[i].innerText = ""
      }
      if (type === 'login') {
        service.loginAPI(data).then((result) => {
          if (result.verification === true) {
            return this.setState({
              showVerification: true,
              responseData: { userId: result.data.userId, email: result.data.email}
            })
          }
        })

      }
      if (type === 'signup') {
        service.signupAPI(data).then((result) => {
          return this.setState({
            showVerification: true,
            responseData: { userId: result.userId, email: result.email}
          })
        })
      }
      if(type === 'verification') {
         service.userVerification(data)
      }
    }
  }




  render() {
    let { showVerification, loginDisplay, signupDisplay, responseData } = this.state
    return (
      <div className="App">
        { 
          showVerification ? 
          <AccountVerification 
          handleBtn={this.handleBtn} 
          userData ={responseData}
          /> :
            <Fragment>
              <Login 
              handleBtn={this.handleBtn} 
              display={loginDisplay} 
              handleSignupClick={this.handleSignupClick} 
              />

              <Signup 
              handleBtn={this.handleBtn} 
              display={signupDisplay} 
              />
            </Fragment>

        }

      </div>
    );
  }
}

export default Auth;
