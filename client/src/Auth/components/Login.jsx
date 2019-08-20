import React, { Component } from 'react';
import ons from 'onsenui';
import {  Input, Button, Page, Toolbar, ToolbarButton, Icon,BackButton , ProgressBar} from 'react-onsenui';


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

    handleChangeLogin = (e) => {
        let data = this.state.loginData

        data[e.target.name] = e.target.value


        this.setState({
            loginData: data
        }, () => {
            console.log(this.state.loginData)
        })
    }


    render() {
    let {display, handleBtn, handleSignupClick} = this.props
        return (
            <div style={{ display: display }}>
                {/* <input type="text" name="email" onChange={this.handleChangeLogin} />   <br /> <span id="login-error-email" className="error"> </span>  <br />
                <input type="password" name="password" onChange={this.handleChangeLogin} />   <br /> <span id="login-error-password" className="error"></span> <br />

                <button onClick={() => handleBtn(this.state.loginData, 'login')}>login</button>
                {// eslint-disable-next-line
                 <p>Dont have an account ? <a href="javascript:void(0)" onClick={() => handleSignupClick()}>Sign up</a></p>
                }
                */}


         <h2 style={{color: '#1e88e5'}}>Log In</h2>
        <Input
  name="email" 
  onChange={this.handleChangeLogin} 
  modifier='material'
  placeholder= "Email"
  id="test"
  /> <br/>

  <span id="login-error-email" className="error"> </span>

  <br/>
   <Input
  onChange={this.handleChangeLogin}
  // modifier='material'
  type="password" 
  name="password"
  modifier= 'transparent'
  placeholder= "Password"
 /> <br/>
  <span id="login-error-password" className="error"></span>
 <br/><br/>

  <Button 
  modifier="cta" 
  style={{backgroundColor: '#1e88e5', color: 'white', height: '20%', width: '50%' }}
  onClick={() => handleBtn(this.state.loginData, 'login')}
  >
  
Log In
  </Button>
  <p 
  style={{fontSize:'16px'}}
  >Dont have an account? <a 
  onClick={() => handleSignupClick()}
  style={{color: '#1e88e5'}} 
  href="javascript:void(0)" >Sign up</a></p>



            </div>
        )
    }
}

export default Login;