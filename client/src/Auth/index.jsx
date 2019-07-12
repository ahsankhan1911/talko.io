import React, { Component, Fragment } from 'react';
import '../App.css';
import service from '../services'
import Login from './components/Login'
import Signup from './components/Signup'
import { validateData } from './utils'
import AccountVerification from './components/AccountVerification'
import ons from 'onsenui';
import {  Input, Button, Page, Toolbar, ToolbarButton, Icon,BackButton } from 'react-onsenui';


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
        <Page renderToolbar={() =>
  <Toolbar>
    
    <div className="left">
      <BackButton>
          Back
      </BackButton>
    </div>
    <div className="center">
      Account Verification
    </div>
    <div className="right">
      <ToolbarButton>
        <Icon icon="md-menu" />
      </ToolbarButton>
    </div>
  </Toolbar> }
> 
<label>Please enter 4 digits code sent to: <br/> <b>asda@cd.com</b></label><br /><br /><br />
<Input
type="number"
  onChange={(event) => { this.setState({text: event.target.value})} }
  modifier='material'
  name= "email"
  placeholder= "Enter your 4 digit code"
  id="test"
  /> <br/><br/> 
  </Page>


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
        {/* <h2 style={{color: '#1e88e5'}}>Log In</h2>
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

  <Button modifier="cta" style={{backgroundColor: '#1e88e5', color: 'white', height: '20%', width: '50%' }}>
  
Log In
  </Button>
  <p 
  style={{fontSize:'16px'}}
  >Dont have an account? <a 
  style={{color: '#1e88e5'}} 
  href="javascript:void(0)" >Sign up</a></p> */}



      </div>
    );
  }
}

export default Auth;
