import React, { Component, Fragment } from 'react';
import '../App.css';
import service from '../services'
import Login from './components/Login'
import Signup from './components/Signup'
import { validateData } from './utils'
import AccountVerification from './components/AccountVerification'
import ons from 'onsenui';
import {  Input, Button,  } from 'react-onsenui';


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
  

  componentDidMount () {
    // console.log("DOCUMENT >>> ", this.refs.test.value)
    // document.getElementById('password').placeholder = "Password"  
    // document.getElementsByTagName('input')[1].placeholder = "Password"
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
      <div className="App" >
        {/* { 
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

        } */}
        <h2 style={{color: 'white'}}>Log In</h2>
        <Input
  onChange={(event) => { this.setState({text: event.target.value})} }
  modifier='material'
  name= "email"
  placeholder= "Email"
  id="test"
  /> <br/><br/>
   <Input
  onChange={(event) => { this.setState({text: event.target.value})} }
  // modifier='material'
  id= "password"
  modifier= 'transparent'
  placeholder= "Password"
 /> <br/><br/><br/>

  <Button modifier="cta" style={{backgroundColor: 'white', color: '#008000', height: '20%', width: '50%' }}>
  
Log In
  </Button>
  <p style={{color: 'white'}}>Dont have an account? <a style={{color: 'white'}} href="javascript:void(0)" >Sign up</a></p>

      </div>
    );
  }
}

export default Auth;
