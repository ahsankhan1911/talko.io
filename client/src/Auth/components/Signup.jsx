import React, { Component } from 'react';
import {  Input, Button, Page, Toolbar, ToolbarButton, Icon,BackButton , ProgressBar} from 'react-onsenui';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupData: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }

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


    render() {

        return (
            <div id="signup" style={{ display: this.props.display }}>
<h2 style={{color: '#1e88e5'}}>Sign Up</h2>
                {/* <input type="text" placeholder="name" name="name" onChange={this.handleChangeSignup} /> <br /> <span id="signup-error-name" className="error"></span>  <br /> */}
                <Input
  name="name" 
  onChange={this.handleChangeSignup} 
  modifier='material'
  placeholder= "Name"
  /><br /> <span id="signup-error-name" className="error"></span>  <br /> 
                <Input
  name="email" 
  onChange={this.handleChangeSignup} 
  modifier='material'
  placeholder= "Email"
  /><br /> <span id="signup-error-email" className="error"></span>  <br />
   <Input
  name="password" 
  type="password"
  onChange={this.handleChangeSignup} 
  modifier='material'
  placeholder= "Password"
  /><br /> <span id="signup-error-password" className="error"></span> <br /> 
   <Input
  name="confirmPassword" 
  type="password"
  onChange={this.handleChangeSignup} 
  modifier='material'
  placeholder= "Confirm password"
  /><br />  <span id="signup-error-confirmPassword" className="error"></span> <br />
                {/* <input type="text" placeholder="email" name="email" onChange={this.handleChangeSignup} />  <br /> <span id="signup-error-email" className="error"></span>  <br /> */}
                {/* <input type="text" placeholder="password" name="password" onChange={this.handleChangeSignup} />  <br /> <span id="signup-error-password" className="error"></span> <br /> */}
                {/* <input type="text" placeholder="confirm password" name="confirmPassword" onChange={this.handleChangeSignup} />  <br />  <span id="signup-error-confirmPassword" className="error"></span> <br /> */}
                <Button 
  modifier="cta" 
  style={{backgroundColor: '#1e88e5', color: 'white', height: '20%', width: '50%' }}
  onClick={() => this.props.handleBtn(this.state.signupData, 'signup')}
  >
  
Sign up
  </Button>
                {/* <button onClick={() => this.props.handleBtn(this.state.signupData, 'signup')}>signup</button> */}
            </div>
        )
    }
}

export default Signup;