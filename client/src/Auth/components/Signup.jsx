import React, { Component } from 'react';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                email: '',
                password: ''
            },
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

    handleSignupClick = () => {
        document.getElementById('login').style.display = "none"
        document.getElementById('signup').style.display = "block"
    }


    render() {

        return (
            <div id="signup" style={{ display: this.props.display }}>

            <input type="text" placeholder="name" name="name" onChange={this.handleChangeSignup} /> <br /> <span id="signup-error-name" className="error"></span>  <br />
            <input type="text" placeholder="email" name="email" onChange={this.handleChangeSignup} />  <br /> <span id="signup-error-email" className="error"></span>  <br />
            <input type="text" placeholder="password" name="password" onChange={this.handleChangeSignup} />  <br /> <span id="signup-error-password" className="error"></span> <br />
            <input type="text" placeholder="confirm password" name="confirmPassword" onChange={this.handleChangeSignup} />  <br />  <span id="signup-error-confirmPassword" className="error"></span> <br />
  
            <button onClick={() => this.props.handleBtn(this.state.signupData, 'signup')}>signup</button>
          </div>
        )
    }
}

export default Signup;